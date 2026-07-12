// Chapter 8: Pointers & References
// Auto-migrated from lessons-data.js
(function () {
  window.CPP_CHAPTERS = window.CPP_CHAPTERS || [];
  window.CPP_CHAPTERS.push({
  "id": 8,
  "title": "Pointers & References",
  "description": "Understand memory addresses and indirection",
  "icon": "🎯",
  "lessons": [
    {
      "id": "ch8-l1",
      "title": "Pointers",
      "difficulty": "advanced",
      "content": "<h2>Understanding Pointers</h2><p>A <strong>pointer</strong> is a variable that stores a <em>memory address</em>. Pointers are fundamental to C++ and enable powerful features like dynamic memory and data structures.</p><ul><li><code>int* ptr;</code> — declares a pointer to int</li><li><code>&x</code> — \"address of\" operator (gets the address of x)</li><li><code>*ptr</code> — \"dereference\" operator (gets the value at the address)</li></ul><p>Think of a pointer as a signpost: it doesn't hold the data itself, but points to where the data lives.</p>",
      "codeExample": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int x = 42;\n    int* ptr = &x;\n\n    cout << \"Value of x: \" << x << endl;\n    cout << \"Address of x: \" << ptr << endl;\n    cout << \"Value via pointer: \" << *ptr << endl;\n\n    *ptr = 100;  // Modify x through the pointer\n    cout << \"x is now: \" << x << endl;\n\n    return 0;\n}",
      "expectedOutput": null,
      "exercise": {
        "instruction": "Create two int variables. Use a pointer to swap their values, then print them.",
        "starterCode": "#include <iostream>\nusing namespace std;\n\nvoid swap(int* a, int* b) {\n    // Swap using pointers\n}\n\nint main() {\n    int x = 10, y = 20;\n    cout << \"Before: x=\" << x << \" y=\" << y << endl;\n    swap(&x, &y);\n    cout << \"After: x=\" << x << \" y=\" << y << endl;\n    return 0;\n}",
        "expectedOutput": "Before: x=10 y=20\nAfter: x=20 y=10",
        "hints": [
          "int temp = *a;",
          "*a = *b;",
          "*b = temp;"
        ]
      },
      "quiz": [
        {
          "question": "What does the & operator do when used before a variable?",
          "options": [
            "Logical AND",
            "Returns the memory address",
            "Declares a reference",
            "Bitwise AND"
          ],
          "correctIndex": 1,
          "explanation": "& before a variable gives its memory address, which can be stored in a pointer."
        },
        {
          "question": "What does *ptr do (where ptr is a pointer)?",
          "options": [
            "Multiplies ptr",
            "Gets the value at the address ptr holds",
            "Declares a pointer",
            "Gets the address"
          ],
          "correctIndex": 1,
          "explanation": "Dereferencing a pointer with * gives you the value stored at the memory address the pointer holds."
        }
      ]
    },
    {
      "id": "ch8-l2",
      "title": "References and Dynamic Memory",
      "difficulty": "advanced",
      "content": "<h2>References</h2><p>A <strong>reference</strong> is an alias for an existing variable. Once bound, it cannot be reseated.</p><p><code>int& ref = x;</code> — ref is now another name for x</p><h3>Dynamic Memory</h3><p>Use <code>new</code> to allocate memory on the heap and <code>delete</code> to free it:</p><ul><li><code>int* p = new int(42);</code> — allocates an int</li><li><code>delete p;</code> — frees the memory</li><li><code>int* arr = new int[10];</code> — allocates an array</li><li><code>delete[] arr;</code> — frees the array</li></ul><p><strong>Always</strong> pair every <code>new</code> with a <code>delete</code> to prevent memory leaks.</p>",
      "codeExample": "#include <iostream>\nusing namespace std;\n\nvoid increment(int& ref) {\n    ref++;  // Modifies the original\n}\n\nint main() {\n    int x = 10;\n    increment(x);\n    cout << \"x after increment: \" << x << endl;\n\n    // Dynamic memory\n    int* p = new int(99);\n    cout << \"Dynamic value: \" << *p << endl;\n    delete p;\n\n    return 0;\n}",
      "expectedOutput": "x after increment: 11\nDynamic value: 99",
      "exercise": {
        "instruction": "Write a function that takes a reference to an int and doubles its value. Test it from main.",
        "starterCode": "#include <iostream>\nusing namespace std;\n\nvoid doubleValue(int& val) {\n    // Double the value\n}\n\nint main() {\n    int num = 15;\n    doubleValue(num);\n    cout << \"Doubled: \" << num << endl;\n    return 0;\n}",
        "expectedOutput": "Doubled: 30",
        "hints": [
          "val = val * 2; or val *= 2;",
          "Since val is a reference, the original changes"
        ]
      },
      "quiz": [
        {
          "question": "What is a reference in C++?",
          "options": [
            "A pointer",
            "An alias for an existing variable",
            "A copy of a variable",
            "A constant"
          ],
          "correctIndex": 1,
          "explanation": "A reference is another name (alias) for an existing variable. Changes to the reference affect the original."
        },
        {
          "question": "What happens if you forget to call delete after new?",
          "options": [
            "Nothing",
            "Memory leak",
            "Compiler error",
            "The OS auto-frees it"
          ],
          "correctIndex": 1,
          "explanation": "Forgetting delete causes a memory leak — the allocated memory is never freed, wasting resources."
        }
      ]
    }
  ]
});
})();
