'use strict'
searchApp.controller('searchPageController', function($window, $scope, $rootScope, $state, searchHttpFactory, repoLanguageHttpService) {
	
	$scope.isVisible = false;

	$scope.loginBtnclicked = function(){
		var userName = $scope.usernameModel;
		$scope.isVisible = false;
		if(userName){
			if($scope.isValidUserName(userName)){
				searchHttpFactory.getAllInfo(userName)
				.then(function(data) {
					var data1 = data[0]; //other deatils about user
					$scope.repos = data[1]; //list of repositories 

					$scope.name = data1.name;
					$scope.avatar = data1.avatar_url;
					$scope.githubURL = data1.html_url;

					$scope.isVisible = true;
				},
				function(errResponse){
					alert(errResponse.data.message);
				})
			} else{
				alert('Please enter valid GitHub user name.');
				$scope.usernameModel = "";
			}
		} else{
			alert('Please enter GitHub user name.');
		}
	}

	$scope.isValidUserName = function(userName){
		var patteren = /([a-z0-9](?:-?[a-z0-9]){0,38})/gi;
		return userName.match(patteren);
	}

	$scope.getLanguages = function(repo){
		var owner = repo.owner.login;
		var repo = repo.name;
		repoLanguageHttpService.getRepoLanguage(owner, repo)
				.then(function(data) {
					var len = Object.keys(data).length;
					var totalCnt = 0;
					for(var k in data) {
						console.log(k, data[k]);
						totalCnt += data[k];
					}

					var msg = '';
					for(var k in data) {
						var per = $scope.getLanguagePercentage(data[k], totalCnt)
						console.log(k, per);
						msg += k + ': ' + per + '%\n'
					}
					alert('Languages:\n' + msg);
				})
	}

	$scope.getLanguagePercentage = function(individual, total){
		return ((individual/total) * 100).toFixed(2);
	}
});
