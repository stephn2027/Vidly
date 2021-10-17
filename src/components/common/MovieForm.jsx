import React from 'react';
import Form from './Form';
import Joi from 'joi-browser';
import { getGenres } from '../../services/fakeGenreService';
import { getMovie, saveMovie } from '../../services/fakeMovieService';

export default class MovieForm extends Form {
    
    state={
        data: {title:"",genreId:"",numberInStock:"",dailyRentalRate:""},
        genres:[],
        errors: {},
       
        
    };
      
   
   
    
   schema = {
        _id: Joi.string(),
        title: Joi.string().required().label('Title'),
        numberInStock: Joi.number().integer().min(0).max(100).required().label('Number In Stock'),
        genreId: Joi.string().required().label("Genre"),
        dailyRentalRate: Joi.number().min(-10).max(10).label('Daily Rental Rate'),
      

    };
    
    populateGenres(){
            const genres = getGenres();
            this.setState({genres});
            
        }
    populateMovie(){
        const movieId = this.props.match.params.id;
        if(movieId==="new")return;
       
        const movie= getMovie(movieId);
        if(!movie) return this.props.history.replace('/not-found');
     
        this.setState({data: this.displayToView(movie)});
      
        
        
    }
   
    
    componentDidMount(){
       this.populateGenres();
       this.populateMovie();
        }

    displayToView(movie){
            return (
                {
                    _id: movie._id,
                    title:movie.title,
                    genreId:movie.genre._id,
                    numberInStock:movie.numberInStock,
                    dailyRentalRate:movie.dailyRentalRate,
                }
                );
    }

    doSubmit=  ()=>{
        saveMovie(this.state.data);
        
        this.props.history.push('/movies');
   }
    
  render(){
  
      
      return (
      <div className="container">
        <h1>Movie Form</h1>
        
        <form onSubmit={this.handleSubmit}>
        {this.renderInput('title','Title')}
        {this.renderSelected('genreId','Genre',this.state.genres)}
        {this.renderInput('numberInStock','Number in Stock',"number")}
        {this.renderInput('dailyRentalRate','Rate',"number")}
          {this.renderButton("Save")}
          </form>
      </div>
    );
  }
}

