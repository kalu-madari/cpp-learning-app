// ============================================================================
// C++ Mastery — Lesson Data
// Modular curriculum: 15 chapters, beginner to expert.
// Each lesson has: content (HTML), codeExample, expectedOutput, exercise, quiz.
// ============================================================================

window.LESSONS_DATA = { chapters: [

// ===================== CHAPTER 1: Getting Started =====================
{
  id: 1,
  title: 'Getting Started with C++',
  description: 'Your first steps into C++ programming',
  icon: '\u{1F680}',
  lessons: [
    {
      id: 'ch1-l1',
      title: 'Hello World',
      difficulty: 'beginner',
      content: '<h2>Your First C++ Program</h2>' +
        '<p>Every C++ journey begins with <strong>Hello World</strong>. This classic program teaches you the basic structure of a C++ file: includes, the <code>main()</code> function, and output.</p>' +
        '<p><code>#include &lt;iostream&gt;</code> brings in the Input/Output stream library, which gives you <code>cout</code> for printing.</p>' +
        '<p><code>using namespace std;</code> lets you use <code>cout</code> directly instead of writing <code>std::cout</code> every time.</p>' +
        '<p>The <code>main()</code> function is where every C++ program starts executing. It returns <code>0</code> to signal success.</p>' +
        '<h3>Key Concepts</h3>' +
        '<ul><li><code>cout &lt;&lt;</code> sends text to the console</li>' +
        '<li><code>endl</code> inserts a newline and flushes the output</li>' +
        '<li>Every statement ends with a semicolon <code>;</code></li></ul>',
      codeExample: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}',
      expectedOutput: 'Hello, World!',
      exercise: {
        instruction: 'Modify the program to print "I am learning C++" on a second line.',
        starterCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    // Add your line here\n    return 0;\n}',
        expectedOutput: 'Hello, World!\nI am learning C++',
        hints: ['Use another cout << statement', 'Remember to add endl at the end']
      },
      quiz: [
        { question: 'What does cout do in C++?', options: ['Reads input', 'Prints output to the console', 'Declares a variable', 'Creates a loop'], correctIndex: 1, explanation: 'cout (character output) is the standard output stream in C++, used to print text to the console.' },
        { question: 'What does #include <iostream> do?', options: ['Includes math functions', 'Includes input/output stream library', 'Defines the main function', 'Imports all C++ features'], correctIndex: 1, explanation: 'The iostream header provides cout, cin, and other I/O functionality.' },
        { question: 'What value should main() return on success?', options: ['1', '-1', '0', 'true'], correctIndex: 2, explanation: 'By convention, returning 0 from main() indicates the program ran successfully.' }
      ]
    },
    {
      id: 'ch1-l2',
      title: 'Comments and Code Structure',
      difficulty: 'beginner',
      content: '<h2>Writing Clear Code with Comments</h2>' +
        '<p>Comments help you and other programmers understand your code. C++ supports two types of comments:</p>' +
        '<ul><li><strong>Single-line comments</strong> start with <code>//</code></li>' +
        '<li><strong>Multi-line comments</strong> are enclosed in <code>/* ... */</code></li></ul>' +
        '<p>Comments are completely ignored by the compiler \u2014 they exist only for human readers.</p>' +
        '<h3>Good Commenting Practices</h3>' +
        '<p>Write comments that explain <em>why</em> you did something, not <em>what</em> the code does. The code itself shows what; comments should reveal your reasoning.</p>',
      codeExample: '#include <iostream>\nusing namespace std;\n\n// This program demonstrates comments\nint main() {\n    // Single-line comment\n    cout << "Comments are useful!" << endl;\n\n    /* This is a\n       multi-line comment */\n    cout << "They help explain code." << endl;\n\n    return 0;\n}',
      expectedOutput: 'Comments are useful!\nThey help explain code.',
      exercise: {
        instruction: 'Add a comment above each cout statement explaining what it prints, then add a third line printing "Happy coding!".',
        starterCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Line 1" << endl;\n    cout << "Line 2" << endl;\n    // Add a third line below\n    return 0;\n}',
        expectedOutput: null,
        hints: ['Use // for single-line comments', 'Add another cout << "Happy coding!" << endl;']
      },
      quiz: [
        { question: 'Which of these is a valid single-line comment?', options: ['<!-- comment -->', '// comment', '# comment', '** comment **'], correctIndex: 1, explanation: 'In C++, single-line comments start with // and continue to the end of the line.' },
        { question: 'Are comments included in the compiled program?', options: ['Yes, always', 'No, they are ignored by the compiler', 'Only multi-line comments', 'Only in debug mode'], correctIndex: 1, explanation: 'Comments are stripped out during compilation and have zero impact on the final program.' }
      ]
    },
    {
      id: 'ch1-l3',
      title: 'Compilation & Execution',
      difficulty: 'beginner',
      content: '<h2>How C++ Programs Run</h2>' +
        '<p>Unlike interpreted languages (Python, JavaScript), C++ is a <strong>compiled language</strong>. Your source code goes through these stages:</p>' +
        '<ol><li><strong>Preprocessing</strong> \u2014 <code>#include</code> directives are resolved</li>' +
        '<li><strong>Compilation</strong> \u2014 Source code is translated to machine code</li>' +
        '<li><strong>Linking</strong> \u2014 Libraries are connected to produce an executable</li>' +
        '<li><strong>Execution</strong> \u2014 The OS runs the resulting binary</li></ol>' +
        '<p>This is why C++ is so fast: the heavy work happens at compile time, not at runtime.</p>' +
        '<h3>The g++ Compiler</h3>' +
        '<p>We use <code>g++</code> to compile. The command <code>g++ -o program main.cpp</code> compiles <code>main.cpp</code> into an executable called <code>program</code>.</p>',
      codeExample: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Compilation successful!" << endl;\n    cout << "C++ is a compiled language." << endl;\n    return 0;\n}',
      expectedOutput: 'Compilation successful!\nC++ is a compiled language.',
      exercise: {
        instruction: 'Write a program that prints three lines: "Step 1: Preprocess", "Step 2: Compile", "Step 3: Link and Run".',
        starterCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    // Print the three compilation steps\n    return 0;\n}',
        expectedOutput: 'Step 1: Preprocess\nStep 2: Compile\nStep 3: Link and Run',
        hints: ['Use three separate cout statements', 'Make sure the text matches exactly']
      },
      quiz: [
        { question: 'What type of language is C++?', options: ['Interpreted', 'Compiled', 'Scripted', 'Markup'], correctIndex: 1, explanation: 'C++ is compiled \u2014 source code is translated to machine code before execution.' },
        { question: 'What does g++ produce?', options: ['A Python script', 'An executable binary', 'A web page', 'Bytecode'], correctIndex: 1, explanation: 'g++ compiles C++ source into a native executable that runs directly on your OS.' }
      ]
    }
  ]
},

// ===================== CHAPTER 2: Variables & Data Types =====================
{
  id: 2,
  title: 'Variables & Data Types',
  description: 'Store and manipulate different kinds of data',
  icon: '\u{1F4E6}',
  lessons: [
    {
      id: 'ch2-l1',
      title: 'Variables and Basic Types',
      difficulty: 'beginner',
      content: '<h2>Storing Data in Variables</h2>' +
        '<p>A <strong>variable</strong> is a named container that holds a value. In C++, you must declare a variable\'s type before using it.</p>' +
        '<h3>Common Data Types</h3>' +
        '<ul><li><code>int</code> \u2014 Whole numbers (e.g., 42, -7)</li>' +
        '<li><code>double</code> \u2014 Decimal numbers (e.g., 3.14, -0.5)</li>' +
        '<li><code>char</code> \u2014 A single character (e.g., \'A\', \'9\')</li>' +
        '<li><code>bool</code> \u2014 true or false</li>' +
        '<li><code>string</code> \u2014 Text (requires <code>#include &lt;string&gt;</code>)</li></ul>' +
        '<p>Syntax: <code>type name = value;</code></p>',
      codeExample: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int age = 25;\n    double pi = 3.14159;\n    char grade = \'A\';\n    bool isStudent = true;\n\n    cout << "Age: " << age << endl;\n    cout << "Pi: " << pi << endl;\n    cout << "Grade: " << grade << endl;\n    cout << "Student: " << isStudent << endl;\n\n    return 0;\n}',
      expectedOutput: 'Age: 25\nPi: 3.14159\nGrade: A\nStudent: 1',
      exercise: {
        instruction: 'Declare variables for your name (string), birth year (int), and height in meters (double). Print them all.',
        starterCode: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    // Declare and initialize your variables here\n\n    // Print them\n\n    return 0;\n}',
        expectedOutput: null,
        hints: ['Use string name = "Your Name";', 'Use double height = 1.75;', 'Print each with cout']
      },
      quiz: [
        { question: 'Which type stores decimal numbers?', options: ['int', 'char', 'double', 'bool'], correctIndex: 2, explanation: 'double stores floating-point (decimal) numbers with double precision.' },
        { question: 'What value does bool true print as?', options: ['true', '1', 'yes', 'TRUE'], correctIndex: 1, explanation: 'By default, cout prints bool values as 1 (true) or 0 (false).' },
        { question: 'What happens if you use a variable without declaring it?', options: ['It defaults to 0', 'Compiler error', 'Runtime crash', 'It works fine'], correctIndex: 1, explanation: 'C++ requires all variables to be declared before use. Using an undeclared variable causes a compilation error.' }
      ]
    },
    {
      id: 'ch2-l2',
      title: 'Input with cin',
      difficulty: 'beginner',
      content: '<h2>Reading User Input</h2>' +
        '<p>While <code>cout</code> sends output to the console, <code>cin</code> reads input from the user.</p>' +
        '<p>The extraction operator <code>&gt;&gt;</code> reads data from the input stream into a variable. It automatically handles type conversion.</p>' +
        '<h3>How cin Works</h3>' +
        '<ul><li><code>cin &gt;&gt; x;</code> reads a value and stores it in <code>x</code></li>' +
        '<li>It skips leading whitespace</li>' +
        '<li>For strings, it reads until the first space</li>' +
        '<li>Use <code>getline(cin, str)</code> to read a full line including spaces</li></ul>',
      codeExample: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int a = 10, b = 20;\n\n    cout << "Sum: " << a + b << endl;\n    cout << "Product: " << a * b << endl;\n\n    return 0;\n}',
      expectedOutput: 'Sum: 30\nProduct: 200',
      exercise: {
        instruction: 'Write a program that has two integer variables set to 15 and 4, then prints their sum, difference, product, and quotient.',
        starterCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int x = 15, y = 4;\n    // Print sum, difference, product, quotient\n    return 0;\n}',
        expectedOutput: 'Sum: 19\nDifference: 11\nProduct: 60\nQuotient: 3',
        hints: ['Use x + y, x - y, x * y, x / y', 'Integer division truncates: 15/4 = 3']
      },
      quiz: [
        { question: 'What does cin >> do?', options: ['Prints output', 'Reads input into a variable', 'Declares a variable', 'Creates a file'], correctIndex: 1, explanation: 'The >> operator extracts data from the input stream and stores it in the given variable.' },
        { question: 'What is 15 / 4 in integer arithmetic?', options: ['3.75', '4', '3', '3.0'], correctIndex: 2, explanation: 'Integer division truncates the decimal part. 15 / 4 = 3 (not 3.75).' }
      ]
    },
    {
      id: 'ch2-l3',
      title: 'Constants and Type Casting',
      difficulty: 'beginner',
      content: '<h2>Constants and Type Conversion</h2>' +
        '<p>A <strong>constant</strong> is a variable whose value cannot change after initialization. Use the <code>const</code> keyword:</p>' +
        '<p><code>const double PI = 3.14159;</code></p>' +
        '<p><strong>Type casting</strong> converts a value from one type to another:</p>' +
        '<ul><li><strong>Implicit</strong>: Automatic (e.g., int to double)</li>' +
        '<li><strong>Explicit</strong>: Using <code>static_cast&lt;type&gt;(value)</code></li></ul>' +
        '<p>Be careful: casting from double to int <em>truncates</em> the decimal part (it does not round).</p>',
      codeExample: '#include <iostream>\nusing namespace std;\n\nint main() {\n    const double PI = 3.14159;\n    int radius = 5;\n\n    double area = PI * radius * radius;\n    cout << "Area: " << area << endl;\n\n    // Explicit cast\n    int truncated = static_cast<int>(area);\n    cout << "Truncated: " << truncated << endl;\n\n    // Integer division vs double division\n    cout << "Int div: " << 7 / 2 << endl;\n    cout << "Real div: " << 7.0 / 2 << endl;\n\n    return 0;\n}',
      expectedOutput: 'Area: 78.5397\nTruncated: 78\nInt div: 3\nReal div: 3.5',
      exercise: {
        instruction: 'Create a constant for the speed of light (299792458 m/s as an int). Calculate how far light travels in 5 seconds and print it.',
        starterCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    // Declare speed of light as a constant\n    // Calculate distance = speed * time\n    // Print the result\n    return 0;\n}',
        expectedOutput: null,
        hints: ['Use const int SPEED_OF_LIGHT = 299792458;', 'Use long long for large numbers', 'distance = speed * seconds']
      },
      quiz: [
        { question: 'What does const do?', options: ['Makes a variable mutable', 'Makes a variable read-only after initialization', 'Deletes a variable', 'Declares a function'], correctIndex: 1, explanation: 'const makes a variable immutable \u2014 its value cannot be changed after it is set.' },
        { question: 'What does static_cast<int>(3.9) return?', options: ['4', '3', '3.9', 'Error'], correctIndex: 1, explanation: 'static_cast to int truncates the decimal part. 3.9 becomes 3 (no rounding).' }
      ]
    }
  ]
},

