import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { compose } from 'recompose';

import "./Organization.css"

const OrganizationPage = () => (
    <div className="exhibit">
        <h1>Create your exhibit</h1>
        <Organization />
        <br/>
        <br/>
        <h1>Register your exhibit for an event</h1>
        <RegisterOrganization />
        <br/>
        <br/>
        <h1>See your exhibits: </h1>
        <GetExhibits />
    </div>

)

const INITIAL_STATE = {
    orgName: "",
    showing: false,
    orgDesc: "",
    orgImgSrc: "",
    error: null,
    image: null,
};

class OrganizationBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
        this.onChangeOrgDesc = this.onChangeOrgDesc.bind(this);
        this.onChangeOrgName = this.onChangeOrgName.bind(this);
        this.onChangeImageUpload = this.onChangeImageUpload.bind(this);
    }

    onChangeOrgName(e) {
        this.setState({ orgName: e.target.value });
    }

    onChangeOrgDesc(e) {
        this.setState({ orgDesc: e.target.value });
    }

    onSubmit = event => {
        const { orgName } = this.state;
        const { orgDesc } = this.state;
        const { image } = this.state;
        this.props.firebase.doCreateOrganization(orgName, orgDesc, image);
    }

    onChangeImageUpload(e) {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            this.setState({ image: e.target.files[0] });
            console.log("image uploaded to front end");
        }
    }

    render() {
        return (
            <div>
                <ul>
                    <li>
                        <form>
                            <ul>
                                <li>
                                    <span>Enter Exhibit Name: </span>
                                    <input type='text' onChange={this.onChangeOrgName} />
                                </li>
                                <li>
                                    <span>Enter Exhibit Description: </span>
                                    <input type='text' onChange={this.onChangeOrgDesc} />
                                </li>
                                <li>
                                    <p>Upload Exhibit Logo: </p>
                                    <input type='file' onChange={this.onChangeImageUpload} />
                                </li>
                            </ul>
                        </form>
                    </li>
                    <li>
                        <button className="btn btn-success" onClick={this.onSubmit}>Create Organization</button>
                    </li>
                </ul>
            </div>
        )
    }
}

class OrganizationRegisterBase extends Component {
    constructor(props) {
        super(props);
        this.state = { eventId: 0, orgName: "", image: null };
        this.onChangeEventId = this.onChangeEventId.bind(this);
        this.onChangeOrgName = this.onChangeOrgName.bind(this);

    }

    onChangeEventId(e) {
        this.setState({ eventId: e.target.value });
    }

    onChangeOrgName(e) {
        this.setState({ orgName: e.target.value })
    }



    onSubmit = event => {
        const { eventId } = this.state;
        const { orgName } = this.state;
        this.props.firebase.doRegisterOrganization(eventId, orgName);
    }

    render() {
        return (
            <div>
                <ul>
                    <li>
                        <form>
                            <ul>
                                <li> <span>Enter Exhibit Name: </span>
                                    <input type='text' onChange={this.onChangeOrgName} />
                                </li>
                                <li>
                                    <span>Enter Event ID: </span>
                                    <input type='number' onChange={this.onChangeEventId} />
                                </li>
                            </ul>
                        </form>
                    </li>
                    <li>
                        <button style={{ width: 200 }} className="btn btn-success" onClick={this.onSubmit}>Register Exhibit</button>
                    </li>
                </ul>


            </div>
        )
    }
}

class GetExhibitsBase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exhibits: []
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit = event => {
        this.setState({
            exhibits: this.props.firebase.getExhibitNames()
        });
        console.log(this.state.exhibits);
    }

    render() {
        return (
            <div>
                <button className="btn btn-success" onClick={this.onSubmit}>Get exhibit names: </button>
                <ul>
                    {this.state.exhibits.map(item => {
                        return <li>{item}</li>;
                    })}
                </ul>
            </div>
        )
    }
}

const Organization = compose(
    withRouter,
    withFirebase,
)(OrganizationBase);

const RegisterOrganization = compose(
    withRouter,
    withFirebase,
)(OrganizationRegisterBase);

const GetExhibits = compose(
    withRouter,
    withFirebase,
)(GetExhibitsBase);

export default OrganizationPage;

export { Organization }

export { RegisterOrganization }

export { GetExhibits }
