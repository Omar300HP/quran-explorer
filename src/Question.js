import React from "react";
import Select from "react-select";

const state = {
  isClearable: false,
  isDisabled: false,
  isLoading: false,
  isRtl: false,
  isSearchable: true
};

export default function Question({
  handleFromChapterChange,
  handleToChapterChange,
  handleTextChange,
  handleNumberChange,
  toChapter,
  toVerse,
  fromChapter,
  handelToVerseChange,
  handelFromVerseChange,
  numberOfWords,
  verse_max,
  fromVerse,
  chapterOptions,
  cancelQuestion,
  submitQuestion,
  from_verses_options,
  questionHead,
  to_verses_options
}) {
  return (
    <form className="question-maker-form">
      <div className="question-select-col">
        <span className="question-from-to-label">من</span>
        <Select
          value={chapterOptions[fromChapter - 1]}
          className="question-from-to-select"
          classNamePrefix="select"
          placeholder="اختر السورة"
          isDisabled={state.isDisabled}
          isLoading={state.isLoading}
          isClearable={state.isClearable}
          isRtl={state.isRtl}
          isSearchable={state.isSearchable}
          name="chapters_from"
          options={chapterOptions}
          onChange={handleFromChapterChange}
        />
        <Select
          value={from_verses_options[fromVerse - 1]}
          className="question-from-to-select"
          classNamePrefix="select"
          placeholder="اختر الاية"
          isDisabled={state.isDisabled}
          isLoading={state.isLoading}
          isClearable={state.isClearable}
          isRtl={state.isRtl}
          isSearchable={state.isSearchable}
          name="verse_from"
          options={from_verses_options}
          onChange={handelFromVerseChange}
        />
      </div>

      <div className="question-select-col">
        <span className="question-from-to-label">إلى</span>
        <Select
          value={chapterOptions[toChapter - 1]}
          className="question-from-to-select"
          classNamePrefix="select"
          placeholder="اختر السورة"
          isDisabled={state.isDisabled}
          isLoading={state.isLoading}
          isClearable={state.isClearable}
          isRtl={state.isRtl}
          isSearchable={state.isSearchable}
          name="chapters_to"
          options={chapterOptions}
          onChange={handleToChapterChange}
        />
        <Select
          value={to_verses_options[toVerse - 1]}
          className="question-from-to-select"
          classNamePrefix="select"
          placeholder="اختر الاية"
          isDisabled={state.isDisabled}
          isLoading={state.isLoading}
          isClearable={state.isClearable}
          isRtl={state.isRtl}
          isSearchable={state.isSearchable}
          name="verse_to"
          options={to_verses_options}
          onChange={handelToVerseChange}
        />
      </div>
      <div className="question-input-row">
        <div className="d-flex flex-column">
          <span className="question-from-to-label">رأس السؤال</span>
          <input
            className="question-head"
            type="text"
            value={questionHead}
            onChange={handleTextChange}
          />
        </div>
        <div className="d-flex flex-column">
          <span className="question-from-to-label">عدد الكلمات</span>
          <input
            className="question-head-n"
            type="number"
            value={numberOfWords}
            max={verse_max}
            min="1"
            onChange={handleNumberChange}
          />
        </div>
      </div>
      <div className="question-btn-row">
        <button
          type="submit"
          className="btn btn-light question-form-btn"
          onClick={submitQuestion}
        >
          اعتماد
        </button>

        <button
          className="btn btn-light question-form-btn"
          onClick={cancelQuestion}
        >
          إلغاء
        </button>
      </div>
    </form>
  );
}
