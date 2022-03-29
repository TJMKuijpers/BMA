app.directive('heartvalveDesign', function() { 
    return { 
      restrict: 'E', 
      scope: { 
        info: '=', 
      }, 
      templateUrl: 'js/directives/heartvalveDesign.html',

    }
  })