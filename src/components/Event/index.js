import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { compose } from 'recompose';

import "./Event.css";

const CreateEventPage = () => (
    <div className="event">
        <h1>Create an event</h1>
        <CreateEvent />
        <br />
        <h1>Your events</h1>
        <GetEvents />
    </div>
);

const INITIAL_STATE = {
    numberOfOrgs: 0,
    showing: false,
    eventId: -1,
    error: null,
};

class CreateEventBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit = event => {
        const { numberOfOrgs } = this.state;
        this.props.firebase.doCreateEvent(numberOfOrgs, this.state.eventId);
        this.setState({ showing: !this.state.showing });
    }

    onChange(e) {
        this.setState({ numberOfOrgs: e.target.value });
        this.setState({ eventId: Math.floor(Math.random() * 1000) })
    }

    render() {
        return (
            <div>
                <form name="Select number of organizations">
                    <span>Choose number of organizations at your event: </span>
                    <input type="number" onChange={this.onChange} min="1" max="36" />
                </form>
                <button className="btn btn-success" onClick={this.onSubmit}>Create event</button>
                { this.state.showing
                    ? <div>Your event ID is: {this.state.eventId}</div>
                    : null
                }
            </div>
        );
    }
}

const CreateEvent = compose(
    withRouter,
    withFirebase,
)(CreateEventBase);

class GetEventsBase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keys: []
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit = event => {
        this.setState({
            keys: this.props.firebase.getEventKeys()
        });
    }


    render() {
        return (
            <div>
                <button className="btn btn-success" onClick={this.onSubmit}>Get event keys</button>
                <ul>
                    {this.state.keys.map(item => {
                        return <li>{item}</li>;
                    })}
                </ul>
                <br />
                <br />
            </div>
        )
    }
}

const GetEvents = compose(
    withRouter,
    withFirebase,
)(GetEventsBase);

export default CreateEventPage;

export { CreateEvent }

export { GetEvents }