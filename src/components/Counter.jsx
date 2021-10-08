import React,{useContext} from 'react';
import { CounterContext } from './App';

export default function Counter(counter) {
  const {handleDelete,handleDecrement,handleIncrement} = useContext(CounterContext);
  const {id,value,counterItem} = counter;
  
  
  function getBadgeClasses() {
    let classes = 'badge m-2 badge-';
    classes += value === 0 ? 'warning' : 'primary';
    return classes;
  }
  
 
  

  const formatCount = () => {
    return value === 0 ? 'Zero' : value;

  };
  return (
    <React.Fragment>
    <div className='row'>
    <div className="col-1">
      <span 
      className={`${getBadgeClasses()} `} 
      >{formatCount()}
      
      </span>
      
    </div>
    <div className="col">
    <button 
        onClick={() => handleIncrement(counterItem)}
        className="btn btn-secondary btn-sm m-2"
      >
       +
      </button>
      <button disabled={value === 0? true: false}
        onClick={ () => handleDecrement(counterItem)}
        className="btn btn-secondary btn-sm m-2"
      >
        -
      </button>
      <button 
      className="btn btn-danger btn-sm m-2 "
      onClick={()=>handleDelete(id)}
      >
       
        &times;
      </button>
    </div>
      
      
     
      </div>
    </React.Fragment>
  );
}
