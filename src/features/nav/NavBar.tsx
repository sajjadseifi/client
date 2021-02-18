import React from "react";
import { Button, Container, Header, Menu } from "semantic-ui-react";

interface IProps {
  onOpenCreateForm: () => void;
}

const NavBar: React.FC<IProps> = ({ onOpenCreateForm }) => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header>
          <img src="/assets/logo.png" style={{ margin: "0 5px" }} alt="logo" />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities"></Menu.Item>
        <Menu.Item>
          <Button onClick={onOpenCreateForm} positive content="Create Activitiy"></Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default NavBar;
