<!DOCTYPE html>
<html lang="en" ng-app="myApp">
<head>
    <meta charset="UTF-8">
    <title>AngularJS MySQL Example</title>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
</head>
<body>

<div ng-controller="MyController">
    <table border="1">
        <tr>
            <th ng-repeat="(key, value) in data[0]">{{ key }}</th>
        </tr>
        <tr ng-repeat="row in data">
            <td ng-repeat="value in row">{{ value }}</td>
        </tr>
    </table>
</div>

<script>
    angular.module('myApp', [])
        .controller('MyController', function($scope, $http) {
            $http.get('your_php_script.php')
                .then(function(response) {
                    $scope.data = response.data;
                });
        });
</script>

</body>
</html>
