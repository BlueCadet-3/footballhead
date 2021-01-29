import { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import AuthPage from "../AuthPage/AuthPage";
import NewOrderPage from "../NewOrderPage/NewOrderPage";
import Dashboard from "../Dashboard/Dashboard";
import Season from "../Season/Season";
import NavBar from "../../components/NavBar/NavBar";
import YearBar from "../../components/YearBar/YearBar";
 
library.add(fas);

export default function App() {
  const [user, setUser] = useState(getUser());
  console.log(user);
  return (
    <main className="App">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <YearBar user={user} />
          <Switch>
            <Route path="/orders/new">
              <NewOrderPage />
            </Route>

            <Route path="/dashboard">
              <Dashboard user={user} setUser={setUser} getUser={getUser} />
            </Route>

            <Route path="/2020">
              <Season user={user} />
            </Route>

            <Redirect to="/dashboard" />
          </Switch>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}
