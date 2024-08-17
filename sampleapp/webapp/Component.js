/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",

],
    function (UIComponent,JSONModel) {
        "use strict";

        return UIComponent.extend("com.sampleapp.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                var oModel,
                    oRouter;
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);
                oModel = new JSONModel();
                this.setModel(oModel);


                // enable routing
                oRouter = this.getRouter();
                this.getRouter().initialize();
                this.setModel(new JSONModel(), "errors");
                this.setModel(new JSONModel(), "sideNavigation")
            },
        });
    }
);