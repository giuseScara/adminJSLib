require.config({
  baseUrl: 'js',
  map: {
    '*': {
      'css': 'lib/css.min'
    }
  },
  shim: {
    MainAppModule: {
      deps: ['angular_route','css!style/lib/bootstrap.min','css!style/style','css!style/buttons','css!style/lib/font-awesome.min','bootstrap']
    },
    bootstrap: {
      deps: ['jquery','css!style/lib/bootstrap.min']
    },
    angular_route: {
      deps: ['angular']
    }
  },
  paths: {
    MainAppModule: 'app',
    style: '../css',
    angular: [
      'lib/angular.min' //load this
    ],
    angular_route: [
      'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular-route.min',
      'lib/angular-route.min'
    ],
    bootstrap: [
      'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min',
      'lib/bootstrap.min'
    ],
    jquery: [
      'https://code.jquery.com/jquery-2.2.3.min',
      'lib/jquery.min'
    ],
  }
});

require(['MainAppModule'], function() {
  angular.bootstrap(document, ['MainAppModule']);
});
