"use strict";

app.factory("DashboardFactory", function($q, $http, $rootScope, FIREBASE_CONFIG) {

  var getUserNames = function() {
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/users.json`)
      .success((response) => {
       let users = [];
       Object.keys(response).forEach((key) => {
         response[key].id = key;
         users.push(response[key]);
       });
       resolve(users);
        })
       .error((errorResponse) => {
        reject(errorResponse);
       });
    });
  };

  var getLoggedUserDomains = function(userId) {
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/submitted_domains.json?orderBy="uid"&equalTo="${userId}"`)
      .success((response) => {
       let loggedUserDomains = [];
       Object.keys(response).forEach((key) => {
         response[key].id = key;
         loggedUserDomains.push(response[key]);
       });
       resolve(loggedUserDomains);
        })
       .error((errorResponse) => {
        reject(errorResponse);
       });
    });
  };

  var getAllActiveUsers = function() {
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/user_accounts.json`)
      .success((response) => {
       let allActiveUsers = [];
       Object.keys(response).forEach((key) => {
         response[key].id = key;
         allActiveUsers.push(response[key]);
       });
       resolve(allActiveUsers);
        })
       .error((errorResponse) => {
        reject(errorResponse);
       });
    });
  };

  return {getUserNames, getLoggedUserDomains, getAllActiveUsers};
});
