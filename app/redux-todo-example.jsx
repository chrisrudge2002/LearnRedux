const redux = require('redux');

console.log('Starting todo redux example');

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

const searchTextReducer = (state = '', action) => {
	switch (action.type)
	{
		case 'CHANGE_SEARCH_TEXT':
			return action.searchText;
		default:
			return state;
	}
};

const showCompletedReducer = (state = false, action) => {
	switch (action.type)
	{
		case 'CHANGE_SHOW_COMPLETED':
			return action.showCompleted;
		default:
			return state;
	}
};

const reducer = redux.combineReducers({
	searchText: searchTextReducer,
	showCompleted: showCompletedReducer,
	todos: todosReducer
});

// Create our store
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

store.dispatch({
	type: 'CHANGE_SHOW_COMPLETED',
	showCompleted: true
});

store.dispatch({
	type: 'ADD_TODO',
	id: 1,
	text: 'Test Todo 1',
	completed: false
});

store.dispatch({
	type: 'ADD_TODO',
	id: 2,
	text: 'Test Todo 2',
	completed: false
});

store.dispatch({
	type: 'ADD_TODO',
	id: 3,
	text: 'Test Todo 3',
	completed: false
});

store.dispatch({
	type: 'TOGGLE_TODO',
	id: 2
});

// Unsubscribe to changes
unsubscribe();
