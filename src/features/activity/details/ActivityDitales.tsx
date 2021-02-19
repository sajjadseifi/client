import { observer } from "mobx-react";
import React, { useContext, useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Card, Grid, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ActivityStore from "../../../app/stores/activityStore";
import ActivityDetailsChat from "./ActivityDetailsChat";
import ActivityDetailsHeader from "./ActivityDetailsHeader";
import ActivityDetailsInfo from "./ActivityDetailsInfo";
import ActivityDetailsSidebar from "./ActivityDetailsSidebar";

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
    clearingActivity,
  } = activityStore;

  useEffect(() => {
    loadActivity(match.params.id);
    return () => {
      clearingActivity();
    };
  }, [loadActivity, match.params.id]);

  if (loadingInital || !activity)
    return <LoadingComponent content="Loading Details Activity" />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailsHeader  activity={activity}/>
        <ActivityDetailsInfo  activity={activity} />
        <ActivityDetailsChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailsSidebar />
      </Grid.Column>
    </Grid>

  );
};

export default observer(ActivityDetails);
