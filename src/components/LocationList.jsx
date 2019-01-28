import React, { Component } from 'react';
import axios from 'axios';

class LocationList extends Component {

    state = {
        options: {
            type: 'restaurant',
            radius: '1000',
            name: ''
        },
        currentLocation: {},
        nearBy: []
    }

    onChange = (e) => {
        const options = { ...this.state.options };
        options[e.currentTarget.name] = e.currentTarget.value;
        this.setState({ options: options });
    }

    onSubmit = (e) => {
        e.preventDefault();
        axios.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.state.currentLocation.lat},${this.state.currentLocation.lng}&radius=${this.state.options.radius}&type=${this.state.options.type}&keyword=${this.state.options.name}&key=AIzaSyBN2l5NwX3tDt8vUXKPPlEPSFhoZxzNhiM`)
            .then((res) => {
                console.log(res.data.results)
                this.setState({ nearBy: res.data.results });
            })
            .catch((err) => { console.log(err) })
    }

    componentDidMount() {
        if (navigator) {
            navigator.geolocation.getCurrentPosition((pos) => {
                const location = {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                }
                console.log(location);
                this.setState({ currentLocation: location });
            });
        }
    }

    render() {

        return (
            <React.Fragment>
                <form className="my-3" onSubmit={this.onSubmit}>
                    <div className="form-row">
                        <div className="col">
                            <div class="input-group mb-2">
                                <div class="input-group-prepend">
                                    <div class="input-group-text">Type</div>
                                </div>
                                <select
                                    className="col form-control"
                                    id="inlineFormCustomSelectPref"
                                    name="type"
                                    onChange={this.onChange}
                                    value={this.state.options.type}
                                >
                                    <option defaultValue>Type</option>
                                    <option value="airport">Airport</option>
                                    <option value="atm">ATM</option>
                                    <option value="restaurant">Restaurant</option>
                                    <option value="bank">Bank</option>
                                    <option value="bar">Bar</option>
                                    <option value="car_rental">Car Rental</option>
                                    <option value="church">Church</option>
                                    <option value="dentist">Dentist</option>
                                    <option value="doctor">Doctor</option>
                                    <option value="gym">Gym</option>
                                    <option value="hindu_temple">Hindu Temple</option>
                                    <option value="police">Police Station</option>
                                    <option value="train_station">Railway Station</option>
                                    <option value="supermarket">Supermarket</option>
                                </select>
                            </div>
                        </div>

                        <div className="col">
                            <div class="input-group mb-2">
                                <div class="input-group-prepend">
                                    <div class="input-group-text">In Meter</div>
                                </div>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Radius"
                                    name="radius"
                                    onChange={this.onChange}
                                    value={this.state.options.radius}
                                />
                            </div>
                        </div>
                        <div className="col">
                            <div class="input-group mb-2">
                                <div class="input-group-prepend">
                                    <div class="input-group-text">Keyword</div>
                                </div>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Name"
                                    name="name"
                                    onChange={this.onChange}
                                    value={this.state.options.name}
                                />
                            </div>
                        </div>
                        <div className="col">
                            <button className="btn btn-primary btn-block" type="submit">Search</button>
                        </div>
                    </div>
                </form>
                <div className="card-columns">
                    {this.state.nearBy.map((item) => {
                        const { name, opening_hours, rating } = item;
                        return (
                            <div className="card text-center">
                                <div className="card-body">
                                    <h5 className="card-title">{name}</h5>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item"><strong>Status</strong>:<span className="badge badge-success ml-2">{opening_hours != undefined && opening_hours.open_now ? 'Open' : 'Closed'}</span></li>
                                    <li className="list-group-item">
                                        <button type="button" className="btn btn-primary">
                                            Rating <span className="badge badge-light">{rating}</span>
                                            <span className="sr-only">unread messages</span>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </React.Fragment >
        );
    }
}

export default LocationList;