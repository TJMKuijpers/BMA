var myApp = angular.module('helloworld', ['ui.router']);

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

  $stateProvider.state(homeState);
  $stateProvider.state(repoState);
  $stateProvider.state(aboutState);
});

