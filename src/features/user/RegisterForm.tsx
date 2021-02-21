import { FORM_ERROR } from "final-form";
import React, { useContext } from "react";
import { Field, Form as FormFinal } from "react-final-form";
import { combineValidators, isRequired } from "revalidate";
import { Button, Form, Header } from "semantic-ui-react";
import ErrorMessage from "../../app/common/form/ErrorMessage";
import TextInput from "../../app/common/form/TextInput";
import { IUserFormVlues } from "../../app/models/user";
import { RootStoreContext } from "../../app/stores/rootStore";

const validate = combineValidators({
  username: isRequired("username"),
  displayName: isRequired("displayName"),
  email: isRequired("email"),
  password: isRequired("password"),
});

const LoginForm = () => {
  const { register } = useContext(RootStoreContext).userStore;

  return (
    <FormFinal
      validate={validate}
      onSubmit={(values: IUserFormVlues) =>
        register(values).catch((error) => ({ [FORM_ERROR]: error }))
      }
      render={({
        handleSubmit,
        submitting,
        submitError,
        invalid,
        pristine,
        dirtySinceLastSubmit,
      }) => {
        return (
          <Form onSubmit={handleSubmit} error>
            <Header
              as="h2"
              content="Login to Reactivities"
              color="teal"
              textAlign="center"
            />
            <Field
              name="username"
              placeholder="User Name"
              component={TextInput}
            />
            <Field
              name="displayName"
              placeholder="Display Name"
              component={TextInput}
            />
            <Field name="email" placeholder="Email" component={TextInput} />
            <Field
              name="password"
              placeholder="Password"
              component={TextInput}
              type="password"
            />
            {submitError && !dirtySinceLastSubmit && (
              <ErrorMessage
                error={submitError}
                // text={JSON.stringify(submitError.data.errors)}
              />
            )}
            <Button
              disabled={(invalid && !dirtySinceLastSubmit) || pristine}
              loading={submitting}
              positive
              content="Register"
              fluid
            />
          </Form>
        );
      }}
    ></FormFinal>
  );
};

export default LoginForm;
