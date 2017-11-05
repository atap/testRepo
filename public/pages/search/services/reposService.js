'use strict'
searchApp.factory('reposHttpService', ['$http', '$q', '$log', 'baseUrl', function($http, $q, $log, baseUrl){
	
	return {
		//function to get list of public repositories for the specified user
		getRepositories: function(userName) {
			var url = baseUrl + '/users/' + userName + '/repos';
			return $http.get(url)
			.then(function(response){
					return response.data;
				},
				function(errResponse){
					return $q.reject(errResponse);
				}
			);
		}
		
	};
}]);