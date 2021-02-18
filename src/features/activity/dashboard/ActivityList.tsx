import React from "react";
import { Button, Item, Label, List, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activities";

interface IProps {
  activities: IActivity[];
  onSelected: (id: string) => void;
  onDelete: (id: string) => void;
}

const ActivitiyList: React.FC<IProps> = ({ activities, onSelected ,onDelete}) => {
  return (
    <Segment clearing>
      <Item.Group divided>
        <List>
          {activities.map((activitiy) => {
            return (
              <Item>
                <Item.Content>
                  <Item.Header as="a">{activitiy.title}</Item.Header>
                  <Item.Meta>{activitiy.date}</Item.Meta>
                  <Item.Description>
                    <div>{activitiy.description}</div>
                    <div>
                      {activitiy.city} , {activitiy.venue}
                    </div>
                  </Item.Description>
                  <Item.Extra>
                    <Button
                      onClick={() => onSelected(activitiy.id)}
                      floated="right"
                      content="View"
                      color="purple"
                    />
                    <Button
                      onClick={() => onDelete(activitiy.id)}
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

export default ActivitiyList;
