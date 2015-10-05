interface IPost {
	title: string;
	content: string;
	author: string;
};

interface IBlogScope extends ng.IScope {
	posts: Array<IPost>;
	items: Array<IPost>;
	createPost(): void;
}

interface writeScope extends ng.IScope {
	newPost(): void;
	post: IPost;
}

var myBlogApp = angular.module('myBlogApp.controllers', []);
// GET
myBlogApp.controller('blogController', ['$scope', '$location', 'Blog', function ($scope: IBlogScope, $location: ng.ILocationService, Blog: any) {

	Blog.query()
	.$promise.then(function (data: any) {
		console.log(data);
		$scope.posts = data.results;
	})
	.catch(function () {
		console.log('error');
	});
	// switches page view
	$scope.createPost = function (): void {
		$location.path('/newpost');
	}
}]);

myBlogApp.controller('writeBlogController', ['$scope', '$location', 'Blog', function ($scope: writeScope, $location: ng.ILocationService, Blog: any) {
	$scope.post = {
		title: '', 
		author: '',
		content: ''
	}
	$scope.newPost = function () {
		
		Blog.save($scope.post).$promise
			.then(function (): void {
				$location.path('/');
			}).catch(function (err: string): void {
				console.log(err);
			})
	}
}]);