sap.ui.define([
    "com/sampleapp/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    'sap/m/MessagePopover',
    'sap/m/MessageItem',
    'sap/ui/core/message/Message',
    'sap/ui/core/library',
    'sap/ui/core/Core',
    'sap/ui/core/Element',
    'sap/m/MessageToast',
    "com/sampleapp/utils/URLConstants"

    // 'com/app/customerportal/controller/Constant',
], function (BaseController, JSONModel, MessagePopover, MessageItem, Message, coreLibrary, Core, Element, MessageToast, ErrorMessage,URLConstants) {
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
                    userName:null,
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
        onPressLogin: function (oEvent) {
            var that = this;
            var cModel = this.getView().getModel('loginModel');
            var enableProp = cModel.getData().enable;
            var emailvalidate = cModel.getData().email;
            var mailregex = /^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;
            !emailvalidate.match(mailregex) ? (cModel.getData().emailValueState = "Error", cModel.getData().emailValueStateText = "Invalid Email") : cModel.getData().emailValueState = "None";
            var passvalidate = cModel.getData().password;
            !passvalidate.match(mailregex) ? (cModel.getData().passValueState = "Error", cModel.getData().passValueStateText = "Invalid Email") : cModel.getData().passValueState = "None";
            cModel.refresh();
            if (enableProp == true) {
                cModel.getData().enable = false;
                cModel.refresh();
                // this.loginBtn.setText("Verify Token")
                MessageToast.show("Please Enter correct UserName and Password");
            } else {
                this.getRouter().navTo("dashboard");
            }
            // } else {
            //     //this.errorMessagePopover(this.popoverBtn);
            // }
        }
    });
});
