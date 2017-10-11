app.controller('addArticleCtrl', ['$scope', '$http', '$location', '$routeParams', '$rootScope', function($scope, $http, $location, $routeParams, $rootScope) {

  if ($rootScope.profileName === undefined) {
    $http.get('/getprofile').then(function(res){
      if (res.data[0] === undefined) {
        $rootScope.profileName = "Default Name";
      } else {
        $rootScope.profileName = res.data[0].name;
        $rootScope.profilePhoto = res.data[0].photo;
      };
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

    tag.classList.toggle('btn-warning');
    tag.addedFlag = !tag.addedFlag;
  };
}]);