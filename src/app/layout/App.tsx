import React, { useEffect, useContext } from "react";
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.css";
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
                <Route
                  exact
                  path="/activities"
                  component={ActivitiyDashboard}
                />
                <Route path="/activities/:id" component={ActivityDitales} />
                <Route
                  key={location.key}
                  path={["/create-activities", "/manage/:id"]}
                  component={ActivityForm}
                />
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
