(function() {
  window.CPP_CHAPTERS = window.CPP_CHAPTERS || [];
  window.CPP_CHAPTERS.push({
    id: 3,
    title: "Input and Output",
    description: "Learn how to make your programs interactive by reading data from the keyboard.",
    icon: "⌨️",
    lessons: [
      {
        id: "ch3-l1",
        title: "The Standard Input Stream: std::cin",
        difficulty: "beginner",
        content: `
          <h2>Making Programs Interactive</h2>
          <p>So far, our programs have only worked with data that we hardcoded directly into the source code. But real software is interactive—it asks the user for information, processes it, and gives an answer back. In C++, we achieve this using the standard input stream.</p>

          <h3>The Mental Model</h3>
          <p>Imagine your program is a machine connected to a <strong>conveyor belt</strong>. When the user types on their keyboard and presses Enter, their keystrokes are placed onto this conveyor belt, which represents the <strong>input stream</strong>. Your program then uses a special tool called the <strong>extraction operator</strong> to pull data off the belt and drop it safely into your variable boxes.</p>

          <h3>Prerequisite Recall</h3>
          <p>In Chapter 1, we used <code>std::cout</code> and the insertion operator <code>&lt;&lt;</code> to send data <em>out</em> to the screen. In Chapter 2, we learned how to declare variables to store data. Now, we will combine these concepts to read data <em>in</em>.</p>

          <h3>The Core Concept: std::cin and &gt;&gt;</h3>
          <p>The standard input stream in C++ is called <code>std::cin</code> (pronounced "c-in", for character input). We use the extraction operator <code>&gt;&gt;</code> to extract data from <code>std::cin</code> and place it into a variable. The direction of the arrows shows the data flowing <em>from</em> the input stream <em>into</em> the variable.</p>

          <h3>Syntax Breakdown</h3>
          <pre><code>std::cin &gt;&gt; age;</code></pre>
          <ul>
            <li><code>std::cin</code>: The standard input stream (the conveyor belt of characters from the keyboard).</li>
            <li><code>&gt;&gt;</code>: The extraction operator. It points towards the variable, showing where the data is going.</li>
            <li><code>age</code>: The variable where the extracted data will be stored.</li>
          </ul>

          <h3>Basic Formatting with Escape Sequences</h3>
          <p>You may have noticed the <code>\\n</code> at the end of our output strings. These are called <strong>escape sequences</strong>. They allow you to insert special characters into your text.</p>
          <ul>
            <li><code>\\n</code> : Newline. Moves the cursor to the beginning of the next line.</li>
            <li><code>\\t</code> : Horizontal tab. Adds spacing to align text.</li>
            <li><code>\\\\</code> : Backslash. Prints a single backslash character.</li>
            <li><code>\\"</code> : Double-quote. Prints a quote without ending the string.</li>
          </ul>
          <p>For example, <code>std::cout &lt;&lt; "He said \\"Hello\\"\\n";</code> prints <em>He said "Hello"</em> and moves to the next line.</p>

          <h3>Worked Example: Line by Line</h3>
          <ol>
            <li><code>#include &lt;iostream&gt;</code> — Gives us access to both <code>std::cout</code> and <code>std::cin</code>.</li>
            <li><code>int main() {</code> — Starts the program.</li>
            <li><code>int score{0};</code> — Declares an integer variable to hold the user's data. It is good practice to initialize it to 0 just in case reading fails.</li>
            <li><code>std::cout &lt;&lt; "Enter your high score: ";</code> — Prints a prompt to the screen. Notice we don't use <code>\\n</code> here, so the user types on the same line as the prompt.</li>
            <li><code>std::cin &gt;&gt; score;</code> — The program <strong>pauses</strong> and waits for the user to type a number and press Enter. The number is extracted and stored in <code>score</code>.</li>
            <li><code>std::cout &lt;&lt; "You scored " &lt;&lt; score &lt;&lt; " points!\\n";</code> — Prints the value that was just entered.</li>
            <li><code>return 0;</code></li>
            <li><code>}</code></li>
          </ol>

          <div class="tip">
            <strong>Best Practice:</strong> Always print a prompt before using <code>std::cin</code>. If you just pause and wait for input without printing anything, the user will stare at a blank blinking cursor and won't know what they are supposed to do.
          </div>

          <div class="mistake">
            <strong>Common Mistake:</strong> Confusing the operators. Remember that arrows point to where the data is flowing. For <code>cout</code>, data flows to the screen: <code>std::cout &lt;&lt; age;</code>. For <code>cin</code>, data flows to the variable: <code>std::cin &gt;&gt; age;</code>.
          </div>

          <h3>Predict Activity</h3>
          <p>Look at the code below. When the program runs, if the user types <code>42</code> and presses Enter, what exactly will print on the final line?</p>
        `,
        codeExample: `#include <iostream>\n\nint main() {\n    int age{0};\n    std::cout << "Please enter your age: ";\n    std::cin >> age;\n    std::cout << "You are " << age << " years old.\\n";\n    return 0;\n}`,
        expectedOutput: null,
        exercises: [
          {
            instruction: "Modify the program to ask for the user's weight in kilograms. Declare a `double` variable named `weight`. Prompt the user with \"Enter weight (kg): \", read the value, and print \"Recorded weight: [value] kg\".",
            starterCode: "#include <iostream>\n\nint main() {\n    int age{0};\n    std::cout << \"Please enter your age: \";\n    std::cin >> age;\n    std::cout << \"You are \" << age << \" years old.\\n\";\n    return 0;\n}",
            expectedOutput: null,
            exerciseType: "modify",
            hints: [
              "Change the variable type from `int` to `double`, and rename it to `weight`.",
              "Update the `cout` prompt to ask for the weight.",
              "Ensure `std::cin >> weight;` uses the correct variable.",
              "Update the final `cout` to match the requested output format."
            ]
          },
          {
            instruction: "This program has a logic bug! It pauses and waits for the user's level before printing the prompt, leaving the user staring at a blank screen. Fix the order of the statements so it prompts the user properly.",
            starterCode: "#include <iostream>\n\nint main() {\n    int level{1};\n    \n    // Fix the order of these two lines\n    std::cin >> level;\n    std::cout << \"Enter your level: \";\n    \n    std::cout << \"Level set to \" << level << \"\\n\";\n    return 0;\n}",
            expectedOutput: null,
            exerciseType: "debug",
            hints: [
              "Code executes line-by-line from top to bottom.",
              "You must print the prompt to the screen before you ask `std::cin` to pause and wait for input.",
              "Swap the `std::cout` prompt line and the `std::cin >> level;` line."
            ]
          }
        ],
        quiz: [
          {
            question: "Which of the following lines correctly reads data from the keyboard into a variable named `playerHealth`?",
            options: [
              "std::cin >> playerHealth;",
              "std::cin << playerHealth;",
              "std::cout >> playerHealth;",
              "std::cout << playerHealth;"
            ],
            correctIndex: 0,
            explanation: "The correct operator for input is the extraction operator (>>), and it is used with the standard input stream (std::cin)."
          },
          {
            question: "Why should you print a prompt before calling `std::cin`?",
            options: [
              "Because the compiler requires it.",
              "So the user knows the program is waiting for input and what kind of data to type.",
              "To clear the input stream.",
              "It makes the program run faster."
            ],
            correctIndex: 1,
            explanation: "Without a prompt, the program will just pause with a blank cursor, leaving the user confused about whether the program is frozen or waiting for them to type."
          },
          {
            question: "What does the `>>` operator do?",
            options: [
              "It sends data to the screen.",
              "It compares two variables.",
              "It extracts data from the input stream and places it into a variable.",
              "It deletes a variable."
            ],
            correctIndex: 2,
            explanation: "The >> operator is the extraction operator. It extracts formatted data from the input stream (like std::cin) and assigns it to the variable on its right."
          }
        ]
      },
      {
        id: "ch3-l2",
        title: "Reading Multiple Values and Whitespace",
        difficulty: "beginner",
        content: `
          <h2>Handling Multiple Inputs</h2>
          <p>Often, you will need to ask the user for multiple pieces of information at once, such as an X and Y coordinate, or a quantity and a price. C++ allows you to chain input operations together.</p>

          <h3>The Mental Model</h3>
          <p>Think of the extraction operator <code>&gt;&gt;</code> as a smart vacuum cleaner. It ignores empty space (spaces, tabs, and newlines) until it finds a solid piece of data. Once it sucks up that data and deposits it into your variable, it stops at the next space it encounters.</p>

          <h3>Prerequisite Recall</h3>
          <p>In Chapter 2, we learned about type safety. When you declare an <code>int</code>, it can only hold whole numbers. If you try to extract letters into an integer variable, <code>std::cin</code> will fail and stop reading.</p>

          <h3>The Core Concept: Chaining Input</h3>
          <p>You can chain multiple extraction operators on a single line. When the user types their input, they can separate the values using spaces or by pressing Enter. <code>std::cin</code> will automatically skip over the whitespace and place the first value into the first variable, and the second value into the second variable.</p>

          <h3>Syntax Breakdown</h3>
          <pre><code>std::cin &gt;&gt; width &gt;&gt; height;</code></pre>
          <ul>
            <li><code>std::cin</code>: The input stream.</li>
            <li><code>&gt;&gt; width</code>: Extracts the first number, skipping any leading spaces, and stores it in <code>width</code>.</li>
            <li><code>&gt;&gt; height</code>: Continues reading, skipping the space after the first number, and stores the next number in <code>height</code>.</li>
          </ul>

          <h3>Worked Example: Line by Line</h3>
          <ol>
            <li><code>#include &lt;iostream&gt;</code></li>
            <li><code>int main() {</code></li>
            <li><code>int apples{0};</code> — Variable for the quantity.</li>
            <li><code>double price{0.0};</code> — Variable for the cost per apple.</li>
            <li><code>std::cout &lt;&lt; "Enter quantity and price: ";</code> — Asks for two values at once.</li>
            <li><code>std::cin &gt;&gt; apples &gt;&gt; price;</code> — The user can type "5 1.50" and press Enter. <code>apples</code> gets 5, <code>price</code> gets 1.50.</li>
            <li><code>std::cout &lt;&lt; "Total: $" &lt;&lt; apples * price &lt;&lt; "\\n";</code> — Calculates and prints the total cost.</li>
            <li><code>return 0;</code></li>
            <li><code>}</code></li>
          </ol>

          <div class="note">
            <strong>Note:</strong> Because <code>std::cin &gt;&gt;</code> ignores whitespace, the user can type the two numbers on the same line separated by a space, or type one number, press Enter, and type the second number. The program handles both flawlessly!
          </div>

          <div class="mistake">
            <strong>Common Mistake:</strong> What happens if the user types text instead of a number? If you ask for an <code>int</code> but the user types "hello", <code>std::cin</code> goes into a failure state and subsequent input operations will be ignored. In modern C++, the failed extraction also resets the integer variable to 0. Initializing your variables to 0 ensures you always start from a known state, regardless of what the user types.
          </div>

          <h3>Predict Activity</h3>
          <p>If a program executes <code>std::cin &gt;&gt; x &gt;&gt; y;</code> (where both are integers), and the user types <code>10</code>, presses Enter, then types <code>20</code> and presses Enter. What will be stored in <code>x</code> and <code>y</code>?</p>
        `,
        codeExample: `#include <iostream>\n\nint main() {\n    int x{0};\n    int y{0};\n    std::cout << "Enter an X and Y coordinate separated by a space: ";\n    std::cin >> x >> y;\n    std::cout << "You moved to (" << x << ", " << y << ")\\n";\n    return 0;\n}`,
        expectedOutput: null,
        exercises: [
          {
            instruction: "Write a program that asks the user to enter their age (int) and their target heart rate (double). Read both values using a single std::cin statement, then print them back.",
            starterCode: "#include <iostream>\n\nint main() {\n    // Declare an int for age and a double for heart rate\n\n    // Prompt the user\n\n    // Read both values using chained >> operators\n\n    // Print the results\n\n    return 0;\n}",
            expectedOutput: null,
            exerciseType: "write",
            hints: [
              "Declare `int age{0};` and `double heartRate{0.0};`.",
              "Use `std::cout` to print a prompt like \"Enter age and target heart rate: \".",
              "Use `std::cin >> age >> heartRate;` to read them.",
              "Print them out to verify they were read correctly."
            ]
          }
        ],
        quiz: [
          {
            question: "How does the extraction operator (`>>`) handle spaces and newlines when reading a number?",
            options: [
              "It crashes the program.",
              "It automatically skips over leading spaces and newlines until it finds the data.",
              "It reads the space as a 0.",
              "It requires you to write extra code to delete the spaces."
            ],
            correctIndex: 1,
            explanation: "The extraction operator automatically ignores leading whitespace (spaces, tabs, newlines) when extracting standard data types like integers and doubles."
          },
          {
            question: "Can the user input the data on separate lines for the statement `std::cin >> num1 >> num2;`?",
            options: [
              "No, they must be on the same line separated by a space.",
              "No, chained inputs require commas between values.",
              "Yes, because newlines are treated as whitespace and skipped automatically.",
              "Yes, but only if they are both integers."
            ],
            correctIndex: 2,
            explanation: "Because the >> operator skips all whitespace, a newline character (pressing Enter) acts just like a space. The program will simply pause and wait for the second value."
          },
          {
            question: "What happens if a user types text like \"apple\" when the program executes `std::cin >> quantity;` (where quantity is an int)?",
            options: [
              "The extraction fails, and the integer variable is not updated with the text.",
              "The word \"apple\" is successfully stored in the integer variable.",
              "The program automatically guesses how many apples you meant.",
              "The program asks the user to try again."
            ],
            correctIndex: 0,
            explanation: "C++ enforces type safety. std::cin will see that \"apple\" is not an integer, so it will fail the extraction. The variable 'quantity' will retain its previous value."
          }
        ]
      },
      {
        id: "ch3-l3",
        title: "Reading Text with std::getline",
        difficulty: "beginner",
        content: `
          <h2>When Spaces Matter</h2>
          <p>The extraction operator <code>&gt;&gt;</code> is fantastic for reading numbers or single words. But because it treats spaces as separators, it stops reading the moment it hits a space. What if you want to read a user's full name, like "Ada Lovelace"?</p>

          <h3>The Mental Model</h3>
          <p>If <code>&gt;&gt;</code> is a vacuum that stops at the first gap, <code>std::getline</code> is a wide net. It scoops up absolutely everything the user types—spaces and all—until they hit the Enter key (which generates a newline character).</p>

          <h3>Prerequisite Recall</h3>
          <p>In Chapter 2, we learned that text is stored in the <code>std::string</code> type, and we must <code>#include &lt;string&gt;</code> at the top of our program to use it.</p>

          <h3>The Core Concept: std::getline</h3>
          <p>To read a full line of text containing spaces, we use a dedicated function called <code>std::getline()</code>. It takes two ingredients inside its parentheses: where to read the data from (<code>std::cin</code>), and which string variable to store it into.</p>

          <h3>Syntax Breakdown</h3>
          <pre><code>std::getline(std::cin, fullName);</code></pre>
          <ul>
            <li><code>std::getline</code>: The function name that tells C++ to read an entire line.</li>
            <li><code>std::cin</code>: The first argument, specifying that we are reading from the standard input stream.</li>
            <li><code>fullName</code>: The second argument, specifying the <code>std::string</code> variable that will hold the text.</li>
          </ul>

          <h3>Worked Example: Line by Line</h3>
          <ol>
            <li><code>#include &lt;iostream&gt;</code></li>
            <li><code>#include &lt;string&gt;</code> — Required for <code>std::string</code> and <code>std::getline</code>.</li>
            <li><code>int main() {</code></li>
            <li><code>std::string title{""};</code> — Declares an empty string to hold the user's input.</li>
            <li><code>std::cout &lt;&lt; "Enter your favorite movie: ";</code> — Prints the prompt.</li>
            <li><code>std::getline(std::cin, title);</code> — Reads everything the user types, including spaces, until they press Enter.</li>
            <li><code>std::cout &lt;&lt; "I love " &lt;&lt; title &lt;&lt; ", too!\\n";</code> — Prints the full string.</li>
            <li><code>return 0;</code></li>
            <li><code>}</code></li>
          </ol>

          <div class="note">
            <strong>Note:</strong> When <code>std::getline</code> encounters the newline character (from the Enter key), it extracts it from the input stream and immediately discards it. The newline is <em>not</em> stored in your string variable.
          </div>

          <div class="mistake">
            <strong>Common Mistake:</strong> Trying to use <code>std::cin &gt;&gt; title;</code> for a movie name. If the user types "Star Wars", <code>title</code> will only contain "Star". The word "Wars" will be left behind in the input stream, waiting to mess up the next input operation. Use <code>getline</code> for sentences!
          </div>

          <h3>Predict Activity</h3>
          <p>If you run a program with <code>std::getline(std::cin, address);</code> and the user types "123 Main Street" and presses Enter, what exactly will be stored in the <code>address</code> variable?</p>
        `,
        codeExample: `#include <iostream>\n#include <string>\n\nint main() {\n    std::string fullName{""};\n    std::cout << "Enter your full name: ";\n    std::getline(std::cin, fullName);\n    std::cout << "Welcome to the system, " << fullName << "!\\n";\n    return 0;\n}`,
        expectedOutput: null,
        exercises: [
          {
            instruction: "This code uses `cin >>` to ask for a favorite book, but it breaks if the book title has multiple words. Fix the code by changing it to use `std::getline`.",
            starterCode: "#include <iostream>\n#include <string>\n\nint main() {\n    std::string bookTitle{\"\"};\n    std::cout << \"Enter your favorite book title: \";\n    \n    // Fix the input method below to read spaces\n    std::cin >> bookTitle;\n    \n    std::cout << \"You selected: \" << bookTitle << \"\\n\";\n    return 0;\n}",
            expectedOutput: null,
            exerciseType: "modify",
            hints: [
              "Replace `std::cin >> bookTitle;` entirely.",
              "Use the syntax `std::getline(source, destination);`.",
              "The source is `std::cin` and the destination is `bookTitle`."
            ]
          }
        ],
        quiz: [
          {
            question: "Why should you use `std::getline` instead of `std::cin >>` for reading a user's full name?",
            options: [
              "`std::cin >>` cannot read string variables.",
              "`std::cin >>` stops reading at the first space, so it would only capture their first name.",
              "`std::getline` runs faster than `std::cin >>`.",
              "`std::getline` automatically capitalizes the letters."
            ],
            correctIndex: 1,
            explanation: "The extraction operator >> treats spaces as delimiters. std::getline is designed specifically to read everything on the line, including spaces, until the user presses Enter."
          },
          {
            question: "Does `std::getline` include the newline character (created by pressing Enter) in the string it saves?",
            options: [
              "Yes, the newline is stored at the end of the string.",
              "No, it extracts the newline from the stream but throws it away. It is not saved in the string.",
              "Yes, but it is stored at the beginning of the string.",
              "No, it leaves the newline character sitting in the input stream."
            ],
            correctIndex: 1,
            explanation: "std::getline consumes the newline character to clear it out of the stream, but it wisely discards it so your string data remains clean."
          },
          {
            question: "Which data type is `std::getline` designed to read into?",
            options: [
              "int",
              "double",
              "std::string",
              "bool"
            ],
            correctIndex: 2,
            explanation: "std::getline specifically reads text into a std::string. You cannot use it directly to read into an integer or double variable."
          }
        ]
      },
      {
        id: "ch3-l4",
        title: "Mixing Input Methods and the Leftover Newline",
        difficulty: "beginner",
        content: `
          <h2>The Leftover Newline Bug</h2>
          <p>We know how to read numbers with <code>&gt;&gt;</code>, and we know how to read text with <code>std::getline</code>. But what happens if we write a program that asks for an age (a number) <em>first</em>, and then asks for a full name (text) <em>second</em>? It leads to the most famous beginner bug in C++.</p>

          <h3>The Mental Model</h3>
          <p>When the user is asked for their age, they type <code>25</code> and press Enter. The stream now contains <code>25\\n</code>. The extraction operator <code>&gt;&gt;</code> takes the <code>25</code> and leaves the <code>\\n</code> (newline) sitting on the conveyor belt. When <code>std::getline</code> activates next, it sees the <code>\\n</code> instantly, thinks the user just pressed Enter on an empty line, and finishes reading without waiting for the user to type their name!</p>

          <h3>Prerequisite Recall</h3>
          <p>Remember that <code>std::cin &gt;&gt;</code> ignores whitespace (like newlines) <em>before</em> it finds data, but leaves trailing whitespace <em>after</em> the data. <code>std::getline</code> does not ignore leading whitespace; it scoops up everything until it sees a newline.</p>

          <h3>The Core Concept: std::ws</h3>
          <p>To fix this, we need to tell C++ to consume and throw away any leftover whitespace (like that sneaky newline) sitting on the belt before we call <code>getline</code>. We do this by feeding a special helper called <code>std::ws</code> (whitespace) into <code>std::cin</code>.</p>

          <h3>Syntax Breakdown</h3>
          <pre><code>std::cin &gt;&gt; std::ws;
std::getline(std::cin, name);</code></pre>
          <ul>
            <li><code>std::ws</code>: A stream manipulator that consumes leading whitespace characters (spaces, tabs, newlines) from the input stream.</li>
            <li>By running this right before <code>getline</code>, we guarantee the conveyor belt is clean.</li>
          </ul>

          <h3>Worked Example: Line by Line</h3>
          <ol>
            <li><code>#include &lt;iostream&gt;</code></li>
            <li><code>#include &lt;string&gt;</code></li>
            <li><code>int main() {</code></li>
            <li><code>int age{0};</code></li>
            <li><code>std::string name{""};</code></li>
            <li><code>std::cout &lt;&lt; "Enter age: ";</code></li>
            <li><code>std::cin &gt;&gt; age;</code> — User types "25" and Enter. <code>age</code> becomes 25. The <code>\\n</code> is left behind.</li>
            <li><code>std::cout &lt;&lt; "Enter full name: ";</code></li>
            <li><code>std::cin &gt;&gt; std::ws;</code> — <strong>Crucial fix:</strong> Extracts and discards the leftover <code>\\n</code>.</li>
            <li><code>std::getline(std::cin, name);</code> — Now waits properly for the user to type their name.</li>
            <li><code>std::cout &lt;&lt; name &lt;&lt; " is " &lt;&lt; age &lt;&lt; "\\n";</code></li>
            <li><code>return 0;</code></li>
            <li><code>}</code></li>
          </ol>

          <div class="tip">
            <strong>Best Practice:</strong> Always use <code>std::cin &gt;&gt; std::ws;</code> immediately before a <code>std::getline</code> if you have used <code>std::cin &gt;&gt;</code> earlier in your program.
          </div>

          <div class="mistake">
            <strong>Common Mistake:</strong> Forgetting <code>std::ws</code>. If your program asks for a string but skips right over the prompt without letting you type, you have fallen victim to the leftover newline bug.
          </div>

          <h3>Predict Activity</h3>
          <p>If you remove the <code>std::cin &gt;&gt; std::ws;</code> line from the example code above, what exactly will be printed to the screen when the program tries to print the user's name and age?</p>
        `,
        codeExample: `#include <iostream>\n#include <string>\n\nint main() {\n    int userId{0};\n    std::string food{""};\n    \n    std::cout << "Enter your user ID: ";\n    std::cin >> userId;\n    \n    std::cout << "Enter your favorite food: ";\n    std::cin >> std::ws; // Consume leftover newline\n    std::getline(std::cin, food);\n    \n    std::cout << "User " << userId << " loves " << food << "!\\n";\n    return 0;\n}`,
        expectedOutput: null,
        exercises: [
          {
            instruction: "This program asks for a character's level and then their hometown. Because it mixes `>>` and `getline` without cleaning up the stream, it skips the hometown input. Add the code to fix the bug.",
            starterCode: "#include <iostream>\n#include <string>\n\nint main() {\n    int level{0};\n    std::string hometown{\"\"};\n    \n    std::cout << \"Enter your level: \";\n    std::cin >> level;\n    \n    std::cout << \"Enter your hometown: \";\n    // The bug is here! The stream needs to be cleaned.\n    std::getline(std::cin, hometown);\n    \n    std::cout << \"A level \" << level << \" hero from \" << hometown << \".\\n\";\n    return 0;\n}",
            expectedOutput: null,
            exerciseType: "debug",
            hints: [
              "You need to consume the leftover newline before calling `getline`.",
              "Use the `std::ws` manipulator.",
              "Add `std::cin >> std::ws;` on the line exactly before `getline`."
            ]
          }
        ],
        quiz: [
          {
            question: "Why does `std::getline` sometimes skip asking the user for input?",
            options: [
              "Because `std::getline` saw a leftover newline (`\\n`) character in the input stream and immediately thought the user pressed Enter.",
              "Because `std::getline` crashed the program.",
              "Because you forgot to include `<iostream>`.",
              "Because strings are not allowed to be empty."
            ],
            correctIndex: 0,
            explanation: "The extraction operator >> leaves the newline character (from the Enter key) in the stream. If getline activates immediately afterward, it sees that newline, stops reading, and saves an empty string without waiting."
          },
          {
            question: "What is the purpose of `std::cin >> std::ws;`?",
            options: [
              "It writes a string to the screen.",
              "It extracts and throws away leading whitespace (like spaces, tabs, and newlines) from the input stream.",
              "It tells the computer to wait for 5 seconds.",
              "It converts an integer into a string."
            ],
            correctIndex: 1,
            explanation: "std::ws stands for whitespace. Using it with std::cin cleans the 'conveyor belt' by skipping over any leftover whitespace characters, ensuring the next input operation starts with fresh data."
          },
          {
            question: "If you have a program that ONLY uses `std::cin >>` multiple times to read numbers, do you need to use `std::ws`?",
            options: [
              "Yes, otherwise the numbers will be multiplied.",
              "Yes, `std::ws` is required before every `std::cin`.",
              "No, because the `>>` operator automatically skips leading whitespace when searching for the next number.",
              "No, because numbers do not use the input stream."
            ],
            correctIndex: 2,
            explanation: "The >> operator naturally ignores leading whitespace when it is looking for standard data like ints and doubles. You only need std::ws when you are transitioning from >> to std::getline."
          }
        ]
      },
      {
        id: "ch3-l5",
        title: "Review: Input and Output",
        difficulty: "beginner",
        content: `
          <h2>Synthesising What You've Learned</h2>
          <p>Congratulations! You have transformed your programs from static scripts into interactive applications. Understanding how data flows from the user into your variables is one of the most vital skills in programming.</p>

          <h3>Chapter Review</h3>
          <ul>
            <li><strong><code>std::cin</code>:</strong> The standard input stream. Represents data flowing from the keyboard.</li>
            <li><strong><code>&gt;&gt;</code>:</strong> The extraction operator. Extracts data from the stream into variables.</li>
            <li><strong>Chaining:</strong> You can read multiple values at once (<code>std::cin &gt;&gt; x &gt;&gt; y;</code>).</li>
            <li><strong><code>std::getline</code>:</strong> Reads an entire line of text, including spaces, into a <code>std::string</code>.</li>
            <li><strong>The Leftover Newline:</strong> <code>&gt;&gt;</code> leaves the Enter key's newline character in the stream.</li>
            <li><strong><code>std::ws</code>:</strong> Cleans up leftover whitespace before calling <code>std::getline</code>.</li>
          </ul>

          <h3>Bringing It All Together</h3>
          <p>The code example below is a complete pizza ordering system. It demonstrates reading numbers, handling whitespace, and reading strings with spaces. Take a close look at how it prompts the user, reads the data securely, and prints a final receipt.</p>

          <div class="note">
            <strong>Looking Ahead:</strong> Right now, our programs execute line-by-line from top to bottom. In Chapter 4 and Chapter 5, you will learn how to do math with these variables and make decisions—like giving a discount if the user orders more than 3 pizzas!
          </div>
        `,
        codeExample: `#include <iostream>\n#include <string>\n\nint main() {\n    int quantity{0};\n    std::string address{""};\n    \n    std::cout << "--- Pizza Ordering System ---\\n";\n    \n    std::cout << "How many pizzas do you want? ";\n    std::cin >> quantity;\n    \n    std::cout << "Enter delivery address: ";\n    std::cin >> std::ws; // Crucial fix before getline\n    std::getline(std::cin, address);\n    \n    std::cout << "\\n--- Receipt ---\\n";\n    std::cout << "Order: " << quantity << " pizzas\\n";\n    std::cout << "Delivery to: " << address << "\\n";\n    \n    return 0;\n}`,
        expectedOutput: null,
        exercises: [
          {
            instruction: "Write a complete interactive program from scratch. Ask the user for an item's quantity (int), the item's price (double), and the product description (std::string). The description might contain spaces. Print all three values out at the end.",
            starterCode: "// Write your complete program below\n#include <iostream>\n#include <string>\n\nint main() {\n    // 1. Declare variables for quantity, price, and description\n\n    // 2. Prompt for and read quantity and price (chained)\n\n    // 3. Prompt for and read description (remember std::ws!)\n\n    // 4. Print the summary\n\n    return 0;\n}",
            expectedOutput: null,
            exerciseType: "review",
            hints: [
              "Declare `int quantity{0};`, `double price{0.0};`, and `std::string description{\"\"};`.",
              "Use `std::cin >> quantity >> price;`.",
              "Before reading the description, use `std::cin >> std::ws;`.",
              "Use `std::getline(std::cin, description);` to read the text.",
              "Use `std::cout` to print the final variables."
            ]
          },
          {
            instruction: "This profile generator has multiple bugs! It fails to read the full name, the inputs are out of order, and the output formatting is messy. Fix the bugs so the program cleanly reads the age and then the full name, and prints them out.",
            starterCode: "#include <iostream>\n#include <string>\n\nint main() {\n    int age{0};\n    std::string fullName{\"\"};\n    \n    std::cout << \"Enter your age: \";\n    std::cin >> age;\n    \n    std::cout << \"Enter your full name: \";\n    std::cin >> fullName; // Bug 1: Only reads first name, and leftover newline causes issues!\n    \n    // Bug 2: Missing tabs or newlines for clean output\n    std::cout << \"--- PROFILE ---\";\n    std::cout << \"\\nName: \" << fullName;\n    std::cout << \"\\nAge: \" << age;\n    \n    return 0;\n}",
            expectedOutput: null,
            exerciseType: "review",
            hints: [
              "To read a full name with spaces, replace `std::cin >> fullName;` with `std::getline(std::cin, fullName);`.",
              "Because you used `std::cin >> age;` right before reading the name, you must clean the stream first with `std::cin >> std::ws;`.",
              "Use escape sequences like `\\t` to format the profile output so it looks clean."
            ]
          }
        ],
        quiz: [
          {
            question: "What is the primary difference between `std::cout` and `std::cin`?",
            options: [
              "`std::cin` is for text, and `std::cout` is for numbers.",
              "`std::cout` sends data out to the screen (insertion), while `std::cin` brings data in from the keyboard (extraction).",
              "`std::cin` requires `#include <string>`, while `std::cout` does not.",
              "There is no difference; they are interchangeable."
            ],
            correctIndex: 1,
            explanation: "Think of the direction of the data. cout stands for Character OUTput, and cin stands for Character INput."
          },
          {
            question: "If you need to read a street address containing numbers and spaces (e.g., \"123 Baker Street\"), which method must you use?",
            options: [
              "std::cin >> address;",
              "std::cin << address;",
              "std::getline(std::cin, address);",
              "std::cout >> address;"
            ],
            correctIndex: 2,
            explanation: "Because an address contains spaces, using the extraction operator (>>) would stop at the space after '123'. std::getline reads the entire line."
          },
          {
            question: "Which sequence correctly shows the data flow during an extraction operation (`std::cin >> age;`)?",
            options: [
              "Keyboard -> Input Stream -> Variable",
              "Variable -> Input Stream -> Keyboard",
              "Variable -> Output Stream -> Screen",
              "Input Stream -> Keyboard -> Variable"
            ],
            correctIndex: 0,
            explanation: "When a user types, the keys enter the input stream buffer (conveyor belt). The extraction operator then pulls the data from that stream into your program's variable."
          }
        ]
      }
    ]
  });
})();
