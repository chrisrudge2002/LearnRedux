
console.log('Starting todo redux example');

const actions = require('./actions/index');
const store = require('./store/configureStore').configure();

// Subscribe to changes
const unsubscribe = store.subscribe(() => {
	const state = store.getState();

	console.log('currentState', state);

	if (state.map.isFetching) {
		document.getElementById('app').innerHTML = 'Loading';
	} else if (state.map.url) {
		document.getElementById('app').innerHTML = '<a href="' + state.map.url + '" target="_blank">View Your Location</a>';
	}
});

store.dispatch(actions.fetchLocation());

// Dispatch actions
store.dispatch(actions.changeSearchText('Test 123'));

store.dispatch(actions.changeSearchText('New search text'));

store.dispatch(actions.changeSearchText('Last search text'));

store.dispatch(actions.changeShowCompleted(true));

store.dispatch(actions.addTodo(1, 'Test Todo 1'));

store.dispatch(actions.addTodo(2, 'Test Todo 2'));

store.dispatch(actions.addTodo(3, 'Test Todo 3'));

store.dispatch(actions.toggleTodo(2));

// Unsubscribe to changes
//unsubscribe();
