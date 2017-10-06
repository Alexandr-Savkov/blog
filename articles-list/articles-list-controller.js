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
    console.log('it s worked');
    console.log(data.data);
  });

}]);