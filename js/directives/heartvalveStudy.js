app.directive('heartvalveStudy', function() { 
    return { 
      restrict: 'E', 
      scope: { 
        info: '=', 
      }, 
      templateUrl: 'js/directives/heartvalveStudy.html',
      link:function(){'deze is gecalled'}

    }
  })