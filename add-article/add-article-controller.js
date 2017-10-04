app.controller('addArticleCtrl', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams) {

  $scope.addArticle = function() {
    var tags = $scope.tags.split(' ');  // добавить регэкс на различные случаи
    var data = {
      author: "no-name",
      date: Date.now(),
      caption: $scope.caption,
      tags: tags,
      text: $scope.text,
      comments: [{
        text: 'sdvsdvsvd',
      }],
    };

    $http.post('/addarticle', data).then(function(data){
      $location.path('/list');
      console.log('add article post work');
      console.log(data.data);
    });
  };



  // $http.get(url).then(function(data){
  //   $scope.article = data.data;
  //   console.log($scope.article);
  // });
}]);