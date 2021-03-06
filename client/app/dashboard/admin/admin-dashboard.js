angular.module('boorish.admin', [])

.controller('AdminController', function($scope, $location, Auth, Users) {

  // Auth.setUser();
  $scope.users;

  $scope.validate = function(value, user, prop) {
    //call service function for update user, pass the value
    //then 
      //console.log success
      user[prop] = value;
      user.name = user.name_first + ' ' + user.name_last;
      Users.updateUser(user)
        .then(function() {
          console.log("Successfully updated the user.")
        })
      return value;
  }

  $scope.getUsers = function() {
    //call getuserbyID service function
    Users.allUsers()
      .then(function(results) {
        //add in logic to remove current user from results
        $scope.users = results;
        console.log($scope.users.results)
      })
  };

  // if user is not authenticated, reroute to /signin
  if (!Auth.isAuth()) {
    $location.path('/signin')
      // else show questions
  } else {
    $scope.getUsers();
    console.log("I'm here");
  }


});
