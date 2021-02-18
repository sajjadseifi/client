import React from "react";
import { Grid, List } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activities";
import ActivityDetails from "../details/ActivityDitales";
import ActivityForm from "../form/ActivityForm";
import ActivitiyList from "./ActivityList";

interface IProps {
  activities: IActivity[];
  selectActivity: (id: string) => void;
  selectedActivity: IActivity;
  cancelled: () => void;
  editMode: boolean;
  setEditMode: (mode: boolean) => void;
  cancelledEdit: () => void;
  onCreate: (activity: IActivity) => void;
  onEdit: (activity: IActivity) => void;
  onDelete: (id: string) => void;
}

const ActivitiyDashboard: React.FC<IProps> = ({
  activities,
  selectActivity,
  selectedActivity,
  cancelled,
  editMode,
  setEditMode,
  cancelledEdit,
  onCreate,
  onEdit,
  onDelete,
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivitiyList
          onDelete={onDelete}
          activities={activities}
          onSelected={selectActivity}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedActivity && !editMode && (
          <ActivityDetails
            onEdit={setEditMode}
            activity={selectedActivity}
            onCancel={cancelled}
          />
        )}
        {editMode && (
          <ActivityForm
            key={(selectedActivity && selectedActivity.id) || 0}
            onCancel={cancelledEdit}
            activity={selectedActivity}
            onEdit={onEdit}
            onCreate={onCreate}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default ActivitiyDashboard;
