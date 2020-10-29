import React from "react";
import Select from "react-select";

const state = {
  isClearable: true,
  isDisabled: false,
  isLoading: false,
  isRtl: false,
  isSearchable: true
};

export default function VerseDropDown({ handelVerseChange, verses_options }) {
  return (
    <Select
      className="nav-dropdown"
      classNamePrefix="select"
      placeholder="اختر الاية"
      isDisabled={state.isDisabled}
      isLoading={state.isLoading}
      isClearable={state.isClearable}
      isRtl={state.isRtl}
      isSearchable={state.isSearchable}
      name="verses"
      options={verses_options}
      onChange={handelVerseChange}
    />
  );
}
