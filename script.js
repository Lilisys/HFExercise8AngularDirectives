var app = angular.module('reddit', []);

app.controller('mainCtrl',function($scope, $http){
	$scope.posts=[];

	$scope.add = function(){	
		$scope.posts.push({title: "Uhhhhh", selftext: 'I\'m not really sure how I got here...', image: "http://lolsupportguide.node365.se/img%202/avatar-99.png" });	
	}

	$http({
	  method: 'GET',
	  url: 'https://www.reddit.com/r/leagueoflegends/.json'
	}).then(function successCallback(response) {
	    // this callback will be called asynchronously
	    // when the response is available
	    //var title = [0].data.title
	    var allData = response.data.data.children;
	    for (var i = 0; i < allData.length; ++i){
	    	$scope.posts.push({title: allData[i].data.title, selftext: allData[i].data.selftext.substring(0,150)+'...', image: "https://unsplash.it/130?random" });	
	    } 
	    
	  }, function errorCallback(response) {
	    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });

  $scope.search = function(){
  	var subreddit = $scope.subreddit;
  	console.log("hey", subreddit);
  	var queryurl='http://www.reddit.com/r/' + subreddit + '/.json'
  	$http({
		  method: 'GET',
		  url: queryurl
		}).then(function successCallback(response) {
		    // this callback will be called asynchronously
		    // when the response is available
		    //var title = [0].data.title
		    var allData = response.data.data.children;
		    $scope.posts = [];
		    for (var i = 0; i < allData.length; ++i){
		    	$scope.posts.push({title: allData[i].data.title, selftext: allData[i].data.selftext.substring(0,150)+'...', image: "https://unsplash.it/130?random" });	
		    } 
		    
		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	  });
  }
});

app.directive('aPost', function(){
	return {
		restrict: 'E',
		templateUrl: 'partials/post.html',
		replace: false
	};
});
	
app.directive('picture', function(){
	return {
		restrict: 'E',
		template: '<p>It\'s Thresh:</p><img src="http://www.iyl.gg/images/ChampionPortrait/7979b2f4-55a3-41b6-830a-bebb6ea5cc15Thresh.png" alt="thresh">',
		replace: false
	};
});

app.directive('stuffGoesUnder', function() {
  return{
  	link: function(scope, elem, attrs) {
			elem.bind('click', function() {
				scope.$apply(function() {
					scope.posts.push("<a-post></a-post>");
				});
			});
		}
  };
  
});

