const redux = require('redux');

console.log('Starting todo redux example');

const stateDefault = {
	searchText: '',
	showCompleted: false,
	todos: []
};
const reducer = (state = stateDefault, action) => {

	return state;
};

let store = redux.createStore(reducer);

console.log('currentState', store.getState());
