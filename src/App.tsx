import React from "react";
import "./App.css";
import { Header, Icon } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css'

function App() {
  return (
    <div>
      <header className="App-header">
        <Header as="h2">
          <Icon name="users" />
          <Header.Content>Activities</Header.Content>
        </Header>
      </header>
    </div>
  );
}

export default App;
