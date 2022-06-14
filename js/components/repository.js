myApp.component('dataRepository',{
    templateUrl:  '/js/directives/dataRepository.html',
    controller: function($http,$scope,$rootScope) {
        // get the data from the API /get-data
        let dataset=[]
        $scope.dataset = $http.get('/get-data');
        $scope.dataset.then(function(response){
            // get the number of studies in the database
            $scope.datasetcount=Object.keys(response.data).length;
            $rootScope.datasets=response.data;
            $rootScope.dataset_all=response.data;
            return $scope.dataset=response.data;
        }, function(error){
            console.log('API error: ', error)
        });
        $scope.search = function(){
            var custom_query = $scope.querytext 
            $scope.custom_query=$http.get('/custom-query',{params:{"search":custom_query}});
            $scope.custom_query.then(function(reponse){
                console.log(response.data)
            },function(error){
            console.log('API error: ', error)
            });
            }
  
        $scope.restoreData = function(){
            console.log("data will be restored")
            $scope.dataset=$rootScope.dataset_all;
        
        }
    }
});