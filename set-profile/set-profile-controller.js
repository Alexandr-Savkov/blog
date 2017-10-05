app.controller('setProfileCtrl', ['$scope', '$http', '$location', '$routeParams', '$rootScope', function($scope, $http, $location, $routeParams, $rootScope) {

  $http.get('/countries').then(function(res){
    $scope.countries = res.data[0].countries.sort();
  });

  $http.get('/getprofile').then(function(res){
    $rootScope.profileName = res.data[0].name;
    $scope.profileTown = res.data[0].town;
    $scope.profileCountry = res.data[0].country;
  });

  var profileSettingFlag = false;

  $scope.showForm = false;
  $scope.settingButton = 'Редактировать профиль';

  var oldProfileCountry = $scope.profileCountry,
      oldProfileName = $rootScope.profileName,
      oldProfileTown = $scope.profileTown;

  $scope.showSetting = function () {
    if (!profileSettingFlag) {   // if user do not save change, return old data
      $rootScope.profileName = oldProfileName;
      $scope.profileCountry = oldProfileCountry;
      $scope.profileTown = oldProfileTown;
    };
    $scope.showForm = !$scope.showForm;
    $scope.settingButton = $scope.showForm ? 'Свернуть редактирование' : 'Редактировать профиль';
    profileSettingFlag = false;
  };

  $scope.saveProfile = function () {
    profileSettingFlag = true;
    $scope.showForm = !$scope.showForm;

    oldProfileCountry = $scope.profileCountry;
    oldProfileName = $rootScope.profileName;
    oldProfileTown = $scope.profileTown;
    var data = {
      name: $rootScope.profileName,
      country: $scope.profileCountry,
      town: $scope.profileTown
    };
    $http.post('/setprofile', data).then(function(data){
      console.log('set profile work');
      console.log(data);
    });
  };

  $scope.defaultProfile = function () {
    $rootScope.profileName = 'Chewbacca';
    $scope.profileCountry = 'Kashyyyk';
    $scope.profileTown = 'Death Star';

    oldProfileCountry = $scope.profileCountry;
    oldProfileName = $rootScope.profileName;
    oldProfileTown = $scope.profileTown;
    profileSettingFlag = false;
    if ($scope.showForm) {$scope.showSetting()};
  };

}]);