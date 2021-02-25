import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Button, Grid, Loader } from "semantic-ui-react";
import ActivitiyList from "./ActivityList";
import { RootStoreContext } from "../../../app/stores/rootStore";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import InfiniteScroll from "react-infinite-scroller";
import ActivityFilters from "./ActivityFilters";
import ActivityListItemPlaceholder from "./ActivityListItemPlaceholder ";
const ActivitiyDashboard: React.FC = ({}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadActivities,
    loadingInital,
    page,
    setPage,
    totalPages,
  } = rootStore.activityStore;

  const [loadginNext, setLoadingNext] = useState(false);

  const handleGetNext = () => {
    setLoadingNext(true);
    setPage(page + 1);
    loadActivities().then(() => setLoadingNext(false));
  };

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  return (
    <Grid>
      <Grid.Column width={10}>
        {loadingInital && page === 0 ? (
          <ActivityListItemPlaceholder />
        ) : (
          <InfiniteScroll
            pageStart={0}
            loadMore={handleGetNext}
            hasMore={!loadginNext && page + 1 < totalPages}
            initialLoad={false}
          >
            <ActivitiyList />
          </InfiniteScroll>
        )}
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityFilters />
      </Grid.Column>
      <Grid.Column width={10}>
        <div style={{ marginBottom: loadginNext ? 40 : 0 }}>
          <Loader active={loadginNext} color="red" />
        </div>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivitiyDashboard);
