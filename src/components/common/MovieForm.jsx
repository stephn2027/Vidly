import React from 'react';
import Form from './Form';
import Joi from 'joi-browser';
import { getGenres } from '../../services/genreService';
import { getMovie, saveMovie } from '../../services/movieService';
import { toast } from 'react-toastify';

export default class MovieForm extends Form {
  state = {
    data: { title: '', genreId: '', numberInStock: '', dailyRentalRate: '' },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label('Title'),
    numberInStock: Joi.number()
      .integer()
      .min(0)
      .max(100)
      .required()
      .label('Number In Stock'),
    genreId: Joi.string().required().label('Genre'),
    dailyRentalRate: Joi.number().min(-10).max(10).label('Daily Rental Rate'),
  };

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
   }

  async populateGenres() {
    const { data: genres } = await getGenres();

    console.log(genres);
    this.setState({ genres });
  }

  async populateMovie() {
      try {
        const movieId = this.props.match.params.id;
        if (movieId === 'new') return;

      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.displayToView(movie) });
    } catch (error) {
      if (error.response && error.response.status === 404);
         this.props.history.replace('/not-found');
    }
  }

 

  displayToView(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = async () => {
    await saveMovie(this.state.data);

    this.props.history.push('/movies');
  };

  render() {
    return (
      <div className="container">
        <h1>Movie Form</h1>

        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title')}
          {this.renderSelected('genreId', 'Genre', this.state.genres)}
          {this.renderInput('numberInStock', 'Number in Stock', 'number')}
          {this.renderInput('dailyRentalRate', 'Rate', 'number')}
          {this.renderButton('Save')}
        </form>
      </div>
    );
  }
}
