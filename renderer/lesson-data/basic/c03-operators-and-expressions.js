// Chapter 3: Operators & Expressions
// Auto-migrated from lessons-data.js
(function () {
  window.CPP_CHAPTERS = window.CPP_CHAPTERS || [];
  window.CPP_CHAPTERS.push({
  "id": 3,
  "title": "Operators & Expressions",
  "description": "Arithmetic, comparison, and logical operations",
  "icon": "⚡",
  "lessons": [
    {
      "id": "ch3-l1",
      "title": "Arithmetic Operators",
      "difficulty": "beginner",
      "content": "<h2>Math in C++</h2><p>C++ provides standard arithmetic operators:</p><ul><li><code>+</code> Addition</li><li><code>-</code> Subtraction</li><li><code>*</code> Multiplication</li><li><code>/</code> Division</li><li><code>%</code> Modulus (remainder)</li></ul><p>The <strong>modulus operator</strong> <code>%</code> returns the remainder of integer division. It's incredibly useful for checking divisibility, cycling through values, and more.</p><h3>Increment and Decrement</h3><p><code>++x</code> and <code>x++</code> both add 1 to x. The prefix version increments before use; postfix increments after use.</p>",
      "codeExample": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a = 17, b = 5;\n\n    cout << \"Add: \" << a + b << endl;\n    cout << \"Sub: \" << a - b << endl;\n    cout << \"Mul: \" << a * b << endl;\n    cout << \"Div: \" << a / b << endl;\n    cout << \"Mod: \" << a % b << endl;\n\n    a++;\n    cout << \"After a++: \" << a << endl;\n\n    return 0;\n}",
      "expectedOutput": "Add: 22\nSub: 12\nMul: 85\nDiv: 3\nMod: 2\nAfter a++: 18",
      "exercise": {
        "instruction": "Write a program that takes two integers (set as variables, not input) and prints whether the first is evenly divisible by the second (use % to check).",
        "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int num = 24, divisor = 6;\n    // Check if num % divisor == 0\n    // Print \"Divisible\" or \"Not divisible\"\n    return 0;\n}",
        "expectedOutput": null,
        "hints": [
          "Use if (num % divisor == 0)",
          "The modulus is 0 when division is exact"
        ]
      },
      "quiz": [
        {
          "question": "What does 17 % 5 evaluate to?",
          "options": [
            "3",
            "2",
            "3.4",
            "5"
          ],
          "correctIndex": 1,
          "explanation": "17 divided by 5 is 3 with remainder 2. The % operator returns the remainder."
        },
        {
          "question": "What is the difference between ++x and x++?",
          "options": [
            "No difference",
            "++x increments before use, x++ after",
            "++x is faster",
            "x++ only works with integers"
          ],
          "correctIndex": 1,
          "explanation": "Prefix ++x increments first then returns the value. Postfix x++ returns the value then increments."
        }
      ]
    },
    {
      "id": "ch3-l2",
      "title": "Relational & Logical Operators",
      "difficulty": "beginner",
      "content": "<h2>Comparing Values</h2><p><strong>Relational operators</strong> compare two values and return <code>true</code> or <code>false</code>:</p><ul><li><code>==</code> Equal to</li><li><code>!=</code> Not equal to</li><li><code>&lt;</code> Less than</li><li><code>&gt;</code> Greater than</li><li><code>&lt;=</code> Less than or equal</li><li><code>&gt;=</code> Greater than or equal</li></ul><h3>Logical Operators</h3><p>Combine conditions using:</p><ul><li><code>&&</code> AND — both must be true</li><li><code>||</code> OR — at least one must be true</li><li><code>!</code> NOT — inverts the condition</li></ul>",
      "codeExample": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int x = 10, y = 20;\n\n    cout << \"x == y: \" << (x == y) << endl;\n    cout << \"x < y: \" << (x < y) << endl;\n    cout << \"x != y: \" << (x != y) << endl;\n\n    bool a = true, b = false;\n    cout << \"a && b: \" << (a && b) << endl;\n    cout << \"a || b: \" << (a || b) << endl;\n    cout << \"!a: \" << (!a) << endl;\n\n    return 0;\n}",
      "expectedOutput": "x == y: 0\nx < y: 1\nx != y: 1\na && b: 0\na || b: 1\n!a: 0",
      "exercise": {
        "instruction": "Write a program that checks if a number is between 10 and 50 (inclusive) using && and prints the result.",
        "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int num = 25;\n    // Check if num >= 10 AND num <= 50\n    bool inRange = false; // Fix this\n    cout << \"In range: \" << inRange << endl;\n    return 0;\n}",
        "expectedOutput": "In range: 1",
        "hints": [
          "Use (num >= 10 && num <= 50)",
          "The result will be 1 for true"
        ]
      },
      "quiz": [
        {
          "question": "What does == do in C++?",
          "options": [
            "Assignment",
            "Comparison for equality",
            "Addition",
            "Declaration"
          ],
          "correctIndex": 1,
          "explanation": "== compares two values for equality. = (single) is assignment."
        },
        {
          "question": "What is true && false?",
          "options": [
            "true",
            "false",
            "1",
            "Error"
          ],
          "correctIndex": 1,
          "explanation": "AND requires both operands to be true. Since one is false, the result is false."
        }
      ]
    }
  ]
});
})();
