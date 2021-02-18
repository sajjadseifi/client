import React, { FormEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activities";
import { v4 as uuid } from "uuid";
interface IProps {
  onCancel: () => void;
  activity: IActivity;
  onCreate: (activity: IActivity) => void;
  onEdit: (activity: IActivity) => void;
}
const ActivityForm: React.FC<IProps> = ({
  onCancel,
  activity: initiallyActivity,
  onCreate,
  onEdit,
}) => {
  const initiallyActivityForm = () => {
    if (initiallyActivity) return initiallyActivity;

    return {
      id: "",
      title: "",
      description: "",
      date: "",
      city: "",
      category: "",
      venue: "",
    };
  };

  const [activity, setActivity] = useState<IActivity>(initiallyActivityForm);

  const onSubmitHandler = () => {
    console.log(activity);

    if (activity.id.length == 0) {
      let newACtivity = {
        ...activity,
        id: uuid(),
      };
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
        <Button floated="right" positive type="submit" content="Submit" />
        <Button
          onClick={onCancel}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default ActivityForm;
