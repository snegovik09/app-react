import React from "react";
import { Route, Switch } from "react-router-dom";
import Users from "./users";
import CheckId from "./checkId";
const Check = () => {
    return (
        <div>
            <Switch>
                <Route exact path={`/users`} component={Users} />
                <Route path={`/users/:id?`} component={CheckId} />
            </Switch>
        </div>
    );
};

export default Check;
