import React from "react";
import Select from "react-select";

const state = {
  isClearable: true,
  isDisabled: false,
  isLoading: false,
  isRtl: false,
  isSearchable: true
};

export default function ChapterDropDown({ handelChapterChange, chapters }) {
  return (
    <Select
      className="nav-dropdown"
      classNamePrefix="select"
      placeholder="اختر السورة"
      isDisabled={state.isDisabled}
      isLoading={state.isLoading}
      isClearable={state.isClearable}
      isRtl={state.isRtl}
      isSearchable={state.isSearchable}
      name="chapters"
      options={chapters}
      onChange={handelChapterChange}
    />
  );
}
