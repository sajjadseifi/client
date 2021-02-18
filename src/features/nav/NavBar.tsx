import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Button, Container, Header, Menu } from "semantic-ui-react";
import ActivityStore from "../../app/stores/activityStore";

const NavBar: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const { openCreateForm } = activityStore;
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header exact as={NavLink} to="/">
          <img src="/assets/logo.png" style={{ margin: "0 5px" }} alt="logo" />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" as={NavLink} to="/activities" />
        <Menu.Item>
          <Button
            onClick={openCreateForm}
            positive
            content="Create Activitiy"
            as={NavLink}
            to="/create-activities"
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default NavBar;
