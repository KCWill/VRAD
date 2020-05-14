import React, {Component} from 'react';
import './Login.css';
import { BrowserRouter, Link, Redirect } from 'react-router-dom';
 
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedOn: false,
      name: '',
      email: '',
      purpose: 'Vacation'
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.name.length < 1 || this.state.email.length < 1) {
      alert('Please make sure all fields are filled out!');
    }
    this.setState({loggedOn: true});
    this.props.loggingIn(this.state.name, this.state.purpose);
  }

  render() {
    return ( <div className="login-form">
      <form>
        <div className="name-form">
          <p>Name:</p>
          <input placeholder="Name" name='name' value={this.state.name} onChange={this.handleChange}/>
        </div>
        <div className="email-form">
          <p>Email:</p>
          <input placeholder="Email" name='email' value={this.state.email} onChange={this.handleChange}/>
        </div>
        <div className="purpose-form">
          <p>Purpose:</p>
          <select name='purpose' value={this.state.purpose} onChange={this.handleChange}>
            <option value="Vacation">Vacation</option>
            <option value="Business">Business</option>
            <option value="Other">Other</option>
          </select>
        </div>
          <button className="sign-in-btn" type="button" onClick={this.handleSubmit}>Sign In!</button>
      </form>
    </div> )
  }
}


export default Login;
