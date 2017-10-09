app.controller('addArticleCtrl', ['$scope', '$http', '$location', '$routeParams', '$rootScope', function($scope, $http, $location, $routeParams, $rootScope) {

  if ($rootScope.profileName === undefined) {
    $http.get('/getprofilename').then(function(res){
      console.log(res);
      $rootScope.profileName = res.data;
    });
  };


  $scope.addArticle = function() {
    var arr_tags, str_tags;
    if ($scope.tags === undefined) {
     str_tags = 'тэгов нет';
    } else {
      arr_tags = $scope.tags.split(/,+ +|,+| +|; +/);
      str_tags = arr_tags.join(' ');
    };
    var data = {
      date: Date.now(),
      caption: $scope.caption,
      tags: str_tags,
      text: $scope.text,
      comments: [],
    };
    $http.post('/addarticle', data).then(function(data){
      $location.path('/list');
      console.log('add article post work');
      console.log(data.data);
    });
  };

  $scope.addTag = function (id) {
    var tag = document.getElementById(id);
    var tagValue = tag.innerHTML;

    if (tag.addedFlag) {
      $scope.tags = $scope.tags.replace(tagValue, '');
      $scope.tags = $scope.tags.replace(/^ | $/, '');
    } else {
      ( $scope.tags === undefined || $scope.tags === '') ? ($scope.tags = tagValue) : ($scope.tags += ' ' + tagValue);
    };

    tag.classList.toggle('tag_selected');
    tag.addedFlag = !tag.addedFlag;
  };
}]);