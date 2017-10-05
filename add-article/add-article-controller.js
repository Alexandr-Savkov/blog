app.controller('addArticleCtrl', ['$scope', '$http', '$location', '$routeParams', '$rootScope', function($scope, $http, $location, $routeParams, $rootScope) {

  $http.get('/getprofile').then(function(res){
    console.log(res.data[0].name);
    $scope.profileName = res.data[0].name;
    console.log($scope.profileCountry );
  });

  $scope.addArticle = function() {
    var tags;
    if ($scope.tags === undefined) {
     tags = 'у данной статьи тэгов нет';
    } else {
      tags = $scope.tags.split(' ');
    };
    // добавить регэкс на различные случаи
    var data = {
      author: $rootScope.profileName,
      date: Date.now(),
      caption: $scope.caption,
      tags: tags,
      text: $scope.text,
      comments: [],
    };
    $http.post('/addarticle', data).then(function(data){
      $location.path('/list');
      console.log('add article post work');
      console.log(data.data);
    });
  };

}]);