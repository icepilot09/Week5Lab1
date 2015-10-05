var myBlogApp = angular.module('myBlogApp.factories', ['ngRoute', 'ngResource']);
myBlogApp.factory('Blog', ['$resource', function ($resource) {
        var reqHeaders = {
            "X-Parse-Application-Id": "i6DrFWSOMvCPx9Q7pdLkOpndoS7pnNPuiCfGRpoz",
            "X-Parse-REST-API-Key": "VKNod4tecDA1NN2pqdj76rhKs9xUDDkXX1BfqlTU",
            "Content-Type": "application/json"
        };
        var User = $resource('https://api.parse.com/1/classes/BlogPost/', {}, {
            'query': {
                headers: reqHeaders,
            },
            'save': {
                method: 'POST',
                headers: reqHeaders
            },
        });
        return User;
    }]);
