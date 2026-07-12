// Chapter 10: Object-Oriented Programming
// Auto-migrated from lessons-data.js
(function () {
  window.CPP_CHAPTERS = window.CPP_CHAPTERS || [];
  window.CPP_CHAPTERS.push({
  "id": 10,
  "title": "Object-Oriented Programming",
  "description": "Classes, objects, constructors, and encapsulation",
  "icon": "🎭",
  "lessons": [
    {
      "id": "ch10-l1",
      "title": "Classes and Objects",
      "difficulty": "advanced",
      "content": "<h2>Introduction to OOP</h2><p>A <strong>class</strong> is a blueprint for creating objects. It bundles data (member variables) and behavior (member functions) together.</p><h3>Access Modifiers</h3><ul><li><code>public</code> — accessible from anywhere</li><li><code>private</code> — accessible only within the class</li><li><code>protected</code> — accessible in the class and subclasses</li></ul><p><strong>Encapsulation</strong> means hiding internal details and exposing only what's necessary through public methods.</p>",
      "codeExample": "#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Dog {\nprivate:\n    string name;\n    int age;\n\npublic:\n    Dog(string n, int a) : name(n), age(a) {}\n\n    void bark() {\n        cout << name << \" says: Woof!\" << endl;\n    }\n\n    void info() {\n        cout << name << \" is \" << age << \" years old.\" << endl;\n    }\n};\n\nint main() {\n    Dog d1(\"Buddy\", 3);\n    d1.bark();\n    d1.info();\n    return 0;\n}",
      "expectedOutput": "Buddy says: Woof!\nBuddy is 3 years old.",
      "exercise": {
        "instruction": "Create a class \"Rectangle\" with width and height, a method area(), and a method perimeter(). Test it.",
        "starterCode": "#include <iostream>\nusing namespace std;\n\nclass Rectangle {\nprivate:\n    double width, height;\npublic:\n    Rectangle(double w, double h) : width(w), height(h) {}\n    // Add area() and perimeter() methods\n};\n\nint main() {\n    Rectangle r(5.0, 3.0);\n    cout << \"Area: \" << r.area() << endl;\n    cout << \"Perimeter: \" << r.perimeter() << endl;\n    return 0;\n}",
        "expectedOutput": "Area: 15\nPerimeter: 16",
        "hints": [
          "double area() { return width * height; }",
          "double perimeter() { return 2 * (width + height); }"
        ]
      },
      "quiz": [
        {
          "question": "What is encapsulation?",
          "options": [
            "Making everything public",
            "Hiding internal data and exposing through methods",
            "Inheriting from a base class",
            "Creating multiple objects"
          ],
          "correctIndex": 1,
          "explanation": "Encapsulation bundles data with methods and restricts direct access to internal state."
        },
        {
          "question": "What is a constructor?",
          "options": [
            "A destructor",
            "A special method called when an object is created",
            "A static method",
            "A virtual function"
          ],
          "correctIndex": 1,
          "explanation": "A constructor initializes an object when it is created. It has the same name as the class."
        }
      ]
    },
    {
      "id": "ch10-l2",
      "title": "Inheritance and Polymorphism",
      "difficulty": "advanced",
      "content": "<h2>Building on Existing Classes</h2><p><strong>Inheritance</strong> lets a derived class inherit members from a base class, enabling code reuse.</p><p><strong>Polymorphism</strong> lets derived classes provide different implementations of the same function using <code>virtual</code> functions.</p><p>Use <code>override</code> to explicitly mark overridden methods (C++11+).</p>",
      "codeExample": "#include <iostream>\nusing namespace std;\n\nclass Shape {\npublic:\n    virtual double area() { return 0; }\n    virtual void describe() {\n        cout << \"I am a shape\" << endl;\n    }\n};\n\nclass Circle : public Shape {\n    double radius;\npublic:\n    Circle(double r) : radius(r) {}\n    double area() override { return 3.14159 * radius * radius; }\n    void describe() override {\n        cout << \"I am a circle with radius \" << radius << endl;\n    }\n};\n\nint main() {\n    Circle c(5);\n    Shape* s = &c;\n    s->describe();\n    cout << \"Area: \" << s->area() << endl;\n    return 0;\n}",
      "expectedOutput": "I am a circle with radius 5\nArea: 78.5397",
      "exercise": {
        "instruction": "Create a base class Animal with a virtual speak() method. Derive Cat and Dog classes that override it.",
        "starterCode": "#include <iostream>\nusing namespace std;\n\nclass Animal {\npublic:\n    virtual void speak() { cout << \"...\" << endl; }\n};\n\n// Create Cat and Dog classes\n\nint main() {\n    Cat c;\n    Dog d;\n    c.speak();\n    d.speak();\n    return 0;\n}",
        "expectedOutput": "Meow!\nWoof!",
        "hints": [
          "class Cat : public Animal { ... };",
          "void speak() override { cout << \"Meow!\" << endl; }"
        ]
      },
      "quiz": [
        {
          "question": "What does the virtual keyword enable?",
          "options": [
            "Static binding",
            "Dynamic polymorphism (runtime dispatch)",
            "Multiple inheritance",
            "Template specialization"
          ],
          "correctIndex": 1,
          "explanation": "virtual allows derived classes to override methods, with the correct version called at runtime (dynamic dispatch)."
        },
        {
          "question": "What does override do?",
          "options": [
            "Overloads a function",
            "Tells the compiler this function overrides a virtual base function",
            "Makes a function virtual",
            "Prevents inheritance"
          ],
          "correctIndex": 1,
          "explanation": "override is a compiler hint that ensures the function actually overrides a base class virtual function, catching errors."
        }
      ]
    }
  ]
});
})();
