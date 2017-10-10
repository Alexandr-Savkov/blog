app.controller('articleCtrl', ['$scope', '$http', '$location', '$routeParams', '$rootScope', function($scope, $http, $location, $routeParams, $rootScope) {

  if ($rootScope.profileName === undefined) {
    $http.get('/getprofile').then(function(res){
      console.log(res);
      console.log(res.data[0].name);
      $rootScope.profileName = res.data[0].name;
      $rootScope.profilePhoto = res.data[0].photo;
    });
  };

  var oldArticleDate,
      oldArticleCaption,
      oldArticleText,
      oldArticleTags;

  $scope.showCommentsFlag = false;
  $scope.contentButton = "Развернуть комментарии";
  $scope.showSetArticleFlag = false;

  var url = "/getarticle/" + $routeParams.id;
  $http.get(url).then(function(res){
    $scope.article = res.data;
    $scope.allComments = $scope.article.comments;

    oldArticleDate = $scope.article.date;
    oldArticleCaption = $scope.article.caption;
    oldArticleText = $scope.article.text;
    oldArticleTags = $scope.article.tags;
  });

  $scope.delArticle = function() {
    var url = "/delarticle/" + $routeParams.id;

    $http.delete(url).then(function(data){
      $location.path('/list');
    });
  };

  $scope.editingArticle = function() {
    if (!$scope.showSetArticleFlag) {
      $scope.showSetArticleFlag = true;
    } else {$scope.showSetArticleFlag = true;}
  };

  $scope.cancelEditingArticle = function () {
    $scope.showSetArticleFlag = false;

    $scope.article.date = oldArticleDate;
    $scope.article.caption = oldArticleCaption;
    $scope.article.text = oldArticleText;
    $scope.article.tags = oldArticleTags;
  };

  $scope.saveEditingArticle = function() {
    var arr_tags, str_tags;
    if ($scope.article.tags === undefined) {
      str_tags = 'тэгов нет';
    } else {
      arr_tags = $scope.article.tags.split(/,+ +|,+| +|; +/);
      str_tags = arr_tags.join(' ');
    };
    var data = {
      author: $rootScope.profileName,
      date: Date.now(),
      caption: $scope.article.caption,
      tags: str_tags,
      text: $scope.article.text,
      comments: [],
    };
    var url = "/setarticle/" + $routeParams.id;
    $http.post(url, data).then(function(data){
      $location.path('/list');
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
    $scope.allComments.push(data.comment);
    $http.post('/addcomment', data).then(function(data){});
    $scope.textComment = '';
  };

  $scope.delComment = function (date){
    var url = "/delcomment/" + $routeParams.id;
    var newComments = $scope.allComments;
    _.remove(newComments, function(n) {
      return (n.date == date);
    });
    $http.post(url, newComments).then(function(data){});
  };

}]);