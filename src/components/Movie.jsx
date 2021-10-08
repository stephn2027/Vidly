import React from 'react'
import Like from './common/Like';

export default function Movie(props) {
  const {handleDeleteMovie,title,numberInStock,dailyRentalRate,_id, genre, like, handleLike,movie}= props; 
    return (
        <React.Fragment>
       
        <tr>
           
            
            <td className="col-3">{title}</td>
            <td className="col-2">{genre.name}</td>
            <td className="col-2">{numberInStock}</td>
            <td className="col-2">{dailyRentalRate}</td>

            <td className="col-2"><Like liked={like} onClick={()=>handleLike(movie)}/></td>

            <td><button 
            className ="btn btn-danger btn-sm"
            onClick={()=>handleDeleteMovie(_id)}
            >Delete</button></td>
            
            
       
           
        </tr> 
        
        </React.Fragment>
       
    )
}
