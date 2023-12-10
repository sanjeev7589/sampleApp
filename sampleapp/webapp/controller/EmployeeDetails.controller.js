sap.ui.define([
	"com/sampleapp/controller/BaseController",
	"sap/ui/model/json/JSONModel", "sap/ui/core/Fragment",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageBox", 'sap/ui/export/Spreadsheet'

], function (BaseController, JSONModel, Fragment, Filter, FilterOperator, MessageBox, Spreadsheet) {
	"use strict";
	var that = this;
	return BaseController.extend("com.sampleapp.controller.EmployeeDetails", {
		onInit: function () {
			that = this;
			this.oOwnerComponent = this.getOwnerComponent();
			this.oRouter = this.oOwnerComponent.getRouter();
			this.oModel = this.oOwnerComponent.getModel();
			this.oRouter.getRoute("employee-details").attachMatched(this._onRouteMatched, this);
		},
		_onRouteMatched: function (oEvent) {
			that = this;
            this._id = oEvent.getSource().
			this.getView().setModel(new JSONModel(), "employeeDetailMdl");
            this.fetchEmployee();
		}
	});

});