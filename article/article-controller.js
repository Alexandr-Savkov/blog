app.controller('articleCtrl', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams) {
  console.log($routeParams.id);
  console.log(typeof ($routeParams.id));
  var url = "/article/" + $routeParams.id;

  $http.get(url).then(function(data){
    $scope.article = data.data;
    console.log($scope.article);
  });
}]);