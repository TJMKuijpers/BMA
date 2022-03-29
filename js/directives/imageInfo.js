app.directive('imageInfo', function() { 
    return { 
      restrict: 'E', 
      scope: { 
        info: '=', 
      }, 
      templateUrl: 'js/directives/imageInfo.html',

    }
  })