sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"codereviewui/test/integration/pages/CodeReviewList",
	"codereviewui/test/integration/pages/CodeReviewObjectPage"
], function (JourneyRunner, CodeReviewList, CodeReviewObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('codereviewui') + '/test/flp.html#app-preview',
        pages: {
			onTheCodeReviewList: CodeReviewList,
			onTheCodeReviewObjectPage: CodeReviewObjectPage
        },
        async: true
    });

    return runner;
});

