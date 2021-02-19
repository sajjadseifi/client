import React, { FormEvent, useContext, useEffect, useState } from "react";
import { Button, Form, Grid, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activities";
import { v4 as uuid } from "uuid";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react";
import { RouteComponentProps } from "react-router-dom";

interface DetailsProps {
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailsProps>> = ({
  match,
  history,
}) => {
  const activityStore = useContext(ActivityStore);
  const {
    selectedActivity: initiallyActivity,
    createActivity: onCreate,
    submitting,
    editActivity: onEdit,
    loadActivity,
    clearingActivity,
  } = activityStore;

  const [activity, setActivity] = useState<IActivity>({
    id: "",
    title: "",
    description: "",
    date: "",
    city: "",
    category: "",
    venue: "",
  });

  useEffect(() => {
    if (match.params.id && activity.id.length == 0)
      loadActivity(match.params.id).then(
        () => initiallyActivity && setActivity(initiallyActivity)
      );
    return () => {
      clearingActivity();
    };
  }, [
    loadActivity,
    setActivity,
    initiallyActivity,
    match.params.id,
    activity.id.length,
  ]);

  const onSubmitHandler = () => {
    activityStore.fetched();
    if (activity.id.length == 0) {
      let newACtivity: IActivity = { ...activity, id: uuid() };
      onCreate(newACtivity);
    } else {
      onEdit(activity);
    }
  };
  const onChangeInputHandler = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };
  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <Form onSubmit={onSubmitHandler}>
            <Form.Input
              onChange={onChangeInputHandler}
              name="title"
              placeholder="Title"
              value={activity.title}
            />
            <Form.TextArea
              onChange={onChangeInputHandler}
              name="description"
              rows={4}
              placeholder="Description"
              value={activity.description}
            />
            <Form.Input
              onChange={onChangeInputHandler}
              name="category"
              placeholder="Category"
              value={activity.category}
            />
            <Form.Input
              onChange={onChangeInputHandler}
              name="date"
              type="datetime-local"
              placeholder="Date"
              value={activity.date}
            />
            <Form.Input
              onChange={onChangeInputHandler}
              name="city"
              placeholder="City"
              value={activity.city}
            />
            <Form.Input
              onChange={onChangeInputHandler}
              name="venue"
              placeholder="Venue"
              value={activity.venue}
            />
            <Button
              loading={submitting}
              floated="right"
              positive
              type="submit"
              content="Submit"
            />
            <Button
              onClick={() => history.goBack()}
              floated="right"
              type="button"
              content="Cancel"
            />
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityForm);
