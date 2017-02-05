const redux = require('redux');

console.log('Starting todo redux example');

const stateDefault = {
	searchText: '',
	showCompleted: false,
	todos: []
};
const reducer = (state = stateDefault, action) => {

	switch (action.type)
	{
		case 'CHANGE_SEARCH_TEXT':
			return {
				...state,
				searchText: action.searchText
			};
		case 'CHANGE_SHOW_COMPLETED':
			return {
				...state,
				showCompleted: action.showCompleted
			};
		default:
			return state;
	}
};

let store = redux.createStore(reducer, redux.compose(
	window.devToolsExtension ? window.devToolsExtension() : f => f
));

// Subscribe to changes
let unsubscribe = store.subscribe(() => {
	const state = store.getState();
	console.log('currentState', state);
	document.getElementById('app').innerHTML = state.searchText;
});


// Dispatch an action
store.dispatch({
	type: 'CHANGE_SEARCH_TEXT',
	searchText: 'Test 123'
});

store.dispatch({
	type: 'CHANGE_SEARCH_TEXT',
	searchText: 'New'
});

store.dispatch({
	type: 'CHANGE_SEARCH_TEXT',
	searchText: 'Last change'
});

// unsubscribe();

// store.dispatch({
// 	type: 'CHANGE_SHOW_COMPLETED',
// 	showCompleted: true
// });

// store.dispatch({
// 	type: 'ADD_TODO',
// 	todo: {
// 	}
// });

// store.dispatch({
// 	type: 'COMPLETE_TODO',
// 	todo: {
// 	}
// });
