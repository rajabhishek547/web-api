import React, { Component } from "react";
class NewMovieForm extends Component {
  state = {
    genres:["Action","Comedy","Thriller"],
    formData:this.props.formData
    
  };
  handleChange = (e) => {
      const data={...this.state.formData};
      data[e.currentTarget.name]=e.currentTarget.value;
      this.setState({formData:data})
  };
  handleSave=()=>{
    this.props.onSave(this.state.formData)
  }
  render() {
    return (
      <div className="container">
        <form>
          <h1>Movie Form</h1>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
            value={this.state.formData.title}
              onChange={this.handleChange}
              type="text"
              name="title"
              id="title"
              className="form-control"
            />
          </div>
          <div className="form-group">
          <label htmlFor="genre">Genre</label>
          <select onChange={this.handleChange} 
          value={this.state.formData.genre}
          id="genre"
          name="genre"
           className="custom-select custom-select-lg mb-2">
          <option></option>
            {this.state.genres.map((g) => (
              <option
              key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          </div>
          <div className="form-group">
            <label htmlFor="numberInStock">Number In Stock</label>
            <input
            value={this.state.formData.numberInStock}
            onChange={this.handleChange}
              name="numberInStock"
              id="numberInStock"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="dailyRentalRate">Rate</label>
            <input
             onChange={this.handleChange}
             value={this.state.formData.dailyRentalRate}
              name="dailyRentalRate"
              id="dailyRentalRate"
              type="text"
              className="form-control"
            />
          </div>
        </form>
        <button onClick={this.handleSave} className="btn btn-primary">Save Movie</button>
      </div>
    );
  }
}

export default NewMovieForm;
