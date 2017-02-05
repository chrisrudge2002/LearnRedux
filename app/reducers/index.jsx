export const searchTextReducer = (state = '', action) => {
	switch (action.type)
	{
		case 'CHANGE_SEARCH_TEXT':
			return action.searchText;
		default:
			return state;
	}
};

export const showCompletedReducer = (state = false, action) => {
	switch (action.type)
	{
		case 'CHANGE_SHOW_COMPLETED':
			return action.showCompleted;
		default:
			return state;
	}
};

export const todosReducer = (state = [], action) => {
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

export const mapReducer = (state = {isFetching: false, url: undefined}, action) => {
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

