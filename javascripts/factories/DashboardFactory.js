"use strict";

app.factory("DashboardFactory", function($q, $http, $rootScope, FIREBASE_CONFIG) {

  var getUserNames = function(){
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/users.json`)
      .success( (response) => {
       let users = [];
       Object.keys(response).forEach((key) => {
         response[key].id = key;
         users.push(response[key]);
       });
       resolve(users);
        })
       .error( (errorResponse) => {
        reject(errorResponse);
       });
    });
  };

  return {getUserNames};
});
