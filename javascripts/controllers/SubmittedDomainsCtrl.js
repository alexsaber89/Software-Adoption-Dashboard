"use strict";

app.controller("SubmittedDomainsCtrl", function($location, $scope, $rootScope, AuthFactory, UserFactory, DomainsFactory) {
  console.log("SubmittedDomainsCtrl");

  $scope.getMyCtrlScope = function() {
    return $scope;
  };

  $scope.loadUserDomains = () => {
    DomainsFactory.getLoggedUserDomains($rootScope.user.uid).then(function(domains) {
      $scope.submittedDomains = domains;
    });
  };

  $scope.deleteDomainThenReloadDomains = (domainId) => {
    console.log("editDomainThenReloadDomains");
    DomainsFactory.deleteLoggedUserDomain(domainId).then(function(deleteResponse) {
      $scope.loadUserDomains();
    });
  };

  $scope.editDomainThenReloadDomains = () => {
    console.log("editDomainThenReloadDomains");
  };

  $scope.loadUserDomains();

});
