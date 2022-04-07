myApp.component('repository',{
    template:  '<h3>{{$ctrl.greeting}} Solar System!</h3>',
    controller: function() {
        this.greeting = 'Highlight the';
    }
})