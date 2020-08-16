import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

function AuthRoutes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/forgotpassword" component={ForgotPassword} />
            <Route path="/resetpassword" component={ResetPassword} />
            <Redirect from="*" to="/" />
        </BrowserRouter>
    );
}

export default AuthRoutes;