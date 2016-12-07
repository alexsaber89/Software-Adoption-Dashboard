"use strict";

app.controller("SubmittedDomainsCtrl", function($location, $scope, $rootScope, AuthFactory, UserFactory, DomainsFactory) {
  console.log("SubmittedDomainsCtrl");

  $scope.loadUserDomains = () => {
    DomainsFactory.getLoggedUserDomains($rootScope.user.uid).then(function(domains) {
      $scope.submittedDomains = domains;
    });
  };

  $scope.deleteDomainThenReloadDomains = (domainId) => {
    DomainsFactory.deleteLoggedUserDomain(domainId).then(function(deleteResponse) {
      $scope.loadUserDomains();
    });
  };

  $scope.loadUserDomains();

});
