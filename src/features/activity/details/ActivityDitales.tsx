import { observer } from "mobx-react";
import React, { useContext, useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ActivityStore from "../../../app/stores/activityStore";

interface DetailsParams {
  id: string;
}
const ActivityDetails: React.FC<RouteComponentProps<DetailsParams>> = ({
  match,
  history,
}) => {
  const activityStore = useContext(ActivityStore);
  const {
    selectedActivity: activity,
    loadActivity,
    loadingInital,
    clearingActivity
  } = activityStore;

  useEffect(() => {
    loadActivity(match.params.id);
    return () => {
      clearingActivity();
    };
  }, [loadActivity,match.params.id]);

  if (loadingInital || !activity)
    return <LoadingComponent content="Loading Details Activity" />;

  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${activity!.category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{activity!.title}</Card.Header>
        <Card.Meta>
          <span>{activity!.date}</span>
        </Card.Meta>
        <Card.Description>{activity!.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            basic
            color="green"
            content="Edit"
            onClick={()=>history.push(`/activities/${activity.id}`)}
            as={Link}
            to={`/manage/${activity.id}`}
          />
          <Button
            basic
            color="red"
            content="Cancel"
            onClick={() => history.push("/activities")}
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(ActivityDetails);
