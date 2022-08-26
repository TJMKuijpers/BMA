myApp.component('dataRepository',{
    templateUrl:  '/js/directives/dataRepository.html',
    controller: function($http,$scope,$rootScope) {
        // get the data from the API /get-data
        let dataset=[];
        $scope.filtercelltype=[];
        $scope.filterproject=[];
        $scope.filterplatform=[];
        $scope.studyFilter="!showallstudies"
        $scope.dataset = $http.get('/get-data');
        $scope.dataset.then(function(response){
            // get the number of studies in the database
            $scope.datasetcount=Object.keys(response.data).length;
            $rootScope.datasets=response.data;
            $rootScope.dataset_all=response.data;
            // get the cell types in the database
            var cell_types=[];
            var projects_available=[];
            var platforms=[];
            response.data.forEach(function(){
            for(let item in response.data){
                    projects_available.push(response.data[item]['Project'])
                    for(let x in response.data[item]['Study_design']){
                        // Get the platforms (experiment)
                        platforms.push(response.data[item]['Study_design'][x]['Name'])
                        // Only take into account the Cell Culture object
                        if(response.data[item]['Study_design'][x].Name=='Cell culture'){
                            cell_types.push(response.data[item]['Study_design'][x]['Cell_type'])
                            response.data[item]['CellType']=response.data[item]['Study_design'][x]['Cell_type'];
                        }
                        if(response.data[item]['Study_design'][x].Name=='Tissue Engineered Heart Valves' && response.data[item]['Study_design'][x].hasOwnProperty('Cell_seeding')){
                             cell_types.push(response.data[item]['Study_design'][x]['Cell_seeding']['Cell_type'])
                             response.data[item]['CellType']=response.data[item]['Study_design'][x]['Cell_seeding']['Cell_type'];
                        }
                }
            };
            $scope.cell_types_unique=cell_types.filter((x, i, a) => a.indexOf(x) === i)
            $scope.projects_available=projects_available.filter((x,i,a)=> a.indexOf(x)==i)
            $scope.platforms=platforms.filter((x,i,a)=> a.indexOf(x)==i)
            });
            console.log(response.data)
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
   

        $scope.addFilterCellType=function(itemvalue){
            // Push this in the array that contains the cell types
            if ($scope.filtercelltype.includes(itemvalue)==false){
            $scope.filtercelltype.push(itemvalue);}
            console.log($scope.filtercelltype)

        }
        $scope.removeFilterCellType=function(itemvalue){
            // Push this in the array that contains the cell types
            $scope.filtercelltype=$scope.filtercelltype.filter(item => item !== itemvalue);
        }

        $scope.addFilterPlatform=function(itemvalue){
            if ($scope.filterplatform.includes(itemvalue)==false){
            $scope.filterplatform.push(itemvalue);}
        }

        $scope.addFilterProject=function(itemvalue){
            if ($scope.filterproject.includes(itemvalue)==false){
            $scope.filterproject.push(itemvalue);}
        
        }
        $scope.removeFilterPlatform=function(itemvalue){
            // Push this in the array that contains the cell types
            $scope.filterplatform=$scope.filterplatform.filter(item => item !== itemvalue);
        }
        $scope.removeFilterProject=function(itemvalue){
            // Push this in the array that contains the cell types
            $scope.filterproject=$scope.filterproject.filter(item => item !== itemvalue);
        }

        $scope.filterCellType=function(x){
            if($scope.filtercelltype.length!=0){
                return $scope.filtercelltype.includes(x.CellType)}
            else{
                return true
            }
        }
        $scope.filterPlatform=function(x){
            objectkeys=Object.keys(x.Study_design)
            bool_array=[]
            if($scope.filterplatform.length!=0){
                for(let y=0; y<objectkeys.length;y++){
                    if($scope.filterplatform.length==1){
                    var temp_bool=$scope.filterplatform.includes(x.Study_design[objectkeys[y]].Name)
                    if(temp_bool){
                        return true
                        }
                    }
                    if($scope.filterplatform.length>1){
                        // Now we have to check if all the selected filters are in the dataset
                        var temp_bool=$scope.filterplatform.includes(x.Study_design[objectkeys[y]].Name)
                        bool_array.push(temp_bool)
                        if(bool_array.every(element => element === true)){
                             return true
                           }
                    }}
            }else{
                return true
            }
        }
        $scope.filterProject=function(x){
            if($scope.filterproject.length!=0){
                return $scope.filterproject.includes(x.Project)
            }else{
                return true
            }
        }

        $scope.clearAllOutput=function(){
            $scope.filtercelltype=[];
            $scope.filterproject=[];
            $scope.filterplatform=[];
            $scope.filterProject();
            $scope.filterPlatform();
            $scope.filterCellType();
        }

          var dropdown = document.getElementsByClassName("dropdown-btn");
          var i;

          for (i = 0; i < dropdown.length; i++) {
            dropdown[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var dropdownContent = this.nextElementSibling;
            if (dropdownContent.style.display === "block") {
                dropdownContent.style.display = "none";
            } else {
                dropdownContent.style.display = "block";
            }
            });
            }

    }
});