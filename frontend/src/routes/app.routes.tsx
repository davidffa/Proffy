import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from '../pages/Home';
import TeacherList from '../pages/TeacherList';
import TeacherForm from '../pages/TeacherForm';

function AppRoutes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Home}/>
            <Route path="/study" component={TeacherList}/>
            <Route path="/give-classes" component={TeacherForm}/>
        </BrowserRouter>
    );
}

export default AppRoutes;