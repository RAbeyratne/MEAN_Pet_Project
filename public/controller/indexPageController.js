/**
 * Created by Ramitha on 10/12/2016.
 */
var myApp = angular.module('Automotive_lk', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {

    $http.get('/getInitialData').success(function (req, res) {
        console.log("Received data from server ~~~");
        $scope.partList = req;
    });


    $scope.addPart = function () {
        if (($scope.part != null)){
            if (($scope.part.unit_price >= 0)&($scope.part.units_available >= 0)&($scope.part.part_name != null)){
                console.log('Adding object => ');
                $http.post('/addpart', $scope.part).success(function(response) {
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

    $scope.selectPartForModyfication = function(selectedPart) {
        console.log('Modifying object => ' + selectedPart._id);
        $http.get('/getpart/' + selectedPart._id).success(function(response) {
            $scope.part = response;
        });
    };

    $scope.updatePartDetails = function() {
        if ($scope.part != undefined){
            if ($scope.part._id != undefined) {
                console.log('Updating object => ' + $scope.part._id);
                $http.put('/updatepart/' + $scope.part._id, $scope.part).success(function(response) {
                    clearAndReloadData();
                    $scope.part = '';
                })
            } else {
                alert('Record identification failed!!! :)');
            }
        } else {
            alert('Please select a record to modify!!! :)');
        }
    };

    $scope.deletePart = function(selectedPart) {
        console.log('Deleting object => ' + selectedPart._id);
        $http.delete('/deletepart/' + selectedPart._id).success(function(response) {
            clearAndReloadData();
        });
    };

    var clearAndReloadData = function() {
        $http.get('/getInitialData').success(function (req, res) {
            console.log("Received initial data from server ~~~");
            $scope.partList = req;
        });
        $scope.part = "";
    };

}]);
