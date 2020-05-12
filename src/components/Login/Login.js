import React, {Component} from 'react';
import './Login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      loggedOn: false,
      name: '',
      email: '',
      purpose: 'Vaction'
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
            <option value="Vaction">Vaction</option>
            <option value="Buisness">Buisness</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button className="sign-in-btn" type="button" onClick={this.handleSubmit}>Sign In!</button>
      </form>
    </div> )
  }
}


export default Login;
