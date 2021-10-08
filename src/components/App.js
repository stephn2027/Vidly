import React ,{useState} from 'react';
import Counters from './Counters';
import '../app.css';
import Navbar from './Navbar';
import {v4 as uuidv4} from 'uuid';
 
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
        <React.Fragment>
        <CounterContext.Provider value={counterContextValue}>
          <Navbar handleNavbarDisplay={handleNavbarDisplay}/>
        <main className="container">
       
           <Counters counters={counters}
          
           />
          
        </main>
        </CounterContext.Provider>
        </React.Fragment>
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
  
