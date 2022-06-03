var myApp = angular.module('biomaterialatlas', ['ui.router','ui.bootstrap']);

myApp.config(function($stateProvider) {
  var homeState = {
    name: 'home',
    url: '',
    templateUrl: '/js/directives/homeWelcome.html'
  }

  var repoState ={
      name:'repo',
      url:'/bma',
      component:'dataRepository'

  }

  var aboutState = {
    name: 'about',
    url: '/about',
    templateUrl: '/js/templates/about.html'
  }

  var aboutStudy = {
    name: 'aboutstudy',
    url:'/studyDescription/:ID',
    component:'studyView'
   }
  
  $stateProvider.state(homeState);
  $stateProvider.state(repoState);
  $stateProvider.state(aboutState);
  $stateProvider.state(aboutStudy);
});

