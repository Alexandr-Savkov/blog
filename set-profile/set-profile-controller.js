app.controller('setProfileCtrl', ['$scope', '$http', '$location', '$routeParams', '$rootScope', function($scope, $http, $location, $routeParams, $rootScope) {

  $http.get('/countries').then(function(res){
    $scope.countries = res.data[0].countries.sort();
  });

  var profileSettingFlag = false,
    oldProfileCountry,
    oldProfileName,
    oldProfileTown,
    oldProfilePhoto;

  var img = document.querySelector('img');

  $http.get('/getprofile').then(function(res){
    $rootScope.profileName = res.data[0].name;
    $scope.profileTown = res.data[0].town;
    $scope.profileCountry = res.data[0].country;
    img.src = res.data[0].photo;

    oldProfileCountry = $scope.profileCountry;
    oldProfileName = $rootScope.profileName;
    oldProfileTown = $scope.profileTown;
    oldProfilePhoto = img.src;
  });



  $scope.showForm = false;
  $scope.settingButton = 'Редактировать профиль';

  $scope.showSetting = function () {
    if (!profileSettingFlag) {   // if user do not save change, return old data
      $rootScope.profileName = oldProfileName;
      $scope.profileCountry = oldProfileCountry;
      $scope.profileTown = oldProfileTown;
      img.src = oldProfilePhoto;
    };
    $scope.showForm = !$scope.showForm;
    $scope.settingButton = $scope.showForm ? 'Свернуть редактирование' : 'Редактировать профиль';
    profileSettingFlag = false;
  };

  //
  $scope.changeImg = function () {
    var file    = document.querySelector('input[type=file]').files[0];
    var reader  = new FileReader();

    reader.onloadend = function () {
      img.src = reader.result;
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      img.src = oldProfilePhoto;
    };
    console.log(img.src);
  };



  $scope.saveProfile = function () {
    profileSettingFlag = true;
    $scope.settingButton = 'Редактировать профиль';
    $scope.showForm = !$scope.showForm;

    oldProfileCountry = $scope.profileCountry;
    oldProfileName = $rootScope.profileName;
    oldProfileTown = $scope.profileTown;
    oldProfilePhoto = img.src;
    var data = {
      name: $rootScope.profileName,
      country: $scope.profileCountry,
      town: $scope.profileTown,
      photo: img.src
    };
    $http.post('/setprofile', data).then(function(data){
      console.log('set profile work');
      console.log(data);
    });
    console.log(img.src);
  };

  $scope.defaultProfile = function () {
    $http.get('/getdefaultprofile').then(function(res){
      $rootScope.profileName = res.data[0].name;
      $scope.profileTown = res.data[0].town;
      $scope.profileCountry = res.data[0].country;
      img.src = res.data[0].photo;

      oldProfileCountry = $scope.profileCountry;
      oldProfileName = $rootScope.profileName;
      oldProfileTown = $scope.profileTown;
      oldProfilePhoto = img.src;
    });

    if ($scope.showForm) {$scope.showSetting()};
  };

}]);