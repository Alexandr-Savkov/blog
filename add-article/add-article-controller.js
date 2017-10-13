app.controller('addArticleCtrl', ['$scope', '$http', '$location', '$routeParams', '$rootScope', function($scope, $http, $location, $routeParams, $rootScope) {

  if (!$rootScope.profileName) {
    $http.get('/getprofile').then(function(res) {
      $rootScope.profileName = res.data[0] ? res.data[0].name : "Default Name"
    });
  }

  $scope.addArticle = function() {
    var arr_tags = null,
        str_tags = null;

    if (!$scope.tags) {
     str_tags = 'тэгов нет';
    } else {
      arr_tags = $scope.tags.split(/,+ +|,+| +|; +/);
      str_tags = arr_tags.join(' ');
    }

    var data = {
      date: Date.now(),
      caption: $scope.caption,
      tags: str_tags,
      text: $scope.text,
      comments: []
    };
    $http.post('/addarticle', data).then(function(){
      $location.path('/list');
    });
  };

  $scope.addTag = function(id) {
    var tag = document.getElementById(id);
    var tagValue = tag.innerHTML;

    if (tag.addTagFlag) {
      $scope.tags = $scope.tags.replace(tagValue, '');
      $scope.tags = $scope.tags.replace(/^ | $/, '');
    } else {
      (!$scope.tags) ? ($scope.tags = tagValue) : ($scope.tags += ' ' + tagValue);
    }

    tag.classList.toggle('btn-warning');
    tag.addTagFlag = !tag.addTagFlag;
  };
}]);