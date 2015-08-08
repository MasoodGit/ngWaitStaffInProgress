var waitStaffApp = angular.module("waitStaffApp", ['ngMessages', 'ngRoute']);

waitStaffApp.run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function() {
        $location.path('/error');
    });
});

waitStaffApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'home.tpl.html'
        })
        .when('/newMeal', {
            templateUrl: 'newMeal.tpl.html',
            controller: 'WaitStaffController',
            controllerAs: 'mealCtrl'
        })
        .when('/myEarnings', {
            templateUrl: 'myEarnings.tpl.html',
            controller: 'MyEarningsController',
            controllerAs: 'earningsCtrl'
        })
        .when('/error', {
            template: '<p>Error - Missing this Page...</p>'
        })
        .otherwise('/error');
});


/*
 * WaitStaffController :
 */
waitStaffApp.controller("WaitStaffController", function($scope, calculatorService) {

    var self = this;

    self.calculatorService = calculatorService;

    self.mealDetails = {
        basePrice: 0.0,
        taxRate: 0.0,
        tipPercentage: 0.0
    }

    self.customerCharges = {
        subtotal: 0.0,
        tipAmount: 0.0
    }

    /*
     * calculates customercharges and waitstaff earnings
     * if the form is valid
     */
    self.mealDetailsFormSubmit = function() {
        if ($scope.mealDetailsForm.$valid) {
            self.customerCharges = calculatorService.addMealDetails(self.mealDetails);
        }
    };

    self.resetMealDetails = function() {
        self.mealDetails.basePrice = 0.0;
        self.mealDetails.taxRate = 0.0;
        self.mealDetails.tipPercentage = 0.0;
        self.customerCharges.subtotal = 0.0;
        self.customerCharges.tipAmount = 0.0;
    }

    /*
     * triggers field validation if form is
     * submitted or if the field is blur
     */
    self.interacted = function(field) {
        return $scope.mealDetailsForm.$submitted || field.$touched;
    };



});

/*
 * MyEarningsController :
 */
waitStaffApp.controller('MyEarningsController', function(calculatorService) {
    var self = this;
    self.calculatorService = calculatorService;
    /*
     * resets everything on the App
     */
    self.resetWaitStaffCalculator = function() {
        //myEarningsService.resetWaitStaffCalculator();
    };

});
