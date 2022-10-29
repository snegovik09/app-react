import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import NavBar from "./components/navBar";

const App = () => {
    return (
        <div>
            {<NavBar />}
            <Switch>
                <Route exact path={"/"} component={Main} />
                <Route path={"/login"} component={Login} />
                <Route path={"/users/:userId?"} component={Users} />
                <Redirect to={"/"} />
            </Switch>
        </div>
    );
};

export default App;
