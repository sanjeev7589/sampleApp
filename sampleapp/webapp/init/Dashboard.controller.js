sap.ui.define([
    "com/sampleapp/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/format/DateFormat",
    "sap/m/MessageToast",
    "sap/ui/integration/library",
    "sap/ui/core/Core",
    'sap/f/library',
], function (BaseController, JSONModel, DateFormat, MessageToast, library, Core, fioriLibrary) {
    "use strict";
    var that = this;
    return BaseController.extend("com.sampleapp.init.Dashboard", {

        onInit: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("dashboard").attachMatched(this._onRouteMatched, this);
        },
        _onRouteMatched: function () {
            // // this.userSettingsData();
            // this.setTitle("Home");
        },
        onPressTile: function (oEvent) {
            var route = oEvent.getSource().getCustomData().find(e => e.getProperty("key") == "route").getValue();
            var key = oEvent.getSource().getCustomData().find(e => e.getProperty("key") == "key").getValue();
            this.getRouter().navTo(route);
            if (key) {
                this.sideNavigation(key);
            }
        },
        ///Side Naviagtion model
        sideNavigation: function (key) {
            var oData = {
                "navigation": [
                    {
                        "title": "Liner Agent",
                        "icon": "sap-icon://person-placeholder",
                        "key": "1",
                        "visible": true,
                        "items": [
                            /*  {
                                 "title": "Dashboard",
                                 "icon": "sap-icon://home",
                                 "key": "dashboard"
                             }, */
                            {
                                "title": "Voyages",
                                "icon": "sap-icon://BusinessSuiteInAppSymbols/icon-vessel",
                                "key": "voyagesMaster",
                                "class":"bussinessIcon",
                                "items": [
                                    {
                                        "title": "Manage Voyages",
                                        "key": "voyagesMaster"
                                    },
                                    {
                                        "title": "New Voyage",
                                        "key": "voyagesDetailCreate/{layout}"
                                    },
                                    {
                                        "title": "Upload Manifest",
                                        "key": "uploadManifest"
                                    }
                                ]
                            }, {
                                "title": "Imports",
                                "icon": "sap-icon://BusinessSuiteInAppSymbols/icon-target",
                                "key": "manageImports",
                                "items": [
                                    {
                                        "title": "Manage Imports",
                                        "key": "manageImports"
                                    },
                                    {
                                        "title": "New Import Request",
                                        "key": ""
                                    }
                                ]
                            },
                            {
                                "title": "Exports",
                                "icon": "sap-icon://BusinessSuiteInAppSymbols/icon-source",
                                "key": "",
                                "items": [
                                    {
                                        "title": "Manage Exports",
                                        "key": ""
                                    },
                                    {
                                        "title": "New Export Request",
                                        "key": ""
                                    }
                                ]
                            },
                            {
                                "title": "Trans-shipment",
                                "icon": "sap-icon://BusinessSuiteInAppSymbols/icon-data-access",
                                "key": "",
                                "items": [
                                    {
                                        "title": "Manage Trans-shipment",
                                        "key": ""
                                    },
                                    {
                                        "title": "New Trans-shipment",
                                        "key": ""
                                    }
                                ]
                            },
                            {
                                "title": "Operations",
                                "icon": "sap-icon://enablement",
                                "key": "",
                                "items": [
                                    {
                                        "title": "Container Movement",
                                        "key": ""
                                    },
                                    {
                                        "title": "Empty Containers",
                                        "key": ""
                                    }
                                ]
                            },
                            {
                                "title": "Reports",
                                "icon": "sap-icon://manager-insight",
                                "key": "",
                                "items": [
                                    {
                                        "title": "Sailing Report",
                                        "key": ""
                                    },
                                    {
                                        "title": "Terminal Departure Report",
                                        "key": ""
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "title": "Clearing & Forwarding",
                        "icon": "sap-icon://media-forward",
                        "visible": true,
                        "key": "2",
                        "items": [
                            {
                                "title": "Jobs",
                                "icon": "sap-icon://request",
                                "key": ""
                            }, {
                                "title": "Payments",
                                "icon": "sap-icon://money-bills",
                                "key": ""
                            }, {
                                "title": "Reports",
                                "icon": "sap-icon://manager-insight",
                                "key": ""
                            }
                        ]
                    }, {
                        "title": "Other Services",
                        "icon": "sap-icon://e-care",
                        "visible": true,
                        "key": "3",
                        "items": [
                            {
                                "title": "Husbandry Service",
                                "icon": "sap-icon://technical-object",
                                "key": ""
                            }, {
                                "title": "Transportation",
                                "icon": "sap-icon://shipping-status",
                                "key": ""
                            }, {
                                "title": "Reports",
                                "icon": "sap-icon://manager-insight",
                                "key": ""
                            }
                        ]
                    },
                    {
                        "title": "Finance",
                        "icon": "sap-icon://lead",
                        "visible": true,
                        "key": "4",
                        "items": [
                            {
                                "title": "Reports",
                                "icon": "sap-icon://manager-insight",
                                "key": ""
                            }
                        ]
                    },
                    {
                        "title": "App Config",
                        "icon": "sap-icon://key-user-settings",
                        "visible": true,
                        "key": "5",
                        "items": [
                            {
                                "title": "Application Config",
                                "icon": "sap-icon://action-settings",
                                "visible": true,
                                "items": [
                                    {
                                        "title": "Connections",
                                        "key": "",
                                    },
                                ]
                            },
                            {
                                "title": "Manage Users",
                                "icon": "sap-icon://user-settings",
                                "visible": true,
                                "items": [
                                    {
                                        "title": "Users",
                                        "key": "",
                                    }, {
                                        "title": "Roles",
                                        "key": "",
                                    }, {
                                        "title": "Permissions",
                                        "key": "",
                                    },
                                ]
                            },
                            {
                                "title": "Master Data",
                                "icon": "sap-icon://course-program",
                                "visible": true,
                                "items": [
                                    {
                                        "title": "Shipping Line",
                                        "key": "shippingLineMaster",
                                        "icon": "sap-icon://crossed-line-chart"
                                    },
                                    {
                                        "title": "Port Code",
                                        "key": "portCodeMaster",
                                        "icon": "sap-icon://key"
                                    },
                                    {
                                        "title": "Call Sign",
                                        "key": "callsignMaster",
                                        "icon": "sap-icon://call"
                                    },
                                    {
                                        "title": "IMO",
                                        "key": "IMOMaster",
                                        "icon": "sap-icon://building"
                                    },
                                    {
                                        "title": "Postal Code",
                                        "key": "postalCode",
                                        "icon": "sap-icon://letter"
                                    },
                                   /*  {
                                        "title": "Customer / Shipper",
                                        "key": "customerShipperMaster",
                                        "icon": "sap-icon://customer"
                                    }, */
                                    {
                                        "title": "Business Party",
                                        "key": "BusinessParty",
                                        "icon": "sap-icon://customer"
                                    },
                                    /* {
                                        "title": "Voyage",
                                        "key": "voyageMaster",
                                        "icon": "sap-icon://flight"
                                    }, */
                                    {
                                        "title": "Vessel",
                                        "key": "vesselMaster",
                                        "icon": "sap-icon://inventory"
                                    },
                                    {
                                        "title": "Container Type",
                                        "key": "containertype",
                                        "icon": "sap-icon://cargo-train"
                                    },
                                    {
                                        "title": "Cargo Type",
                                        "key": "cargoType",
                                        "icon": "sap-icon://cargo-train"
                                    },
                                    {
                                        "title": "HS Code",
                                        "key": "hsCode",
                                        "icon": "sap-icon://number-sign"
                                    },
                                    {
                                        "title": "Customs Package Code",
                                        "key": "customspackageCode",
                                        "icon": "sap-icon://product"
                                    }
                                ]
                            }
                        ]
                    }
                ],
                /* "fixedNavigation": [
                    {
                        "title": "Validations",
                        "icon": "sap-icon://settings",
                        "expanded": false,
                        "key": "ValidationTest"
                    }
                ] */
            }
            let homeNav = {
                "title": "Dashboard",
                "icon": "sap-icon://bbyd-dashboard",
                "visible": true,
                "key": "dashboard",
                "items": []
            }
            let filter = oData.navigation.find(e => e.key == key).items;
            //filter.unshift(homeNav)
            oData.navigation = filter;
            oData.selectedSectionKey = key;
            var oModel = this.getOwnerComponent().getModel("sideNavigation");
            let merge = { ...oModel.getData(), ...oData };
            this.getOwnerComponent().setModel(new JSONModel(merge), "sideNavigation");
            oModel.refresh();
        }
    });
});
