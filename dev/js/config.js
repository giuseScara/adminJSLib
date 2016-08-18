require.config({
  baseUrl: 'js',
  map: {
    '*': {
      'css': 'lib/css.min'
    }
  },
  shim: {
    MainAppModule: {
      deps: ['angular','css!style/style','css!style/buttons','bootstrap']
    },
    bootstrap: {
      deps: ['jquery','css!style/lib/bootstrap.min']
    },
  },
  paths: {
    MainAppModule: 'app',
    style: '../css',
    angular: [
      'lib/angular.min' //load this
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
