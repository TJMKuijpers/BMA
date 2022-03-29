app.directive('studyInfo', function() { 
    return { 
      restrict: 'E', 
      scope: { 
        info: '=', 
      }, 
      templateUrl: 'js/directives/studyInfo.html',
    }; 
  }); 