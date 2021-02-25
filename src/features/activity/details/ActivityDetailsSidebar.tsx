import { observer } from "mobx-react";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Image, Item, Label, List, Segment } from "semantic-ui-react";
import { IAttendee } from "../../../app/models/user";
interface IProps {
  attendees: IAttendee[];
}
const ActivityDetailsSidebar: React.FC<IProps> = ({ attendees }) => {
  return (
    <Fragment>
      <Segment
        textAlign="center"
        style={{ border: "none" }}
        attached="top"
        secondary
        inverted
        color="teal"
      >
        {attendees.length} {attendees.length === 1 ? "Person" : "People"} Going
      </Segment>
      <Segment attached>
        <List relaxed divided>
          {attendees.map((attendee, index) => {
            return (
              <Item
                key={attendee.userName + "-" + index}
                style={{ position: "relative" }}
              >
                {attendee.isHost && (
                  <Label
                    style={{ position: "absolute" }}
                    color="orange"
                    ribbon="right"
                  >
                    Host
                  </Label>
                )}
                <Image size="tiny" src={"/assets/user.png"} />
                <Item.Content verticalAlign="middle">
                  <Item.Header as="h3">
                    <Link to={`/profile/${attendee.userName}`}>
                      {attendee.displayName}
                    </Link>
                  </Item.Header>
                  {attendee.following && (
                    <Item.Extra style={{ color: "orange" }}>
                      Following
                    </Item.Extra>
                  )}
                </Item.Content>
              </Item>
            );
          })}
        </List>
      </Segment>
    </Fragment>
  );
};

export default observer(ActivityDetailsSidebar);
