"use strict";

app.factory("DomainsFactory", function($q, $http, $rootScope, FIREBASE_CONFIG) {

  var getLoggedUserDomains = function(userId){
    return $q((resolve, reject)=>{
      $http.get(`${FIREBASE_CONFIG.databaseURL}/submitted_domains.json?orderBy="uid"&equalTo="${userId}"`)
       .success( (response)=>{
        let domains = [];
        Object.keys(response).forEach((key)=>{
          response[key].id = key;
          domains.push(response[key]);
        });
        resolve(domains);
       })
       .error( (errorResponse)=>{
        reject(errorResponse);
       });
    });
  };

  var deleteLoggedUserDomain = function(domainId) {
    return $q((resolve, reject)=>{
      $http.delete(`${FIREBASE_CONFIG.databaseURL}/submitted_domains/${domainId}.json`)
      .success((deleteSuccess)=>{
        resolve(deleteSuccess);
      })
      .error((deleteError)=>{
        reject(deleteError);
      });
    });
  };

  return {getLoggedUserDomains, deleteLoggedUserDomain};
});