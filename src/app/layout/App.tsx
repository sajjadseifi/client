import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";
import { IActivity } from "../models/activities";
import NavBar from "../../features/nav/NavBar";
import { Container } from "semantic-ui-react";
import ActivitiyDashboard from "../../features/activity/dashboard/ActivityDashboard";

function App() {
  const ACTIVITIES_API = "http://localhost:5000/api/Activities";

  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);

  const selectedActivitiesHandelr = (id: string) => {
    setEditMode(false);
    setSelectedActivity(activities.find((activity) => activity.id === id)!);
  };
  const cancelledHandler = () => {
    setSelectedActivity(null);
  };
  const cancelledEditHandler = () => {
    setEditMode(false);
  };

  const onOpenCreateFormHandler = () => {
    setSelectedActivity(null);
    setEditMode(true);
  };
  const createActivityHandler = (activity: IActivity) => {
    setActivities([activity, ...activities]);
    setSelectedActivity(activity);
    setEditMode(false);
  };
  const deleteActivityHandler = (id: string) => {
    setActivities([...activities.filter((activity) => activity.id !== id)]);
    if(selectedActivity && selectedActivity.id === id){
      setSelectedActivity(null);
      setEditMode(false); 
    }
  };
  const editActivityHandler = (activity: IActivity) => {
    setActivities([
      activity,
      ...activities.filter((ac) => ac.id !== activity.id),
    ]);
    setSelectedActivity(activity);
    setEditMode(false);
  };
  useEffect(() => {
    loadActivities();
  }, []);

  async function loadActivities(): Promise<void> {
    try {
      const response = await axios.get<IActivity[]>(ACTIVITIES_API);
      let activities: IActivity[] = [];
      response.data.forEach((activity) => {
        activity.date = activity.date.split(".")[0];
        activities.push(activity);
      });
      setActivities(response.data);
    } catch (err) {
      setActivities([]);
    }
  }

  return (
    <>
      <NavBar onOpenCreateForm={onOpenCreateFormHandler} />
      <Container style={{ marginTop: "7em" }}>
        <ActivitiyDashboard
          activities={activities}
          selectActivity={selectedActivitiesHandelr}
          selectedActivity={selectedActivity!}
          cancelled={cancelledHandler}
          editMode={editMode}
          setEditMode={setEditMode}
          cancelledEdit={cancelledEditHandler}
          onCreate={createActivityHandler}
          onEdit={editActivityHandler}
          onDelete={deleteActivityHandler}
        />
      </Container>
    </>
  );
}

export default App;
