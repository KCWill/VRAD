import React, {Component} from 'react';
import './Login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      loggedOn: false,
    }
  }


  render() {
    return ( <div className="login-form">
      <form>
        <div className="name-form">
          <p>Name</p>
          <input placeholder="Name"></input>
        </div>
        <div className="email-form">
          <p>Email</p>
          <input placeholder="Email"></input>
        </div>
        <div className="purpose-form">
          <p>Purpose</p>
          <select placeholder="Name">
            <option value="Vaction">Vaction</option>
            <option value="Buisness">Buisness</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button className="sign-in-btn" type="button" role="button">Sign In!</button>
      </form>
    </div> )
  }
}


export default Login;
