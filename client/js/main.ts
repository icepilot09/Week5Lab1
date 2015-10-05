//Use to instantiate app, connect factory & controllers and configure app.

var myBlogApp = angular.module('myBlogApp', ['ngRoute', 'ngResource', 'myBlogApp.factories', 'myBlogApp.controllers']);

myBlogApp.config(function ($routeProvider: any) {
    $routeProvider
        .when('/', {
            templateUrl: '../views/blogposts.html',
            controller: 'blogController'
        })
        .when('/newpost', {
            templateUrl: '../views/newpost.html',
            controller: 'writeBlogController'
        })
        .otherwise({
            redirectTo: '/'
        });
});

