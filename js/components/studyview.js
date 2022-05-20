myApp.component('studyView',{
    templateUrl:  '/js/templates/topochip.html',
    controller: studyViewController,
    bindings:{
        /* pass the dataset from parent to this child element */
      dataset:'<'
    }
    
});

function studyViewController(){
    this.testnaam='Tim',
    this.testdata='08 Feb 1988'
    console.log(this.dataset)
}