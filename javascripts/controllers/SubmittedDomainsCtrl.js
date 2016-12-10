"use strict";

app.controller("SubmittedDomainsCtrl", function($location, $scope, $rootScope, AuthFactory, UserFactory, DomainsFactory) {

  $scope.getMyCtrlScope = function() {
    return $scope;
  };

  $scope.loadUserDomains = () => {
    DomainsFactory.getLoggedUserDomains($rootScope.user.uid).then(function(domains) {
      $scope.submittedDomains = domains;
    });
  };

  $scope.searchDomains = (domainName) => {
    DomainsFactory.getLoggedUserDomains($rootScope.user.uid).then(function(domains) {
      domains.forEach(function(domain) {
        if(domainName === domain.domainName) {
          console.log("match!");
        }
      });
    });
  };

  $scope.deleteDomainThenReloadDomains = (domainId) => {
    DomainsFactory.deleteLoggedUserDomain(domainId).then(function(deleteResponse) {
      $scope.loadUserDomains();
    });
  };

  $scope.editDomainThenReloadDomains = () => {
    console.log("editDomainThenReloadDomains");
  };

  $scope.loadUserDomains();

});
