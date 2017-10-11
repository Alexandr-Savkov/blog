var app = angular.module('blog', ['ngRoute']);

app.config(['$routeProvider', stateConfig]);

function stateConfig ($routeProvider) {
  $routeProvider
    .when('/list', {
      controller: 'articlesListCtrl',
      templateUrl: 'articles-list/articles-list.html'
    })
    .when('/article/:id', {
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

app.filter('searchTag', function(){
  return function(articles, tag){

    if(!tag){
      return articles;
    };
    var result = [];
    tag = tag.toLowerCase();

    angular.forEach(articles, function(article){
      if(article.tags.toLowerCase().indexOf(tag) !== -1){
        result.push(article);
      };
    });
    return result;
  };
});

app.factory('getCountries', function($http) {

  var obj = {countries:null};

  $http.get('countries.json').success(function(data) {
    // you can do some processing here
    obj.ountries = data;
  });
  return obj;
});