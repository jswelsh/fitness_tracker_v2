import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/navbar.component";
import ExerciseList from "./components/exercises-list.component";
import TodaysExerciseList from "./components/todays-exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";

//import Exercise from '../../backend/models/exercise.model'; //whats this for again?
//import './App.css';

function App() {
  return (
    <Router>
      <div className="container"> {/* maybe get rid of this div as it creates a buffer on either side of the nav */}
        <Navbar />
        <br/>
        {/* <Route path="/" exact component={ExerciseList} /> */}
        <Route path="/" exact component={ExerciseList} />
        <Route path="/today" component={TodaysExerciseList} />
        <Route path="/edit/:id"component={EditExercise} />    
        <Route path="/create"component={CreateExercise} />
        <Route path="/user"component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
