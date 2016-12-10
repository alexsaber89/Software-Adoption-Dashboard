"use strict";

app.controller("SubmittedDomainsCtrl", function($location, $scope, $rootScope, AuthFactory, UserFactory, DomainsFactory) {

  $scope.displayDomainSubmitButton = false;
  $scope.displayDomainEditButton = false;
  $scope.submittedDomains = [];

  $scope.getMyCtrlScope = function() {
    return $scope;
  };

  $scope.loadUserDomains = () => {
    DomainsFactory.getLoggedUserDomains($rootScope.user.uid).then(function(domains) {
      $scope.submittedDomains = domains;
    });
  };

  $scope.searchDomains = (domainName) => {
    $scope.displayDomainSubmitButton = false;
    if ($scope.submittedDomains.length < 1) {
      $scope.displayDomainSubmitButton = true;
    }
    for (var i = 0; i < $scope.submittedDomains.length; i++) {
      if(domainName === $scope.submittedDomains[i].domainName) {
        $scope.displayDomainSubmitButton = false;
        break;
      } else {
        $scope.displayDomainSubmitButton = true;
      }
    }
  };

  $scope.addNewDomain = (newDomain) => {
    DomainsFactory.addLoggedUserDomain($rootScope.user.uid, newDomain).then(function(addResponse) {
      $scope.loadUserDomains();
      $scope.domainName = "";
      $("#domainInput").focus();
      $scope.displayDomainSubmitButton = false;
    });
  };

  $scope.editDomainThenReloadDomains = (editedDomain) => {
    console.log("editDomainThenReloadDomains: ", editedDomain);
  };

  $scope.deleteDomainThenReloadDomains = (domainId) => {
    DomainsFactory.deleteLoggedUserDomain(domainId).then(function(deleteResponse) {
      $scope.loadUserDomains();
    });
  };

  $scope.editDomain = (editedDomainId) => {
    console.log("editedDomainId: ", editedDomainId);
    $scope.displayDomainSubmitButton = false;
    $scope.displayDomainEditButton = true;
    $("#domainInput").focus();
  };

  $scope.loadUserDomains();

});
