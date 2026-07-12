// Chapter 7: Arrays & Strings
// Auto-migrated from lessons-data.js
(function () {
  window.CPP_CHAPTERS = window.CPP_CHAPTERS || [];
  window.CPP_CHAPTERS.push({
  "id": 7,
  "title": "Arrays & Strings",
  "description": "Work with collections and text data",
  "icon": "📝",
  "lessons": [
    {
      "id": "ch7-l1",
      "title": "Arrays",
      "difficulty": "intermediate",
      "content": "<h2>Storing Multiple Values</h2><p>An <strong>array</strong> stores a fixed-size sequence of elements of the same type. Elements are accessed by their index (starting at 0).</p><p>Declaration: <code>int nums[5] = {10, 20, 30, 40, 50};</code></p><ul><li>Index starts at <strong>0</strong> (first element is <code>nums[0]</code>)</li><li>Size is fixed at compile time</li><li>Going out of bounds is <strong>undefined behavior</strong></li></ul>",
      "codeExample": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int nums[] = {10, 20, 30, 40, 50};\n    int size = 5;\n\n    // Access elements\n    cout << \"First: \" << nums[0] << endl;\n    cout << \"Last: \" << nums[4] << endl;\n\n    // Loop through\n    int sum = 0;\n    for (int i = 0; i < size; i++) {\n        sum += nums[i];\n    }\n    cout << \"Sum: \" << sum << endl;\n\n    return 0;\n}",
      "expectedOutput": "First: 10\nLast: 50\nSum: 150",
      "exercise": {
        "instruction": "Create an array of 5 integers. Find and print the maximum value using a loop.",
        "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int arr[] = {42, 17, 93, 8, 56};\n    // Find and print the max\n    return 0;\n}",
        "expectedOutput": "Max: 93",
        "hints": [
          "Start with int maxVal = arr[0];",
          "Loop and update maxVal if arr[i] > maxVal"
        ]
      },
      "quiz": [
        {
          "question": "What is the index of the first element in a C++ array?",
          "options": [
            "1",
            "0",
            "-1",
            "Depends on the array"
          ],
          "correctIndex": 1,
          "explanation": "C++ arrays are 0-indexed. The first element is at index 0."
        },
        {
          "question": "What happens if you access an array out of bounds?",
          "options": [
            "Returns 0",
            "Compiler error",
            "Undefined behavior",
            "Throws an exception"
          ],
          "correctIndex": 2,
          "explanation": "Accessing out-of-bounds memory is undefined behavior — the program may crash, return garbage, or seem to work."
        }
      ]
    },
    {
      "id": "ch7-l2",
      "title": "Strings",
      "difficulty": "intermediate",
      "content": "<h2>Working with Text</h2><p>C++ provides <code>std::string</code> for text manipulation. Unlike C-style char arrays, strings are dynamic and safe.</p><h3>Useful String Methods</h3><ul><li><code>.length()</code> or <code>.size()</code> — number of characters</li><li><code>.substr(pos, len)</code> — extract a substring</li><li><code>.find(str)</code> — find position of a substring</li><li><code>+</code> — concatenation</li><li><code>[i]</code> — access individual characters</li></ul>",
      "codeExample": "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string greeting = \"Hello\";\n    string name = \"C++\";\n    string full = greeting + \", \" + name + \"!\";\n\n    cout << full << endl;\n    cout << \"Length: \" << full.length() << endl;\n    cout << \"Char 0: \" << full[0] << endl;\n    cout << \"Substr: \" << full.substr(7, 3) << endl;\n\n    return 0;\n}",
      "expectedOutput": "Hello, C++!\nLength: 11\nChar 0: H\nSubstr: C++",
      "exercise": {
        "instruction": "Write a program that reverses a string and prints it.",
        "starterCode": "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string str = \"Hello\";\n    string reversed = \"\";\n    // Build reversed string\n    cout << reversed << endl;\n    return 0;\n}",
        "expectedOutput": "olleH",
        "hints": [
          "Loop from str.length()-1 down to 0",
          "reversed += str[i]; for each character"
        ]
      },
      "quiz": [
        {
          "question": "What does string::length() return?",
          "options": [
            "The maximum capacity",
            "The number of characters",
            "The memory size in bytes",
            "The number of words"
          ],
          "correctIndex": 1,
          "explanation": "length() returns the number of characters in the string."
        },
        {
          "question": "How do you concatenate strings in C++?",
          "options": [
            "string.add()",
            "Using the + operator",
            "string.concat()",
            "Using &"
          ],
          "correctIndex": 1,
          "explanation": "The + operator concatenates strings in C++. s1 + s2 creates a new string with both combined."
        }
      ]
    }
  ]
});
})();
