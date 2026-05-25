service CodeService {

    entity CodeReview {
        key ObjectName       : String;
            ProgramId        : String;
            ObjectType       : String;
            ShortDescription : String(100);
            FullSourceCode   : LargeString;
            results          : Composition of one Results on results.objectName = ObjectName;
    } actions {
        action evaluate();
    };

    entity Results {
        key objectName     : String;
            objectType     : String;
            overallRating  : String;
            criticalIssues : Integer;
            majorIssues    : Integer;
            minorIssues    : Integer;
            findings       : Composition of many Findings on findings.resultObjectName = objectName;
    }

    entity Findings {
        key ruleId         : String;
            resultObjectName : String;
            programId       : String;
            category       : String;
            severity       : String;
            objectType     : String;
            objectName     : String;
            location       : String;
            issue          : String;
            recommendation : String;
    }
}
