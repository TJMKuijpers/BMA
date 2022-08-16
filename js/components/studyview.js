myApp.component('studyView',{
    templateUrl:  '/js/templates/studyview.html',
    controller: studyViewController,
    bindings:{
        dataset:'<'
    }
});

function studyViewController($scope,$rootScope,$state,$stateParams){
    this.testid=$stateParams.ID; 
    // Now we want to have the loaded data (MongoDB DB) in our scope
    study_data=$rootScope.datasets.find(x =>x.ID===this.testid)
    this.studyData=study_data; 
    this.StudyType=this.studyData.Study_type
    console.log(this.StudyType)
}
