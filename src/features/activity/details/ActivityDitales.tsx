import { observer } from "mobx-react";
import React, { useContext, useEffect } from "react";
import {RouteComponentProps } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/rootStore";
import ActivityDetailsChat from "./ActivityDetailsChat";
import ActivityDetailsHeader from "./ActivityDetailsHeader";
import ActivityDetailsInfo from "./ActivityDetailsInfo";
import ActivityDetailsSidebar from "./ActivityDetailsSidebar";

interface DetailsParams {
  id: string;
}
const ActivityDetails: React.FC<RouteComponentProps<DetailsParams>> = ({
  match,
}) => {
  const activityStore = useContext(RootStoreContext).activityStore;
  const {
    selectedActivity: activity,
    loadActivity,
    loadingInital,
    clearingActivity,
  } = activityStore;

  useEffect(() => {
    if (match.params.id) loadActivity(match.params.id);

    return () => {
      console.log("CLEARING");
      clearingActivity();
    };
  }, [loadActivity, match.params.id]);

  if (loadingInital)
    return <LoadingComponent content="Loading Details Activity" />;

  if (!activity)
    return <h1>Activity Not Found</h1>;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailsHeader activity={activity} />
        <ActivityDetailsInfo activity={activity} />
        <ActivityDetailsChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailsSidebar />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDetails);
