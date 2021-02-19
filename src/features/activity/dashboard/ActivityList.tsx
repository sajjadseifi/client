import { observer } from "mobx-react";
import React, { Fragment, useContext } from "react";
import { Item, Label, List, Segment } from "semantic-ui-react";
import ActivityStore from "../../../app/stores/activityStore";
import ActvityListItem from "./ActivityListItem";

const ActivitiyList: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const { activitiesByDate } = activityStore;
  return (
    <>
      {activitiesByDate.map(([group, activities]) => {
        return (
          <Fragment key={group}>
            <Label size="large" color="teal">
              {group}
            </Label>
            <Item.Group divided>
              {activities.map((activitiy) => (
                <ActvityListItem key={activitiy.id} activitiy={activitiy} />
              ))}
            </Item.Group>
          </Fragment>
        );
      })}
    </>
  );
};

export default observer(ActivitiyList);
