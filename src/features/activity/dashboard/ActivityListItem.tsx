import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activities";
import ActivityStore from "../../../app/stores/activityStore";

interface IProps {
  activitiy: IActivity;
}

const ActvityListItem: React.FC<IProps> = ({ activitiy }) => {
  console.log(activitiy);
  const activityStore = useContext(ActivityStore);
  const {
    deleteActivity: onDelete,
    deleteFetched,
    deleteSubmiting,
    targets,
  } = activityStore;
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item key={activitiy.id}>
          <Item.Image size="tiny" src="/assets/user.png" />
            <Item.Content>
              <Item.Header as="a">{activitiy.title}</Item.Header>
              <Item.Description>Hosted By Sajjad</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
        <Label basic>{activitiy.category}</Label>
      </Segment>

      <Segment>
        <Icon name="clock" /> {activitiy.date}
        <Icon name="marker" /> {activitiy.venue} , {activitiy.city}
      </Segment>
      <Segment clearing secondary>
          <span>Attendees Will Go Here</span>
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
        </Item.Extra>
      </Segment>
      <Segment clearing>
        <span>{activitiy.description}</span>

      </Segment>
    </Segment.Group>
  );
};

export default ActvityListItem;
