import React from 'react'

export default function MovieForm({match,history}) {
    const handleSave = ()=>{
        history.push('/movies');
    };
    

    return (
        <div>
            <h1 className="header">Movie Form {match.params.id}</h1>
            <button onClick={()=>{handleSave()}}>Save</button>
        </div>
    )
}

