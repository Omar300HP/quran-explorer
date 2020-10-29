import React, { Fragment } from "react";

export default function RenderVerses({
  page_1,
  page_2,
  verses_current_page1,
  verses_current_page2,
  chapters,
  handleVerseClick,
  selectedVerse,
  wordsToHighlight
}) {
  const renderPages = () => {
    //d-flex flex-row flex-wrap
    return (
      <Fragment>
        <div class="quran-page-container">
          <div className="quran-page">{renderVerses(verses_current_page1)}</div>
          <div className="page-number">{toArabicDigits(page_1.toString())}</div>
        </div>
        <div class="quran-page-container">
          <div className="quran-page">{renderVerses(verses_current_page2)}</div>
          <div className="page-number">{toArabicDigits(page_2.toString())}</div>
        </div>
      </Fragment>
    );
  };

  const renderVerses = pageVerses => {
    let words_line_numbers = [];
    return pageVerses.map(verse => {
      return verse.words.map((word, index) => {
        let word_line_number = {};
        word_line_number.id = word.id;
        word_line_number.line = word.line_number;
        words_line_numbers.push(word_line_number);

        const i = words_line_numbers.findIndex(w => w.id === word.id);
        let current_chapter = chapters.find(
          chapter => chapter.id === verse.chapter
        );

        let current_word_line = words_line_numbers[i].line;
        let previous_word_line = words_line_numbers[i - 1]
          ? words_line_numbers[i - 1].line
          : 0;

        let x = word.code.split("&#x");
        let y = x[1].split(";");
        let z = y[0].toUpperCase();
        return (
          <Fragment>
            {verse.verse_number === 1 && word.position === 1 && (
              <span className="w-100" />
            )}
            {verse.verse_number === 1 && word.position === 1 && (
              <div className="surah-name-container">
                <p className="surah-name">
                  {String.fromCharCode(parseInt("FB8C", 16))}{" "}
                  {String.fromCharCode(
                    parseInt("FB8C", 16) + current_chapter.id
                  )}
                </p>
                <span className="w-100" />
                <span className="surah-name">
                  {String.fromCharCode(parseInt("FB51", 16))}{" "}
                  {String.fromCharCode(parseInt("FB52", 16))}{" "}
                  {String.fromCharCode(parseInt("FB53", 16))}
                </span>
              </div>
            )}
            {verse.verse_number === 1 && word.position === 1 && (
              <span className="w-100" />
            )}
            {current_word_line !== previous_word_line && (
              <span className="w-100" />
            )}
            {word.text_indopak === null ? (
              <span
                key={word.id}
                className={`verse-head ${word.class_name}`}
                onClick={e => {
                  handleVerseClick(e, verse);
                }}
              >
                {String.fromCharCode(parseInt(z, 16))}
              </span>
            ) : (verse === selectedVerse) & wordsToHighlight.includes(word) ? (
              <span
                key={word.id}
                className={`${word.class_name}`}
                style={{ color: "gold" }}
              >
                {String.fromCharCode(parseInt(z, 16))}
              </span>
            ) : (
              <span key={word.id} className={`${word.class_name}`}>
                {String.fromCharCode(parseInt(z, 16))}
              </span>
            )}
          </Fragment>
        );
      });
    });
  };

  return <div className="quran-pages-container">{renderPages()}</div>;
}

const toArabicDigits = x => {
  var id = ["۰", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return x.replace(/[0-9]/g, function(w) {
    return id[+w];
  });
};
