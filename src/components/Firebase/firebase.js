import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const config = {
  apiKey: "AIzaSyCyyjvL8rUVhHdonZ97S_M1wrwQf8wD2Gk",
  authDomain: "pare2-7a0f7.firebaseapp.com",
  projectId: "pare2-7a0f7",
  storageBucket: "pare2-7a0f7.appspot.com",
  messagingSenderId: "603399702911",
  appId: "1:603399702911:web:c94b4989bffa528732724a",
  measurementId: "G-PB4C68Y4YM",
  databaseURL: 'https://pare2-7a0f7-default-rtdb.firebaseio.com/',
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.storage = app.storage();
    this.auth = app.auth();
    this.db = app.database();

  }

  getEventKeys = () => {
    var uid = this.auth.currentUser.uid;
    var keys = [];
    console.log(uid);
    app.database().ref('events').orderByChild('uid').equalTo(uid).on("child_added",
      function (snapshot) {
        keys.push(snapshot.key);
      });
    console.log(keys);
    return keys;
  }

  getExhibitNames = () => {
    var uid = this.auth.currentUser.uid;
    var names = [];
    var name;
    console.log(uid);
    app.database().ref('orgs').orderByChild('uid').equalTo(uid).on("child_added",
      function (snapshot) {
        names.push(snapshot.child("orgName").val());
      });
    console.log(names);
    return names;
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
  }

  doGetCreatedEvents = () => {
    var uid = this.auth.currentUser.uid;
    this.db.ref('events').orderByChild('uid').equalTo(uid).on("child_added",
      function (snapshot) {

      });
  }


  doCreateOrganization = (orgName, orgDesc, image) => {
    var uid = this.auth.currentUser.uid;
    var imgUrl;
    this.storage.ref('org_images/' + orgName).put(image).then(snapshot => {
      snapshot.ref.getDownloadURL().then(url => {
        this.db.ref('orgs').push(
          {
            orgName: orgName,
            orgDesc: orgDesc,
            imgUrl: url,
            uid: uid
          });
        console.log("url: ", url);
        imgUrl = url;
      })
      console.log("Uploaded blob");
    })
  }

  doRegisterOrganization = (eventId, orgId) => {
    this.db.ref('events').child(eventId).child("orgs").push(orgId);

  }

  user = uid => this.db.ref(`users/${uid}`);
  users = () => this.db.ref('users');
}

export default Firebase;