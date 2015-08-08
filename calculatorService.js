(function() {
    // body...
    waitStaffApp
        .factory('calculatorService', calculatorService);

    function calculatorService() {

        var calcFactory = {};

        calcFactory.earnings = {};
        calcFactory.earnings.tipTotal = 0.0;
        calcFactory.earnings.mealCount = 0.0;

        calcFactory.addMealDetails = function(mealDetailsObj) {
            var basePrice = mealDetailsObj.basePrice;
            var taxRate = mealDetailsObj.taxRate;
            var tipPercentage = mealDetailsObj.tipPercentage;
            var customerCharges = {};
            customerCharges.subtotal =
                basePrice + (basePrice * (taxRate / 100));
            customerCharges.tipAmount =
                basePrice * (tipPercentage / 100);

            updateEarnings(customerCharges.tipAmount);

            return customerCharges;
        };

        calcFactory.resetCalculator = function resetCalculator() {
            calcFactory.earnings.tipTotal = 0.0;
            calcFactory.earnings.mealCount = 0.0;
        };

        /*
         * calculates the earning for the waitstaff
         */
        function updateEarnings(tipAmount) {
            calcFactory.earnings.tipTotal += tipAmount;
            calcFactory.earnings.mealCount++;
        };

        return calcFactory;

    }

})();
