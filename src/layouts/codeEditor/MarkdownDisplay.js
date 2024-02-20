import React from "react";
import MarkdownIt from "markdown-it";
import subscript from "markdown-it-sub";
import superscript from "markdown-it-sup";
import footnote from "markdown-it-footnote";
import deflist from "markdown-it-deflist";
import abbr from "markdown-it-abbr";
import container from "markdown-it-container";
import "../../assets/styles/MarkdownStyles.css";

const MarkdownDisplay = ({ content }) => {
  const md = new MarkdownIt({
    html: true, // Enable HTML tags in source
    linkify: true, // Autoconvert URL-like text to links
    typographer: true, // Enable some typographic replacements
  })
    .use(subscript)
    .use(superscript)
    .use(footnote)
    .use(deflist)
    .use(abbr)
    .use(container, "warning") // For custom containers
    .use(container, "success")
    .use(container, "info")
    .use(container, "danger");

  const renderedContent = md.render(content);
  return <div className="markdown-body" dangerouslySetInnerHTML={{ __html: renderedContent }} />;
};

export default MarkdownDisplay;
