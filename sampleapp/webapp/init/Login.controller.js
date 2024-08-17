sap.ui.define([
    "com/sampleapp/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "com/sampleapp/utils/URLConstants"

    // 'com/app/customerportal/controller/Constant',
], function (BaseController, JSONModel, URLConstants) {
    "use strict";
    // var timerId, that;
    // // shortcut for sap.ui.core.MessageType
    // var MessageType = coreLibrary.MessageType;

    return BaseController.extend("com.sampleapp.init.Login", {
        onInit: function () {
            var that = this;
            // that.getView().addStyleClass(that.getOwnerComponent().getContentDensityClass());
            //that.getView().setModel(new JSONModel(), "loginMdl");
            //that.showChatBot(false);
            let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("login").attachMatched(this._onRouteMatched, this);  
        },
        _onRouteMatched: function () {
            this.setModel();
        },
        setModel: function () {
            let data = {
                general:{
                    name:null,
                    password:null
                }
            }
            this.getView().setModel(new JSONModel(data));
        },
     
        onPressChangePassword: function (oEvent) {
            var cModel = this.getView().getModel('loginModel');
            cModel.getData().enable = true;
            cModel.refresh();
            this.loginBtn.setText("Login")
        },
        onPressLogin:async function (oEvent) {
            var that = this;
            let oModel = this.getView().getModel();
            let oData = oModel.getData();
            this.showLoading(true);
            let path = URLConstants.URL.login_get;
            let getToken = await this.restMethodPostLogin(path,oData.general);
            sessionStorage.setItem("jwtToken", getToken);
            this.getRouter().navTo("dashboard");
            oModel.refresh();
            this.showLoading(false);
        }
    });
});
