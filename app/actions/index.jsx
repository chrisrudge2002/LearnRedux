const axios = require('axios');

export const addTodo = (id, text) => {
	return {
		type: 'ADD_TODO',
		id,
		text,
		completed: false
	};
};

export const toggleTodo = (id) => {
	return {
		type: 'TOGGLE_TODO',
		id
	};
};

export const changeSearchText = (searchText) => {
	return {
		type: 'CHANGE_SEARCH_TEXT',
		searchText
	};
};

export const changeShowCompleted = (showCompleted) => {
	return {
		type: 'CHANGE_SHOW_COMPLETED',
		showCompleted
	};
};

export const startLocationFetch = () => {
	return {
		type: 'START_LOCATION_FETCH'
	};
};

export const completeLocationFetch = (url) => {
	return {
		type: 'COMPLETE_LOCATION_FETCH',
		url
	};
};

export const fetchLocation = () => {
	return (dispatch, getState) => {
		dispatch(startLocationFetch());

		axios.get('http://ipinfo.io').then(function(res) {

			const loc = res.data.loc;
			let baseUrl = 'http://maps.google.com?q=';

			dispatch(completeLocationFetch(baseUrl + loc));
		});
	};
};

