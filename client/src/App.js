import './App.css';

import React from "react";
import { Route } from "react-router-dom";

import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import VideogameDetail from "./components/VideogameDetail";
import VideogameCreation from "./components/VideogameCreation";


function App() {
  return (
    <div className="App">
      <Route exact path="/" component={LandingPage}/>
      <Route exact path="/videogames" render={({location})=> <Home location={location}/>}/>
      <Route exact path="/videogames/:id" render={({match})=> <VideogameDetail match={match}/>}/>
      <Route exact path="/videogame" component={VideogameCreation} />
    </div>
  );
}

export default App;
