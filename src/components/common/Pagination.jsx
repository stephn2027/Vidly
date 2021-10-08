import React from 'react'
import _ from "lodash";
import PropTypes from 'prop-types';

export default function Pagination(props) {
    const {numberOfMovies, pageSize,handlePageChange,currentPage} = props;

    const pagesCount = Math.ceil(numberOfMovies / pageSize);
    if(pagesCount===1) return null;
     const pages = _.range(1, pagesCount+1);
     
     

    return (
        
        <nav className="Page navigation example m-3">  
            <ul className="pagination pagination-md">

                {pages.map(page=>(
                    <li key={page}
                    className={page===currentPage?'page-item active':'page-item'}>
                    <a 
                    className="page-link"
                    onClick={()=>handlePageChange(page)}
                    >
                    {page}
                    </a>
                </li>
                ))}
                
            </ul>
        </nav>
            
        
    )
}

Pagination.propTypes = {
    numberOfMovies: PropTypes.number.isRequired,
    pageSize:PropTypes.number.isRequired, 
    handlePageChange: PropTypes.func.isRequired, 
    currentPage: PropTypes.number.isRequired,
}

