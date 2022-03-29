app.directive('datasetInfo', function() { 
    return { 
      restrict: 'E', 
      scope: { 
        info: '=', 
      },     

      templateUrl: 'js/directives/datasetInfo.html',

    }
  })