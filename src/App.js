import React from 'react';
import './App.css';
import Home from './components/home/Home';
import Create from './components/create/Create';
import Header from './components/header/Header';
import { BrowserRouter, Route } from 'react-router-dom';
import FormComplete from './components/home/FormComplete';
import Login from './components/login/Login';
import PrivateRoute from './components/routes/PrivateRoute'
import ProtectedRoute from './components/routes/ProtectedRoute'
import SubmittedForms from './components/submittedForms/SubmittedForms';
import SubmittedFormContent from './components/submittedForms/SubmittedFormContent';

class App extends React.Component {

  render() {
    return (
      <div className="ui container">
        <BrowserRouter>
          <div>
            <Route component={Header}></Route>
            <PrivateRoute path="/" exact component={Home}  ></PrivateRoute>
            <ProtectedRoute path="/create" component={Create}></ProtectedRoute>
            <ProtectedRoute path="/submittedForms" exact component={SubmittedForms}></ProtectedRoute>
            <ProtectedRoute path="/submittedForms/:formId" exact component={SubmittedFormContent}></ProtectedRoute>
            <PrivateRoute path="/forms/:formId" component={FormComplete} ></PrivateRoute>
            <Route path="/login" component={Login} ></Route>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
