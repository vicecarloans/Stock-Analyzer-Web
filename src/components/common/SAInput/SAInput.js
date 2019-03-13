import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  COMBO_BOX,
  TEXT_INPUT,
  DATE_PICKER,
  NUMBER_INPUT
} from "constants/fieldType";
import {
  ComboBox,
  TextInput,
  DatePicker,
  DatePickerInput,
  TextInputSkeleton,
  NumberInput
} from "carbon-components-react";

export default class SAInput extends PureComponent {
  static propTypes = {
    input: PropTypes.any.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    meta: PropTypes.object.isRequired,
    items: PropTypes.arrayOf(PropTypes.string)
  };

  static defaultProps = {
    placeholder: "",
    items: []
  };

  renderField = () => {
    const {
      input,
      placeholder,
      label,
      type,
      meta: { asyncValidating, touched, error },
      items
    } = this.props;
    switch (type) {
      case COMBO_BOX:
        return (
          <div className="sa--combo-box-wrapper">
            <ComboBox
              items={items}
              placeholder={placeholder}
              onChange={({ selectedItem }) => input.onChange(selectedItem)}
              invalid={touched && !!error}
              invalidText={error}
              className="sa--add-stock"
              initialSelectedItem={input.value}
              id="sa--add-combo-box"
            />
          </div>
        );
      case TEXT_INPUT:
        return (
          <TextInput
            {...input}
            placeholder={placeholder}
            labelText={label}
            id={label}
            type={type}
            light={false}
            invalid={touched && !!error}
            invalidText={error}
          />
        );
      case DATE_PICKER:
        return (
          <DatePicker
            id="date-picker"
            datePickerType="single"
            onChange={e => {
              const date = new Date(e);
              const str = `${date.getFullYear()}-${date.getMonth() +
                1}-${date.getDate()}`.toLocaleLowerCase();
              var options = {
                year: "numeric",
                month: "2-digit",
                day: "numeric"
              };
              input.onChange(
                new Date(str).toLocaleDateString("en-US", options)
              );
            }}
            minDate={Date.now().toLocaleString("en-US")}
            value={input.value}
          >
            <DatePickerInput
              id="date-picker-input-id"
              labelText={label}
              pattern="d{1,2}/d{4}"
              placeholder="mm/dd/yyyy"
              invalidText={error}
              invalid={touched && !!error}
              onChange={input.onChange}
              value={input.value}
            />
          </DatePicker>
        );
      case NUMBER_INPUT:
        return (
          <NumberInput
            {...input}
            ref={ref => (this.num = ref)}
            value={Number(input.value)}
            label={label}
            id={label}
            light={false}
            invalid={touched && !!error}
            min={0}
            invalidText={error}
            onChange={e => input.onChange(this.num.state.value)}
          />
        );
      default:
        return (
          <TextInput
            {...input}
            placeholder={placeholder}
            labelText={label}
            id={label}
            type={type}
            light={false}
            invalid={touched && !!error}
            invalidText={error}
          />
        );
    }
  };
  render() {
    return this.renderField();
  }
}