// ===================== CHAPTER 3: Operators & Expressions =====================
{
  id: 3,
  title: 'Operators & Expressions',
  description: 'Arithmetic, comparison, and logical operations',
  icon: '\u26A1',
  lessons: [
    {
      id: 'ch3-l1',
      title: 'Arithmetic Operators',
      difficulty: 'beginner',
      content: '<h2>Math in C++</h2>' +
        '<p>C++ provides standard arithmetic operators:</p>' +
        '<ul><li><code>+</code> Addition</li><li><code>-</code> Subtraction</li>' +
        '<li><code>*</code> Multiplication</li><li><code>/</code> Division</li>' +
        '<li><code>%</code> Modulus (remainder)</li></ul>' +
        '<p>The <strong>modulus operator</strong> <code>%</code> returns the remainder of integer division. It\'s incredibly useful for checking divisibility, cycling through values, and more.</p>' +
        '<h3>Increment and Decrement</h3>' +
        '<p><code>++x</code> and <code>x++</code> both add 1 to x. The prefix version increments before use; postfix increments after use.</p>',
      codeExample: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int a = 17, b = 5;\n\n    cout << "Add: " << a + b << endl;\n    cout << "Sub: " << a - b << endl;\n    cout << "Mul: " << a * b << endl;\n    cout << "Div: " << a / b << endl;\n    cout << "Mod: " << a % b << endl;\n\n    a++;\n    cout << "After a++: " << a << endl;\n\n    return 0;\n}',
      expectedOutput: 'Add: 22\nSub: 12\nMul: 85\nDiv: 3\nMod: 2\nAfter a++: 18',
      exercise: {
        instruction: 'Write a program that takes two integers (set as variables, not input) and prints whether the first is evenly divisible by the second (use % to check).',
        starterCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int num = 24, divisor = 6;\n    // Check if num % divisor == 0\n    // Print "Divisible" or "Not divisible"\n    return 0;\n}',
        expectedOutput: null,
        hints: ['Use if (num % divisor == 0)', 'The modulus is 0 when division is exact']
      },
      quiz: [
        { question: 'What does 17 % 5 evaluate to?', options: ['3', '2', '3.4', '5'], correctIndex: 1, explanation: '17 divided by 5 is 3 with remainder 2. The % operator returns the remainder.' },
        { question: 'What is the difference between ++x and x++?', options: ['No difference', '++x increments before use, x++ after', '++x is faster', 'x++ only works with integers'], correctIndex: 1, explanation: 'Prefix ++x increments first then returns the value. Postfix x++ returns the value then increments.' }
      ]
    },
    {
      id: 'ch3-l2',
      title: 'Relational & Logical Operators',
      difficulty: 'beginner',
      content: '<h2>Comparing Values</h2>' +
        '<p><strong>Relational operators</strong> compare two values and return <code>true</code> or <code>false</code>:</p>' +
        '<ul><li><code>==</code> Equal to</li><li><code>!=</code> Not equal to</li>' +
        '<li><code>&lt;</code> Less than</li><li><code>&gt;</code> Greater than</li>' +
        '<li><code>&lt;=</code> Less than or equal</li><li><code>&gt;=</code> Greater than or equal</li></ul>' +
        '<h3>Logical Operators</h3>' +
        '<p>Combine conditions using:</p>' +
        '<ul><li><code>&&</code> AND \u2014 both must be true</li>' +
        '<li><code>||</code> OR \u2014 at least one must be true</li>' +
        '<li><code>!</code> NOT \u2014 inverts the condition</li></ul>',
      codeExample: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int x = 10, y = 20;\n\n    cout << "x == y: " << (x == y) << endl;\n    cout << "x < y: " << (x < y) << endl;\n    cout << "x != y: " << (x != y) << endl;\n\n    bool a = true, b = false;\n    cout << "a && b: " << (a && b) << endl;\n    cout << "a || b: " << (a || b) << endl;\n    cout << "!a: " << (!a) << endl;\n\n    return 0;\n}',
      expectedOutput: 'x == y: 0\nx < y: 1\nx != y: 1\na && b: 0\na || b: 1\n!a: 0',
      exercise: {
        instruction: 'Write a program that checks if a number is between 10 and 50 (inclusive) using && and prints the result.',
        starterCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int num = 25;\n    // Check if num >= 10 AND num <= 50\n    bool inRange = false; // Fix this\n    cout << "In range: " << inRange << endl;\n    return 0;\n}',
        expectedOutput: 'In range: 1',
        hints: ['Use (num >= 10 && num <= 50)', 'The result will be 1 for true']
      },
      quiz: [
        { question: 'What does == do in C++?', options: ['Assignment', 'Comparison for equality', 'Addition', 'Declaration'], correctIndex: 1, explanation: '== compares two values for equality. = (single) is assignment.' },
        { question: 'What is true && false?', options: ['true', 'false', '1', 'Error'], correctIndex: 1, explanation: 'AND requires both operands to be true. Since one is false, the result is false.' }
      ]
    }
  ]
},

