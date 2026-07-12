// Chapter 6: Functions
// Auto-migrated from lessons-data.js
(function () {
  window.CPP_CHAPTERS = window.CPP_CHAPTERS || [];
  window.CPP_CHAPTERS.push({
  "id": 6,
  "title": "Functions",
  "description": "Organize code into reusable blocks",
  "icon": "🧩",
  "lessons": [
    {
      "id": "ch6-l1",
      "title": "Function Basics",
      "difficulty": "intermediate",
      "content": "<h2>Writing Functions</h2><p>A <strong>function</strong> is a named block of code that performs a task. Functions help you avoid repetition and organize code.</p><p>Syntax: <code>returnType functionName(parameters) { body }</code></p><ul><li><code>void</code> functions don't return a value</li><li>Non-void functions must use <code>return</code> to send a value back</li><li>Parameters are the inputs; arguments are the actual values passed</li></ul>",
      "codeExample": "#include <iostream>\nusing namespace std;\n\nint add(int a, int b) {\n    return a + b;\n}\n\nvoid greet(string name) {\n    cout << \"Hello, \" << name << \"!\" << endl;\n}\n\nint main() {\n    greet(\"World\");\n    int result = add(3, 7);\n    cout << \"3 + 7 = \" << result << endl;\n    return 0;\n}",
      "expectedOutput": "Hello, World!\n3 + 7 = 10",
      "exercise": {
        "instruction": "Write a function called \"multiply\" that takes two integers and returns their product. Call it from main.",
        "starterCode": "#include <iostream>\nusing namespace std;\n\n// Define multiply function here\n\nint main() {\n    cout << \"4 * 5 = \" << multiply(4, 5) << endl;\n    cout << \"3 * 9 = \" << multiply(3, 9) << endl;\n    return 0;\n}",
        "expectedOutput": "4 * 5 = 20\n3 * 9 = 27",
        "hints": [
          "int multiply(int a, int b) { return a * b; }",
          "The function must be defined before main() or declared with a prototype"
        ]
      },
      "quiz": [
        {
          "question": "What does void mean as a return type?",
          "options": [
            "Returns 0",
            "Returns nothing",
            "Returns a boolean",
            "It's an error"
          ],
          "correctIndex": 1,
          "explanation": "void means the function does not return a value."
        },
        {
          "question": "What is the difference between a parameter and an argument?",
          "options": [
            "No difference",
            "Parameter is in the definition, argument is the value passed",
            "Parameter is the value, argument is the definition",
            "Parameters are only for void functions"
          ],
          "correctIndex": 1,
          "explanation": "Parameters are the placeholders in the function definition. Arguments are the actual values passed when calling."
        }
      ]
    },
    {
      "id": "ch6-l2",
      "title": "Overloading and Default Arguments",
      "difficulty": "intermediate",
      "content": "<h2>Function Overloading</h2><p>C++ allows multiple functions with the <strong>same name</strong> but <strong>different parameters</strong>. The compiler picks the right one based on the arguments.</p><h3>Default Arguments</h3><p>Parameters can have default values that are used when the caller doesn't provide them:</p><p><code>void print(string msg, int times = 1)</code></p><p>Default arguments must be at the <em>end</em> of the parameter list.</p>",
      "codeExample": "#include <iostream>\nusing namespace std;\n\nint square(int x) {\n    return x * x;\n}\n\ndouble square(double x) {\n    return x * x;\n}\n\nvoid repeat(string msg, int times = 1) {\n    for (int i = 0; i < times; i++) {\n        cout << msg << endl;\n    }\n}\n\nint main() {\n    cout << square(5) << endl;\n    cout << square(2.5) << endl;\n    repeat(\"Hi\");\n    repeat(\"Go\", 3);\n    return 0;\n}",
      "expectedOutput": "25\n6.25\nHi\nGo\nGo\nGo",
      "exercise": {
        "instruction": "Create an overloaded \"max\" function for int and double types. Test both from main.",
        "starterCode": "#include <iostream>\nusing namespace std;\n\n// int max(int a, int b)\n// double max(double a, double b)\n\nint main() {\n    cout << max(3, 7) << endl;\n    cout << max(2.5, 1.8) << endl;\n    return 0;\n}",
        "expectedOutput": "7\n2.5",
        "hints": [
          "Return (a > b) ? a : b;",
          "The compiler picks the right version based on argument types"
        ]
      },
      "quiz": [
        {
          "question": "What is function overloading?",
          "options": [
            "Calling a function too many times",
            "Multiple functions with the same name but different parameters",
            "A function that calls itself",
            "An error"
          ],
          "correctIndex": 1,
          "explanation": "Overloading lets you define multiple functions with the same name but different parameter types or counts."
        },
        {
          "question": "Where must default arguments appear?",
          "options": [
            "At the start",
            "At the end of the parameter list",
            "Anywhere",
            "Only for void functions"
          ],
          "correctIndex": 1,
          "explanation": "Default arguments must be rightmost. Once a parameter has a default, all subsequent ones must too."
        }
      ]
    },
    {
      "id": "ch6-l3",
      "title": "Recursion",
      "difficulty": "intermediate",
      "content": "<h2>Functions That Call Themselves</h2><p><strong>Recursion</strong> is when a function calls itself. Every recursive function needs:</p><ul><li>A <strong>base case</strong> that stops the recursion</li><li>A <strong>recursive case</strong> that moves toward the base case</li></ul><p>Without a base case, recursion leads to a stack overflow (infinite calls).</p><h3>Classic Example: Factorial</h3><p>n! = n × (n-1)! with base case 0! = 1</p>",
      "codeExample": "#include <iostream>\nusing namespace std;\n\nint factorial(int n) {\n    if (n <= 1) return 1;       // Base case\n    return n * factorial(n - 1); // Recursive case\n}\n\nint fibonacci(int n) {\n    if (n <= 0) return 0;\n    if (n == 1) return 1;\n    return fibonacci(n - 1) + fibonacci(n - 2);\n}\n\nint main() {\n    cout << \"5! = \" << factorial(5) << endl;\n    cout << \"Fib(7) = \" << fibonacci(7) << endl;\n    return 0;\n}",
      "expectedOutput": "5! = 120\nFib(7) = 13",
      "exercise": {
        "instruction": "Write a recursive function \"power\" that calculates base^exp (e.g., power(2, 10) = 1024).",
        "starterCode": "#include <iostream>\nusing namespace std;\n\nint power(int base, int exp) {\n    // Base case: exp == 0 returns 1\n    // Recursive: base * power(base, exp - 1)\n    return 0; // Fix this\n}\n\nint main() {\n    cout << \"2^10 = \" << power(2, 10) << endl;\n    cout << \"3^4 = \" << power(3, 4) << endl;\n    return 0;\n}",
        "expectedOutput": "2^10 = 1024\n3^4 = 81",
        "hints": [
          "if (exp == 0) return 1;",
          "return base * power(base, exp - 1);"
        ]
      },
      "quiz": [
        {
          "question": "What is a base case in recursion?",
          "options": [
            "The first function call",
            "The condition that stops recursion",
            "A function with no parameters",
            "The main function"
          ],
          "correctIndex": 1,
          "explanation": "The base case provides a stopping condition. Without it, recursion would continue infinitely."
        },
        {
          "question": "What is 5! (5 factorial)?",
          "options": [
            "25",
            "60",
            "120",
            "720"
          ],
          "correctIndex": 2,
          "explanation": "5! = 5 × 4 × 3 × 2 × 1 = 120"
        }
      ]
    }
  ]
});
})();
