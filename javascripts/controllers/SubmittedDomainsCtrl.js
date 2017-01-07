"use strict";

app.controller("SubmittedDomainsCtrl", function($scope, $rootScope, DomainsFactory) {

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
      $(".copy-footer").remove();
      $(".submitted-domains").append(`<footer class="copy-footer">&copy Alex Saber 2016</footer>`);
    });
  };

  $scope.searchDomains = (domainName) => {
    $scope.displayDomainSubmitButton = false;
    if ($scope.submittedDomains.length < 1) {
      $scope.displayDomainSubmitButton = true;
    }
    for (var i = 0; i < $scope.submittedDomains.length; i++) {
      if (domainName === $scope.submittedDomains[i].domainName) {
        $scope.displayDomainSubmitButton = false;
        break;
      } else {
        $scope.displayDomainSubmitButton = true;
      }
    }
  };

  $scope.addNewDomain = (newDomain) => {
    if (newDomain) {
      DomainsFactory.addLoggedUserDomain($rootScope.user.uid, newDomain).then(function(addResponse) {
        $scope.loadUserDomains();
        $scope.domainName = "";
        $("#domainInput").focus();
        $scope.displayDomainSubmitButton = false;
        Materialize.toast('Submitted!', 1500, 'btn-blue');
      });
    } else {
      Materialize.toast('Invalid Domain!', 1500, 'btn-red');
    }
  };

  $scope.searchDomainsThenEditDomain = (domainName) => {
    for (var i = 0; i < $scope.submittedDomains.length; i++) {
      if (domainName === $scope.submittedDomains[i].domainName) {
        $scope.displayDomainEditButton = false;
        break;
      } else {
        $scope.displayDomainEditButton = true;
      }
    }
  };

  $scope.editDomainThenReloadDomains = (editedDomainName) => {
    if (editedDomainName) {
      DomainsFactory.editLoggedUserDomain($scope.domainIdToEdit, $rootScope.user.uid, editedDomainName).then(function(editedResponse) {
        $scope.loadUserDomains();
        $scope.domainName = "";
        $("#domainInput").focus();
        $scope.displayDomainSubmitButton = false;
        $scope.cancelDomainEdit();
        Materialize.toast('Saved!', 1500, 'btn-blue');
      });
    } else {
      Materialize.toast('Invalid Domain!', 1500, 'btn-red');
    }
  };

  $scope.deleteDomainThenReloadDomains = (domainId) => {
    DomainsFactory.deleteLoggedUserDomain(domainId).then(function(deleteResponse) {
      Materialize.toast('Deleted!', 1500, 'btn-red');
      $scope.loadUserDomains();
    });
  };

  $scope.showEditInputAndButtons = (editedDomainId) => {
    $scope.domainName = "";
    $scope.domainIdToEdit = "";
    $scope.displayDomainInput = false;
    $scope.displayDomainSubmitButton = false;
    $scope.displayDomainEditButton = true;
    $scope.displayDomainCancelEditButton = true;
    $scope.displayDomainEditInput = true;
    $("#domainEditInput").focus();
    $scope.domainIdToEdit = editedDomainId;
  };

  $scope.cancelDomainEdit = () => {
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
