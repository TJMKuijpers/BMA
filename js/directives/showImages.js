app.directive('showImages',function($timeout){
    return{
        restrict:'E',
        scope:{
            info:'=',
        },
        templateUrl:'js/directives/showRawImages.html',
        //link: function(scope, element) {
         //   console.log(element)
         //   $timeout(function() {
         //     $('.carousel-indicators li',element).first().addClass('active');
          //    $('.carousel-inner .item',element).first().addClass('active');
           // });
       // }
    }
})