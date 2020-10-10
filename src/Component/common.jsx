import React from "react";

import PropTypes from "prop-types";

export const TextFieldGroup = ({
  name,
  value,
  label,
  errorstatus,
  errors,
  type,
  onChange,
}) => {
  return (
    <div>
      {!{ errorstatus } ? (
        <span></span>
      ) : (
        <span style={{ color: "red" }}>{errors}</span>
      )}
      <p>
        {label}{" "}
        <b>
          <sup style={{ color: "red" }}>*</sup>
        </b>
      </p>
      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        className="form-control "
      />
    </div>
  );
};

export const LegendFieldRadio = ({
  name,
  type,
  value,
  onChange,
  errors,
  errorstatus,
  label,
  checked,
  icon,
}) => {
  return (
    <fieldset className="form-group ">
      <input
        containerClass="none"
        filled={false}
        icon={icon}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        checked={checked}
        label={label}
      />
      {!{ errorstatus } ? (
        <span></span>
      ) : (
        <span style={{ color: "red" }}>{errors}</span>
      )}
    </fieldset>
  );
};

export const FileInput = ({
  name,
  type,
  value,
  onChange,
  errors,
  errorstatus,
  label,
}) => {
  return (
    <fieldset className="form-group">
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text" id={name}>
            Upload
          </span>
        </div>
        <div className="custom-file">
          <input
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            className="custom-file-input"
            id={name}
            aria-describedby="inputGroupFileAddon01"
          />
          <label className="custom-file-label mx-auto" htmlFor={name}>
            {value === "" ? label : value}
          </label>
        </div>
      </div>

      {!{ errorstatus } ? (
        <span></span>
      ) : (
        <span style={{ color: "red" }}>{errors}</span>
      )}
    </fieldset>
  );
};

export const SelectField = ({
  name,
  value,
  onChange,
  errors,
  errorstatus,
  children,
}) => {
  return (
    <div>
      <select
        className="browser-default custom-select"
        value={value}
        onChange={onChange}
        name={name}
      >
        {children}
      </select>
      {!{ errorstatus } ? (
        <span></span>
      ) : (
        <span style={{ color: "red" }}>{errors}</span>
      )}
    </div>
  );
};

export const ErrorHandling = ({ errors, errorstatus }) => {
  return !{ errorstatus } ? (
    <span></span>
  ) : (
    <span style={{ color: "red" }}>{errors}</span>
  );
};

ErrorHandling.propTypes = {
  errorstatus: PropTypes.bool,
  errors: PropTypes.string,
};

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  errorstatus: PropTypes.bool,
  errors: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

FileInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  errorstatus: PropTypes.bool,
  errors: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

TextFieldGroup.defaultProps = {
  type: "text",
};

LegendFieldRadio.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  errorstatus: PropTypes.bool,
  errors: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

LegendFieldRadio.defaultProps = {
  type: "text",
};

SelectField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  errorstatus: PropTypes.bool,
  errors: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

SelectField.defaultProps = {
  type: "text",
};
