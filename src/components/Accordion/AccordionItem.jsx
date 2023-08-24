import React from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const AccordionItem = ({
  showDescription,
  ariaExpanded,
  fontWeightBold,
  item,
  index,
  onClick,
  light,
}) => {
  return (
    <div className="faq__question my-4" key={index}>
      <dt>
        <button
          aria-expanded={ariaExpanded}
          aria-controls={`faq${index + 1}_desc`}
          data-qa="faq__question-button"
          className={`faq__question-button ${fontWeightBold}`}
          onClick={onClick}
          style={{
            background: "#1b1b1d",
          }}
        >
          <div className="d-flex justify-content-between w-100">
            <div
              className="accodian"
              style={{
                color: `${light !== "light" ? "#fff" : "#000"}`,
                fontFamily: "monospace",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {item.question}
            </div>
            <div className="">
              {showDescription ? (
                <IoIosArrowUp style={{ color: "#A460FB", fontWeight: 500 }} />
              ) : (
                <IoIosArrowDown style={{ color: "#A460FB", fontWeight: 500 }} />
              )}
            </div>
          </div>
        </button>
      </dt>
      <dd className="">
        <p
          id={`faq${index + 1}_desc root1 ${light}`}
          data-qa="faq__desc"
          className={`faq__desc ${showDescription} ${light}`}
        >
          {item.answer}
        </p>
      </dd>
    </div>
  );
};

export default AccordionItem;
