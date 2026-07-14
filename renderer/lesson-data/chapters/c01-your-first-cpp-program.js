(function() {
  window.CPP_CHAPTERS = window.CPP_CHAPTERS || [];
  window.CPP_CHAPTERS.push({
    id: 1,
    title: "Your First C++ Program",
    description: "Learn how C++ programs start, print text, and handle compiler errors.",
    icon: "🚀",
    lessons: [
      {
        id: "ch1-l1",
        title: "The Starting Point: main()",
        difficulty: "beginner",
        content: `
          <h2>The Starting Point: main()</h2>
          <p>Every journey begins with a single step, and every C++ program begins with a single function. In this lesson, we will look at the absolute bare minimum code required to create a valid C++ program.</p>

          <h3>The Mental Model</h3>
          <p>Think of a C++ program as a massive library of instructions. When the computer opens your program, it needs to know exactly which book to read first. In C++, that starting point is always a function named <code>main()</code>.</p>

          <div class="note">
            <strong>Note:</strong> A "function" is simply a named block of code that performs a specific task. We will learn how to create our own functions later, but <code>main()</code> is special—it is required by the language.
          </div>

          <h3>Prerequisites</h3>
          <p>None — this is where we begin. If you have this application open, you have everything you need to follow along.</p>

          <h3>The Core Concept</h3>
          <p>Every C++ program must have exactly one <code>main()</code> function. Without it, the compiler won't know where to begin, and your program won't run.</p>

          <h3>Syntax Breakdown</h3>
          <pre><code>int main() {
    return 0;
}</code></pre>
          <ul>
            <li><code>int</code>: This indicates that the function will return an integer (a whole number).</li>
            <li><code>main()</code>: The required name of our starting function.</li>
            <li><code>{ }</code>: These curly braces define the "body" of the function. All the instructions for this function go inside them.</li>
            <li><code>return 0;</code>: This tells the operating system that the program finished successfully. Any non-zero number indicates an error.</li>
            <li><code>;</code>: The semicolon. Every complete instruction (statement) in C++ must end with a semicolon.</li>
          </ul>

          <h3>Predict Activity</h3>
          <p>Look at the code example below. Before clicking 'Run', predict: what text will appear on the screen? The <code>std::cout</code> line is responsible for the output — you will learn exactly how it works in the next lesson.</p>

          <div class="tip">
            <strong>Best Practice:</strong> Always indent the code inside your curly braces. It makes your program much easier to read!
          </div>
        `,
        codeExample: `#include <iostream>\n\nint main() {\n    std::cout << "Program started!\\n";\n    return 0;\n}`,
        expectedOutput: "Program started!",
        exercises: [
          {
            instruction: "This program has a typo in the text it prints. Fix the string so the program prints exactly: Program started!",
            starterCode: "#include <iostream>\n\nint main() {\n    std::cout << \"Progrm started!\\n\";\n    return 0;\n}",
            expectedOutput: "Program started!",
            exerciseType: "debug",
            hints: [
              "Run the code first and compare the actual output to the expected output.",
              "Look carefully at the text inside the double quotes — one word has a spelling mistake."
            ]
          }
        ],
        quiz: [
          {
            question: "What is the mandatory starting point for every C++ program?",
            options: [
              "start()",
              "main()",
              "begin()",
              "init()"
            ],
            correctIndex: 1,
            explanation: "The compiler always looks for a function named exactly main() to start executing the program."
          },
          {
            question: "What does `return 0;` inside main() communicate to the operating system?",
            options: [
              "The program crashed.",
              "The program finished successfully.",
              "The program has zero lines of code.",
              "The program wants to start over."
            ],
            correctIndex: 1,
            explanation: "Returning 0 is the agreed-upon convention in C++: 0 means the program finished without errors. Any other return value signals that something went wrong — useful when one program needs to know if another succeeded."
          }
        ]
      },
      {
        id: "ch1-l2",
        title: "Outputting Text with std::cout",
        difficulty: "beginner",
        content: `
          <h2>Making Your Program Speak</h2>
          <p>A program that does nothing isn't very useful. Now that we have our <code>main()</code> function, let's make our program actually communicate with us by printing text to the screen.</p>

          <h3>The Mental Model</h3>
          <p>Imagine your screen is the end of a long conveyor belt. In C++, this conveyor belt is called <code>std::cout</code> (Standard Character Output). To send text down the conveyor belt to the screen, we use the insertion operator <code>&lt;&lt;</code> to push items onto it.</p>

          <h3>The Core Concept</h3>
          <p>To use <code>std::cout</code>, we must ask the C++ compiler to bring in the correct tools. We do this by including a header file called <code>&lt;iostream&gt;</code> at the very top of our program.</p>

          <h3>Syntax Breakdown</h3>
          <pre><code>#include &lt;iostream&gt;

int main() {
    std::cout &lt;&lt; "Hello, World!\\n";
    return 0;
}</code></pre>
          <ul>
            <li><code>#include &lt;iostream&gt;</code>: Tells the compiler to include the Input/Output Stream library. Without this, the compiler has no idea what <code>std::cout</code> is.</li>
            <li><code>std::cout</code>: The standard output stream (your console/screen).</li>
            <li><code>&lt;&lt;</code>: The insertion operator. It pushes whatever is on its right onto <code>std::cout</code>.</li>
            <li><code>"Hello, World!\\n"</code>: The text to print. Text enclosed in double quotes is called a <strong>string literal</strong>. The <code>\\n</code> is a special character that means "new line", acting like pressing the Enter key.</li>
          </ul>

          <h3>Worked Example: Line by Line</h3>
          <p>The code in the editor is a complete program. Here is what each line does:</p>
          <ol>
            <li><code>#include &lt;iostream&gt;</code> — Pulls in the I/O library so <code>std::cout</code> is available.</li>
            <li><em>(blank line)</em> — Whitespace for readability; the compiler ignores blank lines.</li>
            <li><code>int main() {</code> — Declares the <code>main</code> function and opens its body with <code>{</code>.</li>
            <li><code>std::cout &lt;&lt; "Hello, C++!";</code> — Sends the text <em>Hello, C++!</em> to the screen. The <code>\\n</code> at the end moves to the next line.</li>
            <li><code>return 0;</code> — Signals that the program finished successfully.</li>
            <li><code>}</code> — Closes the body of the <code>main</code> function.</li>
          </ol>

          <div class="mistake">
            <strong>Common Mistake:</strong> Forgetting the semicolon at the end of the <code>std::cout</code> line is one of the most frequent beginner errors. Every statement must end with a <code>;</code>.
          </div>
        `,
        codeExample: `#include <iostream>\n\nint main() {\n    std::cout << "Hello, C++!\\n";\n    return 0;\n}`,
        expectedOutput: "Hello, C++!",
        exercises: [
          {
            instruction: "Modify the program to print the exact phrase: Welcome to C++ Mastery!",
            starterCode: "#include <iostream>\n\nint main() {\n    std::cout << \"Hello, C++!\\n\";\n    return 0;\n}",
            expectedOutput: "Welcome to C++ Mastery!",
            exerciseType: "modify",
            hints: [
              "Look for the text inside the double quotes.",
              "Change 'Hello, C++!' to 'Welcome to C++ Mastery!'. Make sure to keep the '\\n' at the end for a new line."
            ]
          },
          {
            instruction: "Uh oh, someone broke the code. Fix the syntax errors so the program successfully prints: Fixed it!",
            starterCode: "#include <iostream>\n\nint main() {\n    std::cout >> \"Fixed it!\\n\"\n    return 0;\n}",
            expectedOutput: "Fixed it!",
            exerciseType: "debug",
            hints: [
              "There are two errors on the std::cout line.",
              "The insertion operator points towards cout (<<), not away from it (>>).",
              "Don't forget the semicolon at the end of the statement!"
            ]
          }
        ],
        quiz: [
          {
            question: "What does the `#include <iostream>` line do?",
            options: [
              "It runs the main() function.",
              "It tells the compiler to include the library needed for input and output.",
              "It creates a new line on the screen.",
              "It returns 0 to the operating system."
            ],
            correctIndex: 1,
            explanation: "iostream stands for Input/Output Stream. Including it gives your program access to tools like std::cout."
          },
          {
            question: "What operator is used to send text to std::cout?",
            options: [
              ">>",
              "==",
              "<<",
              "::"
            ],
            correctIndex: 2,
            explanation: "The << operator is the insertion operator. It 'inserts' the text on its right into the stream on its left."
          },
          {
            question: "What is the purpose of `\\n` inside a string literal?",
            options: [
              "It makes the text bold.",
              "It prints the letter 'n'.",
              "It stops the program.",
              "It moves the output cursor to the next line."
            ],
            correctIndex: 3,
            explanation: "\\n represents a newline character, telling the console to start printing any further text on the next line below."
          }
        ]
      },
      {
        id: "ch1-l3",
        title: "The Compiler and Errors",
        difficulty: "beginner",
        content: `
          <h2>Understanding the Compiler</h2>
          <p>Computers do not understand C++. They only understand binary machine code (1s and 0s). The <strong>compiler</strong> is a special tool that translates your human-readable C++ code into machine code that the CPU can execute.</p>

          <h3>The Mental Model</h3>
          <p>Imagine you wrote a letter in English, but the recipient only speaks French. You hire a strict translator. If you make a grammar mistake, the translator doesn't try to guess what you meant; they immediately hand the letter back with a red note pointing to the error. The compiler is your strict translator.</p>

          <h3>The Compilation Process</h3>
          <p>When you click 'Run', two main things happen:</p>
          <ol>
            <li><strong>Compilation:</strong> The compiler checks your code for syntax errors. If there are rules broken, it stops and gives you a <em>compiler error</em>.</li>
            <li><strong>Execution:</strong> If (and only if) the compilation succeeds, the computer runs the generated machine code.</li>
          </ol>

          <h3>Reading Compiler Errors</h3>
          <p>Compiler errors can look scary, but they are trying to help you. A typical error will tell you the exact line number where the translator got confused.</p>
          <pre><code>main.cpp: In function 'int main()':
main.cpp:4:5: error: expected ';' before 'return'
    4 |     return 0;
      |     ^~~~~~</code></pre>

          <p>In this example, the compiler says: "On line 4, I expected to see a semicolon <code>;</code> before the word 'return'." Usually, this means the line <em>immediately before</em> line 4 is missing its semicolon!</p>

          <div class="tip">
            <strong>Best Practice:</strong> Don't panic when you see red text. Read the first error from top to bottom, look at the line number, and check your syntax around that area.
          </div>

          <div class="mistake">
            <strong>Common Mistake:</strong> Trying to fix the exact line the compiler points to rather than checking just before it. If the error says "line 5", the missing semicolon is almost always at the end of line 4.
          </div>
        `,
        codeExample: `#include <iostream>\n\nint main() {\n    std::cout << "Learning to read errors is a superpower!\\n";\n    return 0;\n}`,
        expectedOutput: "Learning to read errors is a superpower!",
        exercises: [
          {
            instruction: "This program has a missing semicolon. Try running it to see the error message! Then, fix the bug so it prints: Code Compiled!",
            starterCode: "#include <iostream>\n\nint main() {\n    std::cout << \"Code Compiled!\\n\"\n    return 0;\n}",
            expectedOutput: "Code Compiled!",
            exerciseType: "debug",
            hints: [
              "Run the code first and read the red text in the output panel.",
              "The compiler is pointing near the 'return' statement.",
              "Add a semicolon at the end of the std::cout statement on line 4."
            ]
          }
        ],
        quiz: [
          {
            question: "What is the primary job of the compiler?",
            options: [
              "To run the program and print text to the screen.",
              "To automatically fix mistakes in your code.",
              "To translate C++ code into machine code.",
              "To write code for you."
            ],
            correctIndex: 2,
            explanation: "The compiler translates human-readable source code into machine code that the computer's CPU can actually execute."
          },
          {
            question: "If you get a compiler error saying 'expected ; before return' on line 5, where should you look first?",
            options: [
              "Line 5",
              "The very beginning of the program",
              "The very end of the program",
              "The end of the statement just before line 5 (often line 4)"
            ],
            correctIndex: 3,
            explanation: "Compilers read top-to-bottom. If it expected a semicolon before starting line 5, it means you likely forgot to put one at the end of line 4."
          }
        ]
      },
      {
        id: "ch1-l4",
        title: "Review: Your First C++ Program",
        difficulty: "beginner",
        content: `
          <h2>Synthesising What You've Learned</h2>
          <p>Congratulations! You have taken your first steps into the world of C++. In this chapter, we established the fundamental foundation of every C++ application.</p>

          <h3>Chapter Review</h3>
          <ul>
            <li><strong><code>main()</code>:</strong> The mandatory starting point where execution begins.</li>
            <li><strong><code>#include &lt;iostream&gt;</code>:</strong> The directive that pulls in the Input/Output stream library.</li>
            <li><strong><code>std::cout</code>:</strong> The standard output stream, used to display text.</li>
            <li><strong><code>&lt;&lt;</code>:</strong> The insertion operator that pushes data to the console.</li>
            <li><strong><code>return 0;</code>:</strong> The statement that safely terminates the program.</li>
            <li><strong>The Compiler:</strong> Your strict translator that turns source code into machine code, catching syntax errors along the way.</li>
          </ul>

          <h3>Chaining Output</h3>
          <p>You can push multiple things onto the <code>std::cout</code> conveyor belt in a single statement by chaining the <code>&lt;&lt;</code> operator. Look at the code example below to see how it's done!</p>
          <pre><code>std::cout &lt;&lt; "Line 1\\n" &lt;&lt; "Line 2\\n";</code></pre>

          <div class="note">
            <strong>Next Steps:</strong> In the next chapter, we will learn how to store information using variables, which will allow our programs to remember things and perform calculations!
          </div>
        `,
        codeExample: `#include <iostream>\n\nint main() {\n    std::cout << "Reviewing Chapter 1!\\n" << "C++ is fun!\\n";\n    return 0;\n}`,
        expectedOutput: "Reviewing Chapter 1!\nC++ is fun!",
        exercises: [
          {
            instruction: "Write a program from scratch that prints two separate lines of text. The first line should be 'Hello, World!', and the second line should be 'I am learning C++!'. Make sure to include the proper headers and the main function.",
            starterCode: "// Write your code below\n",
            expectedOutput: "Hello, World!\nI am learning C++!",
            exerciseType: "review",
            hints: [
              "Start with #include <iostream>",
              "Create the int main() function body { }.",
              "Use std::cout and \\n to print the two lines. Don't forget return 0; at the end!"
            ]
          },
          {
            instruction: "This program has one bug: the wrong operator is used to send output. Fix it so the program prints: Syntax mastery!",
            starterCode: "#include <iostream>\n\nint main() {\n    std::cout < \"Syntax mastery!\\n\";\n    return 0;\n}",
            expectedOutput: "Syntax mastery!",
            exerciseType: "review",
            hints: [
              "Look at the operator between std::cout and the string.",
              "The insertion operator always points left and uses two angle brackets.",
              "Change < to << on the std::cout line."
            ]
          }
        ],
        quiz: [
          {
            question: "Which of the following is the correct way to include the iostream library?",
            options: [
              "import <iostream>;",
              "#include <iostream>",
              "include \"iostream\"",
              "using iostream;"
            ],
            correctIndex: 1,
            explanation: "In C++, the preprocessor directive #include followed by <iostream> is used to include standard library headers."
          },
          {
            question: "What happens if you run a C++ program without a main() function?",
            options: [
              "It runs from the top of the file to the bottom.",
              "It asks the user where to start.",
              "The compiler will throw an error and it will not run.",
              "It prints a warning but runs anyway."
            ],
            correctIndex: 2,
            explanation: "The main() function is an absolute requirement in C++. Without it, the compiler cannot link the executable."
          },
          {
            question: "Which symbol signifies the end of a statement in C++?",
            options: [
              "A semicolon (;)",
              "A period (.)",
              "A colon (:)",
              "A comma (,)"
            ],
            correctIndex: 0,
            explanation: "Semicolons act as full stops for C++ statements. Missing them is a very common syntax error."
          }
        ]
      }
    ]
  });
})();
