import React from 'react';

import PasswordForgetForm from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import "./Account.css";
 
const AccountPage = () => (
  <div className="account">
    <h1>Change Password</h1>
    <PasswordChangeForm />
  </div>
);
 
export default AccountPage; 