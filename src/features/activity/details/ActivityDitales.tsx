import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activities";

interface IProps {
  activity: IActivity;
  onCancel: () => void;
  onEdit: (mode: boolean) => void;
}
const ActivityDetails: React.FC<IProps> = ({ activity, onCancel, onEdit }) => {
  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${activity.category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            basic
            color="green"
            content="Edit"
            onClick={() => onEdit(true)}
          />
          <Button basic color="red" content="Cancel" onClick={onCancel} />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default ActivityDetails;