// ===================== CHAPTER 4: Control Flow =====================
{
  id: 4,
  title: 'Control Flow',
  description: 'Make decisions with if, else, and switch',
  icon: '\u{1F500}',
  lessons: [
    {
      id: 'ch4-l1',
      title: 'If and Else Statements',
      difficulty: 'beginner',
      content: '<h2>Making Decisions</h2>' +
        '<p>The <code>if</code> statement executes code only when a condition is true. You can add <code>else</code> for the false case, and <code>else if</code> for multiple conditions.</p>' +
        '<h3>Syntax</h3>' +
        '<p><code>if (condition) { ... } else if (other) { ... } else { ... }</code></p>' +
        '<p>Conditions can use any expression that evaluates to true/false. In C++, any non-zero value is considered <code>true</code>, and <code>0</code> is <code>false</code>.</p>',
      codeExample: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int score = 85;\n\n    if (score >= 90) {\n        cout << "Grade: A" << endl;\n    } else if (score >= 80) {\n        cout << "Grade: B" << endl;\n    } else if (score >= 70) {\n        cout << "Grade: C" << endl;\n    } else {\n        cout << "Grade: F" << endl;\n    }\n\n    return 0;\n}',
      expectedOutput: 'Grade: B',
      exercise: {
        instruction: 'Write a program that checks if a number is positive, negative, or zero, and prints the appropriate message.',
        starterCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int num = -5;\n    // Check and print "Positive", "Negative", or "Zero"\n    return 0;\n}',
        expectedOutput: 'Negative',
        hints: ['Use if (num > 0), else if (num < 0), else', 'The number -5 should print "Negative"']
      },
      quiz: [
        { question: 'What happens if the if condition is false and there is no else?', options: ['Error', 'The program crashes', 'Nothing happens, execution continues', 'It loops'], correctIndex: 2, explanation: 'If the condition is false and there\'s no else block, the program simply skips the if block and continues.' },
        { question: 'Is 0 considered true or false in C++?', options: ['True', 'False', 'Neither', 'Error'], correctIndex: 1, explanation: 'In C++, 0 is false and any non-zero value is true.' }
      ]
    },
    {
      id: 'ch4-l2',
      title: 'Switch Statements',
      difficulty: 'beginner',
      content: '<h2>Choosing Between Multiple Options</h2>' +
        '<p>When you have many possible values for a single variable, <code>switch</code> is cleaner than a chain of if/else-if:</p>' +
        '<p>Each <code>case</code> matches a specific value. <code>break</code> exits the switch. Without break, execution "falls through" to the next case.</p>' +
        '<p>The <code>default</code> case handles any value not matched by the cases above it.</p>',
      codeExample: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int day = 3;\n\n    switch (day) {\n        case 1: cout << "Monday" << endl; break;\n        case 2: cout << "Tuesday" << endl; break;\n        case 3: cout << "Wednesday" << endl; break;\n        case 4: cout << "Thursday" << endl; break;\n        case 5: cout << "Friday" << endl; break;\n        default: cout << "Weekend" << endl; break;\n    }\n\n    return 0;\n}',
      expectedOutput: 'Wednesday',
      exercise: {
        instruction: 'Write a switch statement that prints the name of a month given its number (1-12). Use month = 7.',
        starterCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int month = 7;\n    // Use switch to print the month name\n    return 0;\n}',
        expectedOutput: 'July',
        hints: ['case 1: cout << "January"; break;', 'case 7 should print "July"', 'Add a default case for invalid months']
      },
      quiz: [
        { question: 'What happens if you forget break in a switch case?', options: ['Compile error', 'Execution falls through to the next case', 'The program crashes', 'It returns to the first case'], correctIndex: 1, explanation: 'Without break, execution continues into the next case (fall-through behavior).' },
        { question: 'Can switch work with strings in standard C++?', options: ['Yes', 'No, only with integral types', 'Only with C-strings', 'Yes, since C++11'], correctIndex: 1, explanation: 'Standard C++ switch only works with integral types (int, char, enum). For strings, use if/else.' }
      ]
    },
    {
      id: 'ch4-l3',
      title: 'Ternary Operator',
      difficulty: 'beginner',
      content: '<h2>The Conditional (Ternary) Operator</h2>' +
        '<p>The ternary operator <code>? :</code> is a compact way to write simple if/else expressions:</p>' +
        '<p><code>result = (condition) ? value_if_true : value_if_false;</code></p>' +
        '<p>It\'s great for simple assignments but should not be overused for complex logic.</p>',
      codeExample: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int age = 20;\n    string status = (age >= 18) ? "Adult" : "Minor";\n    cout << status << endl;\n\n    int a = 10, b = 20;\n    int bigger = (a > b) ? a : b;\n    cout << "Bigger: " << bigger << endl;\n\n    return 0;\n}',
      expectedOutput: 'Adult\nBigger: 20',
      exercise: {
        instruction: 'Use the ternary operator to check if a number is even or odd and print the result.',
        starterCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int num = 7;\n    // Use ternary: (num % 2 == 0) ? "Even" : "Odd"\n    return 0;\n}',
        expectedOutput: 'Odd',
        hints: ['string result = (num % 2 == 0) ? "Even" : "Odd";', 'Then cout << result << endl;']
      },
      quiz: [
        { question: 'What does (5 > 3) ? "yes" : "no" evaluate to?', options: ['"yes"', '"no"', '5', 'true'], correctIndex: 0, explanation: 'Since 5 > 3 is true, the expression evaluates to the first value: "yes".' }
      ]
    }
  ]
},

// ===================== CHAPTER 5: Loops =====================
{
  id: 5,
  title: 'Loops',
  description: 'Repeat actions with for, while, and do-while',
  icon: '\u{1F504}',
  lessons: [
    {
      id: 'ch5-l1',
      title: 'For Loops',
      difficulty: 'beginner',
      content: '<h2>Repeating with For Loops</h2>' +
        '<p>The <code>for</code> loop repeats a block of code a specific number of times:</p>' +
        '<p><code>for (init; condition; update) { body }</code></p>' +
        '<ul><li><strong>init</strong>: Runs once at the start (e.g., <code>int i = 0</code>)</li>' +
        '<li><strong>condition</strong>: Checked before each iteration</li>' +
        '<li><strong>update</strong>: Runs after each iteration (e.g., <code>i++</code>)</li></ul>' +
        '<p>When the condition becomes false, the loop stops.</p>',
      codeExample: '#include <iostream>\nusing namespace std;\n\nint main() {\n    // Count from 1 to 5\n    for (int i = 1; i <= 5; i++) {\n        cout << i << " ";\n    }\n    cout << endl;\n\n    // Sum of 1 to 10\n    int sum = 0;\n    for (int i = 1; i <= 10; i++) {\n        sum += i;\n    }\n    cout << "Sum: " << sum << endl;\n\n    return 0;\n}',
      expectedOutput: '1 2 3 4 5 \nSum: 55',
      exercise: {
        instruction: 'Write a for loop that prints the multiplication table of 5 (5x1=5 through 5x10=50).',
        starterCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    // Print: 5 x 1 = 5, etc.\n    for (int i = 1; i <= 10; i++) {\n        // Your code here\n    }\n    return 0;\n}',
        expectedOutput: null,
        hints: ['cout << "5 x " << i << " = " << 5*i << endl;', 'The loop already goes from 1 to 10']
      },
      quiz: [
        { question: 'How many times does for(int i=0; i<5; i++) execute?', options: ['4', '5', '6', 'Infinite'], correctIndex: 1, explanation: 'i takes values 0,1,2,3,4 (five iterations). When i becomes 5, the condition i<5 is false.' },
        { question: 'What is the sum of integers from 1 to 10?', options: ['45', '50', '55', '100'], correctIndex: 2, explanation: 'The sum formula is n*(n+1)/2 = 10*11/2 = 55.' }
      ]
    },
    {
      id: 'ch5-l2',
      title: 'While and Do-While Loops',
      difficulty: 'beginner',
      content: '<h2>Conditional Loops</h2>' +
        '<p>The <code>while</code> loop repeats as long as a condition is true:</p>' +
        '<p><code>while (condition) { body }</code></p>' +
        '<p>The <code>do-while</code> loop is similar but guarantees at least one execution:</p>' +
        '<p><code>do { body } while (condition);</code></p>' +
        '<h3>When to Use Which</h3>' +
        '<ul><li><strong>for</strong>: When you know the number of iterations</li>' +
        '<li><strong>while</strong>: When the number of iterations depends on a condition</li>' +
        '<li><strong>do-while</strong>: When you need at least one execution</li></ul>',
      codeExample: '#include <iostream>\nusing namespace std;\n\nint main() {\n    // While: count down from 5\n    int n = 5;\n    while (n > 0) {\n        cout << n << " ";\n        n--;\n    }\n    cout << endl;\n\n    // Do-while\n    int x = 1;\n    do {\n        cout << "x = " << x << endl;\n        x *= 2;\n    } while (x <= 8);\n\n    return 0;\n}',
      expectedOutput: '5 4 3 2 1 \nx = 1\nx = 2\nx = 4\nx = 8',
      exercise: {
        instruction: 'Write a while loop that finds and prints the first power of 2 greater than 1000.',
        starterCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int power = 1;\n    // Keep doubling until > 1000\n    // Print the result\n    return 0;\n}',
        expectedOutput: '1024',
        hints: ['while (power <= 1000) { power *= 2; }', 'The answer is 1024 (2^10)']
      },
      quiz: [
        { question: 'What is the key difference between while and do-while?', options: ['No difference', 'do-while always executes at least once', 'while is faster', 'do-while cannot use break'], correctIndex: 1, explanation: 'do-while checks the condition after executing the body, guaranteeing at least one execution.' },
        { question: 'What causes an infinite loop?', options: ['Using break', 'A condition that never becomes false', 'Using continue', 'Having too many iterations'], correctIndex: 1, explanation: 'If the loop condition never becomes false, the loop runs forever (infinite loop).' }
      ]
    },
    {
      id: 'ch5-l3',
      title: 'Break, Continue, and Nested Loops',
      difficulty: 'intermediate',
      content: '<h2>Loop Control</h2>' +
        '<p><code>break</code> immediately exits the innermost loop. <code>continue</code> skips the rest of the current iteration and moves to the next one.</p>' +
        '<h3>Nested Loops</h3>' +
        '<p>A loop inside another loop. The inner loop runs completely for each iteration of the outer loop. Common for 2D patterns, grids, and matrix operations.</p>',
      codeExample: '#include <iostream>\nusing namespace std;\n\nint main() {\n    // Break: find first multiple of 7 above 50\n    for (int i = 51; ; i++) {\n        if (i % 7 == 0) {\n            cout << "Found: " << i << endl;\n            break;\n        }\n    }\n\n    // Nested loop: simple pattern\n    for (int i = 1; i <= 3; i++) {\n        for (int j = 1; j <= i; j++) {\n            cout << "* ";\n        }\n        cout << endl;\n    }\n\n    return 0;\n}',
      expectedOutput: 'Found: 56\n* \n* * \n* * * ',
      exercise: {
        instruction: 'Write a nested loop that prints a 4x4 grid of numbers (1-16).',
        starterCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int num = 1;\n    // 4 rows, 4 columns\n    return 0;\n}',
        expectedOutput: null,
        hints: ['Use two nested for loops', 'cout << num++ << " " in the inner loop', 'Print endl after each row']
      },
      quiz: [
        { question: 'What does break do inside a loop?', options: ['Pauses the loop', 'Exits the innermost loop immediately', 'Exits all loops', 'Restarts the loop'], correctIndex: 1, explanation: 'break exits only the innermost loop it appears in.' },
        { question: 'What does continue do?', options: ['Exits the loop', 'Skips to the next iteration', 'Pauses execution', 'Goes back to the start of the program'], correctIndex: 1, explanation: 'continue skips the remaining code in the current iteration and jumps to the loop\'s condition check.' }
      ]
    }
  ]
},

