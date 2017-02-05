const axios = require('axios');
const redux = require('redux');

console.log('Starting todo redux example');

// Todos reducer and action generators
// ----------------------------------
const todosReducer = (state = [], action) => {
	switch (action.type)
	{
		case 'ADD_TODO':
			return [...state, {
				id: action.id,
				text: action.text,
				completed: action.completed
			}];
		case 'TOGGLE_TODO':
			return state.map((todo) => {
				if (todo.id === action.id) {
					return {
						...todo,
						completed: !todo.completed
					};
				} else {
					return todo;
				}
			});
		default:
			return state;
	}
};

const addTodo = (id, text) => {
	return {
		type: 'ADD_TODO',
		id,
		text,
		completed: false
	};
};

const toggleTodo = (id) => {
	return {
		type: 'TOGGLE_TODO',
		id
	};
};

// SearchText reducer and action generators
// ----------------------------------
const searchTextReducer = (state = '', action) => {
	switch (action.type)
	{
		case 'CHANGE_SEARCH_TEXT':
			return action.searchText;
		default:
			return state;
	}
};

const changeSearchText = (searchText) => {
	return {
		type: 'CHANGE_SEARCH_TEXT',
		searchText
	};
};

// ShowCompleted reducer and action generators
// ----------------------------------
const showCompletedReducer = (state = false, action) => {
	switch (action.type)
	{
		case 'CHANGE_SHOW_COMPLETED':
			return action.showCompleted;
		default:
			return state;
	}
};

const changeShowCompleted = (showCompleted) => {
	return {
		type: 'CHANGE_SHOW_COMPLETED',
		showCompleted
	};
};

// Map reducer and action generators
// ----------------------------------
const mapReducer = (state = {isFetching: false, url: undefined}, action) => {
	switch (action.type)
	{
		case 'START_LOCATION_FETCH':
			return {
				isFetching: true,
				url: undefined
			};
		case 'COMPLETE_LOCATION_FETCH':
			return {
				isFetching: false,
				url: action.url
			};
		default:
			return state;
	}
};

const startLocationFetch = () => {
	return {
		type: 'START_LOCATION_FETCH'
	};
};

const completeLocationFetch = (url) => {
	return {
		type: 'COMPLETE_LOCATION_FETCH',
		url
	};
};

const fetchLocation = () => {
	store.dispatch(startLocationFetch());

	axios.get('http://ipinfo.io').then(function(res) {

		const loc = res.data.loc;
		let baseUrl = 'http://maps.google.com?q=';

		store.dispatch(completeLocationFetch(baseUrl + loc));
	});
};

// Create combined reducer
const reducer = redux.combineReducers({
	searchText: searchTextReducer,
	showCompleted: showCompletedReducer,
	todos: todosReducer,
	map: mapReducer
});

// Create our store
let store = redux.createStore(reducer, redux.compose(
	window.devToolsExtension ? window.devToolsExtension() : f => f
));

// Subscribe to changes
let unsubscribe = store.subscribe(() => {
	const state = store.getState();

	console.log('currentState', state);

	if (state.map.isFetching) {
		document.getElementById('app').innerHTML = 'Loading';
	} else if (state.map.url) {
		document.getElementById('app').innerHTML = '<a href="' + state.map.url + '" target="_blank">View Your Location</a>';
	}
});

fetchLocation();

// Dispatch actions
store.dispatch(changeSearchText('Test 123'));

store.dispatch(changeSearchText('New search text'));

store.dispatch(changeSearchText('Last search text'));

store.dispatch(changeShowCompleted(true));

store.dispatch(addTodo(1, 'Test Todo 1'));

store.dispatch(addTodo(2, 'Test Todo 2'));

store.dispatch(addTodo(3, 'Test Todo 3'));

store.dispatch(toggleTodo(2));

// Unsubscribe to changes
//unsubscribe();
