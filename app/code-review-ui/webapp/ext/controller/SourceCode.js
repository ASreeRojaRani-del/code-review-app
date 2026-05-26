sap.ui.define( () => {
    "use strict";

    return {
      async onSourceCodeActionPress(_, aSelectedContexts) {
        const sSourceCode = aSelectedContexts?.[0]
          ? decodeURIComponent(atob(aSelectedContexts[0].getObject().FullSourceCode)) : "";

        if (!this.pDialog) {

          var oTextArea = new sap.m.TextArea({
            width: "100%",
            rows: 80,
            editable: false,
            value: sSourceCode || "No source code available."
          });

          this.pDialog = new sap.m.Dialog({
            title: "Source Code",
            type: "Message",
            contentWidth: "500px",
            content: oTextArea,
            beginButton: new sap.m.Button({
              text: "Close",
              press: function () {
                this.pDialog.close();
              }.bind(this)
            })
          });

        }
        this.pDialog.open();
      }
    };
  }
);