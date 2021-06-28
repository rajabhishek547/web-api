import React, { Component } from 'react';
import Like from "../common/like";

class MoviesTable extends Component {
  raiseSort=path=>{
    const sortColomn={...this.props.sortColomn};
    if(sortColomn.path===path)
    sortColomn.path=(sortColomn.order==='asc')?'desc':'asc';
    else{
      sortColomn.path=path;
      sortColomn.order='asc';
    }
    this.props.onSort(sortColomn)
  }
  render() { 
    const {movies,onDelete,onLike,onEdit} = this.props;
    return ( 
        <table className="table">
          <thead>
            <tr>
              <th onClick={()=>this.raiseSort("title")}>Title</th>
              <th onClick={()=>this.raiseSort("genre.name")}>Genre</th>
              <th onClick={()=>this.raiseSort("numberInStock")}>Stock</th>
              <th onClick={()=>this.raiseSort("dailyRentalRate")}>Rate</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie.title}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like
                    onClick={() => onLike(movie)}
                    liked={movie.liked}
                  />
                </td>
                <td>
                  <button
                    onClick={() => onDelete(movie)}
                    className="btn btn-danger btn sm"
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => onEdit(movie)}
                    className="btn btn-warning btn sm"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
     );
  }
}

 
export default MoviesTable;