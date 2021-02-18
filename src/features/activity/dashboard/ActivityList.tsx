import { observer } from "mobx-react";
import React, {  useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Item, Label, List, Segment } from "semantic-ui-react";
import ActivityStore from "../../../app/stores/activityStore";

const ActivitiyList: React.FC = ({}) => {
  const activityStore = useContext(ActivityStore);
  const {
    deleteActivity: onDelete,
    deleteFetched,
    deleteSubmiting,
    targets,
    activitiesByDate
  } = activityStore;
  return (
    <Segment clearing>
      <Item.Group divided>
        <List>
          {activitiesByDate.map((activitiy) => {
            return (
              <Item key={activitiy.id}>
                <Item.Content>
                  <Item.Header as="a">{activitiy.title}</Item.Header>
                  <Item.Meta>{activitiy.date}</Item.Meta>
                  <Item.Description>
                    <div>{activitiy.description}</div>
                    <div>{activitiy.city} , {activitiy.venue}</div>
                  </Item.Description>
                  <Item.Extra>
                    <Button
                      as={Link} 
                      to={`/activities/${activitiy.id}`}
                      floated="right"
                      content="View"
                      color="purple"
                    />
                    <Button
                      name={activitiy.id}
                      loading={activitiy.id === targets && deleteSubmiting}
                      onClick={(e) => {
                        deleteFetched();
                        onDelete(e, activitiy.id);
                      }}
                      floated="right"
                      content="Delete"
                      color="red"
                    />

                    <Label basic>{activitiy.category}</Label>
                  </Item.Extra>
                </Item.Content>
              </Item>
            );
          })}
        </List>
      </Item.Group>
    </Segment>
  );
};

export default observer(ActivitiyList);
