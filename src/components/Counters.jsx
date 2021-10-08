import React ,{useContext} from 'react'
import Counter from './Counter';
import { CounterContext } from './App';


export default function Counters({counters}) {
const {handleReset} = useContext(CounterContext);
    

    return (
     
        <main className='container'>
         <button 
         className="btn btn-primary btn m-2"
         onClick={handleReset}
         >
         Reset 
        </button>
        {counters.map((counter) => (
          <Counter 
          key={counter.id} 
          {...counter}
          counterItem= {counter}
          
          
          
          
          />
        ))}
            
        </main>
    )
}


