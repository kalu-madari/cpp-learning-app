// Chapter 15: Advanced Topics
// Auto-migrated from lessons-data.js
(function () {
  window.CPP_CHAPTERS = window.CPP_CHAPTERS || [];
  window.CPP_CHAPTERS.push({
  "id": 15,
  "title": "Advanced Topics",
  "description": "Lambda expressions, move semantics, and modern C++",
  "icon": "🔬",
  "lessons": [
    {
      "id": "ch15-l1",
      "title": "Lambda Expressions",
      "difficulty": "expert",
      "content": "<h2>Anonymous Functions</h2><p><strong>Lambda expressions</strong> (C++11) let you define inline, anonymous functions:</p><p><code>[capture](params) -> return_type { body }</code></p><h3>Capture Clause</h3><ul><li><code>[]</code> — capture nothing</li><li><code>[=]</code> — capture all by value</li><li><code>[&]</code> — capture all by reference</li><li><code>[x, &y]</code> — capture x by value, y by reference</li></ul><p>Lambdas are perfect for short callbacks and STL algorithms.</p>",
      "codeExample": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    // Simple lambda\n    auto greet = [](string name) {\n        cout << \"Hello, \" << name << \"!\" << endl;\n    };\n    greet(\"Lambda\");\n\n    // Lambda with capture\n    int factor = 3;\n    auto multiply = [factor](int x) { return x * factor; };\n    cout << \"5 * 3 = \" << multiply(5) << endl;\n\n    // Lambda with STL\n    vector<int> nums = {5, 2, 8, 1, 9, 3};\n    sort(nums.begin(), nums.end(), [](int a, int b) {\n        return a > b;  // Descending\n    });\n    for (int n : nums) cout << n << \" \";\n    cout << endl;\n\n    return 0;\n}",
      "expectedOutput": "Hello, Lambda!\n5 * 3 = 15\n9 8 5 3 2 1 ",
      "exercise": {
        "instruction": "Use a lambda with for_each to print each element of a vector doubled.",
        "starterCode": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    vector<int> nums = {1, 2, 3, 4, 5};\n    // Use for_each with a lambda to print each * 2\n    cout << endl;\n    return 0;\n}",
        "expectedOutput": null,
        "hints": [
          "for_each(nums.begin(), nums.end(), [](int n) { cout << n*2 << \" \"; });"
        ]
      },
      "quiz": [
        {
          "question": "What does [&] in a lambda capture clause mean?",
          "options": [
            "Capture nothing",
            "Capture all variables by reference",
            "Capture all by value",
            "Take address of lambda"
          ],
          "correctIndex": 1,
          "explanation": "[&] captures all local variables by reference, allowing the lambda to read and modify them."
        },
        {
          "question": "What is a lambda expression?",
          "options": [
            "A named function",
            "An anonymous inline function",
            "A macro",
            "A template"
          ],
          "correctIndex": 1,
          "explanation": "Lambdas are anonymous (unnamed) functions that can be defined inline where they are used."
        }
      ]
    },
    {
      "id": "ch15-l2",
      "title": "Move Semantics & STL Algorithms",
      "difficulty": "expert",
      "content": "<h2>Move Semantics</h2><p><strong>Move semantics</strong> (C++11) allow transferring resources instead of copying them, dramatically improving performance for large objects.</p><ul><li><code>std::move(x)</code> casts x to an rvalue reference, enabling the move constructor/assignment</li><li>After a move, the source object is in a valid but unspecified state</li></ul><h3>STL Algorithms</h3><p>The <code>&lt;algorithm&gt;</code> header provides powerful generic algorithms:</p><ul><li><code>sort</code>, <code>find</code>, <code>count</code>, <code>accumulate</code></li><li><code>transform</code>, <code>for_each</code>, <code>remove_if</code></li></ul>",
      "codeExample": "#include <iostream>\n#include <vector>\n#include <algorithm>\n#include <numeric>\nusing namespace std;\n\nint main() {\n    vector<int> nums = {5, 2, 8, 1, 9, 3, 7, 4, 6};\n\n    // Sort\n    sort(nums.begin(), nums.end());\n    cout << \"Sorted: \";\n    for (int n : nums) cout << n << \" \";\n    cout << endl;\n\n    // Find\n    auto it = find(nums.begin(), nums.end(), 7);\n    if (it != nums.end()) {\n        cout << \"Found 7 at index \" << (it - nums.begin()) << endl;\n    }\n\n    // Sum\n    int sum = accumulate(nums.begin(), nums.end(), 0);\n    cout << \"Sum: \" << sum << endl;\n\n    // Count even numbers\n    int evens = count_if(nums.begin(), nums.end(), [](int n) { return n % 2 == 0; });\n    cout << \"Even count: \" << evens << endl;\n\n    return 0;\n}",
      "expectedOutput": "Sorted: 1 2 3 4 5 6 7 8 9 \nFound 7 at index 6\nSum: 45\nEven count: 4",
      "exercise": {
        "instruction": "Use STL algorithms to find the min and max elements of a vector and print them.",
        "starterCode": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    vector<int> nums = {42, 17, 93, 8, 56, 71};\n    // Use min_element and max_element\n    return 0;\n}",
        "expectedOutput": "Min: 8\nMax: 93",
        "hints": [
          "auto minIt = min_element(nums.begin(), nums.end());",
          "cout << \"Min: \" << *minIt << endl;"
        ]
      },
      "quiz": [
        {
          "question": "What does std::move do?",
          "options": [
            "Copies an object",
            "Physically moves memory",
            "Casts to an rvalue reference to enable move semantics",
            "Deletes an object"
          ],
          "correctIndex": 2,
          "explanation": "std::move doesn't actually move anything — it casts to an rvalue reference, enabling the move constructor/assignment."
        },
        {
          "question": "What does accumulate do?",
          "options": [
            "Sorts a container",
            "Computes the sum (or other fold) of elements",
            "Counts elements",
            "Removes duplicates"
          ],
          "correctIndex": 1,
          "explanation": "accumulate folds a range into a single value, defaulting to summation with an initial value."
        }
      ]
    }
  ]
});
})();