// ===================== CHAPTER 6: Functions =====================
{
  id: 6,
  title: 'Functions',
  description: 'Organize code into reusable blocks',
  icon: '\u{1F9E9}',
  lessons: [
    {
      id: 'ch6-l1',
      title: 'Function Basics',
      difficulty: 'intermediate',
      content: '<h2>Writing Functions</h2>' +
        '<p>A <strong>function</strong> is a named block of code that performs a task. Functions help you avoid repetition and organize code.</p>' +
        '<p>Syntax: <code>returnType functionName(parameters) { body }</code></p>' +
        '<ul><li><code>void</code> functions don\'t return a value</li>' +
        '<li>Non-void functions must use <code>return</code> to send a value back</li>' +
        '<li>Parameters are the inputs; arguments are the actual values passed</li></ul>',
      codeExample: '#include <iostream>\nusing namespace std;\n\nint add(int a, int b) {\n    return a + b;\n}\n\nvoid greet(string name) {\n    cout << "Hello, " << name << "!" << endl;\n}\n\nint main() {\n    greet("World");\n    int result = add(3, 7);\n    cout << "3 + 7 = " << result << endl;\n    return 0;\n}',
      expectedOutput: 'Hello, World!\n3 + 7 = 10',
      exercise: {
        instruction: 'Write a function called "multiply" that takes two integers and returns their product. Call it from main.',
        starterCode: '#include <iostream>\nusing namespace std;\n\n// Define multiply function here\n\nint main() {\n    cout << "4 * 5 = " << multiply(4, 5) << endl;\n    cout << "3 * 9 = " << multiply(3, 9) << endl;\n    return 0;\n}',
        expectedOutput: '4 * 5 = 20\n3 * 9 = 27',
        hints: ['int multiply(int a, int b) { return a * b; }', 'The function must be defined before main() or declared with a prototype']
      },
      quiz: [
        { question: 'What does void mean as a return type?', options: ['Returns 0', 'Returns nothing', 'Returns a boolean', 'It\'s an error'], correctIndex: 1, explanation: 'void means the function does not return a value.' },
        { question: 'What is the difference between a parameter and an argument?', options: ['No difference', 'Parameter is in the definition, argument is the value passed', 'Parameter is the value, argument is the definition', 'Parameters are only for void functions'], correctIndex: 1, explanation: 'Parameters are the placeholders in the function definition. Arguments are the actual values passed when calling.' }
      ]
    },
    {
      id: 'ch6-l2',
      title: 'Overloading and Default Arguments',
      difficulty: 'intermediate',
      content: '<h2>Function Overloading</h2>' +
        '<p>C++ allows multiple functions with the <strong>same name</strong> but <strong>different parameters</strong>. The compiler picks the right one based on the arguments.</p>' +
        '<h3>Default Arguments</h3>' +
        '<p>Parameters can have default values that are used when the caller doesn\'t provide them:</p>' +
        '<p><code>void print(string msg, int times = 1)</code></p>' +
        '<p>Default arguments must be at the <em>end</em> of the parameter list.</p>',
      codeExample: '#include <iostream>\nusing namespace std;\n\nint square(int x) {\n    return x * x;\n}\n\ndouble square(double x) {\n    return x * x;\n}\n\nvoid repeat(string msg, int times = 1) {\n    for (int i = 0; i < times; i++) {\n        cout << msg << endl;\n    }\n}\n\nint main() {\n    cout << square(5) << endl;\n    cout << square(2.5) << endl;\n    repeat("Hi");\n    repeat("Go", 3);\n    return 0;\n}',
      expectedOutput: '25\n6.25\nHi\nGo\nGo\nGo',
      exercise: {
        instruction: 'Create an overloaded "max" function for int and double types. Test both from main.',
        starterCode: '#include <iostream>\nusing namespace std;\n\n// int max(int a, int b)\n// double max(double a, double b)\n\nint main() {\n    cout << max(3, 7) << endl;\n    cout << max(2.5, 1.8) << endl;\n    return 0;\n}',
        expectedOutput: '7\n2.5',
        hints: ['Return (a > b) ? a : b;', 'The compiler picks the right version based on argument types']
      },
      quiz: [
        { question: 'What is function overloading?', options: ['Calling a function too many times', 'Multiple functions with the same name but different parameters', 'A function that calls itself', 'An error'], correctIndex: 1, explanation: 'Overloading lets you define multiple functions with the same name but different parameter types or counts.' },
        { question: 'Where must default arguments appear?', options: ['At the start', 'At the end of the parameter list', 'Anywhere', 'Only for void functions'], correctIndex: 1, explanation: 'Default arguments must be rightmost. Once a parameter has a default, all subsequent ones must too.' }
      ]
    },
    {
      id: 'ch6-l3',
      title: 'Recursion',
      difficulty: 'intermediate',
      content: '<h2>Functions That Call Themselves</h2>' +
        '<p><strong>Recursion</strong> is when a function calls itself. Every recursive function needs:</p>' +
        '<ul><li>A <strong>base case</strong> that stops the recursion</li>' +
        '<li>A <strong>recursive case</strong> that moves toward the base case</li></ul>' +
        '<p>Without a base case, recursion leads to a stack overflow (infinite calls).</p>' +
        '<h3>Classic Example: Factorial</h3>' +
        '<p>n! = n \u00D7 (n-1)! with base case 0! = 1</p>',
      codeExample: '#include <iostream>\nusing namespace std;\n\nint factorial(int n) {\n    if (n <= 1) return 1;       // Base case\n    return n * factorial(n - 1); // Recursive case\n}\n\nint fibonacci(int n) {\n    if (n <= 0) return 0;\n    if (n == 1) return 1;\n    return fibonacci(n - 1) + fibonacci(n - 2);\n}\n\nint main() {\n    cout << "5! = " << factorial(5) << endl;\n    cout << "Fib(7) = " << fibonacci(7) << endl;\n    return 0;\n}',
      expectedOutput: '5! = 120\nFib(7) = 13',
      exercise: {
        instruction: 'Write a recursive function "power" that calculates base^exp (e.g., power(2, 10) = 1024).',
        starterCode: '#include <iostream>\nusing namespace std;\n\nint power(int base, int exp) {\n    // Base case: exp == 0 returns 1\n    // Recursive: base * power(base, exp - 1)\n    return 0; // Fix this\n}\n\nint main() {\n    cout << "2^10 = " << power(2, 10) << endl;\n    cout << "3^4 = " << power(3, 4) << endl;\n    return 0;\n}',
        expectedOutput: '2^10 = 1024\n3^4 = 81',
        hints: ['if (exp == 0) return 1;', 'return base * power(base, exp - 1);']
      },
      quiz: [
        { question: 'What is a base case in recursion?', options: ['The first function call', 'The condition that stops recursion', 'A function with no parameters', 'The main function'], correctIndex: 1, explanation: 'The base case provides a stopping condition. Without it, recursion would continue infinitely.' },
        { question: 'What is 5! (5 factorial)?', options: ['25', '60', '120', '720'], correctIndex: 2, explanation: '5! = 5 \u00D7 4 \u00D7 3 \u00D7 2 \u00D7 1 = 120' }
      ]
    }
  ]
},

