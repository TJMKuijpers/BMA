app.directive('showSurfaces', function() { 
    return { 
      restrict: 'E', 
      scope: { 
        info: '=', 
      },     

      templateUrl: 'js/directives/showSurfaces.html',

    }
  })