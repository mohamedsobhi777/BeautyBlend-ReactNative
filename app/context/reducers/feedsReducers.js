const feedReducer = (state = null, action) => {
    switch (action.type) {
        case "SET_FEEDS":
            return {
                ...state,
                feeds: action.feeds,
            };
        case "SET_NULL":
            return {
                ...state,
                feeds: null,
            };
        default:
            return state;
    }
};

export default feedReducer;
