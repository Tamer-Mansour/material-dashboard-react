import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
// import rehypeSanitize from "rehype-sanitize";

export default function Markdown() {
  const [value, setValue] = useState(``);
  return (
    // <div className="container">
      <MDEditor
        value={value}
        onChange={setValue}
      />
    // </div>
  );
}
