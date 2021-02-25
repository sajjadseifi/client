import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Button, Grid, Loader } from "semantic-ui-react";
import ActivitiyList from "./ActivityList";
import { RootStoreContext } from "../../../app/stores/rootStore";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import InfiniteScroll from "react-infinite-scroller";
import ActivityFilters from "./ActivityFilters";
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

  if (loadingInital && page === 0)
    return <LoadingComponent content="Loading Activites..." />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <InfiniteScroll
          pageStart={0}
          loadMore={handleGetNext}
          hasMore={!loadginNext && page + 1 < totalPages}
          initialLoad={false}
        >
          <ActivitiyList />
        </InfiniteScroll>
        {/* <Button
          floated="right"
          positive
          content="More..."
          loading={loadginNext}
          disabled={totalPages == page + 1}
          onClick={handleGetNext}
        /> */}
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityFilters/>
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
