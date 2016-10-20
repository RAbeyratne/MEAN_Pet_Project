/**
 * Created by Ramitha on 10/12/2016.
 */
var myApp = angular.module('Automotive_lk', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {

    $http.get('/getInitialData').success(function (req, res) {
        console.log("Received initial data from server ~~~");
        $scope.partList = req;
    });


    $scope.addPart = function () {
        console.log('Method active');
        if (($scope.part != null)){
            if (($scope.part.unit_price >= 0)&($scope.part.units_available >= 0)&($scope.part.part_name != null)){
                console.log('Sending data to the server ~~~');
                $http.post('/addPart', $scope.part).success(function(response) {
                    console.log(response);
                    clearAndReloadData();
                });
            } else {
                alert('Please insert data all fields with valid data!!! :)');
            }
        } else {
            alert('Please insert data into fields to create a part!!! :)');
        }
    };

    var clearAndReloadData = function() {
        $http.get('/getInitialData').success(function (req, res) {
            console.log("Received initial data from server ~~~");
            $scope.partList = req;
        });
        $scope.part = "";
    };

}]);
