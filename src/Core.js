import React, { useEffect, useState } from "react";
import axios from "axios";
import RenderVerses from "./render_verses";
import ChapterDropDown from "./chapter_dropDown";
import VerseDropDown from "./verse_dropDown";
import Question from "./Question";
// import Select from "react-select";
// import { Spinner } from "primereact/spinner";
// import useAsheForm from "./custom-hooks/useAsheForm";

// import {
//   HEFZ_ENTRY_FORM_SCHEMA,
//   HEFZ_ENTRY_FORM_VALIDATION
// } from "./HEFZENTRYFORM";

const initialChapters = [{ id: "", name: "", first_page: "", last_page: "" }];

const initialChapterOptions = [{ value: "", label: "" }];

const state = {
  isClearable: false,
  isDisabled: false,
  isLoading: false,
  isRtl: false,
  isSearchable: false,
};

const chapters = [
  { id: 1, value: 1, label: "الفاتحة", verses_count: 0 },
  { id: 2, value: 2, label: "البقرة", verses_count: 0 },
  { id: 3, value: 3, label: "آل عمران", verses_count: 0 },
  { id: 4, value: 4, label: "النساء", verses_count: 0 },
];

const difficulty = [
  { value: "1", label: "سهل" },
  { value: "2", label: "متوسط" },
  { value: "3", label: "صعب" },
];
const rowayat = [
  { value: "1", label: "قالون" },
  { value: "2", label: "ورش" },
  { value: "3", label: "البزي" },
  { value: "4", label: "قنبل" },
  { value: "5", label: "الدوري" },
  { value: "6", label: "السوسي" },
  { value: "7", label: "هشام" },
  { value: "8", label: "ابن ذكوان" },
  { value: "9", label: "شعبة" },
  { value: "10", label: "حفص" },
  { value: "11", label: "خلف بن هشام" },
  { value: "12", label: "خلاد بن خالد" },
  { value: "13", label: "أبو الحارث الليث" },
  { value: "14", label: "حفص بن عمر الدوري" },
  { value: "15", label: "عيسى بن وردان المدني" },
  { value: "16", label: "ابن جمّاز" },
  { value: "17", label: "رويس" },
  { value: "18", label: "روح بن عبد المؤمن" },
  { value: "19", label: "إسحاق بن إبراهيم" },
  { value: "20", label: "إدريس بن عبد الكريم الحداد" },
];

const isEven = (number) => {
  if (number % 2) {
    return true;
  } else return false;
};

