import logo from './logo.svg';
import './App.css';
import {Router, Route, Switch} from 'react-router-dom'
import {createBrowserHistory} from 'history'
import { Fragment } from 'react';
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate';
import HomePage from './pages/HomePage/HomePage';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Detail from './pages/Detail/Detail';
import { BookingTemplate } from './templates/BookingTemplate/BookingTemplate';
import BookingTicket from './components/BookingTicket/BookingTicket';
import Loading from './components/Loading/Loading';
import BookingPage from './pages/BookingPage/BookingPage';
import Dashboard from './pages/Admin/Dashboard/Dashboard';
import Films from './pages/Admin/Films/Films';
import ShowTime from './pages/Admin/ShowTime/ShowTime';
import { AdminTemplate } from './templates/AdminTemplate/AdminTemplate';
import AddNew from './pages/Admin/Films/AddNew/AddNew';
import EditFilms from './pages/Admin/Films/EditFilms/EditFilms';
import Users from "./pages/Admin/Users/Users"
import AddUser from './pages/Admin/Users/AddUser/AddUser'
import EditUser from './pages/Admin/Users/EditUser/EditUser';
export const history = createBrowserHistory();
function App() {
  return (
   <Router history={history}>
     <Loading/>
     <Switch>
        <HomeTemplate path="/home" exact component={HomePage} />
        <HomeTemplate path="/login" exact component={Login} />
        <HomeTemplate path="/register" exact component={Register} />
        <HomeTemplate path="/detail/:id" exact component={Detail} />


        <BookingTemplate path="/booking/:id" exact component={BookingPage} />


        <AdminTemplate path="/admin" exact component={Dashboard} />
        <AdminTemplate path="/admin/users" exact component={Users} />
        <AdminTemplate path="/admin/users/adduser" exact component={AddUser} />
        <AdminTemplate path="/admin/users/edit/:taikhoan" exact component={EditUser} />

        <AdminTemplate path="/admin/films" exact component={Films} />
        <AdminTemplate path="/admin/films/edit/:id" exact component={EditFilms} />
        <AdminTemplate path="/admin/films/addnew" exact component={AddNew} />
        <AdminTemplate path="/admin/films/showtime/:id/:tenPhim" exact component={ShowTime} />

        {/* <AdminTemplate path="/admin/showtime" exact component={ShowTime} /> */}




        <HomeTemplate path="/" exact component={HomePage} />
     </Switch>
   </Router>
  );
}

export default App;
