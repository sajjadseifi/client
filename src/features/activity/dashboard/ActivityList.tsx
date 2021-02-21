import { format } from "date-fns";
import { observer } from "mobx-react";
import React, { Fragment, useContext } from "react";
import { Item, Label } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import ActvityListItem from "./ActivityListItem";

const ActivitiyList: React.FC = () => {
  const { activitiesByDate } = useContext(RootStoreContext).activityStore;
  return (
    <>
      {activitiesByDate.map(([group, activities]) => {
        return (
          <Fragment key={group}>
            <Label size="large" color="teal">
              {format(group,"eee do MMMM")}
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
