const initialState = {
    gamesLoaded: [],
    gamesSearched: [],
    movieDetail: {},
    movieTotalResults: null,
    genres: [],
    platforms: []
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
                movieDetail: action.payload.data
            }
        default:
            return {
                ...state
            }
    }
}

export default rootReducer;