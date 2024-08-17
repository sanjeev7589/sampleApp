sap.ui.define(
    [
        "com/sampleapp/controller/BaseController",
        "sap/ui/model/json/JSONModel"
    ],
    function (BaseController, JSONModel) {
        "use strict";
    
        return BaseController.extend("com.sampleapp.init.AppUnified", {
            onInit: function () {
                //this.byId("toolPage").setSideExpanded(false);

                this.oOwnerComponent = this.getOwnerComponent();
                this.oRouter = this.oOwnerComponent.getRouter();

                this.oRouter.attachRouteMatched(this.onRouteMatched, this);
            },
            onRouteMatched: function (oEvent) {
                // this.userSettingsData();
                // this.fetchMasterData();
            },

            onPressLogo: function () {
                this.onPressHome();
            },

        }
        );
    }
);
