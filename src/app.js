var pokemonApp = angular.module("pokemon", ['ui.grid']);
pokemonApp.controller('pokemonController', function ($scope, $http, $q, $filter) {

	var that = this; // Preserving the this for the controller

	/**
	 * @ngdoc property
	 * @name showDetails
	 * @description This is the boolean for managing the toggling of the details section
	 */
	that.showDetails = false;
	
	/**
	 * @ngdoc property
	 * @name gridOptions
	 * @description This is the grid options for the grid. It will be populated with data
	 */
	that.gridOptions = {
		enableFiltering: true
	};

	/**
	 * @ngdoc property
	 * @name filterOptions
	 * @description It's the default filterOptions for filtering the columns
	 */
	that.filterOptions = {
			filterText: ''
	};

	// Setting up the options and the filter configuration
	this.gridOptions.columnDefs = [
		{
			name:'ename',
			filter: {
				term: this.filterOptions.filterText
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

	// Getting the pokemons data
	$http.get('data/pokedex.json', {timeout: canceler.promise}).then(
		function(data) {
			that.gridOptions.data = data.data; // Assigning the data so as to render
			for (var i = 0, len = that.gridOptions.data.length; i < len; i++) {
				// Adding showDetails property to the object to manage showing details
				that.gridOptions.data[i].showDetails = false;
			}
		});

	$scope.$on('$destroy', function(){
		canceler.resolve();  // Aborts the $http request if it isn't finished.
	});

	/**
	 * @ngdoc method
	 * @name expand
	 * @description Manages the expand and collapse of the details section in the theme column
	 *
	 * @param {Object} obj The row object
	 */
	that.expand = function (obj) {
		if (obj.showDetails === true) {
			obj.showDetails = false;
		} else {
			obj.showDetails = true;
		}
	}
});
