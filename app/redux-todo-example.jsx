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
		case 'ADD_TODO': return reducerAddTodo(state, action);
		case 'CHANGE_SEARCH_TEXT': return reducerChangeSearchText(state, action);
		case 'CHANGE_SHOW_COMPLETED': return reducerChangeShowCompleted(state, action);
		case 'TOGGLE_TODO': return reducerToggleTodo(state, action);
		default: return state;
	}
};

function reducerAddTodo(state, action) {
	return {
		...state,
		todos: [
			...state.todos,
			{
				id: action.id,
				text: action.text,
				completed: action.completed
			}
		]
	};
}

function reducerChangeSearchText(state, action) {
	return {
		...state,
		searchText: action.searchText
	};
}

function reducerChangeShowCompleted(state, action) {
	return {
		...state,
		showCompleted: action.showCompleted
	};
}

function reducerToggleTodo(state, action) {
	return {
		...state,
		todos: state.todos.map((todo) => {
			if (todo.id === action.id) {
				return {
					...todo,
					completed: !todo.completed
				};
			} else {
				return todo;
			}
		})
	};
}

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
