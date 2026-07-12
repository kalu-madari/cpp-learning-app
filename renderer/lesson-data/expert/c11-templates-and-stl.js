// Chapter 11: Templates & STL
// Auto-migrated from lessons-data.js
(function () {
  window.CPP_CHAPTERS = window.CPP_CHAPTERS || [];
  window.CPP_CHAPTERS.push({
  "id": 11,
  "title": "Templates & STL",
  "description": "Generic programming and the Standard Template Library",
  "icon": "📚",
  "lessons": [
    {
      "id": "ch11-l1",
      "title": "Function and Class Templates",
      "difficulty": "advanced",
      "content": "<h2>Generic Programming with Templates</h2><p><strong>Templates</strong> let you write code that works with any type. Instead of writing separate functions for int, double, string, etc., you write one template.</p><p>Syntax: <code>template &lt;typename T&gt;</code> before the function or class.</p><p>The compiler generates the specific version when you use the template with a concrete type.</p>",
      "codeExample": "#include <iostream>\nusing namespace std;\n\ntemplate <typename T>\nT getMax(T a, T b) {\n    return (a > b) ? a : b;\n}\n\ntemplate <typename T>\nvoid printArray(T arr[], int size) {\n    for (int i = 0; i < size; i++) {\n        cout << arr[i] << \" \";\n    }\n    cout << endl;\n}\n\nint main() {\n    cout << getMax(10, 20) << endl;\n    cout << getMax(3.14, 2.72) << endl;\n\n    int nums[] = {5, 2, 8, 1, 9};\n    printArray(nums, 5);\n\n    return 0;\n}",
      "expectedOutput": "20\n3.14\n5 2 8 1 9 ",
      "exercise": {
        "instruction": "Write a template function \"swap\" that swaps two values of any type. Test with int and string.",
        "starterCode": "#include <iostream>\n#include <string>\nusing namespace std;\n\ntemplate <typename T>\nvoid mySwap(T& a, T& b) {\n    // Implement swap\n}\n\nint main() {\n    int x = 1, y = 2;\n    mySwap(x, y);\n    cout << x << \" \" << y << endl;\n\n    string a = \"hello\", b = \"world\";\n    mySwap(a, b);\n    cout << a << \" \" << b << endl;\n    return 0;\n}",
        "expectedOutput": "2 1\nworld hello",
        "hints": [
          "T temp = a; a = b; b = temp;",
          "Templates handle the type automatically"
        ]
      },
      "quiz": [
        {
          "question": "What does template<typename T> do?",
          "options": [
            "Creates a macro",
            "Defines a generic type parameter T",
            "Declares a variable T",
            "Imports a library"
          ],
          "correctIndex": 1,
          "explanation": "template<typename T> introduces a type parameter T that gets substituted with actual types when used."
        }
      ]
    },
    {
      "id": "ch11-l2",
      "title": "Vectors and Maps",
      "difficulty": "advanced",
      "content": "<h2>STL Containers</h2><p>The Standard Template Library (STL) provides powerful, ready-to-use data structures:</p><ul><li><code>vector</code> — dynamic array that grows automatically</li><li><code>map</code> — key-value pairs (like a dictionary)</li><li><code>set</code> — unique sorted elements</li></ul><h3>vector Essentials</h3><ul><li><code>.push_back(val)</code> — add to end</li><li><code>.size()</code> — number of elements</li><li><code>[i]</code> — access by index</li><li><strong>Range-based for</strong>: <code>for (auto& x : vec)</code></li></ul>",
      "codeExample": "#include <iostream>\n#include <vector>\n#include <map>\nusing namespace std;\n\nint main() {\n    // Vector\n    vector<int> nums = {3, 1, 4, 1, 5};\n    nums.push_back(9);\n    cout << \"Vector size: \" << nums.size() << endl;\n    for (int n : nums) {\n        cout << n << \" \";\n    }\n    cout << endl;\n\n    // Map\n    map<string, int> ages;\n    ages[\"Alice\"] = 25;\n    ages[\"Bob\"] = 30;\n    for (auto& pair : ages) {\n        cout << pair.first << \": \" << pair.second << endl;\n    }\n\n    return 0;\n}",
      "expectedOutput": "Vector size: 6\n3 1 4 1 5 9 \nAlice: 25\nBob: 30",
      "exercise": {
        "instruction": "Create a vector of strings, add 3 names, then print them using a range-based for loop.",
        "starterCode": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    vector<string> names;\n    // Add names and print them\n    return 0;\n}",
        "expectedOutput": null,
        "hints": [
          "names.push_back(\"Alice\");",
          "for (const string& name : names) { cout << name << endl; }"
        ]
      },
      "quiz": [
        {
          "question": "What is the advantage of vector over raw arrays?",
          "options": [
            "Faster access",
            "Dynamic size — it can grow and shrink",
            "Uses less memory",
            "Supports only integers"
          ],
          "correctIndex": 1,
          "explanation": "Vectors dynamically resize, while raw arrays have a fixed size determined at compile time."
        },
        {
          "question": "What does auto do in a range-based for loop?",
          "options": [
            "Makes the loop infinite",
            "Automatically deduces the element type",
            "Skips even elements",
            "Creates a copy"
          ],
          "correctIndex": 1,
          "explanation": "auto lets the compiler deduce the type automatically, reducing verbosity."
        }
      ]
    }
  ]
});
})();
