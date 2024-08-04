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

    return BaseController.extend("com.sampleapp.controller.Login", {
        onInit: function () {
            var that = this;
            // that.getView().addStyleClass(that.getOwnerComponent().getContentDensityClass());
            //that.getView().setModel(new JSONModel(), "loginMdl");
            //that.showChatBot(false);
            let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("login").attachMatched(this._onObjectMatched, this);

            //validation related id parameters
            // this.formId = this.getView().byId('loginForm');
            // this.pageId = this.getView().byId('loginPage');
            // this.popoverBtn = this.getView().byId('messagePopoverBtnLogin');
            // //
            // this.loginBtn = this.getView().byId("loginBtn");
            var oModel = new JSONModel({ email: "", password: "", enable: true })
            this.oView = this.getView();
            this.oView.setModel(oModel, "loginModel");
        },
        _onObjectMatched: function () {
            this.fetchEmployees();
        },
        setModel: function () {
            let data = {
                route: this._route,
                item: this._item,
                general: {
                    cardCode: null,
                    cardName: null,
                    "Series": 76,
                    industry: 1,
                    cardType: "cSupplier",
                    valid: "tYES",
                    debitorAccount: "201001",
                    city: null,
                    status: 2,
                },
            }
            this.getView().setModel(new JSONModel(data));
        },
        fetchEmployees:async function(){
            try {
                this.showLoading();
                let path =  URLConstants.URL.port_code_add;
                let portCode = await this.restMethodPost(path);
                this.getView()

            } catch (error) {
                this.errorHandling();
            }
        },
        onAfterRendering: function () {
            var view = this.getView();
            view.addDelegate({
                onsapenter: function () {
                    view.getController().onPressLogin();
                }
            });
        },

        handleMessagePopoverPress: function (oEvent) {
            //this.errorMessagePopover(oEvent.getSource());
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
