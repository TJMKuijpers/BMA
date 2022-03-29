app.directive('studyDesign', function() { 
    return { 
      restrict: 'E', 
      scope: { 
        info: '=', 
      },     

      templateUrl: 'js/directives/StudyDesign.html',

    }
  })