const initialState = {
    gamesLoaded: [],
    gamesSearched: [],
    gameDetail: {},
    gamesTotalResults: null,
    filteredGenres: [],
    platforms: [],
    genre: [],
    source: ["api","local"],
    filteredSources: [],
    alphabetical: "",
    rating: ""
};

const rootReducer = (state=initialState,action) => {
    switch(action.type){
        case 'GET_VIDEOGAMES':
            return {
                ...state,
                gamesLoaded: action.payload.data
            }
            ;
        case 'GET_INFO':
            const genres = action.payload.genre.map(genre=>genre.name);
            const platforms = action.payload.platforms.map(platform=>platform.name);
            return {
                ...state,
                genres: genres,
                platforms: platforms
            }
        case 'SEARCH_VIDEOGAMES':
            return {
                ...state,
                gamesSearched: action.payload
            }
        case 'GET_VIDEOGAME_DETAIL':
            return {
                ...state,
                gameDetail: action.payload.data
            }
        case 'FILTER_GENRES':
            return {
                ...state,
                filteredGenres: action.payload
            }
        case 'FILTER_SOURCE':
            return {
                ...state,
                filteredSources: action.payload
            }
        case 'ORDER_ALPHABETICAL':
            return {
                ...state,
                alphabetical: action.payload
            }
        case 'ORDER_RATING':
            return {
                ...state,
                rating: action.payload
            }           
        default:
            return {
                ...state
            }
    }
}

export default rootReducer;