const redux = require('redux');

console.log('Starting redux example');

const reducer = (state = {name: 'Anonymous'}, action) => {

	return state;
};

let store = redux.createStore(reducer);

const currentState = store.getState();
console.log('currentState', currentState);
