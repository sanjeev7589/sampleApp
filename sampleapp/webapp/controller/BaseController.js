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
      showLoading: function (status) {
        this.getView().setBusy(status);
      },
      // restMethodGet: function (url) {
      //   let that = this;
      //   url = 'http://localhost:8080/' + url;
      //   // url = URLConstants.URL.app_endPoint + url;
      //   var deferred = $.Deferred();
      //   $.ajax({
      //     type: "GET",
      //     url: url,
      //     contentType: "application/json",
      //     success: function (response) {
      //       deferred.resolve(response);
      //     },
      //     error: function (xhr) {
      //       deferred.reject(xhr); //.responseJSON.message);
      //     },
      //   });
      //   return deferred.promise();
      // },
      // restMethodGet: function (url) {
      //   $.ajax({
      //     url: 'http://localhost:8080/Employees/all',
      //     headers: {
      //         'Content-Type': 'application/x-www-form-urlencoded'
      //     },
      //     type: "GET", /* or type:"GET" or type:"PUT" */
      //     dataType: "json",
      //     success: function (result) {
      //         console.log(result);
      //     },
      //     error: function (result) {
      //         console.log(result);
      //     }
      // });
      // },
      restMethodGet: function (url) {
        let that = this;
        url = 'http://localhost:8080/Employees/all';
        var deferred = $.Deferred();
        
          $.ajax({
            type: "GET",
            beforeSend: function (xhr) {
              xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
            },
            url: url,
            contentType: "application/json",
            //headers: { "my-token": token },
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
    })
  })