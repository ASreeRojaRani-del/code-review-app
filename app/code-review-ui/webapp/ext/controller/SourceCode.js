sap.ui.define(
  ["sap/ui/core/Fragment"],
  (Fragment) => {
    "use strict";

    const DLG_ID   = "sourceCodeDialog";
    const DLG_NAME = "codereviewui.ext.view.SourceCode";

    return {
      async onSourceCodeActionPress(_, aSelectedContexts) {
        const sSourceCode = aSelectedContexts?.[0]
          ? decodeURIComponent(atob(aSelectedContexts[0].getObject().FullSourceCode)) : "";

        if (!this.pDialog) {
          this.pDialog = Fragment.load({
            id: DLG_ID,
            name: DLG_NAME
          });
        }

        const oDialog = await this.pDialog;

        const oTextArea = sap.ui.core.Fragment.byId(
          DLG_ID,
          "sourceCodeDialog_text0"
        );
        oTextArea.setValue(
          sSourceCode || "No source code available."
        );
        oDialog.open();
      },

      async onCloseDialog() {
        if (!this.pDialog) return;

        const oDialog = await this.pDialog;
        oDialog.close();
      }
    };
  }
);