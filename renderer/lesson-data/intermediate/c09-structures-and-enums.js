// Chapter 9: Structures & Enums
// Auto-migrated from lessons-data.js
(function () {
  window.CPP_CHAPTERS = window.CPP_CHAPTERS || [];
  window.CPP_CHAPTERS.push({
  "id": 9,
  "title": "Structures & Enums",
  "description": "Group related data together",
  "icon": "🏗️",
  "lessons": [
    {
      "id": "ch9-l1",
      "title": "Structs",
      "difficulty": "intermediate",
      "content": "<h2>Grouping Data with Structs</h2><p>A <code>struct</code> lets you group related variables under one name:</p><p>Members are accessed with the dot operator <code>.</code></p><p>Structs are like simple classes — in C++, the only default difference is that struct members are <code>public</code> by default while class members are <code>private</code>.</p>",
      "codeExample": "#include <iostream>\n#include <string>\nusing namespace std;\n\nstruct Student {\n    string name;\n    int age;\n    double gpa;\n};\n\nint main() {\n    Student s1;\n    s1.name = \"Alice\";\n    s1.age = 20;\n    s1.gpa = 3.8;\n\n    cout << \"Name: \" << s1.name << endl;\n    cout << \"Age: \" << s1.age << endl;\n    cout << \"GPA: \" << s1.gpa << endl;\n\n    return 0;\n}",
      "expectedOutput": "Name: Alice\nAge: 20\nGPA: 3.8",
      "exercise": {
        "instruction": "Create a struct \"Point\" with x and y coordinates. Write a function that calculates the distance from the origin.",
        "starterCode": "#include <iostream>\n#include <cmath>\nusing namespace std;\n\nstruct Point {\n    double x, y;\n};\n\n// Write distanceFromOrigin function\n\nint main() {\n    Point p = {3.0, 4.0};\n    cout << \"Distance: \" << distanceFromOrigin(p) << endl;\n    return 0;\n}",
        "expectedOutput": "Distance: 5",
        "hints": [
          "sqrt(p.x*p.x + p.y*p.y)",
          "A 3-4-5 right triangle has hypotenuse 5"
        ]
      },
      "quiz": [
        {
          "question": "How do you access a struct member?",
          "options": [
            "struct->member",
            "struct.member",
            "struct[member]",
            "struct::member"
          ],
          "correctIndex": 1,
          "explanation": "Use the dot operator (.) to access members of a struct variable."
        }
      ]
    },
    {
      "id": "ch9-l2",
      "title": "Enums",
      "difficulty": "intermediate",
      "content": "<h2>Named Constants with Enums</h2><p>An <code>enum</code> defines a type with a set of named integer constants. <code>enum class</code> (scoped enum) is the safer, modern version.</p><p>Enums make code more readable by replacing magic numbers with meaningful names.</p>",
      "codeExample": "#include <iostream>\nusing namespace std;\n\nenum class Color { Red, Green, Blue };\n\nenum Direction { North = 0, South = 1, East = 2, West = 3 };\n\nint main() {\n    Color c = Color::Green;\n    if (c == Color::Green) {\n        cout << \"Color is Green\" << endl;\n    }\n\n    Direction d = East;\n    cout << \"Direction: \" << d << endl;\n\n    return 0;\n}",
      "expectedOutput": "Color is Green\nDirection: 2",
      "exercise": {
        "instruction": "Create an enum class Season with Spring, Summer, Autumn, Winter. Print a message based on the season using switch.",
        "starterCode": "#include <iostream>\nusing namespace std;\n\n// Define enum class Season\n\nint main() {\n    Season s = Season::Summer;\n    // Use switch to print a message\n    return 0;\n}",
        "expectedOutput": null,
        "hints": [
          "enum class Season { Spring, Summer, Autumn, Winter };",
          "switch(s) { case Season::Summer: ... }"
        ]
      },
      "quiz": [
        {
          "question": "What is the advantage of enum class over plain enum?",
          "options": [
            "It is faster",
            "It provides type safety and scoped names",
            "It supports strings",
            "No advantage"
          ],
          "correctIndex": 1,
          "explanation": "enum class (scoped enum) prevents implicit conversions and requires qualified names (e.g., Color::Red), avoiding naming conflicts."
        }
      ]
    }
  ]
});
})();
