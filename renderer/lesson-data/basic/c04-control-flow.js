// Chapter 4: Control Flow
// Auto-migrated from lessons-data.js
(function () {
  window.CPP_CHAPTERS = window.CPP_CHAPTERS || [];
  window.CPP_CHAPTERS.push({
  "id": 4,
  "title": "Control Flow",
  "description": "Make decisions with if, else, and switch",
  "icon": "🔀",
  "lessons": [
    {
      "id": "ch4-l1",
      "title": "If and Else Statements",
      "difficulty": "beginner",
      "content": "<h2>Making Decisions</h2><p>The <code>if</code> statement executes code only when a condition is true. You can add <code>else</code> for the false case, and <code>else if</code> for multiple conditions.</p><h3>Syntax</h3><p><code>if (condition) { ... } else if (other) { ... } else { ... }</code></p><p>Conditions can use any expression that evaluates to true/false. In C++, any non-zero value is considered <code>true</code>, and <code>0</code> is <code>false</code>.</p>",
      "codeExample": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int score = 85;\n\n    if (score >= 90) {\n        cout << \"Grade: A\" << endl;\n    } else if (score >= 80) {\n        cout << \"Grade: B\" << endl;\n    } else if (score >= 70) {\n        cout << \"Grade: C\" << endl;\n    } else {\n        cout << \"Grade: F\" << endl;\n    }\n\n    return 0;\n}",
      "expectedOutput": "Grade: B",
      "exercise": {
        "instruction": "Write a program that checks if a number is positive, negative, or zero, and prints the appropriate message.",
        "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int num = -5;\n    // Check and print \"Positive\", \"Negative\", or \"Zero\"\n    return 0;\n}",
        "expectedOutput": "Negative",
        "hints": [
          "Use if (num > 0), else if (num < 0), else",
          "The number -5 should print \"Negative\""
        ]
      },
      "quiz": [
        {
          "question": "What happens if the if condition is false and there is no else?",
          "options": [
            "Error",
            "The program crashes",
            "Nothing happens, execution continues",
            "It loops"
          ],
          "correctIndex": 2,
          "explanation": "If the condition is false and there's no else block, the program simply skips the if block and continues."
        },
        {
          "question": "Is 0 considered true or false in C++?",
          "options": [
            "True",
            "False",
            "Neither",
            "Error"
          ],
          "correctIndex": 1,
          "explanation": "In C++, 0 is false and any non-zero value is true."
        }
      ]
    },
    {
      "id": "ch4-l2",
      "title": "Switch Statements",
      "difficulty": "beginner",
      "content": "<h2>Choosing Between Multiple Options</h2><p>When you have many possible values for a single variable, <code>switch</code> is cleaner than a chain of if/else-if:</p><p>Each <code>case</code> matches a specific value. <code>break</code> exits the switch. Without break, execution \"falls through\" to the next case.</p><p>The <code>default</code> case handles any value not matched by the cases above it.</p>",
      "codeExample": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int day = 3;\n\n    switch (day) {\n        case 1: cout << \"Monday\" << endl; break;\n        case 2: cout << \"Tuesday\" << endl; break;\n        case 3: cout << \"Wednesday\" << endl; break;\n        case 4: cout << \"Thursday\" << endl; break;\n        case 5: cout << \"Friday\" << endl; break;\n        default: cout << \"Weekend\" << endl; break;\n    }\n\n    return 0;\n}",
      "expectedOutput": "Wednesday",
      "exercise": {
        "instruction": "Write a switch statement that prints the name of a month given its number (1-12). Use month = 7.",
        "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int month = 7;\n    // Use switch to print the month name\n    return 0;\n}",
        "expectedOutput": "July",
        "hints": [
          "case 1: cout << \"January\"; break;",
          "case 7 should print \"July\"",
          "Add a default case for invalid months"
        ]
      },
      "quiz": [
        {
          "question": "What happens if you forget break in a switch case?",
          "options": [
            "Compile error",
            "Execution falls through to the next case",
            "The program crashes",
            "It returns to the first case"
          ],
          "correctIndex": 1,
          "explanation": "Without break, execution continues into the next case (fall-through behavior)."
        },
        {
          "question": "Can switch work with strings in standard C++?",
          "options": [
            "Yes",
            "No, only with integral types",
            "Only with C-strings",
            "Yes, since C++11"
          ],
          "correctIndex": 1,
          "explanation": "Standard C++ switch only works with integral types (int, char, enum). For strings, use if/else."
        }
      ]
    },
    {
      "id": "ch4-l3",
      "title": "Ternary Operator",
      "difficulty": "beginner",
      "content": "<h2>The Conditional (Ternary) Operator</h2><p>The ternary operator <code>? :</code> is a compact way to write simple if/else expressions:</p><p><code>result = (condition) ? value_if_true : value_if_false;</code></p><p>It's great for simple assignments but should not be overused for complex logic.</p>",
      "codeExample": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int age = 20;\n    string status = (age >= 18) ? \"Adult\" : \"Minor\";\n    cout << status << endl;\n\n    int a = 10, b = 20;\n    int bigger = (a > b) ? a : b;\n    cout << \"Bigger: \" << bigger << endl;\n\n    return 0;\n}",
      "expectedOutput": "Adult\nBigger: 20",
      "exercise": {
        "instruction": "Use the ternary operator to check if a number is even or odd and print the result.",
        "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int num = 7;\n    // Use ternary: (num % 2 == 0) ? \"Even\" : \"Odd\"\n    return 0;\n}",
        "expectedOutput": "Odd",
        "hints": [
          "string result = (num % 2 == 0) ? \"Even\" : \"Odd\";",
          "Then cout << result << endl;"
        ]
      },
      "quiz": [
        {
          "question": "What does (5 > 3) ? \"yes\" : \"no\" evaluate to?",
          "options": [
            "\"yes\"",
            "\"no\"",
            "5",
            "true"
          ],
          "correctIndex": 0,
          "explanation": "Since 5 > 3 is true, the expression evaluates to the first value: \"yes\"."
        }
      ]
    }
  ]
});
})();
