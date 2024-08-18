import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <>
        
    <div style={{backgroundColor:'orange',color:'white'}}>
        <h1><center>Landing Page</center></h1>
    </div>

      <div style={{fontSize:25}}>
        <ul>
          <li>
            <Link to={"/about"}>
              <li>About</li>
            </Link>

            <Link to={"/contact"}>
              <li>Contact</li>
            </Link>
          </li>
        </ul>
      </div>

      <div style={{backgroundColor:'orange',color:'white'}}>
        <h1><center>Vist Again</center></h1>
      </div>

    </>
  );
};

export default Landing;
