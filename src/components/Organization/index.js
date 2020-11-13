import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { compose } from 'recompose';

const OrganizationPage = () => (
    <div>
        <h1>Create your organization and register for events</h1>
        <Organization />
        <RegisterOrganization />
    </div>

)

const INITIAL_STATE = {
    orgName: "",
    showing: false,
    orgDesc: "",
    orgImgSrc: "",
    error: null,
};

class OrganizationBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
        this.onChangeOrgDesc = this.onChangeOrgDesc.bind(this);
        this.onChangeOrgName = this.onChangeOrgName.bind(this);
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
        this.props.firebase.doRegisterOrganization(orgName, orgDesc);
    }



    render() {
        return (
            <div>
                <form>
                    <span>Enter Organization Name: </span>
                    <input type='text' onChange={this.onChangeOrgName} />
                    <span>Enter Organization Description: </span>
                    <input type='text' onChange={this.onChangeOrgDesc} />
                </form>
                <button className="btn btn-success" onClick={this.onSubmit}>Create Organization</button>

            </div>
        )
    }
}

class OrganizationRegisterBase extends Component {
    constructor(props) {
        super(props);
        this.state = { eventId: 0, orgName: "" };
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
                <form>
                    <span>Enter Organization Name</span>
                    <input type='text' onChange={this.onChangeOrgName} />
                    <span>Enter Event ID</span>
                    <input type='number' onChange={this.onChangeEventId} />
                </form>
                <button className="btn btn-success" onClick={this.onSubmit}>Register Organization</button>

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

export default OrganizationPage;

export { Organization }

export { RegisterOrganization }
