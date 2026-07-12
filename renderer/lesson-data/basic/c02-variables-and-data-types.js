// Chapter 2: Variables & Data Types
// Auto-migrated from lessons-data.js
(function () {
  window.CPP_CHAPTERS = window.CPP_CHAPTERS || [];
  window.CPP_CHAPTERS.push({
  "id": 2,
  "title": "Variables & Data Types",
  "description": "Store and manipulate different kinds of data",
  "icon": "📦",
  "lessons": [
    {
      "id": "ch2-l1",
      "title": "Variables and Basic Types",
      "difficulty": "beginner",
      "content": "<h2>Storing Data in Variables</h2><p>A <strong>variable</strong> is a named container that holds a value. In C++, you must declare a variable's type before using it.</p><h3>Common Data Types</h3><ul><li><code>int</code> — Whole numbers (e.g., 42, -7)</li><li><code>double</code> — Decimal numbers (e.g., 3.14, -0.5)</li><li><code>char</code> — A single character (e.g., 'A', '9')</li><li><code>bool</code> — true or false</li><li><code>string</code> — Text (requires <code>#include &lt;string&gt;</code>)</li></ul><p>Syntax: <code>type name = value;</code></p>",
      "codeExample": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int age = 25;\n    double pi = 3.14159;\n    char grade = 'A';\n    bool isStudent = true;\n\n    cout << \"Age: \" << age << endl;\n    cout << \"Pi: \" << pi << endl;\n    cout << \"Grade: \" << grade << endl;\n    cout << \"Student: \" << isStudent << endl;\n\n    return 0;\n}",
      "expectedOutput": "Age: 25\nPi: 3.14159\nGrade: A\nStudent: 1",
      "exercise": {
        "instruction": "Declare variables for your name (string), birth year (int), and height in meters (double). Print them all.",
        "starterCode": "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    // Declare and initialize your variables here\n\n    // Print them\n\n    return 0;\n}",
        "expectedOutput": null,
        "hints": [
          "Use string name = \"Your Name\";",
          "Use double height = 1.75;",
          "Print each with cout"
        ]
      },
      "quiz": [
        {
          "question": "Which type stores decimal numbers?",
          "options": [
            "int",
            "char",
            "double",
            "bool"
          ],
          "correctIndex": 2,
          "explanation": "double stores floating-point (decimal) numbers with double precision."
        },
        {
          "question": "What value does bool true print as?",
          "options": [
            "true",
            "1",
            "yes",
            "TRUE"
          ],
          "correctIndex": 1,
          "explanation": "By default, cout prints bool values as 1 (true) or 0 (false)."
        },
        {
          "question": "What happens if you use a variable without declaring it?",
          "options": [
            "It defaults to 0",
            "Compiler error",
            "Runtime crash",
            "It works fine"
          ],
          "correctIndex": 1,
          "explanation": "C++ requires all variables to be declared before use. Using an undeclared variable causes a compilation error."
        }
      ]
    },
    {
      "id": "ch2-l2",
      "title": "Input with cin",
      "difficulty": "beginner",
      "content": "<h2>Reading User Input</h2><p>While <code>cout</code> sends output to the console, <code>cin</code> reads input from the user.</p><p>The extraction operator <code>&gt;&gt;</code> reads data from the input stream into a variable. It automatically handles type conversion.</p><h3>How cin Works</h3><ul><li><code>cin &gt;&gt; x;</code> reads a value and stores it in <code>x</code></li><li>It skips leading whitespace</li><li>For strings, it reads until the first space</li><li>Use <code>getline(cin, str)</code> to read a full line including spaces</li></ul>",
      "codeExample": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a = 10, b = 20;\n\n    cout << \"Sum: \" << a + b << endl;\n    cout << \"Product: \" << a * b << endl;\n\n    return 0;\n}",
      "expectedOutput": "Sum: 30\nProduct: 200",
      "exercise": {
        "instruction": "Write a program that has two integer variables set to 15 and 4, then prints their sum, difference, product, and quotient.",
        "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int x = 15, y = 4;\n    // Print sum, difference, product, quotient\n    return 0;\n}",
        "expectedOutput": "Sum: 19\nDifference: 11\nProduct: 60\nQuotient: 3",
        "hints": [
          "Use x + y, x - y, x * y, x / y",
          "Integer division truncates: 15/4 = 3"
        ]
      },
      "quiz": [
        {
          "question": "What does cin >> do?",
          "options": [
            "Prints output",
            "Reads input into a variable",
            "Declares a variable",
            "Creates a file"
          ],
          "correctIndex": 1,
          "explanation": "The >> operator extracts data from the input stream and stores it in the given variable."
        },
        {
          "question": "What is 15 / 4 in integer arithmetic?",
          "options": [
            "3.75",
            "4",
            "3",
            "3.0"
          ],
          "correctIndex": 2,
          "explanation": "Integer division truncates the decimal part. 15 / 4 = 3 (not 3.75)."
        }
      ]
    },
    {
      "id": "ch2-l3",
      "title": "Constants and Type Casting",
      "difficulty": "beginner",
      "content": "<h2>Constants and Type Conversion</h2><p>A <strong>constant</strong> is a variable whose value cannot change after initialization. Use the <code>const</code> keyword:</p><p><code>const double PI = 3.14159;</code></p><p><strong>Type casting</strong> converts a value from one type to another:</p><ul><li><strong>Implicit</strong>: Automatic (e.g., int to double)</li><li><strong>Explicit</strong>: Using <code>static_cast&lt;type&gt;(value)</code></li></ul><p>Be careful: casting from double to int <em>truncates</em> the decimal part (it does not round).</p>",
      "codeExample": "#include <iostream>\nusing namespace std;\n\nint main() {\n    const double PI = 3.14159;\n    int radius = 5;\n\n    double area = PI * radius * radius;\n    cout << \"Area: \" << area << endl;\n\n    // Explicit cast\n    int truncated = static_cast<int>(area);\n    cout << \"Truncated: \" << truncated << endl;\n\n    // Integer division vs double division\n    cout << \"Int div: \" << 7 / 2 << endl;\n    cout << \"Real div: \" << 7.0 / 2 << endl;\n\n    return 0;\n}",
      "expectedOutput": "Area: 78.5397\nTruncated: 78\nInt div: 3\nReal div: 3.5",
      "exercise": {
        "instruction": "Create a constant for the speed of light (299792458 m/s as an int). Calculate how far light travels in 5 seconds and print it.",
        "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    // Declare speed of light as a constant\n    // Calculate distance = speed * time\n    // Print the result\n    return 0;\n}",
        "expectedOutput": null,
        "hints": [
          "Use const int SPEED_OF_LIGHT = 299792458;",
          "Use long long for large numbers",
          "distance = speed * seconds"
        ]
      },
      "quiz": [
        {
          "question": "What does const do?",
          "options": [
            "Makes a variable mutable",
            "Makes a variable read-only after initialization",
            "Deletes a variable",
            "Declares a function"
          ],
          "correctIndex": 1,
          "explanation": "const makes a variable immutable — its value cannot be changed after it is set."
        },
        {
          "question": "What does static_cast<int>(3.9) return?",
          "options": [
            "4",
            "3",
            "3.9",
            "Error"
          ],
          "correctIndex": 1,
          "explanation": "static_cast to int truncates the decimal part. 3.9 becomes 3 (no rounding)."
        }
      ]
    }
  ]
});
})();
