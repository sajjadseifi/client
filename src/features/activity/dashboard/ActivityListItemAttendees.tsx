import { observer } from "mobx-react";
import React from "react";
import { Image, List, Popup } from "semantic-ui-react";
import { IAttendee } from "../../../app/models/user";

interface IProps {
  attendees: IAttendee[];
}
const styles = {
  borderColor:"orange",
  borderWidth:2
}

const ActivityListItemAttendees: React.FC<IProps> = ({ attendees }) => {
  return (
    <List horizontal>
      {attendees.map((attendee, index) => (
        <List.Item key={index}>
          <Popup
            header={attendee.displayName}
            trigger={
              <Image
                size="mini"
                circular
                src={attendee.image || "/assets/user.png"}
                bordered
                style={attendee.following ? styles:null}
              />
            }
          />
        </List.Item>
      ))}
    </List>
  );
};

export default observer(ActivityListItemAttendees);
