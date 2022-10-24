import React from "react";
import { Route, Switch } from "react-router-dom";
import Main from "./components/pages/main";
import Navigation from "./components/navigation";
import Login from "./components/pages/login";
import CheckUsers from "./components/checkUsers";

const App = () => {
    return (
        <div>
            {<Navigation />}
            <Switch>
                <Route exact path={"/"} component={Main} />
                <Route path={"/login"} component={Login} />
                <Route path={"/users/:userId?"} component={CheckUsers} />
            </Switch>
        </div>
    );
};

export default App;
