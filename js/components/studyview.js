myApp.component('studyView',{
    templateUrl:  '/js/templates/topochip.html',
    controller: studyViewController,
    
});

function studyViewController($scope,$rootScope,$state,$stateParams){
    this.testnaam='Tim';
    this.testdata='08 Feb 1988'
    this.testid=$stateParams.ID;
   
    // Now we want to have the loaded data (MongoDB DB) in our scope

}