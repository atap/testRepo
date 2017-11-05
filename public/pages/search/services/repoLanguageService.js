'use strict'
searchApp.factory('repoLanguageHttpService', ['$http', '$q', '$log', 'baseUrl', function($http, $q, $log, baseUrl){
	
	return {
		//function to get languages for the specified repository
		getRepoLanguage: function(owner, repo) {
			var url = baseUrl + '/repos/' + owner + '/' + repo + '/languages';
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