import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import LoginForm from "../user/LoginForm";
import RegisterForm from "../user/RegisterForm";

const HomePage = () => {
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn, user } = rootStore.userStore;
  const { Open } = rootStore.modalStore;
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/logo.png"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
          Reactivities
        </Header>
        {isLoggedIn && user ? (
          <>
            <Header as="h2" inverted content="Welcome to Reactivities" />
            <Button as={Link} to="/activities" size="huge" inverted>
              Activities
            </Button>
          </>
        ) : (
          <>
            <Header as="h2" inverted content="Welcome Back to Website" />
            <Button onClick={() => Open(<LoginForm />)} size="huge" inverted>
              Login
            </Button>
            <Button onClick={() => Open(<RegisterForm />)} size="huge" inverted>
              Reister
            </Button>
          </>
        )}
      </Container>
    </Segment>
  );
};

export default HomePage;
