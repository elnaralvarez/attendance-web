function UpdateUserController($scope, $mdDialog, Global, Toast, LocalError, Users, Store) {

  $scope.item = Global.user;

   $scope.hide = function() {
     $mdDialog.hide();
   };
   $scope.cancel = function() {
     $mdDialog.cancel();
   };
   $scope.answer = function(answer) {
     $mdDialog.hide(answer);
   };
   $scope.update = function(user) {
    if (user.new_password != user.confirm_password) {
      Toast.show('los passwords no son iguales');
      return;
    }
    user.password = user.new_password;
    Users.update(user, function(response) {
      Global.user = response;
      Store.save('user', user);
      $mdDialog.hide();
    }, LocalError.request);
   };
 }
