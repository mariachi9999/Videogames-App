import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { getVideogames } from "../../store/actions";



const VideogameDetail = (props) =>  {

    return (
      <div>
        <h2>Buscador</h2>
        <ul>
          {props.videogames?.map(games =>
            <div key={games.id}>
              <Link to={`/videogames/${games.id}`}>
                <div>{games.Title}</div>
              </Link>
            </div> 
          )}
        </ul>
      </div>
    );
  }


function mapStateToProps(state){
  return{
    videogames: state.gamesLoaded,
  }
}


// function mapDispatchToProps (dispatch) {
//   return {
//     addMovie: movie => dispatch (
//       addMovieFavorite(movie)),
//     getMovies: title => dispatch(getMovies(title)),
//     getMovieDetail: id => dispatch(getMovieDetail(id))
//   }
// }

// export default connect(mapStateToProps,mapDispatchToProps)(Buscador);

export default connect(mapStateToProps,{getVideogames})(VideogameDetail);