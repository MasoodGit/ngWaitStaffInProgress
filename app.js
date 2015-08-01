var waitStaffApp = angular.module("waitStaffApp",['ngMessages','ngRoute']);

waitStaffApp.run(function($rootScope,$location){
  $rootScope.$on('$routeChangeError', function(){
    $location.path('/error');
  });
});

waitStaffApp.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'home.tpl.html'
  })
  .when('/newMeal',{
    templateUrl: 'newMeal.tpl.html',
    controller: 'WaitStaffController as mealCtrl'
  })
  .when('/myEarnings',{
    templateUrl: 'myEarnings.tpl.html',
    controller: 'MyEarningsController'
  })
  .when('/error',{
    template: '<p>Error - Missing this Page...</p>'
  })
  .otherwise('/error');
});


/*
 * WaitStaffController :
 */
waitStaffApp.controller("WaitStaffController",function($scope,myEarningsService) {
  var mealCtrl = this;
  mealCtrl.data = myEarningsService;
  myEarningsService.resetMealDetails();

  /*
   * calculates the customer charges
   */
  updateCustomerCharges = function() {
    myEarningsService.updateCustomerCharges();
  };

  /*
   * calculates the earning for the waitstaff
   */
  updateEarnings = function() {
    myEarningsService.updateEarnings();
  };

  /*
   * calculates customercharges and waitstaff earnings
   * if the form is valid
   */
  mealCtrl.mealDetailsFormSubmit = function() {
    if($scope.mealDetailsForm.$valid) {
      myEarningsService.updateCustomerCharges();
      myEarningsService.updateEarnings();
    }
  };

  /*
   * triggers field validation if form is
   * submitted or if the field is blur
   */
  mealCtrl.interacted = function(field) {
    return $scope.mealDetailsForm.$submitted || field.$touched;
  };

  /*
   * called when user clicks cancel on
   * the MealDetailsForm
   */
  mealCtrl.resetMealDetails = function() {
    myEarningsService.resetMealDetails();
  };

  
});

/*
 * MyEarningsController :
 */
waitStaffApp.controller('MyEarningsController',function(myEarningsService) {
  var earingsController = this;
  earingsController.data = myEarningsService;
  /*
  * resets everything on the App
  */
  earingsController.resetWaitStaffCalculator = function() {
    myEarningsService.resetWaitStaffCalculator();
  };

});