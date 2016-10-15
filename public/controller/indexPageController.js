/**
 * Created by Ramitha on 10/12/2016.
 */
var myApp = angular.module('Automotive_lk', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    $http.get('/getInitialData').success(function (req, res) {
        console.log("Received initial data from server ~~~");
        $scope.partList = req;
    });
}]);
