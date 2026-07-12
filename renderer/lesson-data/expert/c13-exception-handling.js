// Chapter 13: Exception Handling
// Auto-migrated from lessons-data.js
(function () {
  window.CPP_CHAPTERS = window.CPP_CHAPTERS || [];
  window.CPP_CHAPTERS.push({
  "id": 13,
  "title": "Exception Handling",
  "description": "Handle errors gracefully with try-catch",
  "icon": "🛡️",
  "lessons": [
    {
      "id": "ch13-l1",
      "title": "Try, Catch, and Throw",
      "difficulty": "advanced",
      "content": "<h2>Handling Errors Gracefully</h2><p>Instead of crashing, C++ programs can <strong>throw</strong> exceptions and <strong>catch</strong> them:</p><ul><li><code>throw</code> — signal an error</li><li><code>try { ... }</code> — wrap code that might throw</li><li><code>catch (type& e) { ... }</code> — handle the exception</li></ul><p>Standard exceptions like <code>runtime_error</code>, <code>invalid_argument</code>, and <code>out_of_range</code> are in <code>&lt;stdexcept&gt;</code>.</p>",
      "codeExample": "#include <iostream>\n#include <stdexcept>\nusing namespace std;\n\ndouble divide(double a, double b) {\n    if (b == 0) {\n        throw runtime_error(\"Division by zero!\");\n    }\n    return a / b;\n}\n\nint main() {\n    try {\n        cout << divide(10, 3) << endl;\n        cout << divide(10, 0) << endl;\n    } catch (const runtime_error& e) {\n        cout << \"Error: \" << e.what() << endl;\n    }\n    cout << \"Program continues.\" << endl;\n    return 0;\n}",
      "expectedOutput": "3.33333\nError: Division by zero!\nProgram continues.",
      "exercise": {
        "instruction": "Write a function that throws an exception if a negative number is passed. Catch it in main.",
        "starterCode": "#include <iostream>\n#include <stdexcept>\nusing namespace std;\n\nint squareRoot(int n) {\n    // Throw if n is negative\n    // Otherwise return n (simplified)\n    return n;\n}\n\nint main() {\n    try {\n        cout << squareRoot(16) << endl;\n        cout << squareRoot(-4) << endl;\n    } catch (const invalid_argument& e) {\n        cout << \"Caught: \" << e.what() << endl;\n    }\n    return 0;\n}",
        "expectedOutput": "16\nCaught: Negative input",
        "hints": [
          "if (n < 0) throw invalid_argument(\"Negative input\");",
          "Catch with catch (const invalid_argument& e)"
        ]
      },
      "quiz": [
        {
          "question": "What does throw do?",
          "options": [
            "Exits the program",
            "Signals an error that can be caught",
            "Prints an error",
            "Returns null"
          ],
          "correctIndex": 1,
          "explanation": "throw creates an exception object and transfers control to the nearest matching catch block."
        },
        {
          "question": "What method do you call on an exception to get the error message?",
          "options": [
            "message()",
            "what()",
            "error()",
            "toString()"
          ],
          "correctIndex": 1,
          "explanation": "The what() method returns a C-string describing the error."
        }
      ]
    }
  ]
});
})();
