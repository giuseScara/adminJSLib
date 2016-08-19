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
    },
    visjs: {
      deps: ['css!style/lib/vis.min']
    }
  },
  paths: {
    MainAppModule: 'app',
    style: '../css/',
    view_style: '../view/',
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
    vis: [
      'https://cdnjs.cloudflare.com/ajax/libs/vis/4.16.1/vis.min',
      'lib/vis.min'
    ]
  }
});

require(['MainAppModule'], function() {
  angular.bootstrap(document, ['MainAppModule']);
});
