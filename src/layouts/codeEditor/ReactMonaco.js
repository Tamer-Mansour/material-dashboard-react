import React from "react";
import Editor from "@monaco-editor/react";
import "../../assets/styles/EditorStyle.css"

const ReactMonaco = ({ theme, editorHeight, customCode, isLoading, onChange }) => {
  return (
    <Editor
      height={editorHeight}
      defaultLanguage="javascript"
      value={customCode} // Updated prop name
      theme={theme}
      onChange={onChange} // Added onChange prop
      options={{
        fontLigatures: true, // Removed quotes around true
        minimap: { size: "fit" },
        smoothScrolling: true,
        smartSelect: true,
        wordWrap: "on",
        wordBasedSuggestions: true,
        quickSuggestions: true,
        autoClosingQuotes: "always",
        snippetSuggestions: "bottom",
        suggest: true,
        copyWithSyntaxHighlighting: true,
        cursorBlinking: "expand",
        cursorStyle: "line",
        cursorSmoothCaretAnimation: true,
        cursorWidth: 3,
        formatOnType: true,
        formatOnPaste: true,
        readOnly: isLoading,
      }}
    />
  );
};

export default ReactMonaco;
