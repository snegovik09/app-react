import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import NavBar from "./components/ui/navBar";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualitiesProvider } from "./hooks/useQualities";

const App = () => {
    return (
        <div>
            {<NavBar />}
            <ProfessionProvider>
                <QualitiesProvider>
                    <Switch>
                        <Route path={"/login/:type?"} component={Login} />
                        <Route
                            path={"/users/:userId?/:edit?"}
                            component={Users}
                        />
                        <Route exact path={"/"} component={Main} />
                        <Redirect to={"/"} />
                    </Switch>
                </QualitiesProvider>
            </ProfessionProvider>
            <ToastContainer />
        </div>
    );
};

export default App;
