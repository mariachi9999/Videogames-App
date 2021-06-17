import React from "react";
import Home from "../Home/index"
import SearchPage from "../SearchPage/index"


const Mother = (props) =>  {
    
    console.log(props.location)
    const search = props.location.search

    if(search){
        return (
          <div>
            <SearchPage/>
          </div>
        );
    }
    return (
        <div>
            <Home/>
        </div>
    )
  }

  export default Mother; 