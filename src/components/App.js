import React ,{useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import { Switch , Route, Redirect } from 'react-router-dom'
import Movies from './Movies';

import Rentals from './Rentals';
import Customers from './Customers';
import Navbar from './Navbar';
import '../app.css';
import NotFound from './NotFound';
import MovieForm from './common/MovieForm';
import LoginForm from './common/LoginForm';
 
export const CounterContext = React.createContext();


export default function App() {

    const [counters, setCounters] = useState(countersList);

    
    
    
    
    //functions
    const handleDelete =(id)=>{
        
    setCounters(counters.filter(counter => counter.id !== id));
    };

    const handleIncrement = (counter) => {
     const countersIncrement =[...counters];
      const index = countersIncrement.indexOf(counter);
      countersIncrement[index] = {...counter};
      countersIncrement[index].value++;
      setCounters(countersIncrement);

    };
  
    const handleDecrement = (counter)=>{
        
      const countersIncrement =[...counters];
      const index = countersIncrement.indexOf(counter);
      countersIncrement[index] = {...counter};
      countersIncrement[index].value--;
      setCounters(countersIncrement);
    };

    const handleReset = ()=>{
      
    const countersReset = counters.map(counter=>{
        counter.value  = 0;
        return counter;
      })

      setCounters(countersReset);
    }
    const handleNavbarDisplay = ()=>{
        return counters.filter(counter=>counter.value>0).length;
    };

    const counterContextValue = {
        handleDecrement,
        handleDelete,
        handleReset,
        handleIncrement,
    };
    

    return (
        <div>
        <CounterContext.Provider value={counterContextValue}>
          <Navbar />
        <main className="content">
        <Switch>
          <Route path="/login" component ={LoginForm}/> 
          <Route path="/movies/:id" component ={MovieForm}/>
          <Route path="/customers" component={Customers}/>
          <Route path="/rentals" component={Rentals}/>
          <Route path="/movies" component={Movies}/>
          <Redirect from="/" exact to='/movies'/>
          <Redirect to='/not-found' exact component={NotFound}></Redirect>

        </Switch>
          
          
        </main>
        </CounterContext.Provider>
        </div>
    )
}
const countersList = [
    {
      id: uuidv4(),
      value: 4,
    },
    {
      id: uuidv4(),
      value: 0,
    },
    {
      id: uuidv4(),
      value: 0,
    },
    {
      id: uuidv4(),
      value: 2,    
    }
  ];
  
