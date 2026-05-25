const SELECT  = require('@sap/cds/lib/ql/SELECT');
const { UPSERT } = require('@sap/cds/lib/ql/cds-ql');
const { executeHttpRequest } = require('@sap-cloud-sdk/http-client');
const summary = require('./data/Results.json');

const DIM_DEST = 'DIM';
const AGENT_DEST = 'AgentBuilder';
const SRC_URL =
    "sap/opu/odata4/sap/zsb_obj_src_aggr_v4/srvd_a2x/sap/zsd_obj_src_aggr/0001/SourceCode?$filter=ObjectName eq 'ZCL_PROG_SOURCE_QRY' and ObjectType eq 'CLAS'";
const HEADERS = { 'Content-Type': 'application/json' };

const fetchObjects = async () => {
    const { data } = await executeHttpRequest(
        { destinationName: DIM_DEST },
        { method: 'GET', url: SRC_URL, timeout: 30000, headers: HEADERS }
    );
    return data.value || [];
};

const filterObjects = (arr, where) => {
    if (!where) return arr;
    const [fieldRef, op, val] = where;
    const field = fieldRef?.ref?.[0];
    return op === '=' && field ? arr.filter(o => o[field] === val?.val) : arr;
};

const sortObjects = (arr, order) => {
    if (!order) return arr;
    const { ref, sort } = order[0];
    const field = ref?.[0];
    const dir = (sort || 'asc').toLowerCase();
    return arr.sort((a, b) => {
        if (a[field] < b[field]) return dir === 'asc' ? -1 : 1;
        if (a[field] > b[field]) return dir === 'asc' ? 1 : -1;
        return 0;
    });
};

module.exports = srv => {
    // READ CodeReview
    srv.on('READ', 'CodeReview', async req => {
        try {
            let objs = await fetchObjects();
            objs = filterObjects(objs, req?.query?.SELECT?.where);
            objs = sortObjects(objs, req?.query?.SELECT?.orderBy);
            const data = objs.map(obj => {
                const results = summary.results.find(r => r.objectName === obj.ObjectName);
                obj.results = results || {};
                return {
                    ...obj,
                    results: results || {}
                };
            });

            await UPSERT.into('CodeService.CodeReview').entries(data);
            await UPSERT.into('CodeService.Results').entries(data.map(d => d.results));

            return data;
        } catch (e) {
            req.reject(500, e.message);
        }
    });

    // READ Results
    srv.on('READ', 'Results', () => summary.results);

    // READ Findings
    srv.on('READ', 'Findings', () =>
        summary.results.flatMap(r => (r.findings || []).map(f => ({
            ...f,
            resultObjectName: r.objectName
        })))
    );

    // evaluate CodeReview
    srv.on('evaluate', 'CodeReview', async req => {
        try {
            const objName = req.params?.[0]?.ObjectName;
            if (!objName) return req.reject(400, 'ObjectName missing');

            const [detail] = await SELECT.from('CodeService.CodeReview').where({ ObjectName: objName });
            if (!detail) return req.reject(404, 'Not found');

            const src = decodeURIComponent(atob(detail.FullSourceCode));
            const payload = {
                form: {
                    objectName: detail.ObjectName,
                    objectType: detail.ObjectType,
                    fullSourceCode: src
                }
            };

            const resp = await executeHttpRequest(
                { destinationName: AGENT_DEST },
                { method: 'POST', headers: HEADERS, data: JSON.stringify(payload) }
            );
            return resp.data;
        } catch (e) {
            req.reject(500, e.message);
        }
    });
};