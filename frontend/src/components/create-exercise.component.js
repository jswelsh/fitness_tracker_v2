import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercise extends Component {
  constructor(props) {
    super(props);

    //binding this to each instance, else this would be undefined
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeRepetition = this.onChangeRepetition.bind(this);
    this.onChangeWeight = this.onChangeWeight.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);    

    this.state = {
      username: '',
      description: '',
      duration: 0,
      repetition: 0,
      weight: 0,
      date: new Date(),
      users: []
    }
  }
  
  componentDidMount(){
    axios.get('http://localhost:5000/users/')
      .then(response => {
        if(response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
            username: response.data[0].username
          })
        }
      })
      .catch(error => console.log(error));
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    });
  }

  onChangeRepetition(e) {
    this.setState({
      repetition: e.target.value
    });
  }

  onChangeWeight(e) {
    this.setState({
      weight: e.target.value
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date//will be using a library for the date portion
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      repetition: this.state.repetition,
      weight: this.state.weight,
      date: this.state.date
    }
    console.log(exercise)

		axios.post('http://localhost:5000/exercises/add', exercise)
      .then(res => console.log(res.data))
      .catch(error => console.log(error));

      window.location = '/';
  }

  render() {
    return (
      <div>
        <h3>Create New Exercise Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
                {
                  this.state.users.map((user) => 
                  <option
                    key={user}
                    value={user}>{user}
                  </option>
                  )
                }
            </select>
        </div>
          <div className="form-group">
            <label>Description: </label>
            <input 
              type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <label>Duration (in minutes): </label>
            <input
              type="text"
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
            />
          </div>
          <div className="form-group">
            <label>Reps: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.repetition}
              onChange={this.onChangeRepetition}
            />
          </div> 
          <div className="form-group">
            <label>Weight: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.weight}
              onChange={this.onChangeWeight}
            />
          </div> 
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>
          <div className="form-group">
            <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}