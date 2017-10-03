app.controller('articlesListCtrl', ['$scope', '$http', function($scope, $http) {


  $http.get('/list').then(function(data){
    $scope.articles = data.data;
    console.log('it s worked');
    console.log(data);
  });

}]);