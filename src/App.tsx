import "./index.scss";
import React from "react";
import ReactDOM from "react-dom/client";
import OktaAuth from '@okta/okta-auth-js';
import { Security, SecureRoute } from '@okta/okta-react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Dashboard from "./components/dashboard/dashboard";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";

import store from "./states/store";
import { Provider } from "react-redux";
import LoginCallbackWarpper from "./components/auth/LoginCallbackWrapper";

function App() {
  const oktaAuth = new OktaAuth({
    clientId: '0oaofn5uvbCRk7ua4697',
    issuer: 'https://trial-8768667.okta.com',
    responseType: 'id_token',
    redirectUri: `${window.location.origin}/login/callback`,
    scopes: ['openid', 'profile', 'email', 'groups'],
    pkce: true,
  });


  return (
    <div className="flex flex-col h-full min-h-screen">
      <Security oktaAuth={oktaAuth} restoreOriginalUri={() => { }}>
        <Router>
          <Navbar />
          <div className="flex-1 w-full bg-gray-100 ">
            <Switch>
              <SecureRoute exact path='/' component={Dashboard} />
              {/* <SecureRoute exact path='/profile' component={Profile} /> */}
              <Route path='/login/callback' component={LoginCallbackWarpper} />
              <Route path='*' component={() => <h2>404 page not found!!!</h2>} />
            </Switch>
          </div>
          <Footer />
        </Router>
      </Security>
    </div>
  );
}

const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Failed to find the root element");

const root = ReactDOM.createRoot(rootElement as HTMLElement);

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);

export default App;
