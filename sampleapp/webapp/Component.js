/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "com/sampleapp/model/models",
    "sap/ui/model/json/JSONModel",
    'sap/f/FlexibleColumnLayoutSemanticHelper',
    'sap/f/library',
],
    function (UIComponent, Device, models,JSONModel,FlexibleColumnLayoutSemanticHelper,fioriLibrary) {
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
                oRouter.attachBeforeRouteMatched(this._onBeforeRouteMatched, this);
                this.getRouter().initialize();

          

                // set the device model
                this.setModel(models.createDeviceModel(), "device");
                this.setModel(new JSONModel(), "errors");
                this.setModel(new JSONModel(), "sideNavigation")
                // this.setModel(models.createDeviceModel(), "device");
            },
            _onBeforeRouteMatched: function (oEvent) {
                var oModel = this.getModel(),
                    sLayout = oEvent.getParameters().arguments.layout,
                    oNextUIState;

                // If there is no layout parameter, query for the default level 0 layout (normally OneColumn)
                if (!sLayout) {
                    this.getHelper().then(function (oHelper) {
                        oNextUIState = oHelper.getNextUIState(0);
                        oModel.setProperty("/layout", oNextUIState.layout);
                    });
                    return;
                }

                oModel.setProperty("/layout", sLayout);
            },
            getHelper: function () {
                return this._getFcl().then(function (oFCL) {
                    var oSettings = {
                        defaultTwoColumnLayoutType: fioriLibrary.LayoutType.TwoColumnsMidExpanded,
                        defaultThreeColumnLayoutType: fioriLibrary.LayoutType.ThreeColumnsMidExpanded
                    };
                    return (FlexibleColumnLayoutSemanticHelper.getInstanceFor(oFCL, oSettings));
                });
            },
            _getFcl: function () {
                return new Promise(function (resolve, reject) {
                    var oView = this.getRootControl().getContent()[0].getPages().find(e => e.getProperty("viewName") == "com.sampleapp.controller.AppUnified");
                    var oFCL = oView.byId("fcl")
                    if (!oFCL) {
                        oView.attachAfterInit(function (oEvent) {
                            resolve(oEvent.getSource().byId('flexibleColumnLayout'));
                        }, this);
                        return;
                    }
                    resolve(oFCL);

                }.bind(this));
            },
        });
    }
);