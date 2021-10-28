import React ,{useEffect, useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import { Switch , Route, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Movies from './Movies';
import Rentals from './Rentals';
import Customers from './Customers';
import Navbar from './Navbar';
import NotFound from './NotFound';
import MovieForm from './common/MovieForm';
import LoginFormA from './LoginFormA';
import RegisterForm from './RegisterForm';
import Logout from './Logout';
import Profile from './Profile';
import auth from '../services/authService';
import ProtectedRoute from './common/ProtectedRoute';
import '../app.css';  
import 'react-toastify/dist/ReactToastify.css';

 
export const CounterContext = React.createContext();


export default function App() {
 
  const [user,setUser] = useState(null);

  useEffect(()=>{
   const user = auth.getCurrentUser();
    setUser(user);
  },[]);
   

  // const [counters, setCounters] = useState(countersList);

    //functions
    // const handleDelete =(id)=>{
        
    // setCounters(counters.filter(counter => counter.id !== id));
    // };

    // const handleIncrement = (counter) => {
    //  const countersIncrement =[...counters];
    //   const index = countersIncrement.indexOf(counter);
    //   countersIncrement[index] = {...counter};
    //   countersIncrement[index].value++;
    //   setCounters(countersIncrement);

    // };
  
    // const handleDecrement = (counter)=>{
        
    //   const countersIncrement =[...counters];
    //   const index = countersIncrement.indexOf(counter);
    //   countersIncrement[index] = {...counter};
    //   countersIncrement[index].value--;
    //   setCounters(countersIncrement);
    // };

    // const handleReset = ()=>{
      
    // const countersReset = counters.map(counter=>{
    //     counter.value  = 0;
    //     return counter;
    //   })

    //   setCounters(countersReset);
    // }
    // const handleNavbarDisplay = ()=>{
    //     return counters.filter(counter=>counter.value>0).length;
    // };

    // const counterContextValue = {
    //     handleDecrement,
    //     handleDelete,
    //     handleReset,
    //     handleIncrement,
    // };
    

    return (
        
        <React.Fragment>
        <ToastContainer/>
          <Navbar user={user}/>
        <main className="content">
        <Switch>
          <Route path="/login" component ={LoginFormA}/> 
          <ProtectedRoute path="/movies/:id" component={MovieForm}/>
          <Route path="/customers" component={Customers}/>
          <Route path="/rentals" component={Rentals}/>
          <Route path="/movies" render ={props=><Movies {...props} user={user}/>}/>
          <Route path="/register" component={RegisterForm}/>
          <Route path="/log-out" component={Logout}/>
          <Route path="/profile" component={Profile}/>

          <Redirect from="/" exact to='/movies'/>
          <Route path='/not-found' exact component={NotFound}></Route>

        </Switch>
          
          
        </main>
        </React.Fragment>
        
    )
}
// const countersList = [
//     {
//       id: uuidv4(),
//       value: 4,
//     },
//     {
//       id: uuidv4(),
//       value: 0,
//     },
//     {
//       id: uuidv4(),
//       value: 0,
//     },
//     {
//       id: uuidv4(),
//       value: 2,    
//     }
//   ];
  
