sap.ui.define([
	"com/sampleapp/controller/BaseController",
	"sap/ui/model/json/JSONModel", "sap/ui/core/Fragment",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageBox", 'sap/ui/export/Spreadsheet'

], function (BaseController, JSONModel, Fragment, Filter, FilterOperator, MessageBox, Spreadsheet) {
	"use strict";
	var that = this;
	return BaseController.extend("com.sampleapp.controller.Employee", {
		onInit: function () {
			that = this;
			this.oOwnerComponent = this.getOwnerComponent();
			var getId = this.getView();
			this.oRouter = this.oOwnerComponent.getRouter();
			this.oModel = this.oOwnerComponent.getModel();
			this.oRouter.getRoute("employee").attachMatched(this._onRouteMatched, this);
		},
		_onRouteMatched: function (oEvent) {
			that = this;
			this.getView().setModel(new JSONModel(), "employeeListMdl");
            this.fetchEmployee();
		},
        fetchEmployee:async function(){
            try{
                this.showLoading(true);
                let path = 'Employees/all';
				let res = await this.restMethodGet(path);
				this.getView().setModel(new JSONModel(res),"employeeListMdl");
				this.showLoading(false);
            }
            catch(ex){
				this.showLoading(false);
                this.errorHandling(ex);
            }
        },
		onPressEmployeeList:function(oEvent){
			let selObj = oEvent.getSource().getBindingContext("employeeListMdl").getObject();
			let slayout = 'TwoCloumnMidExpanded';
			this.getRouter().navTo("employee-details",{layout:slayout,ID:selObj.id});
		}   
	});

});