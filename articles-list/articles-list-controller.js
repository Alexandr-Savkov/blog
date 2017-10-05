app.controller('articlesListCtrl', ['$scope', '$http', '$location', '$rootScope', function($scope, $http, $location, $rootScope) {

  $http.get('/getprofile').then(function(res){
    $rootScope.profileName = res.data[0].name;
  });

  $scope.changeArt = function (id) {
    console.log("'/"+id+"'");
  };

  $http.get('/list').then(function(data){
    $scope.articles = data.data;
    console.log('it s worked');
    console.log(data.data);
  });

}]);