// ===================== CHAPTER 7: Arrays & Strings =====================
{
  id: 7,
  title: 'Arrays & Strings',
  description: 'Work with collections and text data',
  icon: '\u{1F4DD}',
  lessons: [
    {
      id: 'ch7-l1',
      title: 'Arrays',
      difficulty: 'intermediate',
      content: '<h2>Storing Multiple Values</h2>' +
        '<p>An <strong>array</strong> stores a fixed-size sequence of elements of the same type. Elements are accessed by their index (starting at 0).</p>' +
        '<p>Declaration: <code>int nums[5] = {10, 20, 30, 40, 50};</code></p>' +
        '<ul><li>Index starts at <strong>0</strong> (first element is <code>nums[0]</code>)</li>' +
        '<li>Size is fixed at compile time</li>' +
        '<li>Going out of bounds is <strong>undefined behavior</strong></li></ul>',
      codeExample: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int nums[] = {10, 20, 30, 40, 50};\n    int size = 5;\n\n    // Access elements\n    cout << "First: " << nums[0] << endl;\n    cout << "Last: " << nums[4] << endl;\n\n    // Loop through\n    int sum = 0;\n    for (int i = 0; i < size; i++) {\n        sum += nums[i];\n    }\n    cout << "Sum: " << sum << endl;\n\n    return 0;\n}',
      expectedOutput: 'First: 10\nLast: 50\nSum: 150',
      exercise: {
        instruction: 'Create an array of 5 integers. Find and print the maximum value using a loop.',
        starterCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int arr[] = {42, 17, 93, 8, 56};\n    // Find and print the max\n    return 0;\n}',
        expectedOutput: 'Max: 93',
        hints: ['Start with int maxVal = arr[0];', 'Loop and update maxVal if arr[i] > maxVal']
      },
      quiz: [
        { question: 'What is the index of the first element in a C++ array?', options: ['1', '0', '-1', 'Depends on the array'], correctIndex: 1, explanation: 'C++ arrays are 0-indexed. The first element is at index 0.' },
        { question: 'What happens if you access an array out of bounds?', options: ['Returns 0', 'Compiler error', 'Undefined behavior', 'Throws an exception'], correctIndex: 2, explanation: 'Accessing out-of-bounds memory is undefined behavior \u2014 the program may crash, return garbage, or seem to work.' }
      ]
    },
    {
      id: 'ch7-l2',
      title: 'Strings',
      difficulty: 'intermediate',
      content: '<h2>Working with Text</h2>' +
        '<p>C++ provides <code>std::string</code> for text manipulation. Unlike C-style char arrays, strings are dynamic and safe.</p>' +
        '<h3>Useful String Methods</h3>' +
        '<ul><li><code>.length()</code> or <code>.size()</code> \u2014 number of characters</li>' +
        '<li><code>.substr(pos, len)</code> \u2014 extract a substring</li>' +
        '<li><code>.find(str)</code> \u2014 find position of a substring</li>' +
        '<li><code>+</code> \u2014 concatenation</li>' +
        '<li><code>[i]</code> \u2014 access individual characters</li></ul>',
      codeExample: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string greeting = "Hello";\n    string name = "C++";\n    string full = greeting + ", " + name + "!";\n\n    cout << full << endl;\n    cout << "Length: " << full.length() << endl;\n    cout << "Char 0: " << full[0] << endl;\n    cout << "Substr: " << full.substr(7, 3) << endl;\n\n    return 0;\n}',
      expectedOutput: 'Hello, C++!\nLength: 11\nChar 0: H\nSubstr: C++',
      exercise: {
        instruction: 'Write a program that reverses a string and prints it.',
        starterCode: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string str = "Hello";\n    string reversed = "";\n    // Build reversed string\n    cout << reversed << endl;\n    return 0;\n}',
        expectedOutput: 'olleH',
        hints: ['Loop from str.length()-1 down to 0', 'reversed += str[i]; for each character']
      },
      quiz: [
        { question: 'What does string::length() return?', options: ['The maximum capacity', 'The number of characters', 'The memory size in bytes', 'The number of words'], correctIndex: 1, explanation: 'length() returns the number of characters in the string.' },
        { question: 'How do you concatenate strings in C++?', options: ['string.add()', 'Using the + operator', 'string.concat()', 'Using &'], correctIndex: 1, explanation: 'The + operator concatenates strings in C++. s1 + s2 creates a new string with both combined.' }
      ]
    }
  ]
},

// ===================== CHAPTER 8: Pointers & References =====================
{
  id: 8,
  title: 'Pointers & References',
  description: 'Understand memory addresses and indirection',
  icon: '\u{1F3AF}',
  lessons: [
    {
      id: 'ch8-l1',
      title: 'Pointers',
      difficulty: 'advanced',
      content: '<h2>Understanding Pointers</h2>' +
        '<p>A <strong>pointer</strong> is a variable that stores a <em>memory address</em>. Pointers are fundamental to C++ and enable powerful features like dynamic memory and data structures.</p>' +
        '<ul><li><code>int* ptr;</code> \u2014 declares a pointer to int</li>' +
        '<li><code>&x</code> \u2014 "address of" operator (gets the address of x)</li>' +
        '<li><code>*ptr</code> \u2014 "dereference" operator (gets the value at the address)</li></ul>' +
        '<p>Think of a pointer as a signpost: it doesn\'t hold the data itself, but points to where the data lives.</p>',
      codeExample: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int x = 42;\n    int* ptr = &x;\n\n    cout << "Value of x: " << x << endl;\n    cout << "Address of x: " << ptr << endl;\n    cout << "Value via pointer: " << *ptr << endl;\n\n    *ptr = 100;  // Modify x through the pointer\n    cout << "x is now: " << x << endl;\n\n    return 0;\n}',
      expectedOutput: null,
      exercise: {
        instruction: 'Create two int variables. Use a pointer to swap their values, then print them.',
        starterCode: '#include <iostream>\nusing namespace std;\n\nvoid swap(int* a, int* b) {\n    // Swap using pointers\n}\n\nint main() {\n    int x = 10, y = 20;\n    cout << "Before: x=" << x << " y=" << y << endl;\n    swap(&x, &y);\n    cout << "After: x=" << x << " y=" << y << endl;\n    return 0;\n}',
        expectedOutput: 'Before: x=10 y=20\nAfter: x=20 y=10',
        hints: ['int temp = *a;', '*a = *b;', '*b = temp;']
      },
      quiz: [
        { question: 'What does the & operator do when used before a variable?', options: ['Logical AND', 'Returns the memory address', 'Declares a reference', 'Bitwise AND'], correctIndex: 1, explanation: '& before a variable gives its memory address, which can be stored in a pointer.' },
        { question: 'What does *ptr do (where ptr is a pointer)?', options: ['Multiplies ptr', 'Gets the value at the address ptr holds', 'Declares a pointer', 'Gets the address'], correctIndex: 1, explanation: 'Dereferencing a pointer with * gives you the value stored at the memory address the pointer holds.' }
      ]
    },
    {
      id: 'ch8-l2',
      title: 'References and Dynamic Memory',
      difficulty: 'advanced',
      content: '<h2>References</h2>' +
        '<p>A <strong>reference</strong> is an alias for an existing variable. Once bound, it cannot be reseated.</p>' +
        '<p><code>int& ref = x;</code> \u2014 ref is now another name for x</p>' +
        '<h3>Dynamic Memory</h3>' +
        '<p>Use <code>new</code> to allocate memory on the heap and <code>delete</code> to free it:</p>' +
        '<ul><li><code>int* p = new int(42);</code> \u2014 allocates an int</li>' +
        '<li><code>delete p;</code> \u2014 frees the memory</li>' +
        '<li><code>int* arr = new int[10];</code> \u2014 allocates an array</li>' +
        '<li><code>delete[] arr;</code> \u2014 frees the array</li></ul>' +
        '<p><strong>Always</strong> pair every <code>new</code> with a <code>delete</code> to prevent memory leaks.</p>',
      codeExample: '#include <iostream>\nusing namespace std;\n\nvoid increment(int& ref) {\n    ref++;  // Modifies the original\n}\n\nint main() {\n    int x = 10;\n    increment(x);\n    cout << "x after increment: " << x << endl;\n\n    // Dynamic memory\n    int* p = new int(99);\n    cout << "Dynamic value: " << *p << endl;\n    delete p;\n\n    return 0;\n}',
      expectedOutput: 'x after increment: 11\nDynamic value: 99',
      exercise: {
        instruction: 'Write a function that takes a reference to an int and doubles its value. Test it from main.',
        starterCode: '#include <iostream>\nusing namespace std;\n\nvoid doubleValue(int& val) {\n    // Double the value\n}\n\nint main() {\n    int num = 15;\n    doubleValue(num);\n    cout << "Doubled: " << num << endl;\n    return 0;\n}',
        expectedOutput: 'Doubled: 30',
        hints: ['val = val * 2; or val *= 2;', 'Since val is a reference, the original changes']
      },
      quiz: [
        { question: 'What is a reference in C++?', options: ['A pointer', 'An alias for an existing variable', 'A copy of a variable', 'A constant'], correctIndex: 1, explanation: 'A reference is another name (alias) for an existing variable. Changes to the reference affect the original.' },
        { question: 'What happens if you forget to call delete after new?', options: ['Nothing', 'Memory leak', 'Compiler error', 'The OS auto-frees it'], correctIndex: 1, explanation: 'Forgetting delete causes a memory leak \u2014 the allocated memory is never freed, wasting resources.' }
      ]
    }
  ]
},

