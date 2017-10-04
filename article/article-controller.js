app.controller('articleCtrl', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams) {
  console.log($routeParams.id);
  console.log(typeof ($routeParams.id));
  var url = "/article/" + $routeParams.id;

  $http.get(url).then(function(data){
    $scope.article = data.data;
    console.log($scope.article);
  });

  $scope.delArticle = function() {
    var data = {id: $routeParams.id};
    console.log(data.id)
    $http.post('/delarticle', data).then(function(data){
      $location.path('/list');
      console.log('delete article post work');
      console.log(data);
    });

  };

}]);