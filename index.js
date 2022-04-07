var myApp = angular.module('helloworld', ['ui.router']);

myApp.config(function($stateProvider) {
  var homeState = {
    name: 'home',
    url: '',
    templateUrl: '/public/js/directives/homeWelcome.html'
  }

  var repoState ={
      name:'repo',
      url:'/bma',
      component:'repository'

  }

  var aboutState = {
    name: 'about',
    url: '/about',
    templateUrl: '/public/js/templates/about.html'
  }

  $stateProvider.state(homeState);
  $stateProvider.state(repoState);
  $stateProvider.state(aboutState);
});