// ===================== CHAPTER 9: Structures & Enums =====================
{
  id: 9,
  title: 'Structures & Enums',
  description: 'Group related data together',
  icon: '\u{1F3D7}\uFE0F',
  lessons: [
    {
      id: 'ch9-l1',
      title: 'Structs',
      difficulty: 'intermediate',
      content: '<h2>Grouping Data with Structs</h2>' +
        '<p>A <code>struct</code> lets you group related variables under one name:</p>' +
        '<p>Members are accessed with the dot operator <code>.</code></p>' +
        '<p>Structs are like simple classes \u2014 in C++, the only default difference is that struct members are <code>public</code> by default while class members are <code>private</code>.</p>',
      codeExample: '#include <iostream>\n#include <string>\nusing namespace std;\n\nstruct Student {\n    string name;\n    int age;\n    double gpa;\n};\n\nint main() {\n    Student s1;\n    s1.name = "Alice";\n    s1.age = 20;\n    s1.gpa = 3.8;\n\n    cout << "Name: " << s1.name << endl;\n    cout << "Age: " << s1.age << endl;\n    cout << "GPA: " << s1.gpa << endl;\n\n    return 0;\n}',
      expectedOutput: 'Name: Alice\nAge: 20\nGPA: 3.8',
      exercise: {
        instruction: 'Create a struct "Point" with x and y coordinates. Write a function that calculates the distance from the origin.',
        starterCode: '#include <iostream>\n#include <cmath>\nusing namespace std;\n\nstruct Point {\n    double x, y;\n};\n\n// Write distanceFromOrigin function\n\nint main() {\n    Point p = {3.0, 4.0};\n    cout << "Distance: " << distanceFromOrigin(p) << endl;\n    return 0;\n}',
        expectedOutput: 'Distance: 5',
        hints: ['sqrt(p.x*p.x + p.y*p.y)', 'A 3-4-5 right triangle has hypotenuse 5']
      },
      quiz: [
        { question: 'How do you access a struct member?', options: ['struct->member', 'struct.member', 'struct[member]', 'struct::member'], correctIndex: 1, explanation: 'Use the dot operator (.) to access members of a struct variable.' }
      ]
    },
    {
      id: 'ch9-l2',
      title: 'Enums',
      difficulty: 'intermediate',
      content: '<h2>Named Constants with Enums</h2>' +
        '<p>An <code>enum</code> defines a type with a set of named integer constants. <code>enum class</code> (scoped enum) is the safer, modern version.</p>' +
        '<p>Enums make code more readable by replacing magic numbers with meaningful names.</p>',
      codeExample: '#include <iostream>\nusing namespace std;\n\nenum class Color { Red, Green, Blue };\n\nenum Direction { North = 0, South = 1, East = 2, West = 3 };\n\nint main() {\n    Color c = Color::Green;\n    if (c == Color::Green) {\n        cout << "Color is Green" << endl;\n    }\n\n    Direction d = East;\n    cout << "Direction: " << d << endl;\n\n    return 0;\n}',
      expectedOutput: 'Color is Green\nDirection: 2',
      exercise: {
        instruction: 'Create an enum class Season with Spring, Summer, Autumn, Winter. Print a message based on the season using switch.',
        starterCode: '#include <iostream>\nusing namespace std;\n\n// Define enum class Season\n\nint main() {\n    Season s = Season::Summer;\n    // Use switch to print a message\n    return 0;\n}',
        expectedOutput: null,
        hints: ['enum class Season { Spring, Summer, Autumn, Winter };', 'switch(s) { case Season::Summer: ... }']
      },
      quiz: [
        { question: 'What is the advantage of enum class over plain enum?', options: ['It is faster', 'It provides type safety and scoped names', 'It supports strings', 'No advantage'], correctIndex: 1, explanation: 'enum class (scoped enum) prevents implicit conversions and requires qualified names (e.g., Color::Red), avoiding naming conflicts.' }
      ]
    }
  ]
},

// ===================== CHAPTER 10: OOP Basics =====================
{
  id: 10,
  title: 'Object-Oriented Programming',
  description: 'Classes, objects, constructors, and encapsulation',
  icon: '\u{1F3AD}',
  lessons: [
    {
      id: 'ch10-l1',
      title: 'Classes and Objects',
      difficulty: 'advanced',
      content: '<h2>Introduction to OOP</h2>' +
        '<p>A <strong>class</strong> is a blueprint for creating objects. It bundles data (member variables) and behavior (member functions) together.</p>' +
        '<h3>Access Modifiers</h3>' +
        '<ul><li><code>public</code> \u2014 accessible from anywhere</li>' +
        '<li><code>private</code> \u2014 accessible only within the class</li>' +
        '<li><code>protected</code> \u2014 accessible in the class and subclasses</li></ul>' +
        '<p><strong>Encapsulation</strong> means hiding internal details and exposing only what\'s necessary through public methods.</p>',
      codeExample: '#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Dog {\nprivate:\n    string name;\n    int age;\n\npublic:\n    Dog(string n, int a) : name(n), age(a) {}\n\n    void bark() {\n        cout << name << " says: Woof!" << endl;\n    }\n\n    void info() {\n        cout << name << " is " << age << " years old." << endl;\n    }\n};\n\nint main() {\n    Dog d1("Buddy", 3);\n    d1.bark();\n    d1.info();\n    return 0;\n}',
      expectedOutput: 'Buddy says: Woof!\nBuddy is 3 years old.',
      exercise: {
        instruction: 'Create a class "Rectangle" with width and height, a method area(), and a method perimeter(). Test it.',
        starterCode: '#include <iostream>\nusing namespace std;\n\nclass Rectangle {\nprivate:\n    double width, height;\npublic:\n    Rectangle(double w, double h) : width(w), height(h) {}\n    // Add area() and perimeter() methods\n};\n\nint main() {\n    Rectangle r(5.0, 3.0);\n    cout << "Area: " << r.area() << endl;\n    cout << "Perimeter: " << r.perimeter() << endl;\n    return 0;\n}',
        expectedOutput: 'Area: 15\nPerimeter: 16',
        hints: ['double area() { return width * height; }', 'double perimeter() { return 2 * (width + height); }']
      },
      quiz: [
        { question: 'What is encapsulation?', options: ['Making everything public', 'Hiding internal data and exposing through methods', 'Inheriting from a base class', 'Creating multiple objects'], correctIndex: 1, explanation: 'Encapsulation bundles data with methods and restricts direct access to internal state.' },
        { question: 'What is a constructor?', options: ['A destructor', 'A special method called when an object is created', 'A static method', 'A virtual function'], correctIndex: 1, explanation: 'A constructor initializes an object when it is created. It has the same name as the class.' }
      ]
    },
    {
      id: 'ch10-l2',
      title: 'Inheritance and Polymorphism',
      difficulty: 'advanced',
      content: '<h2>Building on Existing Classes</h2>' +
        '<p><strong>Inheritance</strong> lets a derived class inherit members from a base class, enabling code reuse.</p>' +
        '<p><strong>Polymorphism</strong> lets derived classes provide different implementations of the same function using <code>virtual</code> functions.</p>' +
        '<p>Use <code>override</code> to explicitly mark overridden methods (C++11+).</p>',
      codeExample: '#include <iostream>\nusing namespace std;\n\nclass Shape {\npublic:\n    virtual double area() { return 0; }\n    virtual void describe() {\n        cout << "I am a shape" << endl;\n    }\n};\n\nclass Circle : public Shape {\n    double radius;\npublic:\n    Circle(double r) : radius(r) {}\n    double area() override { return 3.14159 * radius * radius; }\n    void describe() override {\n        cout << "I am a circle with radius " << radius << endl;\n    }\n};\n\nint main() {\n    Circle c(5);\n    Shape* s = &c;\n    s->describe();\n    cout << "Area: " << s->area() << endl;\n    return 0;\n}',
      expectedOutput: 'I am a circle with radius 5\nArea: 78.5397',
      exercise: {
        instruction: 'Create a base class Animal with a virtual speak() method. Derive Cat and Dog classes that override it.',
        starterCode: '#include <iostream>\nusing namespace std;\n\nclass Animal {\npublic:\n    virtual void speak() { cout << "..." << endl; }\n};\n\n// Create Cat and Dog classes\n\nint main() {\n    Cat c;\n    Dog d;\n    c.speak();\n    d.speak();\n    return 0;\n}',
        expectedOutput: 'Meow!\nWoof!',
        hints: ['class Cat : public Animal { ... };', 'void speak() override { cout << "Meow!" << endl; }']
      },
      quiz: [
        { question: 'What does the virtual keyword enable?', options: ['Static binding', 'Dynamic polymorphism (runtime dispatch)', 'Multiple inheritance', 'Template specialization'], correctIndex: 1, explanation: 'virtual allows derived classes to override methods, with the correct version called at runtime (dynamic dispatch).' },
        { question: 'What does override do?', options: ['Overloads a function', 'Tells the compiler this function overrides a virtual base function', 'Makes a function virtual', 'Prevents inheritance'], correctIndex: 1, explanation: 'override is a compiler hint that ensures the function actually overrides a base class virtual function, catching errors.' }
      ]
    }
  ]
},

