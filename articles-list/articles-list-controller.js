app.controller('articlesListCtrl', ['$scope', '$http', '$location', '$rootScope', '$filter', function($scope, $http, $location, $rootScope, $filter) {

  if ($rootScope.profileName === undefined) {
    $http.get('/getprofile').then(function(res){
      if (res.data[0] === undefined) {
        $rootScope.profileName = "Default Name";
        $rootScope.profilePhoto = '';
      } else {
        $rootScope.profileName = res.data[0].name;
        $rootScope.profilePhoto = res.data[0].photo;
      };
    });
  };

  $http.get('/list').then(function(res){
    $scope.articles = res.data;
    $scope.articles.sort(function(a, b){
     return ( (a.date - b.date) > 0 ) ? -1 : 1;
    });

    //for pagination
    $scope.paginationFlag = ($scope.articles.length > 5) ? true : false;
    if ($scope.paginationFlag) {
      var countLists = $scope.articles.length;
      $scope.paginationCount = Math.ceil(countLists / 5);
      $scope.pageList = [];
      for (var i = 1; i <= $scope.paginationCount; ++i) {
        $scope.pageList.push(i);
      };
      $scope.visibleArticles = $scope.articles.slice(0, 5);
    } else {
      $scope.visibleArticles = $scope.articles;
    };
  });

  //for pagination
  $scope.showPages = function(pageValue) {
    var elem = document.getElementById(String(pageValue));
    var allElem = document.getElementsByClassName('page-item');
    angular.forEach(allElem, function(item, i) {
      allElem[i].classList.remove("active");
    });
    elem.classList.add("active");

    $scope.editTag();
    var start = (pageValue-1) * 5;
    $scope.visibleArticles = $scope.ArticleWithTag.slice( start, start + 5 );
  };

  $scope.editTag = function () {
    $scope.ArticleWithTag = $filter('searchTag')($scope.articles, $scope.tag);
    $scope.countArticleWithTag = $scope.ArticleWithTag.length;

    $scope.paginationFlag = ($scope.ArticleWithTag.length > 5) ? true : false;
    if ($scope.paginationFlag) {
      var countLists = $scope.ArticleWithTag.length;
      $scope.paginationCount = Math.ceil(countLists / 5);
      $scope.pageList = [];
      for (var i = 1; i <= $scope.paginationCount; ++i) {
        $scope.pageList.push(i);
      };
    };
    $scope.visibleArticles = $scope.ArticleWithTag.slice(0, 5);
  };

}]);