myApp.component('dataRepository',{
    templateUrl:  '/js/directives/dataRepository.html',
    controller: ['getData',function(getData) {
        loadedData=getData.getjson('/data/BioMaterialAtlas.json');
        loadedData.then(function(data){
            console.log(data.data)
            this.data=data.data;
            console.log(this.data.ALP)
        })
        
    }]
}).factory('getData',function($http){
    //return $resource('data/BioMaterialAtlas_StudyInformation.json')
    return{
        getjson : function(linktodata){
           return $http.get(linktodata) // path of the json file
        }}

});
