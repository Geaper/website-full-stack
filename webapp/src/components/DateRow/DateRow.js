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
                    <div className="col-md-12">
                    <div className="text-right" style={{marginTop: "5px"}}>
                        <label><b>Start Date: </b></label>
                        {'\u00A0'}<DatePicker selected={this.state.startDate} onChange={this.handleChange} />

                        {'\u00A0'}<label><b>End Date: </b></label>
                        {'\u00A0'}<DatePicker selected={this.state.startDate} onChange={this.handleChange} />

                        <button type="button" class="btn btn-info btn-sm" style={{marginLeft: "10px"}}>Submit <i class="fab fa-get-pocket"></i></button>
                        </div>
                    </div>
                </div>
                <hr style={{marginTop: "0"}}/>
            </div>
        );
    }
}

export default DateRow;