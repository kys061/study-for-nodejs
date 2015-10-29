angular.module("NetboxApp", ["ui.router"])



.config(function config($stateProvider){
  $stateProvider.state("index", {
    url: "",
    controller: "NetboxCtrl as netbox",
    templateUrl: "templates/boxinfo.html"
  })
})

.controller('NetboxCtrl', ['$http', '$scope', 'BoxinfoFactory', function ($http, $scope, BoxinfoFactory) {
  $scope.boxinfo = {};
  $http.get("/boxinfo").success(function(result){
    $scope.boxinfo  = result;
  })
  $scope.search = '';

  $scope.isCreating = false;
  $scope.isEditing = false;
  $scope.startCreating = startCreating;
  $scope.cancelCreating = cancelCreating;
  $scope.startEditing = startEditing;
  $scope.cancelEditing = cancelEditing;
  // $scope.shouldShowCreating = shouldShowCreating;
  // $scope.shouldShowEditing = shouldShowEditing;

  function startCreating() {
    $scope.isCreating = true;
    $scope.isEditing = false;
    resetCreateForm();
  }
  function cancelCreating() {
    $scope.isCreating = false;
  }
  function startEditing(){
    if($scope.isEditing == false) { $scope.isEditing = true; }
    else { $scope.isEditing = false; }
    $scope.isCreating = false;
  }
  function cancelEditing(){
    $scope.isEditing = false;
  }
  // function shouldShowCreating(){
  //   return $scope.currentcategory && !$scope.isEditing;
  // }
  // function shouldShowEditing() {
  //   return $scope.isEditing && !$scope.isCreating;
  // }

  // creating
  $scope.createBoxInfo = createBoxInfo;
  $scope.resetCreateForm = resetCreateForm;
  $scope.isSelectedBoxinfo = isSelectedBoxinfo;
  // $scope.newBoxinfo={};

  function login(username, password){
    UserFactory.login(username, password).then(function success(response){
      vm.user = response.data;

    }, handleError);
  }

  function createBoxInfo(boxinfo) {
    BoxinfoFactory.addboxinfo(boxinfo).then(function success(res){
      $scope.result = res;
    }, handleError);

  //   $http.post('/boxinfo', boxinfo).success(function(result){
  //
  // });
    // $scope.newBoxinfo = '';
    resetCreateForm();
  }

  function handleError(res){
    alert('Error' + res.data)
    console.log(res);
  }

  function resetCreateForm() {
    $scope.newBoxinfo = {
      license: '',
      boxtype: '',
      boxname: '',
      boxip: '',
      boxgateway: ''
    }
  }

  function isSelectedBoxinfo(box, search){

        if(search !== undefined && search !== "" && box.boxname.match(search)){
          console.log(box.boxname.match(search));
          return true;
        }
        else {
          return false;
        } // 검색어 문자열과

    }
}])

.factory('BoxinfoFactory', function BoxinfoFactory($http){
  'use strict';

  return {
    addboxinfo: addboxinfo
  };

  function addboxinfo(boxinfo){
    return $http.post('/boxinfo', boxinfo)
  }

})
