import React from "react";
import { FieldRenderProps } from "react-final-form";
import { Form, FormFieldProps, Label } from "semantic-ui-react";
import { DateTimePicker } from "react-widgets";
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';

Moment.locale('en');
momentLocalizer();


interface IProps extends FieldRenderProps<Date, HTMLElement>, FormFieldProps {}


const DateInput: React.FC<IProps> = ({
  input,
  width,
  placeholder,
  meta: { touched, error },
  date=false,
  time=false
}) => {
  return (
    <Form.Field width={width} error={touched && error}>
      <DateTimePicker
        value={input.value ||null}
        placeholder={placeholder}
        onChange={input.onChange}
        onBlur={input.onBlur}
        onKeyDown={(e)=>e.preventDefault()}
        time={!!time}
        date={!!date}
      />
      {touched && error && (
        <Label basic color={"red"}>
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default DateInput;
