;
var myBlogApp = angular.module('myBlogApp.controllers', []);
myBlogApp.controller('blogController', ['$scope', '$location', 'Blog', function ($scope, $location, Blog) {
        Blog.query()
            .$promise.then(function (data) {
            console.log(data);
            $scope.posts = data.results;
        })
            .catch(function () {
            console.log('error');
        });
        $scope.createPost = function () {
            $location.path('/newpost');
        };
    }]);
myBlogApp.controller('writeBlogController', ['$scope', '$location', 'Blog', function ($scope, $location, Blog) {
        $scope.post = {
            title: '',
            author: '',
            content: ''
        };
        $scope.newPost = function () {
            Blog.save($scope.post).$promise
                .then(function () {
                $location.path('/');
            }).catch(function (err) {
                console.log(err);
            });
        };
    }]);
