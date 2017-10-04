app.controller('articleCtrl', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams) {
  console.log($routeParams.id);
  var url = "/article/" + $routeParams.id;
  $http.get(url).then(function(data){
    $scope.article = data.data;
    $scope.allComments = $scope.article.comments;
    console.log($scope.article);
  });

  $scope.delArticle = function() {
    var data = {id: $routeParams.id};
    console.log(data.id)
    $http.delete(url).then(function(data){
      $location.path('/list');
      console.log('delete article post work');
      console.log(data);
    });

  };

  $scope.showCommentsFlag = false;
  $scope.contentButton = "Развернуть комментарии";
  $scope.showComments = function() {
    $scope.showCommentsFlag = !$scope.showCommentsFlag;
    $scope.contentButton = ($scope.showCommentsFlag) ? "Свернуть комментарии" : "Развернуть комментарии" ;
  };

  $scope.addComment = function () {
    var data = {
      id: $routeParams.id,
      comment: {
        text: $scope.text,
        date: Date.now(),
        author: 'no name comen'
      }
    };
    $scope.allComments.push(data.comment);
    $http.post('/addcomment', data).then(function(data){
      console.log('add comment work');
    });
    $scope.text = '';
  };

  $scope.delComment = function (date){
    var url = "/delcomment/" + $routeParams.id;
    var newComments = $scope.allComments;
    _.remove(newComments, function(n) {
      return (n.date == date);
    });

    $http.post(url, newComments).then(function(data){
      console.log('delete comment work');
      console.log(data);
    });

  };

}]);