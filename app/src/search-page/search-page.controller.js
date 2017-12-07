app.controller('main', function($scope, $http) {
    $scope.repos = $scope.repos || {};
    $scope.repos = {
        data : []
    }

    $scope.findRepo = function() {
        console.log('click')
        $http({
            method: 'GET',
            url: 'https://api.github.com/search/repositories?q=' +$scope.repo
        })
            .then(function success(response) {
                $scope.repos.data = response.data;
                console.log(response.data);
            });
    }
});
