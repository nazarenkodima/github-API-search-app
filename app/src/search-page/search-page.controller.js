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
                // console.log(response.data);

                //pagination
                $scope.currentPage = 1;
                $scope.itemsPerPage = 7;
                $scope.totalItems = $scope.repos.data.items.length;

                $scope.$watch("currentPage", function() {
                    setPageData($scope.currentPage);
                });


                function setPageData(page) {
                    var pagedData = $scope.repos.data.items.slice(
                        (page - 1) * $scope.itemsPerPage,
                        page * $scope.itemsPerPage
                    );
                    $scope.allRepos = pagedData;
                }
            })

    };





});
