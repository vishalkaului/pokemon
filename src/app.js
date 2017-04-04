var pokemonApp = angular.module("pokemon", ['ui.grid']);
pokemonApp.controller('pokemonController', function ($scope, $http, $q, $filter) {

	var that = this;
	that.showDetails = false;
	
	that.gridOptions = {
		enableFiltering: true
		};

	that.filterOptions = {
			filterText: ''
		};

	this.gridOptions.columnDefs = [
		{
			name:'ename',
			filter: {
					term: this.filterOptions.filterText //DOES NOT WORK... BUT WHY
				}
		},
		{
			name:'id'
		},
		{
			name: 'theme',
			'cellTemplate': 'image',
			enableFiltering: false,
			enableSorting: false
		}
	];

	var canceler = $q.defer();

	$http.get('data/pokedex.json', {timeout: canceler.promise}).then(
		function(data) {
			console.log(data)
			that.gridOptions.data = data.data;
			console.log(that.gridOptions.data);
			for (var i = 0, len = that.gridOptions.data.length; i < len; i++) {
			  console.log(that.gridOptions.data[i]);
			  that.gridOptions.data[i].showDetails = false;
			}
		});

		$scope.$on('$destroy', function(){
			canceler.resolve();  // Aborts the $http request if it isn't finished.
	 });

	that.expand = function (obj) {
		if (obj.showDetails === true) {
			obj.showDetails = false;
		} else {
			obj.showDetails = true;
		}
	}
});
