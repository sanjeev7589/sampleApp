sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "com/sampleapp/utils/URLConstants",

  ],
  function (Controller, URLConstants) {
    return Controller.extend(
      "com.sampleapp.controller.BaseController", {
      onInit: function () {

      },
      getRouter: function () {
        return sap.ui.core.UIComponent.getRouterFor(this);
      },
      showLoading: function (status) {
        this.getView().setBusy(status);
      },
      errorHandling: function (ex) {
        var that = this;
        if (!this.errorData || !ex) {
          this.errorData = [];
        }
        let isInvalidSession = ex?.errorDescription?.includes("301") || ex?.errorDescription?.includes("Invalid Session");
        let invalidSession = ((ex) => {
          if (ex.errorDescription.includes("301") || ex.errorDescription.includes("Invalid Session")) {
            sap.m.MessageBox.error(ex.errorDescription, {
              actions: [sap.m.MessageBox.Action.OK],
              emphasizedAction: "OK",
              onClose: function (sAction) {
                that.getRouter().navTo('login');
              }
            });
          }
        });
        if (!isInvalidSession) {
          let eModel = this.getOwnerComponent().getModel("errors");
          let exist = this.errorData.find((e) => e.title == (ex?.responseJSON?.errorDescription || ex?.responseJSON?.debugMessage || ex?.errorDescription));
          if (ex && !exist) {
            if (ex.responseJSON?.debugMessage) {
              this.errorData.push(that.customErrorObject(ex.responseJSON.debugMessage, that.pageId, null));
            } else if (ex.responseJSON?.errorDescription) {
              this.errorData.push(that.customErrorObject(ex.responseJSON.errorDescription, that.pageId, null));
            } else if (ex.responseJSON) {
              this.errorData.push(that.customErrorObject(ex.responseJSON.error, that.pageId, null));
            } else if (ex?.errorDescription || ex?.debugMessage) {
              this.errorData.push(that.customErrorObject(ex?.errorDescription || ex?.debugMessage, that.pageId, null));
            } else if (ex.status) {
              this.errorData.push(that.customErrorObject(ex.status + " " + ex.statusText, that.pageId, null));
            } else {
              this.errorData.push(that.customErrorObject(ex, that.pageId, null));
            }
          }
          let exData = eModel.getData().length ? eModel.getData() : [];
          let merge = [...exData, ...this.errorData];
          eModel.setData(merge);

          if (merge.length) {
            that.errorMessagePopover(that.popoverBtn, false);
          }
        } else {
          invalidSession(ex);
        }
        that.showLoading(false);
      },
      customErrorObject: function (
        errorMessages,
        pageId,
        oControl,
        description
      ) {
        return {
          type: "Error",
          active: false,
          control: oControl,
          title: errorMessages,
          subTitle: null,
          description: description,
          page: pageId,
        };
      },
      errorMessagePopover: async function (popoverBtn) {
        //Popover
        let oPopover = await this.onOpenPopover(
          popoverBtn,
          "com.sampleapp.fragment.ErrorMessage"
        );
      },
      onOpenPopover: async function (oEvent, sPath) {
        //Common popover open function
        let oButton = oEvent, //.getSource(),
          oView = this.getView();

        if (this.oPopover) {
          this.oPopover.destroy();
          delete this.oPopover;
        }

        this.oPopover = await this.loadFragment({
          name: sPath,
        });
        oView.addDependent(this.oPopover);

        let errorMsg = sPath.includes("ErrorMessage");
        if (!errorMsg) {
          this.oPopover.openBy(oButton); //Open Popover
        } else {
          this.oPopover.toggle(oButton); //Toggle Popover
        }
      },
      restMethodGet: function (url) {
        let that = this;
        url = URLConstants.URL.app_end_point + url;
        let token = sessionStorage.getItem("jwtToken");
        var deferred = $.Deferred();
        $.ajax({
          type: "GET",
          url: url,
          headers: {"Authorization": "Bearer " + token},
          contentType: "application/json",
          success: function (response) {
            deferred.resolve(response);
          },
          error: function (xhr) {
            deferred.reject(xhr); //.responseJSON.message);
            if (xhr && xhr.status == "401") {

            }
          },
        });

        return deferred.promise();
      },
      restMethodPostLogin: function (url, request) {
        url = URLConstants.URL.app_end_point+ url;
        var deferred = $.Deferred();
        $.ajax({
          type: 'POST',
          url: url,
          data: JSON.stringify(request),
          contentType: "application/json",
          success: function (response) {
            deferred.resolve(response);
          },
          error: function (xhr) {
            deferred.reject(xhr);
          }
        });
        return deferred.promise();
      },
    })
  })