// ===================== CHAPTER 11: Templates & STL =====================
{
  id: 11,
  title: 'Templates & STL',
  description: 'Generic programming and the Standard Template Library',
  icon: '\u{1F4DA}',
  lessons: [
    {
      id: 'ch11-l1',
      title: 'Function and Class Templates',
      difficulty: 'advanced',
      content: '<h2>Generic Programming with Templates</h2>' +
        '<p><strong>Templates</strong> let you write code that works with any type. Instead of writing separate functions for int, double, string, etc., you write one template.</p>' +
        '<p>Syntax: <code>template &lt;typename T&gt;</code> before the function or class.</p>' +
        '<p>The compiler generates the specific version when you use the template with a concrete type.</p>',
      codeExample: '#include <iostream>\nusing namespace std;\n\ntemplate <typename T>\nT getMax(T a, T b) {\n    return (a > b) ? a : b;\n}\n\ntemplate <typename T>\nvoid printArray(T arr[], int size) {\n    for (int i = 0; i < size; i++) {\n        cout << arr[i] << " ";\n    }\n    cout << endl;\n}\n\nint main() {\n    cout << getMax(10, 20) << endl;\n    cout << getMax(3.14, 2.72) << endl;\n\n    int nums[] = {5, 2, 8, 1, 9};\n    printArray(nums, 5);\n\n    return 0;\n}',
      expectedOutput: '20\n3.14\n5 2 8 1 9 ',
      exercise: {
        instruction: 'Write a template function "swap" that swaps two values of any type. Test with int and string.',
        starterCode: '#include <iostream>\n#include <string>\nusing namespace std;\n\ntemplate <typename T>\nvoid mySwap(T& a, T& b) {\n    // Implement swap\n}\n\nint main() {\n    int x = 1, y = 2;\n    mySwap(x, y);\n    cout << x << " " << y << endl;\n\n    string a = "hello", b = "world";\n    mySwap(a, b);\n    cout << a << " " << b << endl;\n    return 0;\n}',
        expectedOutput: '2 1\nworld hello',
        hints: ['T temp = a; a = b; b = temp;', 'Templates handle the type automatically']
      },
      quiz: [
        { question: 'What does template<typename T> do?', options: ['Creates a macro', 'Defines a generic type parameter T', 'Declares a variable T', 'Imports a library'], correctIndex: 1, explanation: 'template<typename T> introduces a type parameter T that gets substituted with actual types when used.' }
      ]
    },
    {
      id: 'ch11-l2',
      title: 'Vectors and Maps',
      difficulty: 'advanced',
      content: '<h2>STL Containers</h2>' +
        '<p>The Standard Template Library (STL) provides powerful, ready-to-use data structures:</p>' +
        '<ul><li><code>vector</code> \u2014 dynamic array that grows automatically</li>' +
        '<li><code>map</code> \u2014 key-value pairs (like a dictionary)</li>' +
        '<li><code>set</code> \u2014 unique sorted elements</li></ul>' +
        '<h3>vector Essentials</h3>' +
        '<ul><li><code>.push_back(val)</code> \u2014 add to end</li>' +
        '<li><code>.size()</code> \u2014 number of elements</li>' +
        '<li><code>[i]</code> \u2014 access by index</li>' +
        '<li><strong>Range-based for</strong>: <code>for (auto& x : vec)</code></li></ul>',
      codeExample: '#include <iostream>\n#include <vector>\n#include <map>\nusing namespace std;\n\nint main() {\n    // Vector\n    vector<int> nums = {3, 1, 4, 1, 5};\n    nums.push_back(9);\n    cout << "Vector size: " << nums.size() << endl;\n    for (int n : nums) {\n        cout << n << " ";\n    }\n    cout << endl;\n\n    // Map\n    map<string, int> ages;\n    ages["Alice"] = 25;\n    ages["Bob"] = 30;\n    for (auto& pair : ages) {\n        cout << pair.first << ": " << pair.second << endl;\n    }\n\n    return 0;\n}',
      expectedOutput: 'Vector size: 6\n3 1 4 1 5 9 \nAlice: 25\nBob: 30',
      exercise: {
        instruction: 'Create a vector of strings, add 3 names, then print them using a range-based for loop.',
        starterCode: '#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    vector<string> names;\n    // Add names and print them\n    return 0;\n}',
        expectedOutput: null,
        hints: ['names.push_back("Alice");', 'for (const string& name : names) { cout << name << endl; }']
      },
      quiz: [
        { question: 'What is the advantage of vector over raw arrays?', options: ['Faster access', 'Dynamic size \u2014 it can grow and shrink', 'Uses less memory', 'Supports only integers'], correctIndex: 1, explanation: 'Vectors dynamically resize, while raw arrays have a fixed size determined at compile time.' },
        { question: 'What does auto do in a range-based for loop?', options: ['Makes the loop infinite', 'Automatically deduces the element type', 'Skips even elements', 'Creates a copy'], correctIndex: 1, explanation: 'auto lets the compiler deduce the type automatically, reducing verbosity.' }
      ]
    }
  ]
},

// ===================== CHAPTER 12: File Handling =====================
{
  id: 12,
  title: 'File Handling',
  description: 'Read from and write to files',
  icon: '\u{1F4C2}',
  lessons: [
    {
      id: 'ch12-l1',
      title: 'Reading and Writing Files',
      difficulty: 'advanced',
      content: '<h2>File I/O in C++</h2>' +
        '<p>C++ provides <code>&lt;fstream&gt;</code> for file operations:</p>' +
        '<ul><li><code>ofstream</code> \u2014 write to files</li>' +
        '<li><code>ifstream</code> \u2014 read from files</li>' +
        '<li><code>fstream</code> \u2014 both read and write</li></ul>' +
        '<p>Always check if a file opened successfully with <code>.is_open()</code> and close it when done with <code>.close()</code>.</p>',
      codeExample: '#include <iostream>\n#include <fstream>\n#include <string>\nusing namespace std;\n\nint main() {\n    // This example shows the concepts\n    // (File I/O works best tested locally)\n    cout << "File I/O classes:" << endl;\n    cout << "  ofstream - write" << endl;\n    cout << "  ifstream - read" << endl;\n    cout << "  fstream  - both" << endl;\n    cout << "Always check .is_open()!" << endl;\n\n    return 0;\n}',
      expectedOutput: 'File I/O classes:\n  ofstream - write\n  ifstream - read\n  fstream  - both\nAlways check .is_open()!',
      exercise: {
        instruction: 'Write a program that demonstrates file handling concepts by printing which class to use for which operation.',
        starterCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "To write a file, use: ofstream" << endl;\n    // Add more lines about ifstream and fstream\n    return 0;\n}',
        expectedOutput: null,
        hints: ['cout << "To read a file, use: ifstream" << endl;', 'cout << "For both, use: fstream" << endl;']
      },
      quiz: [
        { question: 'Which class is used to write to a file?', options: ['ifstream', 'ofstream', 'iostream', 'fstream only'], correctIndex: 1, explanation: 'ofstream (output file stream) is used to write data to files.' },
        { question: 'Why should you check is_open() after opening a file?', options: ['It\'s optional', 'To verify the file was successfully opened before reading/writing', 'To lock the file', 'To set permissions'], correctIndex: 1, explanation: 'If the file doesn\'t exist or can\'t be accessed, operations on a failed stream produce undefined results.' }
      ]
    }
  ]
},

// ===================== CHAPTER 13: Exception Handling =====================
{
  id: 13,
  title: 'Exception Handling',
  description: 'Handle errors gracefully with try-catch',
  icon: '\u{1F6E1}\uFE0F',
  lessons: [
    {
      id: 'ch13-l1',
      title: 'Try, Catch, and Throw',
      difficulty: 'advanced',
      content: '<h2>Handling Errors Gracefully</h2>' +
        '<p>Instead of crashing, C++ programs can <strong>throw</strong> exceptions and <strong>catch</strong> them:</p>' +
        '<ul><li><code>throw</code> \u2014 signal an error</li>' +
        '<li><code>try { ... }</code> \u2014 wrap code that might throw</li>' +
        '<li><code>catch (type& e) { ... }</code> \u2014 handle the exception</li></ul>' +
        '<p>Standard exceptions like <code>runtime_error</code>, <code>invalid_argument</code>, and <code>out_of_range</code> are in <code>&lt;stdexcept&gt;</code>.</p>',
      codeExample: '#include <iostream>\n#include <stdexcept>\nusing namespace std;\n\ndouble divide(double a, double b) {\n    if (b == 0) {\n        throw runtime_error("Division by zero!");\n    }\n    return a / b;\n}\n\nint main() {\n    try {\n        cout << divide(10, 3) << endl;\n        cout << divide(10, 0) << endl;\n    } catch (const runtime_error& e) {\n        cout << "Error: " << e.what() << endl;\n    }\n    cout << "Program continues." << endl;\n    return 0;\n}',
      expectedOutput: '3.33333\nError: Division by zero!\nProgram continues.',
      exercise: {
        instruction: 'Write a function that throws an exception if a negative number is passed. Catch it in main.',
        starterCode: '#include <iostream>\n#include <stdexcept>\nusing namespace std;\n\nint squareRoot(int n) {\n    // Throw if n is negative\n    // Otherwise return n (simplified)\n    return n;\n}\n\nint main() {\n    try {\n        cout << squareRoot(16) << endl;\n        cout << squareRoot(-4) << endl;\n    } catch (const invalid_argument& e) {\n        cout << "Caught: " << e.what() << endl;\n    }\n    return 0;\n}',
        expectedOutput: '16\nCaught: Negative input',
        hints: ['if (n < 0) throw invalid_argument("Negative input");', 'Catch with catch (const invalid_argument& e)']
      },
      quiz: [
        { question: 'What does throw do?', options: ['Exits the program', 'Signals an error that can be caught', 'Prints an error', 'Returns null'], correctIndex: 1, explanation: 'throw creates an exception object and transfers control to the nearest matching catch block.' },
        { question: 'What method do you call on an exception to get the error message?', options: ['message()', 'what()', 'error()', 'toString()'], correctIndex: 1, explanation: 'The what() method returns a C-string describing the error.' }
      ]
    }
  ]
},

