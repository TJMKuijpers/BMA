myApp.component('dataRepository',{
    templateUrl:  '/js/directives/dataRepository.html',
    controller: function($http,$scope,$rootScope) {
        // get the data from the API /get-data
        let dataset=[]
        $scope.studyFilter="!showallstudies"
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

        $scope.submit = function (formData) {
            $scope.formData = formData;
            $scope.custom_query=$http.get('/custom-query',{params:{text:$scope.formData.search}});
            $scope.custom_query.then(function(response){
                console.log(response.data)
                $rootScope.datasets=response.data;
                return $scope.dataset=response.data;
            },function(error){
            console.log('API error: ', error)
            });
        }

        $scope.resetFunction = function(){
            console.log('Reset the data')
            return $scope.dataset=$rootScope.dataset_all
        }

    }
});