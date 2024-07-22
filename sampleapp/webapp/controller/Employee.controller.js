sap.ui.define([
	"com/sampleapp/controller/BaseController",
	"sap/ui/model/json/JSONModel", "sap/ui/core/Fragment",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageBox", 'sap/ui/export/Spreadsheet',
	"sap/m/Dialog",
	"sap/ui/model/Sorter"

], function (BaseController, JSONModel, Fragment, Filter, FilterOperator, MessageBox, Spreadsheet, Dialog, Sorter) {
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
			this._tableId = this.getView().byId("tableEmployees");
		},
		_onRouteMatched: function (oEvent) {
			that = this;
			this.getView().setModel(new JSONModel(), "employeeListMdl");
			this.mockData();
			this.fetchEmployee();
		},
		mockData: function () {
			let data = [{
				first_name: "name1",
				gender: "Male",
				mobile: "9087576587"
			},
			{
				first_name: "name2",
				gender: "Male",
				mobile: "9087576587"
			},
			{
				first_name: "name3",
				gender: "Male",
				mobile: "9087576587"
			},
			{
				first_name: "name4",
				gender: "Male",
				mobile: "9087576587"
			},
			{
				first_name: "name5",
				gender: "Male",
				mobile: "9087576587"
			},
			{
				first_name: "name6",
				gender: "Male",
				mobile: "9087576587"
			},
			{
				first_name: "name7",
				gender: "Male",
				mobile: "9087576587"
			}]
			this.getView().setModel(new JSONModel(data), "employeeListMdl");
		},
		fetchEmployee: async function () {
			try {
				this.showLoading(true);
				let path = 'Employees/all';
				let res = await this.restMethodGet(path);
				this.getView().setModel(new JSONModel(res), "employeeListMdl");
				this.showLoading(false);
			}
			catch (ex) {
				this.showLoading(false);
				this.errorHandling(ex);
			}
		},
		onPressEmployeeList: function (oEvent) {
			let selObj = oEvent.getSource().getBindingContext("employeeListMdl").getObject();
			let slayout = 'TwoCloumnMidExpanded';
			this.getRouter().navTo("employee-details", { layout: slayout, ID: selObj.id });
		},
		onOpenDialog: async function (sPath) {
			try {
				//Common dialog open function
				if (!this.oDialog) {
					this.oDialog = await this.loadFragment({
						name: sPath,
					});
				}

				this.oDialog.open(); //Open Dialog
				return this.oDialog;
			} catch (error) {
				console.log(error);
			}
		},
		onCloseDialog: async function () {
			//Common dialog close function
			if (this.oDialog.close) {
				this.oDialog.close(); //Close Dialog
			}
			this.oDialog.destroy();
			delete this.oDialog;
		},

		handleGroupButtonPressed: async function () {
			this.oDialog = null;
			if (!this.groupDialog) {
				this.groupDialog = await this.onOpenDialog("com.sampleapp.fragment.GroupDialog");
			} else {
				this.groupDialog.open();
			}

			if (this.groupDialog) {//binding visible columns
				let columns = this.sheetDetails().columns;
				let exVisibleCols = this._tableId.getColumns().map((e) => {
					if (e.getVisible()) {
						return { label: e.getHeader().getProperty('text'), visible: e.getVisible() };
					}
				});
				let visibleCol = columns.filter((e) => exVisibleCols.some(ex => e.label == ex?.label));
				this.groupDialog.setModel(new JSONModel(visibleCol));
				this.groupDialog.setSelectedGroupItem(this.groupDialog.getSelectedGroupItem());
			}
		},
		handleGroupDialogConfirm: function (oEvent) {
			var oTable = this._tableId,
				mParams = oEvent.getParameters(),
				source = oEvent.getSource(),
				oBinding = oTable.getBinding("items"),
				sPath,
				bDescending,
				vGroup,
				aGroups = [];

			let gContext = function (oContext) {
				return oContext.getProperty("gender");
			};
			sPath = this.groupDialog?.getGroupItems().find(e => e.sId == source.getSelectedGroupItem())?.getKey();
			if (sPath) {
				//sPath = mParams.groupItem.getKey();
				//  bDescending = mParams.groupDescending;
				bDescending = this.groupDialog?.getGroupDescending();

				//vGroup = this.mGroupFunctions[sPath];
				aGroups.push(new Sorter(sPath, bDescending, gContext));
				// apply the selected group settings
				oBinding.sort(aGroups);
			} else if (this.groupReset || !sPath) {
				oBinding.sort();
				this.groupReset = false;
			}
		},
		sheetDetails: function () {
			let obj = {
				fileName: "Customs Package Code.xlsx",
				sheets: {
					sheetName: ["Customs Package Code"]
				},
				columns: [
					{
						label: 'Name',
						property: 'first_name',
						visible: true
					},
					{
						label: 'Gender',
						property: 'gender',
						visible: true
					},
					{
						label: 'Mobile',
						property: 'mobile',
						visible: true
					}
				]
			};
			return obj;
		},

	});

});