// ===================== CHAPTER 14: Memory Management =====================
{
  id: 14,
  title: 'Smart Pointers & Memory',
  description: 'Modern C++ memory management with RAII',
  icon: '\u{1F9E0}',
  lessons: [
    {
      id: 'ch14-l1',
      title: 'Smart Pointers',
      difficulty: 'expert',
      content: '<h2>Automatic Memory Management</h2>' +
        '<p><strong>Smart pointers</strong> (C++11) automatically manage memory, preventing leaks:</p>' +
        '<ul><li><code>unique_ptr</code> \u2014 exclusive ownership, auto-deletes</li>' +
        '<li><code>shared_ptr</code> \u2014 shared ownership with reference counting</li>' +
        '<li><code>weak_ptr</code> \u2014 non-owning reference to shared_ptr</li></ul>' +
        '<p>Use <code>make_unique</code> and <code>make_shared</code> instead of raw <code>new</code>.</p>' +
        '<h3>RAII</h3>' +
        '<p>Resource Acquisition Is Initialization \u2014 tie resource lifetime to object lifetime. When the object is destroyed, resources are freed automatically.</p>',
      codeExample: '#include <iostream>\n#include <memory>\nusing namespace std;\n\nclass Resource {\npublic:\n    Resource() { cout << "Resource created" << endl; }\n    ~Resource() { cout << "Resource destroyed" << endl; }\n    void use() { cout << "Resource in use" << endl; }\n};\n\nint main() {\n    {\n        auto ptr = make_unique<Resource>();\n        ptr->use();\n    } // ptr goes out of scope, Resource is automatically destroyed\n\n    cout << "After scope" << endl;\n    return 0;\n}',
      expectedOutput: 'Resource created\nResource in use\nResource destroyed\nAfter scope',
      exercise: {
        instruction: 'Create a unique_ptr to a dynamically allocated integer, set its value, and print it.',
        starterCode: '#include <iostream>\n#include <memory>\nusing namespace std;\n\nint main() {\n    // Create unique_ptr<int> using make_unique\n    // Set value and print it\n    return 0;\n}',
        expectedOutput: null,
        hints: ['auto ptr = make_unique<int>(42);', 'cout << *ptr << endl;']
      },
      quiz: [
        { question: 'What does unique_ptr do when it goes out of scope?', options: ['Nothing', 'Automatically deletes the managed object', 'Transfers ownership', 'Throws an exception'], correctIndex: 1, explanation: 'unique_ptr automatically calls delete on the managed pointer when it goes out of scope.' },
        { question: 'What does RAII stand for?', options: ['Random Access Is Invalid', 'Resource Acquisition Is Initialization', 'Reference And Integer Interface', 'Runtime Automatic Initialization'], correctIndex: 1, explanation: 'RAII ties resource management to object lifetime \u2014 acquire in constructor, release in destructor.' }
      ]
    }
  ]
},

// ===================== CHAPTER 15: Advanced Topics =====================
{
  id: 15,
  title: 'Advanced Topics',
  description: 'Lambda expressions, move semantics, and modern C++',
  icon: '\u{1F52C}',
  lessons: [
    {
      id: 'ch15-l1',
      title: 'Lambda Expressions',
      difficulty: 'expert',
      content: '<h2>Anonymous Functions</h2>' +
        '<p><strong>Lambda expressions</strong> (C++11) let you define inline, anonymous functions:</p>' +
        '<p><code>[capture](params) -> return_type { body }</code></p>' +
        '<h3>Capture Clause</h3>' +
        '<ul><li><code>[]</code> \u2014 capture nothing</li>' +
        '<li><code>[=]</code> \u2014 capture all by value</li>' +
        '<li><code>[&]</code> \u2014 capture all by reference</li>' +
        '<li><code>[x, &y]</code> \u2014 capture x by value, y by reference</li></ul>' +
        '<p>Lambdas are perfect for short callbacks and STL algorithms.</p>',
      codeExample: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    // Simple lambda\n    auto greet = [](string name) {\n        cout << "Hello, " << name << "!" << endl;\n    };\n    greet("Lambda");\n\n    // Lambda with capture\n    int factor = 3;\n    auto multiply = [factor](int x) { return x * factor; };\n    cout << "5 * 3 = " << multiply(5) << endl;\n\n    // Lambda with STL\n    vector<int> nums = {5, 2, 8, 1, 9, 3};\n    sort(nums.begin(), nums.end(), [](int a, int b) {\n        return a > b;  // Descending\n    });\n    for (int n : nums) cout << n << " ";\n    cout << endl;\n\n    return 0;\n}',
      expectedOutput: 'Hello, Lambda!\n5 * 3 = 15\n9 8 5 3 2 1 ',
      exercise: {
        instruction: 'Use a lambda with for_each to print each element of a vector doubled.',
        starterCode: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    vector<int> nums = {1, 2, 3, 4, 5};\n    // Use for_each with a lambda to print each * 2\n    cout << endl;\n    return 0;\n}',
        expectedOutput: null,
        hints: ['for_each(nums.begin(), nums.end(), [](int n) { cout << n*2 << " "; });']
      },
      quiz: [
        { question: 'What does [&] in a lambda capture clause mean?', options: ['Capture nothing', 'Capture all variables by reference', 'Capture all by value', 'Take address of lambda'], correctIndex: 1, explanation: '[&] captures all local variables by reference, allowing the lambda to read and modify them.' },
        { question: 'What is a lambda expression?', options: ['A named function', 'An anonymous inline function', 'A macro', 'A template'], correctIndex: 1, explanation: 'Lambdas are anonymous (unnamed) functions that can be defined inline where they are used.' }
      ]
    },
    {
      id: 'ch15-l2',
      title: 'Move Semantics & STL Algorithms',
      difficulty: 'expert',
      content: '<h2>Move Semantics</h2>' +
        '<p><strong>Move semantics</strong> (C++11) allow transferring resources instead of copying them, dramatically improving performance for large objects.</p>' +
        '<ul><li><code>std::move(x)</code> casts x to an rvalue reference, enabling the move constructor/assignment</li>' +
        '<li>After a move, the source object is in a valid but unspecified state</li></ul>' +
        '<h3>STL Algorithms</h3>' +
        '<p>The <code>&lt;algorithm&gt;</code> header provides powerful generic algorithms:</p>' +
        '<ul><li><code>sort</code>, <code>find</code>, <code>count</code>, <code>accumulate</code></li>' +
        '<li><code>transform</code>, <code>for_each</code>, <code>remove_if</code></li></ul>',
      codeExample: '#include <iostream>\n#include <vector>\n#include <algorithm>\n#include <numeric>\nusing namespace std;\n\nint main() {\n    vector<int> nums = {5, 2, 8, 1, 9, 3, 7, 4, 6};\n\n    // Sort\n    sort(nums.begin(), nums.end());\n    cout << "Sorted: ";\n    for (int n : nums) cout << n << " ";\n    cout << endl;\n\n    // Find\n    auto it = find(nums.begin(), nums.end(), 7);\n    if (it != nums.end()) {\n        cout << "Found 7 at index " << (it - nums.begin()) << endl;\n    }\n\n    // Sum\n    int sum = accumulate(nums.begin(), nums.end(), 0);\n    cout << "Sum: " << sum << endl;\n\n    // Count even numbers\n    int evens = count_if(nums.begin(), nums.end(), [](int n) { return n % 2 == 0; });\n    cout << "Even count: " << evens << endl;\n\n    return 0;\n}',
      expectedOutput: 'Sorted: 1 2 3 4 5 6 7 8 9 \nFound 7 at index 6\nSum: 45\nEven count: 4',
      exercise: {
        instruction: 'Use STL algorithms to find the min and max elements of a vector and print them.',
        starterCode: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    vector<int> nums = {42, 17, 93, 8, 56, 71};\n    // Use min_element and max_element\n    return 0;\n}',
        expectedOutput: 'Min: 8\nMax: 93',
        hints: ['auto minIt = min_element(nums.begin(), nums.end());', 'cout << "Min: " << *minIt << endl;']
      },
      quiz: [
        { question: 'What does std::move do?', options: ['Copies an object', 'Physically moves memory', 'Casts to an rvalue reference to enable move semantics', 'Deletes an object'], correctIndex: 2, explanation: 'std::move doesn\'t actually move anything \u2014 it casts to an rvalue reference, enabling the move constructor/assignment.' },
        { question: 'What does accumulate do?', options: ['Sorts a container', 'Computes the sum (or other fold) of elements', 'Counts elements', 'Removes duplicates'], correctIndex: 1, explanation: 'accumulate folds a range into a single value, defaulting to summation with an initial value.' }
      ]
    }
  ]
}

]}; // End of LESSONS_DATA
