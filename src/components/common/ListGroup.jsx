import React from 'react';


export default function ListGroup(props) {
  const {handleGenreSelect,genres,selectedGenre,valueProperty,textProperty,searchQuery} = props
    

  return (
    <React.Fragment>
      <ul className="list-group">
      
        {genres.map((genre) => (
          <li
           
            key={genre[valueProperty]}
            className={genre===selectedGenre?'list-group-item active':'list-group-item'}
            style={{ cursor: 'pointer' }}
            onClick={()=>handleGenreSelect(genre)}
          >
            {genre[textProperty]}
            
          </li>
        ))}
      </ul>
      
    </React.Fragment>
  );
}

ListGroup.defaultProps={
  valueProperty:'_id',
  textProperty:'name',

}
