myApp.component('dataRepository',{
    templateUrl:  '/js/directives/dataRepository.html',
    controller: function($http,$scope) {
        // get the data from the API /get-data
        let dataset=[]
        $scope.dataset = $http.get('/get-data');
        $scope.dataset.then(function(response){
            return $scope.dataset=response.data;
        }, function(error){
            console.log('API error: ', error)
        });
    }
});