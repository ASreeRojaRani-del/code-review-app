using CodeService as service from '../../srv/code-service';
annotate service.CodeReview with @(
    UI.SelectionFields: [
        ObjectName,ObjectType
    ],
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'Results',
            Target : 'results/@UI.FieldGroup#SummaryHeader',
        },
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet2',
            Label : 'Findings',
            Target : 'results/findings/@UI.LineItem',
        }
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'Object Name',
            Value : ObjectName,
            Importance: #High
        },
        {
            $Type : 'UI.DataField',
            Label : 'Program Id',
            Value : ProgramId,
            Importance: #High
        },
        {
            $Type : 'UI.DataField',
            Label : 'Object Type',
            Value : ObjectType,
            Importance: #High
        },
        {
            $Type : 'UI.DataField',
            Label : 'Short Description',
            Value : ShortDescription,
            Importance: #High
        },
        {
            $Type : 'UI.DataFieldForAction',
            Action: 'CodeService.evaluate',
            Label : 'Evaluate'
        }
    ]
);
annotate service.Results with @(
    UI.FieldGroup #SummaryHeader : {
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'Object Type',
                Value : objectType,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Overall Rating',
                Value : overallRating,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Critical Issues',
                Value : criticalIssues,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Major Issues',
                Value : majorIssues,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Minor Issues',
                Value : minorIssues,
            }
        ],
    }
);

annotate service.Findings with @(
    UI.LineItem: [
        {
            $Type: 'UI.DataField',
            Label: 'Rule Id',
            Value: ruleId,
            Importance: #High
        },
        {
            $Type: 'UI.DataField',
            Label: 'Category',
            Value: category,
            Importance: #High
        },
        {
            $Type: 'UI.DataField',
            Label: 'Severity',
            Value: severity,
            Importance: #High
        },
        {
            $Type: 'UI.DataField',
            Label: 'Location',
            Value: location,
            Importance: #High
        },
        {
            $Type: 'UI.DataField',
            Label: 'Issue',
            Value: issue,
            Importance: #High
        },
        {
            $Type: 'UI.DataField',
            Label: 'Recommendation',
            Value: recommendation,
            Importance: #High
        }
    ]
);
