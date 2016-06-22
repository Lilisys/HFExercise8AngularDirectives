var app = angular.module('reddit', []);

app.directive('beep', function(){
	return {
		restrict: 'E',
		templateUrl: 'partials/beep.html',
		replace: false
	};
});
	