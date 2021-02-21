import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Grid, Segment } from "semantic-ui-react";
import {
  ActivityForms,
} from "../../../app/models/activities";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react";
import { RouteComponentProps } from "react-router-dom";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../app/common/form/TextInput";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import SelectInput from "../../../app/common/form/SelectInput";
import DateInput from "../../../app/common/form/DateInput";
import { category } from "../../../app/common/options/categoryOptions";
import { combineDateAndTime } from "../../../app/common/utils/utils";
import { toast } from "react-toastify";
import {combineValidators, composeValidators,hasLengthGreaterThan,isRequired} from "revalidate";
import { RootStoreContext } from "../../../app/stores/rootStore";

const validate  = combineValidators({
  title:isRequired({message:"The event title is required"}),
  category:isRequired({message:"Category"}),
  description:composeValidators(
    isRequired({message:"Description"}),
    hasLengthGreaterThan(4)({message:"Description needs to be least 4 characters"})
  ),
  city:isRequired("City"),
  venue:isRequired("Venue"),
  date:isRequired("Date"),
  time:isRequired("Time"),
});

interface DetailsProps {
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailsProps>> = ({
  match,
  history,
}) => {
  const activityStore = useContext(RootStoreContext).activityStore;
  const {
    createActivity: onCreate,
    editActivity: onEdit,
    loadActivity,
  } = activityStore;

  const [activity, setActivity] = useState(new ActivityForms());
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadActivity(match.params.id)
        .then((activity) => setActivity(new ActivityForms(activity)))
        .finally(() => setLoading(false));
    }
  }, [loadActivity, match.params.id]);

  const handleFormFinalSubmit = (values: any) => {
    const { date, time, ...activity } = values;
    const dateAndTime = combineDateAndTime(date, time);
    delete activity.time;
    console.log({dateAndTime})
    activity.date = new Date(dateAndTime);
    
    console.log(activity);
    setSubmitting(true);
    
    if (activity.id) {
      onEdit(activity)
      .then(() => {
        setSubmitting(false);
        toast.info('${activity.title} Activity Edited!');
      });
    } else {
      let newActivity = {
        ...activity,
        id:uuid()
      }
      onCreate(newActivity).then(() => {
        setSubmitting(false);
        toast.success(`${activity.title} Activity Created !`);
      });
    }
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            validate={validate}
            initialValues={activity}
            onSubmit={handleFormFinalSubmit}
            render={({ handleSubmit ,invalid,pristine}) => {
              return (
                <Form loading={loading} onSubmit={handleSubmit}>
                  <Field
                    name="title"
                    placeholder="Title"
                    value={activity.title}
                    component={TextInput}
                  />
                  <Field
                    name="description"
                    placeholder="Description"
                    value={activity.description}
                    component={TextAreaInput}
                    rows={4}
                  />
                  <Field
                    name="category"
                    placeholder="Category"
                    value={activity.category}
                    component={SelectInput}
                    options={category}
                  />
                  <Form.Group widths="equal">
                    <Field
                      date
                      name="date"
                      placeholder="Date"
                      value={activity.date}
                      component={DateInput}
                    />
                    <Field
                      name="time"
                      placeholder="Time"
                      value={activity.time}
                      component={DateInput}
                      time
                    />
                  </Form.Group>
                  <Field
                    name="city"
                    placeholder="City"
                    value={activity.city}
                    component={TextInput}
                  />
                  <Field
                    name="venue"
                    placeholder="Venue"
                    value={activity.venue}
                    component={TextInput}
                  />
                  <Button
                    disabled={loading || invalid || pristine}
                    loading={submitting}
                    floated="right"
                    positive
                    type="submit"
                    content="Submit"
                  />
                  <Button
                    disabled={loading}
                    onClick={() => history.goBack()}
                    floated="right"
                    type="button"
                    content="Cancel"
                  />
                </Form>
              );
            }}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityForm);
