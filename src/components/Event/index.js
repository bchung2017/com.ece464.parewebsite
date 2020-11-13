import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { compose } from 'recompose';

const CreateEventPage = () => (
    <div>
        <h1>Create an event</h1>
        <CreateEvent />
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
    }

    onChange(e) {
        this.setState({ numberOfOrgs: e.target.value });
        this.setState({ showing: !this.state.showing});
        this.setState({ eventId: Math.floor(Math.random()*1000)})
    }

    render() {
        // const {showing} = this.state.showing;
        return (
            <div>
                <form name="Select number of organizations">
                    <span>Choose number of organizations at your event: </span>
                    <select onChange={this.onChange}>
                        <option selected disabled>0</option>
                        <option value="6">6</option>
                    </select>
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

export default CreateEventPage;

export { CreateEvent }