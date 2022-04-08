app.factory('getData',function($http){
    //return $resource('data/BioMaterialAtlas_StudyInformation.json')
    return{
        getjson : function(linktodata){
           return $http.get(linktodata) // path of the json file
        }}

});

