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
            // get the cell types in the database
            var cell_types=[];
            response.data.forEach(function(){
            for(let item in response.data){
                    for(let x in response.data[item]['Study_design']){
                        // Only take into account the Cell Culture object
                        if(response.data[item]['Study_design'][x].Name=='Cell culture'){
                            cell_types.push(response.data[item]['Study_design'][x]['Cell_type'])
                        }
                        if(response.data[item]['Study_design'][x].Name=='Tissue Engineered Heart Valves' && response.data[item]['Study_design'][x].hasOwnProperty('Cell_seeding')){
                             cell_types.push(response.data[item]['Study_design'][x]['Cell_seeding']['Cell_type'])
                        }
                }
            };
            $scope.cell_types_unique=cell_types.filter((x, i, a) => a.indexOf(x) === i)

            });

            return $scope.dataset=response.data;
        }, function(error){
            console.log('API error: ', error)
        });

        $scope.submit = function (formData) {
            $scope.formData = formData;
            $scope.custom_query=$http.get('/custom-query',{params:{text:$scope.formData.search}});
            $scope.custom_query.then(function(response){
                $rootScope.datasets=response.data;
                return $scope.dataset=response.data;
            },function(error){
            console.log('API error: ', error)
            });
        }

        $scope.resetFunction = function(){
            return $scope.dataset=$rootScope.dataset_all
        }

        $scope.getTypeOf = function(item){
            return typeof item;
        }

    }
});