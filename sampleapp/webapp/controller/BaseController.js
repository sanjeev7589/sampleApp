sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
    ],
    function (Controller) {
        return Controller.extend(
            "com.sampleapp.controller.BaseController", {
            onInit: function () {

            },
            getRouter: function () {
                return sap.ui.core.UIComponent.getRouterFor(this);
            },
        })
    })