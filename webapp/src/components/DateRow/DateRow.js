import React, { useState, useEffect } from 'react';
import '../../configs';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class DateRow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          startDate: new Date()
        };
        this.handleChange = this.handleChange.bind(this);
      }
     
      handleChange(date) {
        this.setState({
          startDate: date
        });
      }

    render() {
        return(
            <div className="App">
                <div className="row">
                    <div className="col-md-6">

                    </div>
                    <div className="col-md-6">
                        <label><b>Start Date: </b></label>
                        {'\u00A0'}<DatePicker selected={this.state.startDate} onChange={this.handleChange} />

                        {'\u00A0'}<label><b>End Date: </b></label>
                        {'\u00A0'}<DatePicker selected={this.state.startDate} onChange={this.handleChange} />

                        <button type="button" class="btn btn-light">Submit</button>
                    </div>
                </div>

            </div>
        );
    }
}

export default DateRow;