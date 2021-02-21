import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react";
import { Grid } from "semantic-ui-react";
import ActivitiyList from "./ActivityList";
import { RootStoreContext } from "../../../app/stores/rootStore";


const ActivitiyDashboard: React.FC = ({}) => {
  const activityStore = useContext(RootStoreContext).activityStore;

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivitiyList/>
      </Grid.Column>
      <Grid.Column width={6}>
        <h3>Activitiy Filter</h3>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivitiyDashboard);
