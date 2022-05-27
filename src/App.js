import logo from './logo.svg';
import './App.css';
import {Router, Route, Switch} from 'react-router-dom'
import {createBrowserHistory} from 'history'
import { Fragment } from 'react';
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate';
import HomePage from './pages/HomePage/HomePage';
export const history = createBrowserHistory();
function App() {
  return (
   <Router history={history}>
     <Switch>
        <HomeTemplate path="/" exact component={HomePage} />
     </Switch>
   </Router>
  );
}

export default App;
