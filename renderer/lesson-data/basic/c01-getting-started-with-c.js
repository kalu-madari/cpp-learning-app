// Chapter 1: Getting Started with C++
// Auto-migrated from lessons-data.js
(function () {
  window.CPP_CHAPTERS = window.CPP_CHAPTERS || [];
  window.CPP_CHAPTERS.push({
  "id": 1,
  "title": "Getting Started with C++",
  "description": "Your first steps into C++ programming",
  "icon": "🚀",
  "lessons": [
    {
      "id": "ch1-l1",
      "title": "Hello World",
      "difficulty": "beginner",
      "content": "<h2>Your First C++ Program</h2><p>Every C++ journey begins with <strong>Hello World</strong>. This classic program teaches you the basic structure of a C++ file: includes, the <code>main()</code> function, and output.</p><p><code>#include &lt;iostream&gt;</code> brings in the Input/Output stream library, which gives you <code>cout</code> for printing.</p><p><code>using namespace std;</code> lets you use <code>cout</code> directly instead of writing <code>std::cout</code> every time.</p><p>The <code>main()</code> function is where every C++ program starts executing. It returns <code>0</code> to signal success.</p><h3>Key Concepts</h3><ul><li><code>cout &lt;&lt;</code> sends text to the console</li><li><code>endl</code> inserts a newline and flushes the output</li><li>Every statement ends with a semicolon <code>;</code></li></ul>",
      "codeExample": "#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello, World!\" << endl;\n    return 0;\n}",
      "expectedOutput": "Hello, World!",
      "exercise": {
        "instruction": "Modify the program to print \"I am learning C++\" on a second line.",
        "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello, World!\" << endl;\n    // Add your line here\n    return 0;\n}",
        "expectedOutput": "Hello, World!\nI am learning C++",
        "hints": [
          "Use another cout << statement",
          "Remember to add endl at the end"
        ]
      },
      "quiz": [
        {
          "question": "What does cout do in C++?",
          "options": [
            "Reads input",
            "Prints output to the console",
            "Declares a variable",
            "Creates a loop"
          ],
          "correctIndex": 1,
          "explanation": "cout (character output) is the standard output stream in C++, used to print text to the console."
        },
        {
          "question": "What does #include <iostream> do?",
          "options": [
            "Includes math functions",
            "Includes input/output stream library",
            "Defines the main function",
            "Imports all C++ features"
          ],
          "correctIndex": 1,
          "explanation": "The iostream header provides cout, cin, and other I/O functionality."
        },
        {
          "question": "What value should main() return on success?",
          "options": [
            "1",
            "-1",
            "0",
            "true"
          ],
          "correctIndex": 2,
          "explanation": "By convention, returning 0 from main() indicates the program ran successfully."
        }
      ]
    },
    {
      "id": "ch1-l2",
      "title": "Comments and Code Structure",
      "difficulty": "beginner",
      "content": "<h2>Writing Clear Code with Comments</h2><p>Comments help you and other programmers understand your code. C++ supports two types of comments:</p><ul><li><strong>Single-line comments</strong> start with <code>//</code></li><li><strong>Multi-line comments</strong> are enclosed in <code>/* ... */</code></li></ul><p>Comments are completely ignored by the compiler — they exist only for human readers.</p><h3>Good Commenting Practices</h3><p>Write comments that explain <em>why</em> you did something, not <em>what</em> the code does. The code itself shows what; comments should reveal your reasoning.</p>",
      "codeExample": "#include <iostream>\nusing namespace std;\n\n// This program demonstrates comments\nint main() {\n    // Single-line comment\n    cout << \"Comments are useful!\" << endl;\n\n    /* This is a\n       multi-line comment */\n    cout << \"They help explain code.\" << endl;\n\n    return 0;\n}",
      "expectedOutput": "Comments are useful!\nThey help explain code.",
      "exercise": {
        "instruction": "Add a comment above each cout statement explaining what it prints, then add a third line printing \"Happy coding!\".",
        "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Line 1\" << endl;\n    cout << \"Line 2\" << endl;\n    // Add a third line below\n    return 0;\n}",
        "expectedOutput": null,
        "hints": [
          "Use // for single-line comments",
          "Add another cout << \"Happy coding!\" << endl;"
        ]
      },
      "quiz": [
        {
          "question": "Which of these is a valid single-line comment?",
          "options": [
            "<!-- comment -->",
            "// comment",
            "# comment",
            "** comment **"
          ],
          "correctIndex": 1,
          "explanation": "In C++, single-line comments start with // and continue to the end of the line."
        },
        {
          "question": "Are comments included in the compiled program?",
          "options": [
            "Yes, always",
            "No, they are ignored by the compiler",
            "Only multi-line comments",
            "Only in debug mode"
          ],
          "correctIndex": 1,
          "explanation": "Comments are stripped out during compilation and have zero impact on the final program."
        }
      ]
    },
    {
      "id": "ch1-l3",
      "title": "Compilation & Execution",
      "difficulty": "beginner",
      "content": "<h2>How C++ Programs Run</h2><p>Unlike interpreted languages (Python, JavaScript), C++ is a <strong>compiled language</strong>. Your source code goes through these stages:</p><ol><li><strong>Preprocessing</strong> — <code>#include</code> directives are resolved</li><li><strong>Compilation</strong> — Source code is translated to machine code</li><li><strong>Linking</strong> — Libraries are connected to produce an executable</li><li><strong>Execution</strong> — The OS runs the resulting binary</li></ol><p>This is why C++ is so fast: the heavy work happens at compile time, not at runtime.</p><h3>The g++ Compiler</h3><p>We use <code>g++</code> to compile. The command <code>g++ -o program main.cpp</code> compiles <code>main.cpp</code> into an executable called <code>program</code>.</p>",
      "codeExample": "#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Compilation successful!\" << endl;\n    cout << \"C++ is a compiled language.\" << endl;\n    return 0;\n}",
      "expectedOutput": "Compilation successful!\nC++ is a compiled language.",
      "exercise": {
        "instruction": "Write a program that prints three lines: \"Step 1: Preprocess\", \"Step 2: Compile\", \"Step 3: Link and Run\".",
        "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    // Print the three compilation steps\n    return 0;\n}",
        "expectedOutput": "Step 1: Preprocess\nStep 2: Compile\nStep 3: Link and Run",
        "hints": [
          "Use three separate cout statements",
          "Make sure the text matches exactly"
        ]
      },
      "quiz": [
        {
          "question": "What type of language is C++?",
          "options": [
            "Interpreted",
            "Compiled",
            "Scripted",
            "Markup"
          ],
          "correctIndex": 1,
          "explanation": "C++ is compiled — source code is translated to machine code before execution."
        },
        {
          "question": "What does g++ produce?",
          "options": [
            "A Python script",
            "An executable binary",
            "A web page",
            "Bytecode"
          ],
          "correctIndex": 1,
          "explanation": "g++ compiles C++ source into a native executable that runs directly on your OS."
        }
      ]
    }
  ]
});
})();
