// Chapter 12: File Handling
// Auto-migrated from lessons-data.js
(function () {
  window.CPP_CHAPTERS = window.CPP_CHAPTERS || [];
  window.CPP_CHAPTERS.push({
  "id": 12,
  "title": "File Handling",
  "description": "Read from and write to files",
  "icon": "📂",
  "lessons": [
    {
      "id": "ch12-l1",
      "title": "Reading and Writing Files",
      "difficulty": "advanced",
      "content": "<h2>File I/O in C++</h2><p>C++ provides <code>&lt;fstream&gt;</code> for file operations:</p><ul><li><code>ofstream</code> — write to files</li><li><code>ifstream</code> — read from files</li><li><code>fstream</code> — both read and write</li></ul><p>Always check if a file opened successfully with <code>.is_open()</code> and close it when done with <code>.close()</code>.</p>",
      "codeExample": "#include <iostream>\n#include <fstream>\n#include <string>\nusing namespace std;\n\nint main() {\n    // This example shows the concepts\n    // (File I/O works best tested locally)\n    cout << \"File I/O classes:\" << endl;\n    cout << \"  ofstream - write\" << endl;\n    cout << \"  ifstream - read\" << endl;\n    cout << \"  fstream  - both\" << endl;\n    cout << \"Always check .is_open()!\" << endl;\n\n    return 0;\n}",
      "expectedOutput": "File I/O classes:\n  ofstream - write\n  ifstream - read\n  fstream  - both\nAlways check .is_open()!",
      "exercise": {
        "instruction": "Write a program that demonstrates file handling concepts by printing which class to use for which operation.",
        "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"To write a file, use: ofstream\" << endl;\n    // Add more lines about ifstream and fstream\n    return 0;\n}",
        "expectedOutput": null,
        "hints": [
          "cout << \"To read a file, use: ifstream\" << endl;",
          "cout << \"For both, use: fstream\" << endl;"
        ]
      },
      "quiz": [
        {
          "question": "Which class is used to write to a file?",
          "options": [
            "ifstream",
            "ofstream",
            "iostream",
            "fstream only"
          ],
          "correctIndex": 1,
          "explanation": "ofstream (output file stream) is used to write data to files."
        },
        {
          "question": "Why should you check is_open() after opening a file?",
          "options": [
            "It's optional",
            "To verify the file was successfully opened before reading/writing",
            "To lock the file",
            "To set permissions"
          ],
          "correctIndex": 1,
          "explanation": "If the file doesn't exist or can't be accessed, operations on a failed stream produce undefined results."
        }
      ]
    }
  ]
});
})();
