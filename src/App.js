import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

export class App extends Component {
  constructor() {
    super();

    this.state = {
      state: "",
      office: "",
      politicians: [],
      district: null,
      phone: null,
      address: "",
      website: "",
      detailName: ""
    };
  }

  handleOffice = value => {
    this.setState({
      office: value
    });
  };

  handleState = value => {
    this.setState({
      state: value
    });
  };

  submit = () => {
    if (this.state.office === "") {
      alert("Please select a state and a political office");
    } else if (this.state.state === "") {
      alert("Please select a state and a political office");
    } else if (this.state.office === "" && this.state.state === "") {
      alert("Please select a state and a political office");
    } else if (this.state.office === "representative") {
      axios
        .get(`http://127.0.0.1:3000/representatives/${this.state.state}`)
        .then(response => {
          this.setState({
            politicians: response.data.results
          });
        });
    } else if (this.state.office === "senator") {
      axios
        .get(`http://127.0.0.1:3000/senators/${this.state.state}`)
        .then(response => {
          console.log(response)
          this.setState({
            politicians: response.data.results
          });
        });
    }
  };

  moreInfo = value => {
    let polHolder = this.state.politicians[value];

    this.setState({
      district: polHolder.district,
      phone: polHolder.phone,
      address: polHolder.office,
      website: polHolder.link,
      detailName: polHolder.name
    });
  };

  render() {
    let displayPoliticians = this.state.politicians.map((current, index) => {
      return (
        <div className="politicians" key={current + index}>
          <button
            className="politician-button"
            onClick={() => this.moreInfo(index)}
          >
            {current.name}
          </button>
          {current.party}
        </div>
      );
    });

    return (
      <div className="App">
        <div className="app-container">
          <div className="title">
            <p className="title-who">Who's My Representative</p>
          </div>

          <div className="dropdown">
            <div className="dropdown-container">
              <select
                name="office"
                onChange={e => this.handleOffice(e.target.value)}
              >
                <option value="">Select Office</option>
                <option value="representative">Representative</option>
                <option value="senator">Senator</option>
              </select>

              <select
                name="select"
                onChange={e => this.handleState(e.target.value)}
              >
                <option value="">Choose State</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illnois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MS">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select>

              <button className="dropdown-button" onClick={() => this.submit()}>
                Sumbit
              </button>
            </div>
          </div>

          <div className="results">
            <div className="results-left">
              <div className="results-left-header">List</div>

              <div className="results-left-title">
                <div className="column-left">
                  <p>Name</p>
                </div>

                <div className="column-right">
                  <p>Party</p>
                </div>
              </div>
              {displayPoliticians}
            </div>

            <div className="results-right">
              <div className="results-right-header">Info</div>

              <div className="gray-result">
                <p>Name:</p>
                <div className="detail">{this.state.detailName}</div>
              </div>
              <div className="gray-result">
                <p>District:</p>{" "}
                <div className="detail">{this.state.district}</div>
              </div>
              <div className="gray-result">
                <p>Phone:</p> <div className="detail">{this.state.phone}</div>
              </div>
              <div className="gray-result">
                <p>Office:</p>{" "}
                <div className="detail">{this.state.address}</div>
              </div>
              <div className="gray-result">
                <p>Website:</p>{" "}
                <div className="detail">{this.state.website}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
