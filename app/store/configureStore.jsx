const redux = require('redux');
const thunk = require('redux-thunk').default;

const {searchTextReducer, showCompletedReducer, todosReducer, mapReducer} = require('./../reducers/index');

export const configure = () => {

	// Create combined reducer
	const reducer = redux.combineReducers({
		searchText: searchTextReducer,
		showCompleted: showCompletedReducer,
		todos: todosReducer,
		map: mapReducer
	});

	// Create our store
	const store = redux.createStore(reducer, redux.compose(
		redux.applyMiddleware(thunk),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	));

	return store;
};
