var pokemonApp = angular.module("pokemon", ['ui.grid']);
pokemonApp.controller('pokemonController', function ($scope, $http, $q) {

	var that = this;
	
	that.gridOptions = {
		};

	this.gridOptions.columnDefs = [
		{
			name:'ename'
		},
		{
			name:'id'
		},
		{
			name: 'theme',
			'cellTemplate': 'image'
		}
	];

	var canceler = $q.defer();

	$http.get('data/pokedex.json', {timeout: canceler.promise}).then(
		function(data) {
			console.log(data)
			that.gridOptions.data = data.data;
			console.log(that.gridOptions.data);
		});

		$scope.$on('$destroy', function(){
			canceler.resolve();  // Aborts the $http request if it isn't finished.
	 });
});
