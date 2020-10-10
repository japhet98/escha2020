import React, { Component } from "react";
import { TextField } from "../Constant";
export const Personal = (handleChange) => (
  <div>
    <div className="card card-body">
      <div className="card-head text-center">
        <h3>
          <b>Personal Infomation</b>
        </h3>
      </div>
      <div>
        <TextField
          label="First Name"
          name="firstname"
          required
          onChange={handleChange}
          placeholder="e.g John"
        />
      </div>
    </div>
  </div>
);

export const Contact = (handleChange) => (
  <div>
    <div className="card card-body">
      <div className="card-head text-center">
        <h3>
          <b>Contact Infomation</b>
        </h3>
      </div>
      <div>
        <TextField
          label="Phone Number"
          name="phone"
          required
          onChange={handleChange}
          placeholder="e.g 0553234323"
        />
      </div>
    </div>
  </div>
);

export const Educational = (handleChange) => (
  <div>
    <div className="card card-body">
      <div className="card-head text-center">
        <h3>
          <b>Educational Infomation</b>
        </h3>
      </div>
      <div>
        <TextField
          label="Institution Name"
          name="school"
          required
          onChange={handleChange}
          placeholder="e.g University of Mines and Technology"
        />
      </div>
    </div>
  </div>
);
