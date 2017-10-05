app.controller('setProfileCtrl', ['$scope', '$http', '$location', '$routeParams', '$rootScope', function($scope, $http, $location, $routeParams, $rootScope) {

  $http.get('/countries').then(function(data){
        $scope.countries = data.data[0].countries.sort();
        console.log($scope.countries);
      });

  var profileSettingFlag = false;  //
  if (!profileSettingFlag) {
    $rootScope.profileName = 'Chewbacca';
    $scope.profileCountry = 'Kashyyyk';
    $scope.profileTown = 'Death Star';
  };

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
  };

  $scope.defaultProfile = function () {
    $rootScope.profileName = 'Chewbacca';
    $scope.profileCountry = 'Kashyyyk';
    $scope.profileTown = 'Death Star';
    profileSettingFlag = false;
    if ($scope.showForm) {$scope.showSetting()};
  };

}]);