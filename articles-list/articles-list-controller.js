app.controller('articlesListCtrl', ['$scope', '$http', '$location', '$rootScope', function($scope, $http, $location, $rootScope) {





  if ($rootScope.profileName === undefined) {
    $http.get('/getprofilename').then(function(res){
      console.log(res);
      $rootScope.profileName = res.data;
    });
  };

  $scope.changeArt = function (id) {
    console.log("'/"+id+"'");
  };

  $http.get('/list').then(function(data){
    $scope.articles = data.data;
    $scope.articles.sort(function(a, b){
     return ( (a.date - b.date) > 0 ) ? -1 : 1;
    });

    //for pagination
    $scope.paginationFlag = ($scope.articles.length > 5) ? true : false;
    if ($scope.paginationFlag) {
      var countLists = $scope.articles.length;
      $scope.paginationCount = ( Math.floor(countLists / 5) < (countLists / 5) ) ? ( Math.floor(countLists / 5) +1) : (countLists / 5);
      $scope.pageList = [];
      for (var i = 1; i <= $scope.paginationCount; ++i) {
        $scope.pageList.push(i);
      };
    };

    $scope.visibleArticles = $scope.articles.slice(0, 4);
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
    var end = (pageValue-1) * 5 + 4;
    $scope.visibleArticles = $scope.articles.slice( start, end );
  };

}]);