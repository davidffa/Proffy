import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import Home from '../pages/Home';
import TeacherList from '../pages/TeacherList';
import TeacherForm from '../pages/TeacherForm';
import Profile from '../pages/Profile';

function AppRoutes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Home}/>
            <Route path="/profile" component={Profile} />
            <Route path="/study" component={TeacherList}/>
            <Route path="/give-classes" component={TeacherForm}/>
            <Redirect from="*" to="/" />
        </BrowserRouter>
    );
}

export default AppRoutes;