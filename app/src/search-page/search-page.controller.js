app.controller('main', function($scope, $http) {
    $scope.repos = $scope.repos || {};
    $scope.repos = {
        data : []
    };

    $scope.findRepo = function() {
        $scope.repoNotFound = false;
        $scope.dataLoaded = false;

        $http({
            method: 'GET',
            url: 'https://api.github.com/search/repositories?q=' +$scope.repo
        })
            .then(function success(response) {
                $scope.repos.data = response.data;
                $scope.dataLoaded = true;
                console.log(response.data);
            })

    }


});
