"use strict";

app.controller("SubmittedDomainsCtrl", function($location, $scope, $rootScope, AuthFactory, UserFactory, DomainsFactory) {

  $scope.displayDomainInput = true;
  $scope.displayDomainEditInput = false;
  $scope.displayDomainSubmitButton = false;
  $scope.displayDomainEditButton = false;
  $scope.displayDomainCancelEditButton = false;
  $scope.submittedDomains = [];
  $scope.domainIdToEdit = "";

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

  $scope.searchDomainsThenEditDomain = (domainName) => {
    for (var i = 0; i < $scope.submittedDomains.length; i++) {
      if(domainName === $scope.submittedDomains[i].domainName) {
        $scope.displayDomainEditButton = false;
        break;
      } else {
        $scope.displayDomainEditButton = true;
      }
    }
  };

  $scope.editDomainThenReloadDomains = (editedDomainName) => {
    DomainsFactory.editLoggedUserDomain($scope.domainIdToEdit, $rootScope.user.uid, editedDomainName).then(function(editedResponse) {
      $scope.loadUserDomains();
      $scope.domainName = "";
      $("#domainInput").focus();
      $scope.displayDomainSubmitButton = false;
      $scope.cancelDomainEdit();
    });
  };

  $scope.deleteDomainThenReloadDomains = (domainId) => {
    DomainsFactory.deleteLoggedUserDomain(domainId).then(function(deleteResponse) {
      $scope.loadUserDomains();
    });
  };

  $scope.showEditInputAndButtons = (editedDomainId) => {
    $scope.domainName = "";
    $scope.domainIdToEdit = "";
    console.log("editedDomainId: ", editedDomainId);
    $scope.displayDomainInput = false;
    $scope.displayDomainSubmitButton = false;
    $scope.displayDomainEditButton = true;
    $scope.displayDomainCancelEditButton = true;
    $scope.displayDomainEditInput = true;
    $("#domainEditInput").focus();
    $scope.domainIdToEdit = editedDomainId;
  };

  $scope.cancelDomainEdit = () => {
    console.log("cancelDomainEdit");
    $scope.displayDomainEditInput = false;
    $scope.displayDomainEditButton = false;
    $scope.displayDomainCancelEditButton = false;
    $scope.displayDomainInput = true;
    $scope.displayDomainSubmitButton = true;
    $scope.domainName = "";
    $("#domainInput").focus();
  };

  $scope.loadUserDomains();

});
