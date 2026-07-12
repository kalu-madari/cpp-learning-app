// Chapter 14: Smart Pointers & Memory
// Auto-migrated from lessons-data.js
(function () {
  window.CPP_CHAPTERS = window.CPP_CHAPTERS || [];
  window.CPP_CHAPTERS.push({
  "id": 14,
  "title": "Smart Pointers & Memory",
  "description": "Modern C++ memory management with RAII",
  "icon": "🧠",
  "lessons": [
    {
      "id": "ch14-l1",
      "title": "Smart Pointers",
      "difficulty": "expert",
      "content": "<h2>Automatic Memory Management</h2><p><strong>Smart pointers</strong> (C++11) automatically manage memory, preventing leaks:</p><ul><li><code>unique_ptr</code> — exclusive ownership, auto-deletes</li><li><code>shared_ptr</code> — shared ownership with reference counting</li><li><code>weak_ptr</code> — non-owning reference to shared_ptr</li></ul><p>Use <code>make_unique</code> and <code>make_shared</code> instead of raw <code>new</code>.</p><h3>RAII</h3><p>Resource Acquisition Is Initialization — tie resource lifetime to object lifetime. When the object is destroyed, resources are freed automatically.</p>",
      "codeExample": "#include <iostream>\n#include <memory>\nusing namespace std;\n\nclass Resource {\npublic:\n    Resource() { cout << \"Resource created\" << endl; }\n    ~Resource() { cout << \"Resource destroyed\" << endl; }\n    void use() { cout << \"Resource in use\" << endl; }\n};\n\nint main() {\n    {\n        auto ptr = make_unique<Resource>();\n        ptr->use();\n    } // ptr goes out of scope, Resource is automatically destroyed\n\n    cout << \"After scope\" << endl;\n    return 0;\n}",
      "expectedOutput": "Resource created\nResource in use\nResource destroyed\nAfter scope",
      "exercise": {
        "instruction": "Create a unique_ptr to a dynamically allocated integer, set its value, and print it.",
        "starterCode": "#include <iostream>\n#include <memory>\nusing namespace std;\n\nint main() {\n    // Create unique_ptr<int> using make_unique\n    // Set value and print it\n    return 0;\n}",
        "expectedOutput": null,
        "hints": [
          "auto ptr = make_unique<int>(42);",
          "cout << *ptr << endl;"
        ]
      },
      "quiz": [
        {
          "question": "What does unique_ptr do when it goes out of scope?",
          "options": [
            "Nothing",
            "Automatically deletes the managed object",
            "Transfers ownership",
            "Throws an exception"
          ],
          "correctIndex": 1,
          "explanation": "unique_ptr automatically calls delete on the managed pointer when it goes out of scope."
        },
        {
          "question": "What does RAII stand for?",
          "options": [
            "Random Access Is Invalid",
            "Resource Acquisition Is Initialization",
            "Reference And Integer Interface",
            "Runtime Automatic Initialization"
          ],
          "correctIndex": 1,
          "explanation": "RAII ties resource management to object lifetime — acquire in constructor, release in destructor."
        }
      ]
    }
  ]
});
})();
