app.controller('articleCtrl', ['$scope', '$http', '$location', '$routeParams', '$rootScope', function($scope, $http, $location, $routeParams, $rootScope) {

  var url = "/getarticle/" + $routeParams.id;
  $http.get(url).then(function(data){
    $scope.article = data.data;
    $scope.allComments = $scope.article.comments;
    console.log('article');
    console.log($scope.article);
  });

  if ($rootScope.profileName === undefined) {
    $http.get('/getprofilename').then(function(res){
      console.log(res);
      $rootScope.profileName = res.data;
    });
  };

  $scope.showCommentsFlag = false;
  $scope.contentButton = "Развернуть комментарии";
  $scope.showSetArticleFlag = false;

  $scope.delArticle = function() {
    var url = "/delarticle/" + $routeParams.id;
    var data = {id: $routeParams.id};
    console.log(data.id)
    $http.delete(url).then(function(data){
      $location.path('/list');
      console.log('delete article post work');
      console.log(data);
    });
  };

  $scope.setArticle = function() {
    $scope.showSetArticleFlag = true;
  };

  $scope.saveSetArticle = function() {
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
      caption: $scope.article.caption,
      tags: tags,
      text: $scope.article.text,
      comments: [],
    };
    var url = "/setarticle/" + $routeParams.id;
    $http.post(url, data).then(function(data){
      $location.path('/list');
      console.log('setting article post work');
      console.log(data.data);
    });
  };


  $scope.showComments = function() {
    $scope.showCommentsFlag = !$scope.showCommentsFlag;
    $scope.contentButton = ($scope.showCommentsFlag) ? "Свернуть комментарии" : "Развернуть комментарии" ;
  };

  $scope.addComment = function() {
    var data = {
      id: $routeParams.id,
      comment: {
        text: $scope.textComment,
        date: Date.now(),
        author: $scope.profileName,
    }};
    console.log($scope.allComments);
    $scope.allComments.push(data.comment);
    $http.post('/addcomment', data).then(function(data){
      console.log('add comment work');
    });
    $scope.textComment = '';
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