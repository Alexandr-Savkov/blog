app.controller('articlesListCtrl', ['$scope', '$http', '$location', '$rootScope', '$filter', function($scope, $http, $location, $rootScope, $filter) {

  if ($rootScope.profileName === undefined) {
    $http.get('/getprofile').then(function(res){
      $rootScope.profileName = res.data[0].name;
      $rootScope.profilePhoto = res.data[0].photo;
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
    };
    $scope.visibleArticles = $scope.articles.slice(0, 5);
});

  //for pagination
  $scope.showPages = function(pageValue) {
    var elem = document.getElementById(String(pageValue));
    var allElem = document.getElementsByClassName('page-item');
    angular.forEach(allElem, function(item, i) {
      allElem[i].classList.remove("active");
    });
    elem.classList.add("active");

    var start = (pageValue-1) * 5;
    var end = (pageValue-1) * 5 + 5;

    $scope.visibleArticles = $scope.articles.slice( start, end );
  };

  $scope.editTag = function () {
    $scope.visibleArticles = $scope.articles;
    $scope.visibleArticles = $filter('searchTag')($scope.visibleArticles, $scope.tag);

    $scope.paginationFlag = ($scope.visibleArticles.length > 5) ? true : false;
    if ($scope.paginationFlag) {
      var countLists = $scope.visibleArticles.length;
      $scope.paginationCount = Math.ceil(countLists / 5);
      $scope.pageList = [];
      for (var i = 1; i <= $scope.paginationCount; ++i) {
        $scope.pageList.push(i);
      };
    };
    $scope.visibleArticles = $scope.visibleArticles.slice(0, 5);
  };

}]);