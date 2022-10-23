import React from "react";
import { Route, Switch } from "react-router-dom";
import Main from "./components/main";
import Navigation from "./components/navigation";
import Login from "./components/login";
import CheckUsers from "./components/checkUsers";

const App = () => {
    return (
        <div>
            {<Navigation />}
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/login" component={Login} />
                <Route path={"/users"} component={CheckUsers} />
            </Switch>
        </div>
    );
};

export default App;
