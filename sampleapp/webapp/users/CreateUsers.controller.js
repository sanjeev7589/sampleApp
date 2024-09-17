sap.ui.define([
    "com/sampleapp/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/format/DateFormat",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/integration/library",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Core",
    "com/sampleapp/utils/URLConstants",
    "sap/ui/core/routing/History"
], function (BaseController, JSONModel, DateFormat, MessageToast, MessageBox, library, Filter, FilterOperator, Core, URLConstants, History) {
    "use strict";
    var that = this;
    return BaseController.extend("com.sampleapp.users.CreateUsers", {
       

        onInit: function () {
            this.oOwnerComponent = this.getOwnerComponent();
            this.oRouter = this.oOwnerComponent.getRouter();
            this.oModel = this.oOwnerComponent.getModel();
            this.oRouter.getRoute("addUser").attachMatched(this._onRouteCreateMatched, this);
            // this.oRouter.getRoute("editUser").attachMatched(this._onRouteEditMatched, this);
            let getSource = (id => this.getView().byId(id));
            // [this.btnEdit, this.formId, this.pageId, this.popoverBtn] = [getSource("btnEdit"), getSource("cpcForm"), getSource("page_addEditCustomsPackageCode"), getSource("btnCPCodeErr")];
        },
        _onRouteCreateMatched: function (oEvent) {
            this._item = oEvent.getParameter("arguments").id || null;
            this._route = oEvent.getParameter("config").name;
            this.getView().setModel(
                new JSONModel({
                    create: true,
                }),
                "visible"
            );
            this.initialValues();
        },
        _onRouteEditMatched: function (oEvent) {
            this._item = oEvent.getParameter("arguments").id || null;
            this._route = oEvent.getParameter("config").name;
            this.initialValues();
            this.setTitle(this.getResourceProperty("cpcHeaderTitle"));
            this.btnEdit.setEnabled(true); //Always edit btn enabled true 
        },
        initialValues: function () {
            this.setModel();
        },
        setModel: function () { /* Set Model data for table*/
            let data = {
                route: this._route,
                item: this._item,
                user: {
                    name: null,
                    password: null,
                    roles:"ROLE_USER",
                    email: null,
                    status: 2
                },
            };
            this.getView().setModel(new JSONModel(data));
        },
        postUser: async function () {
            try {
                var that = this;
                let postMdl = this.getView().getModel();
                let postData = postMdl.getData().user;
                this.showLoading(true);
                let path = URLConstants.URL.add_edit_user;
                let postRes = await this.restMethodPost(path, postData); 
                this.showMessage();
                this.showLoading(false);
            } catch (error) {
                this.showLoading(false);
                this.errorHandling(error);
            }
        },
        showMessage: function () {
            let that = this;
            MessageBox.information("Saved Successfully", {
                actions: [MessageBox.Action.OK],
                onClose: function (sAction) {
                },
            });
        },
        onPressCancel: function () {
            this.onNavBack();
        }
    });
});