export default function Core() {
  const [chapterSelected, setChapterSelected] = useState(null);
  const [wordsOfSelectedVerse, setWordsOfSelectedVerse] = useState([]);
  const [wordsToHighlight, setWordsToHighlight] = useState([]);
  // verses = [] that stores the verses to be rendered
  const [verses_current_page1, setVerses_current_page1] = useState(null);
  const [verses_current_page2, setVerses_current_page2] = useState(null);
  //current page 1 and 2 to be rendered
  const [current_page1, setCurrent_page1] = useState(1);
  const [current_page2, setCurrent_page2] = useState(2);
  //prev page and next page from the 2 pages rendered
  const [next_page, setNext_page] = useState(null);
  const [prev_page, setPrev_page] = useState(null);
  // load
  const [loading, setLoading] = useState(false);
  // chapters info
  const [chapters, setChapters] = useState(initialChapters);
  const [chapterOptions, setChapterOptions] = useState(initialChapterOptions);
  //
  const [questionOn, setQuestionOn] = useState(false);
  //
  const [question_FromVerse, setQuestion_FromVerse] = useState(false);
  const [question_ToVerse, setQuestion_ToVerse] = useState(false);
  // form submition vars
  const [fromChapter, setFromChapter] = useState(null);
  const [toChapter, setToChapter] = useState(null);
  const [fromVerse, setFromVerse] = useState(null);
  const [toVerse, setToVerse] = useState(null);
  const [questionHead, setQuestionHead] = useState("");
  const [tempQuestionHead, setTempQuestionHead] = useState(null);
  const [selectedVerse, setSelectedVerse] = useState(null);
  //
  const [from_verses_options, setFrom_verses_options] = useState([]);
  const [to_verses_options, setTo_verses_options] = useState([]);
  const [verses_options, setVerses_options] = useState([]);
  //
  const [verse_max, setVerse_max] = useState(null);
  const [numberOfWords, setNumberOfWords] = useState(null);

  useEffect(() => {
    // this useEffect fuction is used only in intial start to load all chapters infos
    axios
      .get("http://107.170.89.77/quran_data_api/api/chapters/")
      .then((res) => {
        setChapters(
          res.data.map((chapter) => {
            return {
              id: chapter.chapter_id,
              name: chapter.name,
              bismillah_pre: chapter.bismillah_pre,
              verses_count: chapter.verses_count,
              first_page: chapter.first_page,
              last_page: chapter.last_page,
            };
          })
        );
        setChapterOptions(
          res.data.map((chapter) => {
            return { value: chapter.chapter_id, label: chapter.name };
          })
        );
      });
  }, []);

  useEffect(() => {
    setLoading(false); // this useEffect fuction is used only in intial start to load the first page
    axios
      .get(
        "http://107.170.89.77/quran_data_api/api/verses/?page_number=" +
          current_page1
      )
      .then((res) => {
        setVerses_current_page1(res.data.results);
        return axios.get(
          "http://107.170.89.77/quran_data_api/api/verses/?page_number=" +
            current_page2
        );
      })
      .then((res) => {
        setVerses_current_page2(res.data.results);
        setLoading(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [current_page1, current_page2]);

  useEffect(() => {
    if (current_page2 >= 604) {
      setNext_page(false);
    } else {
      setNext_page(true);
    }
    if (current_page1 > 1) {
      setPrev_page(true);
    } else {
      setPrev_page(false);
    }
  }, [current_page1, current_page2]);

  const handleNextPage = () => {
    if (next_page === true) {
      setCurrent_page1(current_page1 + 2);
      setCurrent_page2(current_page2 + 2);
    }
  };

  const handlePreviousPage = () => {
    if (prev_page === true) {
      setCurrent_page1(current_page1 - 2);
      setCurrent_page2(current_page2 - 2);
    }
  };

  const changePage = (selected_page) => {
    if (isEven(selected_page) === true) {
      setCurrent_page2(selected_page);
      setCurrent_page1(selected_page - 1);
    } else {
      setCurrent_page1(selected_page);
      setCurrent_page2(selected_page + 1);
    }
  };
  const handelChapterChange = (e) => {
    if (e !== null) {
      let selected_chapter = chapters.find((chapter) => chapter.id === e.value);
      let selected_page = selected_chapter.first_page;
      setChapterSelected(e.value);
      let n = selected_chapter.verses_count;
      let options = [...Array(n).keys()].map((x) => {
        return x + 1;
      });
      setVerses_options(
        options.map((option) => {
          return { value: option, label: toArabicDigits(option.toString()) };
        })
      );
      changePage(selected_page);
    }
  };

  const handleVerseClick = (e, verse_selected) => {
    if (question_FromVerse === true) {
      setQuestion_FromVerse(false);
      setQuestion_ToVerse(true);
      setSelectedVerse(verse_selected);
      setQuestionHead(verse_selected.text_simple);
      setWordsOfSelectedVerse(verse_selected.words);
      setWordsToHighlight(verse_selected.words);
      setTempQuestionHead(verse_selected.text_simple);
      setFromChapter(verse_selected.chapter);
      let selected_chapter = chapters.find(
        (chapter) => chapter.id === verse_selected.chapter
      );
      let n = selected_chapter.verses_count;
      let options = [...Array(n).keys()].map((x) => {
        return x + 1;
      });
      setFrom_verses_options(
        options.map((option) => {
          return { value: option, label: toArabicDigits(option.toString()) };
        })
      );
      setFromVerse(verse_selected.verse_number);
      let l = verse_selected.text_simple.split(" ").length;
      setNumberOfWords(l);
      setVerse_max(l);
    }
    if (question_ToVerse === true) {
      setQuestion_FromVerse(true);
      setQuestion_ToVerse(false);
      setToChapter(verse_selected.chapter);
      setToVerse(verse_selected.verse_number);
      let selected_chapter = chapters.find(
        (chapter) => chapter.id === verse_selected.chapter
      );
      let n = selected_chapter.verses_count;
      let options = [...Array(n).keys()].map((x) => {
        return x + 1;
      });
      setTo_verses_options(
        options.map((option) => {
          return { value: option, label: toArabicDigits(option.toString()) };
        })
      );
    }
  };

  const handelQuestion = (e) => {
    setQuestionOn(true);
    setQuestion_FromVerse(true);
  };
  const handleFromChapterChange = (e) => {
    if (e !== null) {
      let selected_chapter = chapters.find((chapter) => chapter.id === e.value);
      let selected_page = selected_chapter.first_page;
      setFromChapter(selected_chapter.id);
      let n = selected_chapter.verses_count;
      let options = [...Array(n).keys()].map((x) => {
        return x + 1;
      });
      setFrom_verses_options(
        options.map((option) => {
          return { value: option, label: toArabicDigits(option.toString()) };
        })
      );
      changePage(selected_page);
    }
  };
  const handleToChapterChange = (e) => {
    if (e !== null) {
      let selected_chapter = chapters.find((chapter) => chapter.id === e.value);
      setToChapter(selected_chapter.id);
      let n = selected_chapter.verses_count;
      let options = [...Array(n).keys()].map((x) => {
        return x + 1;
      });
      setTo_verses_options(
        options.map((option) => {
          return { value: option, label: toArabicDigits(option.toString()) };
        })
      );
    }
  };

  const checkForVerseInPage_1 = (keyOfVerse) => {
    let verse = verses_current_page1.find(
      (verse) => verse.verse_key === keyOfVerse
    );
    if (typeof verse !== "undefined") {
      setQuestionHead(verse.text_simple);
      setWordsOfSelectedVerse(verse.words);
      setWordsToHighlight(verse.words);
      setSelectedVerse(verse);
      setTempQuestionHead(verse.text_simple);
      let l = verse.text_simple.split(" ").length;
      setNumberOfWords(l);
      setVerse_max(l);
      return true;
    } else {
      return false;
    }
  };

  const checkForVerseInPage_2 = (keyOfVerse) => {
    let verse = verses_current_page2.find(
      (verse) => verse.verse_key === keyOfVerse
    );
    if (typeof verse !== "undefined") {
      setQuestionHead(verse.text_simple);
      setWordsOfSelectedVerse(verse.words);
      setWordsToHighlight(verse.words);
      setSelectedVerse(verse);
      setTempQuestionHead(verse.text_simple);
      let l = verse.text_simple.split(" ").length;
      setNumberOfWords(l);
      setVerse_max(l);
      return true;
    } else {
      return false;
    }
  };

  const checkForVerseInPages = (keyOfVerse) => {
    if (
      checkForVerseInPage_1(keyOfVerse) === true ||
      checkForVerseInPage_2(keyOfVerse) === true
    ) {
      return true;
    } else {
      return false;
    }
  };

  const next = (nextUrl, keyOfVerse) => {
    let verse = axios.get(nextUrl).then((res) => {
      let verse = res.data.results.find(
        (verse) => verse.verse_key === keyOfVerse
      );
      let nextUrl = res.data.next;
      if (typeof verse === "undefined") {
        verse = next(nextUrl, keyOfVerse);
      }
      return verse;
    });
    return verse;
  };

  const getToPage = (keyOfVerse, chapter) => {
    if (checkForVerseInPages(keyOfVerse) === false) {
      setLoading(false);
      axios
        .get(
          "http://107.170.89.77/quran_data_api/api/verses/?chapter=" + chapter
        )
        .then((res) => {
          let verse = res.data.results.find(
            (verse) => verse.verse_key === keyOfVerse
          );
          let nextUrl = res.data.next;
          if (typeof verse === "undefined") {
            verse = next(nextUrl, keyOfVerse);
          }
          return verse;
        })
        .then((verse) => {
          if (isEven(verse.page_number) === true) {
            setCurrent_page2(verse.page_number);
            setCurrent_page1(verse.page_number - 1);
          } else {
            setCurrent_page1(verse.page_number);
            setCurrent_page2(verse.page_number + 1);
          }
        });
    }
  };

  const getToPage_onVerseSelection = (keyOfVerse, chapter) => {
    if (checkForVerseInPages(keyOfVerse) === false) {
      setLoading(false);
      axios
        .get(
          "http://107.170.89.77/quran_data_api/api/verses/?chapter=" + chapter
        )
        .then((res) => {
          let verse = res.data.results.find(
            (verse) => verse.verse_key === keyOfVerse
          );
          let nextUrl = res.data.next;
          if (typeof verse === "undefined") {
            verse = next(nextUrl, keyOfVerse);
          }
          return verse;
        })
        .then((verse) => {
          setQuestionHead(verse.text_simple);
          setWordsOfSelectedVerse(verse.words);
          setWordsToHighlight(verse.words);
          setSelectedVerse(verse);
          setTempQuestionHead(verse.text_simple);
          let l = verse.text_simple.split(" ").length;
          setNumberOfWords(l);
          setVerse_max(l);
          if (isEven(verse.page_number) === true) {
            setCurrent_page2(verse.page_number);
            setCurrent_page1(verse.page_number - 1);
          } else {
            setCurrent_page1(verse.page_number);
            setCurrent_page2(verse.page_number + 1);
          }
        });
    }
  };

  const handelFromVerseChange = (e) => {
    if (e !== null) {
      let verse_number = e.value;
      let keyOfVerse = fromChapter + ":" + verse_number;
      setFromVerse(verse_number);
      getToPage_onVerseSelection(keyOfVerse, fromChapter);
    }
  };

  const handelVerseChange = (e) => {
    if (e !== null) {
      let verse_number = e.value;
      let keyOfVerse = chapterSelected + ":" + verse_number;
      getToPage(keyOfVerse, chapterSelected);
    }
  };

  const handelToVerseChange = (e) => {
    if (e !== null) {
      setToVerse(e.value);
    }
  };

  const cancelQuestion = (e) => {
    setQuestionOn(false);
    setQuestion_FromVerse(true);
    setQuestion_ToVerse(false);
    setQuestionHead("");
    setTempQuestionHead(null);
    setFromChapter(null);
    setFromVerse(null);
    setToChapter(null);
    setToVerse(null);
    setVerse_max(null);
    setNumberOfWords(null);
    setSelectedVerse(null);
    setWordsOfSelectedVerse([]);
    setWordsToHighlight([]);
  };

  const submitQuestion = (e) => {
    e.preventDefault();
    alert(
      "Question Submitted!\nFrom Chapter: " +
        fromChapter +
        "\nFrom Verse: " +
        fromVerse +
        "\nTo Chapter: " +
        toChapter +
        "\nTo Verse: " +
        toVerse +
        "\nQuestion Title: " +
        questionHead
    );
    setQuestionOn(false);
    setQuestion_FromVerse(true);
    setQuestion_ToVerse(false);
    setQuestionHead("");
    setTempQuestionHead(null);
    setFromChapter(null);
    setFromVerse(null);
    setToChapter(null);
    setToVerse(null);
    setVerse_max(null);
    setNumberOfWords(null);
    setSelectedVerse(null);
    setWordsOfSelectedVerse([]);
    setWordsToHighlight([]);
  };

  const handleTextChange = (e) => {
    setQuestionHead(e.target.value);
    let x = e.target.value.split(" ");
    let l = e.target.value.split(" ").length;
    if (x[x.length - 1] === "") {
      l = l - 1;
    }
    setNumberOfWords(l);
  };

  const handleNumberChange = (e) => {
    let x = e.target.value;
    let stringOfQuestion = tempQuestionHead;
    stringOfQuestion = stringOfQuestion.split(" ");
    stringOfQuestion = stringOfQuestion
      .slice(0, x)
      .toString()
      .replace(/,/g, " ");
    setQuestionHead(stringOfQuestion);
    setNumberOfWords(x);
    let textTohighlight = [];
    textTohighlight = wordsOfSelectedVerse;
    console.log(textTohighlight);
    textTohighlight = textTohighlight.slice(0, x);
    console.log(textTohighlight);
    setWordsToHighlight(textTohighlight);
  };

  return (
    <div className="quran-explorer">
      <div className="quran-page-nav-container">
        <span
          className="fas fa-arrow-alt-circle-right quran-page-nav-btn"
          onClick={() => handlePreviousPage()}
        />
      </div>
      <div className="quran-pages-view-container">
        <div className="nav-select-container">
          <ChapterDropDown
            handelChapterChange={handelChapterChange}
            chapters={chapterOptions}
          />
          <VerseDropDown
            handelVerseChange={handelVerseChange}
            verses_options={verses_options}
          />
        </div>
        {questionOn ? (
          <Question
            handleNumberChange={handleNumberChange}
            handleTextChange={handleTextChange}
            verse_max={verse_max}
            numberOfWords={numberOfWords}
            fromChapter={fromChapter}
            fromVerse={fromVerse}
            toChapter={toChapter}
            toVerse={toVerse}
            questionHead={questionHead}
            submitQuestion={submitQuestion}
            cancelQuestion={cancelQuestion}
            chapterOptions={chapterOptions}
            handleFromChapterChange={handleFromChapterChange}
            handleToChapterChange={handleToChapterChange}
            handelFromVerseChange={handelFromVerseChange}
            handelToVerseChange={handelToVerseChange}
            from_verses_options={from_verses_options}
            to_verses_options={to_verses_options}
          />
        ) : (
          <div className="create-question-btn">
            <button className="btn btn-light" onClick={handelQuestion}>
              اختر السؤال
            </button>
          </div>
        )}
        {loading ? (
          <RenderVerses
            wordsToHighlight={wordsToHighlight}
            selectedVerse={selectedVerse}
            handleVerseClick={handleVerseClick}
            chapters={chapters}
            page_1={current_page1}
            page_2={current_page2}
            verses_current_page1={verses_current_page1}
            verses_current_page2={verses_current_page2}
          />
        ) : (
          <div className="loader-container fa-10x">
            <i className="loader fas fa-circle-notch fa-spin" />
          </div>
        )}
      </div>
      <div className="quran-page-nav-container">
        <span
          className="fas fa-arrow-alt-circle-left quran-page-nav-btn"
          onClick={() => handleNextPage()}
        />
      </div>
    </div>
  );
}

const toArabicDigits = (x) => {
  var id = ["۰", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return x.replace(/[0-9]/g, function (w) {
    return id[+w];
  });
};
