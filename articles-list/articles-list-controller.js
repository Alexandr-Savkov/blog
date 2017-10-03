app.controller('articlesListCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {

  $scope.changeArt = function (id) {
    console.log("'/"+id+"'");
  };

  $http.get('/list').then(function(data){
    $scope.articles = data.data;
    console.log('it s worked');
    console.log(data.data);
  });

}]);