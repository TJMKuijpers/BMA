myApp.component('dataRepository',{
    templateUrl:  '/js/directives/dataRepository.html',
    controller: ['getData',function(getData,$scope) {
        loadedData=getData.getjson('/data/BioMaterialAtlas.json');
        loadedData.then(function(data){
            var data_study=data.data;
            $scope.data=data_study
            console.log($scope.data)
        })
        this.studycount=4;
        this.celltypecount=10;
        this.publications=4;

        }]
}).factory('getData',function($http){
    //return $resource('data/BioMaterialAtlas_StudyInformation.json')
    return{
        getjson : function(linktodata){
           return $http.get(linktodata) // path of the json file
        }}

});
