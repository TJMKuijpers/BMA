angular.module('barPlot', function() { 
    return { 
      restrict: 'E', 
      scope: { 
        info: '=', 
      }, 
      templateUrl: 'js/directives/barPlot.html',
    }; 
  }); 