import { format } from "date-fns";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activities";
import { RootStoreContext } from "../../../app/stores/rootStore";
import ActivityListItemAttendees from "./ActivityListItemAttendees";

interface IProps {
  activitiy: IActivity;
}

const ActvityListItem: React.FC<IProps> = ({ activitiy }) => {
  const rootStore = useContext(RootStoreContext);
  const activityStore = rootStore.activityStore;
  const host = activitiy.attendees.filter((a) => a.isHost)[0];
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
            <Item.Image size="tiny" src={host.image || "/assets/user.png"} />
            <Item.Content>
              <Item.Header as={Link} to={`/activities/${activitiy.id}`}>
                {activitiy.title}
              </Item.Header>
              <Item.Description>
                Hosted By
                <Link to={`/profile/${host.userName}`}>
                  {" "}
                  {host.displayName}
                </Link>
              </Item.Description>
              {activitiy.isHost && (
                <Item.Description>
                  <Label
                    basic
                    color={"orange"}
                    content="You are hosting this activitiy"
                  />
                </Item.Description>
              )}
              {activitiy.isGoing && !activitiy.isHost && (
                <Item.Description>
                  <Label
                    basic
                    color={"green"}
                    content="You are going this activitiy"
                  />
                </Item.Description>
              )}
            </Item.Content>
          </Item>
        </Item.Group>
        <Label basic>{activitiy.category}</Label>
      </Segment>

      <Segment>
        <Icon name="clock" /> {format(activitiy.date!, "h:mm a")}
        <Icon name="marker" /> {activitiy.venue} , {activitiy.city}
      </Segment>
      <Segment clearing secondary>
        <Item>
          <ActivityListItemAttendees attendees={activitiy.attendees} />
        </Item>
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
              onDelete(e, activitiy.id!);
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
