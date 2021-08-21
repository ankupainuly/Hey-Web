import { Component } from "react/cjs/react.development";

import ReactLoading from 'react-loading';

import { Route,
          BrowserRouter as Router,
          Switch
} from "react-router-dom";

import Chat from './pages/Chat';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

import { auth } from './services/firebase';

import { PrivateRoute, PublicRoute } from './components/Routes';

import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

class App extends Component
{
  constructor() {
    super();

    this.state = {
      authenticated: false,
      loading: true,
    };
  }

  componentDidMount() {
    auth().onAuthStateChanged((user) =>{
        if (user) {
            this.setState({
              authenticated: true,
              loading: false,
            })
        } else {
            this.setState({
              authenticated: false,
              loading: false,
            });
        }
    });
  }

  render() {
    return this.state.loading ? (
        <div className="loading-indicator">
            <ReactLoading type="spin" color="blue" height={'3%'} width={'3%'}/>
        </div>
      ) : (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute path="/chat" authenticated={this.state.authenticated} component={Chat} />
          <PublicRoute path="/login" authenticated={this.state.authenticated} component={Login} />
          <PublicRoute path="/signup" authenticated={this.state.authenticated} component={Signup} />
        </Switch>
      </Router>
    );
    
  }
}
export default App;