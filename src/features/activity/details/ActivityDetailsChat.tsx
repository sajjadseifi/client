import React, { Fragment, useContext, useEffect } from "react";
import { Button, Comment, Form, Header, Segment } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { Field, Form as FinalForm } from "react-final-form";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { formatDistance } from "date-fns/esm";
const ActivityDetailsChat = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    selectedActivity: activity,
    createHubConnection,
    stopHubConnection,
    addComment,
  } = rootStore.activityStore;

  useEffect(() => {
    createHubConnection(activity!.id!);
    return () => stopHubConnection();
  }, []);
  return (
    <Fragment>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: "none" }}
      >
        <Header>Chat about this event</Header>
      </Segment>
      <Segment attached>
        <Comment.Group>
          {activity && activity.comments.length > 0 && (
            <>
              {activity.comments.map((comment) => (
                <Comment>
                  <Comment.Avatar src={comment.image || "/assets/user.png"} />
                  <Comment.Content>
                    <Comment.Author
                      as={Link}
                      to={`/profile/${comment.username}`}
                    >
                      {comment.displayName}
                    </Comment.Author>
                    <Comment.Metadata>
                      <div>{formatDistance(comment.createAt, new Date())}</div>
                    </Comment.Metadata>
                    <Comment.Text>{comment.body}</Comment.Text>
                    <Comment.Actions>
                      <Comment.Action>Reply</Comment.Action>
                    </Comment.Actions>
                  </Comment.Content>
                </Comment>
              ))}
            </>
          )}

          <FinalForm
            onSubmit={addComment}
            render={({ handleSubmit, submitting, form }) => (
              <Form onSubmit={() => handleSubmit()!.then(() => form.reset())}>
                <Field
                  name="body"
                  component={TextAreaInput}
                  rows={4}
                  placeholder="Your Comment Message..."
                />
                <Button
                  content="Add Reply"
                  labelPosition="left"
                  icon="edit"
                  primary
                  loading={submitting}
                />
              </Form>
            )}
          />
        </Comment.Group>
      </Segment>
    </Fragment>
  );
};

export default observer(ActivityDetailsChat);
