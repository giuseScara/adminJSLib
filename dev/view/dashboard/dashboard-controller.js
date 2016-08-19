"use strict";

define([], function () {

  angular.module("MainAppModule").register.controller('DashboardController', DashboardController);
  DashboardController.$inject = ['$scope'];

  function DashboardController($scope) {
    var vm = this;
  }//DashboardController
});
