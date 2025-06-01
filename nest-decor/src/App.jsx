import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CustomerManagement from "./pages/admin/customer/index";
import UserManagement from "./pages/admin/user/index";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/admin/customer" component={CustomerManagement} />
        <Route path="/admin/user" component={UserManagement} />
      </Switch>
    </Router>
  );
}

export default App;