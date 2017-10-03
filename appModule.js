var app = angular.module('blog', ['ngRoute']);

app.config(['$routeProvider', stateConfig]);

function stateConfig ($routeProvider) {
  $routeProvider
    .when('/list', {
      controller: 'articlesListCtrl',
      templateUrl: 'articles-list/articles-list.html'
    })
    .when('/one', {
      controller: 'articleCtrl',
      templateUrl: 'article/article.html'
    })
    .when('/profile', {
      controller: 'setProfileCtrl',
      templateUrl: 'set-profile/set-profile.html'
    })
    .when('/add', {
      controller: 'addArticleCtrl',
      templateUrl: 'add-article/add-article.html'
    })
    .otherwise({
      redirectTo: '/list'
    });
};