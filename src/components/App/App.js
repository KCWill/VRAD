import React, {Component} from 'react';
import './App.css';
import Areas from '../Areas/Areas.js';
import Login from '../Login/Login.js';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      areas: []
    }
  }

  loggingIn = () => {
    this.setState({isLoggedIn: !this.state.isLoggedIn})
  }

  componentDidMount = () => {
    fetch("https://vrad-api.herokuapp.com/api/v1/areas")
      .then(response => response.json())
      .then(areaDetails => {
        const areaNamePromises = areaDetails.areas.map(area => {
          return fetch(`https://vrad-api.herokuapp.com${area.details}`)
            .then(response => response.json())
            .then(info => {
              return {
                // id: details.id,
                // name: details.name,
                // location: details.location,
                // about: details.about,
                // region_code: details.region_code,
                // quick_search: details.quick_search,
                // listings: details.listings,
                ...info
              }
            })

        })
        Promise.all(areaNamePromises)
        .then(areaData => this.setState({areas: areaData}))
      })
        .catch(err => console.error(err))
  }


  render () {
    if(this.state.isLoggedIn === true){
      return (
        <main className="App">
          <header><h1>Vacation Rentals Around Denver</h1><button className='sign-out-btn' type='button'>Sign out!</button> </header>
          {/* <BrowserRouter>
          <Switch>
            <Route 
            exact path='/' 
            render={()=> <Login />} />
            <Route 
            path='/areas'
            render={() => <Areas />} />
            </Switch>
          </BrowserRouter> */}
          <Areas />
          {console.log(this.state)}
        </main>
      );

    } else {
      return (
        <main className='App'>
          <header><h1>Vacation Rentals Around Denver</h1></header>
          <Login loggingIn={this.loggingIn} />
        </main>
      )
    }
  }
}

export default App;
