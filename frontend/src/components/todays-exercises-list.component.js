import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.repetition}</td>
    <td>{props.exercise.weight}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
    <td>                                                   {/* style this ahref as a button cause it doenst actually go anywhere */}                                                                                                   
      <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
    </td>
  </tr>
)

export default class TodaysExercisesList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this);

    this.state = {exercises: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/exercises/today')
      .then(response => { 
        const today = new Date().toISOString().slice(0,10)
        this.setState({ 
          exercises: response.data.filter(exercise => 
            exercise.date.slice(0,10) === today
          ) 
        })
      })
      .catch(error => console.log(error));
  }

  deleteExercise(id) {
    axios.delete('http://localhost:5000/exercises/' + id)
      .then(res => console.log(res.data))
      .catch(error => console.log(error));
    this.setState({
      exercises: this.state.exercises.filter(exercise => exercise._id !== id)
    })
  }

  exerciseList() {
    return this.state.exercises.map(currentexercise => {
      return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Exercises for Today</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Repetition</th>
              <th>Weight</th>
              <th>Date</th>
              <th>Actions</th>              
            </tr>
          </thead>
          <tbody>
            { this.exerciseList() }
          </tbody>
        </table>
      </div>
    )
  }
}