import React, { Component } from "react";
import MoviesTable from "./moviesTable";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "../common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "../common/listGroup";
import _ from 'lodash';
import NewMovieForm from './newMovieForm';
class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    count:0,
    sortColomn:{path:'title',order:'asc'},
    pageNum:1,
    formData:{_id: "", title: "", genre: {_id: "", name: ""}, numberInStock: "", dailyRentalRate: ""}
    
  };
  componentDidMount() {
    const genres = [{_id:"", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }
  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };
  handleEdit = (movie) => {
    //const formData=this.state.formData;
  const editedMovie={_id:movie._id,title:movie.title , numberInStock: movie.numberInStock, dailyRentalRate: movie.dailyRentalRate, genre: movie.genre.name}
  this.setState({pageNum:2,formData:editedMovie})
  };
  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };
  handleSort=sortColomn=>{
    
    this.setState({sortColomn});
  }
  handleNewMovie=()=>{ 
    const newMovie={_id: this.state.count+1, title: "", genre: {_id: this.state.count+1, name: ""}, numberInStock: "", dailyRentalRate: ""}
    this.setState({pageNum:2,count:this.state.count+1,formData:newMovie})
  }
  handleSave=async(formData)=>{
   const newMovie={_id: formData._id, title: formData.title, genre: {_id: formData._id, name: formData.genre}, numberInStock: formData.numberInStock, dailyRentalRate: formData.dailyRentalRate};
  let posts=[...this.state.movies]
   var index = -1;
    var val = newMovie._id
    var filteredObj = posts.find(function(item, i){
      if(item._id === val){
        index = i;
        return i;
      }
    });
   
    console.log(index,filteredObj);

    this.state.movies.filter((p)=>{
      if(p._id==newMovie._id){
        posts[index]={...newMovie}
        this.setState({pageNum:1,movies:posts})
      }
      else{
        const data=[newMovie,...this.state.movies]
        this.setState({pageNum:1,movies:data})
    
      }
    })
  }
  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      sortColomn,
      selectedGenre,
      movies: allMovies,
      genres,
    } = this.state;
    //console.log(this.state.genres)
    if (count === 0) return <p>There are no movies in the database</p>;
    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;
    const sorted= _.orderBy(filtered,[sortColomn.path],[sortColomn.order])
    const movies = paginate(sorted, currentPage, pageSize);
    return (
      <div className="container">
        {this.state.pageNum===1?(
          <div className="row">
          <div className="col-3">
            <ListGroup
              items={this.state.genres}
              selectedItem={this.state.selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col">
            <button onClick={this.handleNewMovie} className="btn btn-primary">Add New movies</button>
            <p>Showing {filtered.length} movies in the database</p>
            <p>Add button click count : {this.state.count}</p>
            <MoviesTable
              movies={movies}
              sortColomn={sortColomn}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onEdit={this.handleEdit}
              onSort={this.handleSort}
            />
            <Pagination
              itemsCount={filtered.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
       
        ):(
          <NewMovieForm
          onSave={this.handleSave}
          genres={genres}
          formData={this.state.formData}/>
        )}
      
      </div>
    );
  }
}

export default Movies;
