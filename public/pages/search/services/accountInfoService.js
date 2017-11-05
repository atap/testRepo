'use strict'
searchApp.factory('accountInfoHttpService', ['$http', '$q', '$log', 'baseUrl', function($http, $q, $log, baseUrl){
	
	return {
		getAccountInfo: function(userName) {
			var url = baseUrl + '/users/' + userName;
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