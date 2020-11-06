import app from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: 'AIzaSyB_Icgd5qb8ew5wm8-rjdKfU0GmTmqDl9s',
    databaseURL: 'https://pare-58bd5.firebaseio.com',
    projectId: 'pare-58bd5',
  };

  class Firebase {
    constructor() {
      app.initializeApp(config);

      this.auth = app.auth();
    }

    doCreateUserWithEmailAndPassword = (email, password) => 
        this.auth.createUserWithEmailAndPassword(email, password);
    
    doSignInWithEmailAndPassword = (email, password) => 
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
    
    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);
  }

  export default Firebase;