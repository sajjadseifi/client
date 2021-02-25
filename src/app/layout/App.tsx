import React, { useEffect, useContext } from "react";
import NavBar from "../../features/nav/NavBar";
import { Container } from "semantic-ui-react";
import LoadingComponent from "./LoadingComponent";
import { observer } from "mobx-react-lite";
import ActivitiyDashboard from "../../features/activity/dashboard/ActivityDashboard";
import {
  withRouter,
  Route,
  RouteComponentProps,
  Switch,
} from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ActivityForm from "../../features/activity/form/ActivityForm";
import ActivityDitales from "../../features/activity/details/ActivityDitales";
import NotFound from "./NotFound";
import { ToastContainer } from "react-toastify";
import { RootStoreContext } from "../stores/rootStore";
import LoginForm from "../../features/user/LoginForm";
import ModalComponent from "../common/modals/ModalComponent";
import ProfilePage from "../../features/profiles/ProfilePage";
import PrivateRoute from "./PrivateRoute";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  const rootStore = useContext(RootStoreContext);
  const { setAppLoaded, token, appLoaded } = rootStore.commonStore;
  const { getUser } = rootStore.userStore;

  useEffect(() => {
    const asyncLoad = async () => {
      console.log("aaa");
      try {
        if (token) await getUser();
      } finally {
        console.log("bbb");
        setAppLoaded();
      }
    };

    asyncLoad();
  }, [getUser, setAppLoaded, token]);

  if (!appLoaded) return <LoadingComponent content={"Loading Activities..."} />;

  return (
    <>
      <ToastContainer position="bottom-right" />
      <ModalComponent />
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <PrivateRoute
                  exact
                  path="/activities"
                  component={ActivitiyDashboard}
                />
                <PrivateRoute path="/activities/:id" component={ActivityDitales} />
                <PrivateRoute
                  key={location.key}
                  path={["/create-activities", "/manage/:id"]}
                  component={ActivityForm}
                />
                
                <Route path="/profile/:username" component={ProfilePage} />
                <Route path="/login" component={LoginForm} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
};

export default withRouter(observer(App));
