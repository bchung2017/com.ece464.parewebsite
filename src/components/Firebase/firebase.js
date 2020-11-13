import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyB_Icgd5qb8ew5wm8-rjdKfU0GmTmqDl9s',
  databaseURL: 'https://pare-58bd5.firebaseio.com',
  projectId: 'pare-58bd5',
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();


  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  doCreateEvent = (numOfOrgs, eventId) => {
    var uid = this.auth.currentUser.uid;
    var event = this.db.ref('events').child(eventId).set(
      {
        numOfOrgs: numOfOrgs,
        uid: uid
      });
    // this.db.ref('events/' + eventId).update({
    //   numOfOrgs: numOfOrgs
    // });
  }

  doCreateOrganization = (orgName, orgDesc) => {
    var uid = this.auth.currentUser.uid;
    var newOrg = this.db.ref('organizations').push(
      {
        orgName: orgName,
        orgDesc: orgDesc,
        uid: uid
      }
    )
    this.db.ref('organizations').push(
      {
        orgId: newOrg.key,
      }
    )
  }

  doRegisterOrganization = (eventId, orgId) => {
    this.db.ref('events').child(eventId).child("orgs").push(orgId);
  }

  user = uid => this.db.ref(`users/${uid}`);
  users = () => this.db.ref('users');
}

export default Firebase;