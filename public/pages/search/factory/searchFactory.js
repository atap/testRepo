'use strict'
searchApp.factory('searchHttpFactory', function($q, accountInfoHttpService, reposHttpService){
	return {
		getAllInfo: function(userName) {
			var fn = function(res){
				return res;
			};

			var promises = [
				accountInfoHttpService.getAccountInfo(userName).then(fn),
				reposHttpService.getRepositories(userName).then(fn)
			];

			return $q.all(promises).then(function(data){
				return data;
			});

		}
	};
});