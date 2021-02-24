import React from "react";
import { combineValidators, isRequired } from "revalidate";
import { IProfile } from "../../app/models/profile";
import { Field, Form as FinalForm } from "react-final-form";
import { Button, Form } from "semantic-ui-react";
import TextInput from "../../app/common/form/TextInput";
import TextAreaInput from "../../app/common/form/TextAreaInput";
const validate = combineValidators({
  displayName: isRequired("displayName"),
});

interface IProps {
  updateProfile: (profile: IProfile) => void;
  profile: IProfile;
}

const ProfileEditForm: React.FC<IProps> = ({ updateProfile, profile }) => {
  return (
    <FinalForm
      onSubmit={updateProfile}
      validate={validate}
      initialValues={profile!}
      render={({ handleSubmit, invalid, pristine, submitting }) => (
        <Form onSubmit={handleSubmit} error>
          <Field
            name="displayName"
            component={TextInput}
            placeholder="Display Name"
            value={profile!.displayName}
          />
          <Field
            name="bio"
            rows={3}
            component={TextAreaInput}
            placeholder="Bio"
            value={profile!.bio}
          />
          <Button
            loading={submitting}
            floated="right"
            disabled={invalid || pristine}
            positive
            content="Update Profile"
          />
        </Form>
      )}
    ></FinalForm>
  );
};

export default ProfileEditForm;
