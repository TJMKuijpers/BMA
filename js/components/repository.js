myApp.component('dataRepository',{
    templateUrl:  '/js/directives/dataRepository.html',
    controller: function($http,$scope) {
        // get the data from the API /get-data
        var dataSet = $http.get('/get-data').then(function(response){
            var dataset=response.data;
            console.log(dataset[0].Name)
            return dataset;
        });
        this.studycount=4;
        this.celltypecount=15;
        this.publications=4;
    }
})