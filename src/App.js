import React from "react";
import Form from "./Form";
import {Route, Link} from 'react-router-dom';
import "./App.css";

export default function App(){
  return (
    <div>
      <header>
      <h1 id="none">
        <Link to="/">
       Lambda Eats

        </Link></h1>
        
        <Link to="/pizza">
          <button id="order"type="button">
            Order a pizza!
          </button>
        </Link>
      </header>
      
      <Route exact path="/pizza">
        <Form />
      </Route>
    </div>
  )
}

