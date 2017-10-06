app.controller('addArticleCtrl', ['$scope', '$http', '$location', '$routeParams', '$rootScope', function($scope, $http, $location, $routeParams, $rootScope) {

  if ($rootScope.profileName === undefined) {
    $http.get('/getprofilename').then(function(res){
      console.log(res);
      $rootScope.profileName = res.data;
    });
  };


  $scope.addArticle = function() {
    var tags;
    if ($scope.tags === undefined) {
     tags = 'у данной статьи тэгов нет';
    } else {
      tags = $scope.tags.split(' ');
    };
    // добавить регэкс на различные случаи
    var data = {
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