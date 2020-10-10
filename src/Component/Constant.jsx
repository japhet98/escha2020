import React from "react";

export const TextField = ({
  name,
  style,
  id,
  className,
  label,
  placeholder,
  onChange,
  value,
  required,
  type,
  errorstatus,
  errors,
}) => (
  <div>
    <label htmlFor={name} style={{ marginTop: "10px" }}>
      <b>
        {label}
        {required ? <sup style={{ color: "red" }}>*</sup> : ""}
      </b>
    </label>
    <input
      type={type ? type : "text"}
      name={name}
      id={id}
      placeholder={placeholder}
      className={`form-control ${className}`}
      style={style}
      onChange={onChange}
      value={value}
      // required={required}
    />
    {!{ errorstatus } ? (
      <span></span>
    ) : (
      <span style={{ color: "red" }}>{errors}</span>
    )}
  </div>
);

export const SelectField = ({
  name,
  style,
  id,
  className,
  label,
  placeholder,
  onChange,
  value,
  data,
  required,
  errorstatus,
  errors,
}) => (
  <div>
    <label htmlFor={name} style={{ marginTop: "10px" }}>
      <b>
        {label}
        {required ? <sup style={{ color: "red" }}>*</sup> : ""}
      </b>
    </label>
    <select
      name={name}
      id={id}
      className={`form-control ${className}`}
      value={value}
      style={style}
      onChange={onChange}
      // required={required}
    >
      {data ? (
        data && data.map((e) => <option key={e}>{e}</option>)
      ) : (
        <>
          <option>Select Gender</option>
          <option>Male</option>
          <option>Female</option>
        </>
      )}
    </select>
    {!{ errorstatus } ? (
      <span></span>
    ) : (
      <span style={{ color: "red" }}>{errors}</span>
    )}
  </div>
);

export const ErrorHandling = ({ errors, errorstatus }) => {
  return !{ errorstatus } ? (
    <span></span>
  ) : (
    <span style={{ color: "red" }}>{errors}</span>
  );
};
