(function() {
  window.CPP_CHAPTERS = window.CPP_CHAPTERS || [];
  window.CPP_CHAPTERS.push({
    id: 2,
    title: "Variables and Data Types",
    description: "Learn how to store, name, and manage different kinds of data in memory.",
    icon: "📦",
    lessons: [
      {
        id: "ch2-l1",
        title: "Giving Your Program a Memory",
        difficulty: "beginner",
        content: `
          <h2>What Are Variables?</h2>
          <p>In Chapter 1, our programs printed exact, pre-written text. But useful software needs to remember things—like a player's score, a user's age, or the result of a calculation. To do this, C++ uses <strong>variables</strong>.</p>

          <h3>The Mental Model</h3>
          <p>Think of a variable as a <strong>labelled box</strong> sitting on a shelf in the computer's memory. The label on the box is the variable's <strong>name</strong>, so you can find it later. The contents inside the box are its <strong>value</strong>. Just like a real box, you can look inside to see what it holds, or you can replace the contents with something new.</p>

          <h3>Prerequisites</h3>
          <p>You should be comfortable writing a basic C++ program with <code>#include &lt;iostream&gt;</code>, <code>int main()</code>, and printing text using <code>std::cout</code>.</p>

          <h3>The Core Concept: Declaration and Initialisation</h3>
          <p>Before you can use a variable in C++, you must <strong>declare</strong> it. This tells the compiler two things: the <strong>type</strong> of data the box will hold (e.g., whole numbers), and the <strong>name</strong> you want to call it. You should also give it a starting value, which is called <strong>initialisation</strong>.</p>
          <p>Modern C++ encourages <strong>uniform initialisation</strong>, which uses curly braces <code>{}</code> to set the initial value. This method is safer than using an equals sign because it prevents accidentally storing decimal numbers in integer boxes.</p>

          <h3>Syntax Breakdown</h3>
          <pre><code>int score{100};</code></pre>
          <ul>
            <li><code>int</code>: The <strong>type</strong>. It stands for "integer", meaning this box can only hold whole numbers (like 5, 0, or -42).</li>
            <li><code>score</code>: The <strong>name</strong> (or identifier) of the variable.</li>
            <li><code>{100}</code>: The <strong>uniform initialiser</strong>. It places the value 100 inside the box.</li>
            <li><code>;</code>: Every statement in C++ must end with a semicolon.</li>
          </ul>

          <h3>Worked Example: Line by Line</h3>
          <ol>
            <li><code>#include &lt;iostream&gt;</code> — Brings in the I/O library so we can print to the screen.</li>
            <li><code>int main() {</code> — The entry point where our program begins executing.</li>
            <li><code>int score{100};</code> — Creates an integer variable named <code>score</code> and immediately places the value <code>100</code> inside it.</li>
            <li><code>std::cout &lt;&lt; "Score: " &lt;&lt; score &lt;&lt; "\\n";</code> — Prints the literal text "Score: ", followed by the <em>contents</em> of the <code>score</code> variable. Notice that <code>score</code> does not have quotation marks around it. If it did, the program would print the word "score" instead of the number 100.</li>
            <li><code>return 0;</code> — Tells the operating system the program finished successfully.</li>
            <li><code>}</code> — Closes the <code>main</code> function.</li>
          </ol>

          <div class="tip">
            <strong>Best Practice:</strong> Always initialise your variables when you declare them. If you declare a variable without a starting value (e.g., <code>int score;</code>), it will have an indeterminate value. Reading it before assigning a value leads to <strong>undefined behavior</strong>, meaning your program's actions become unpredictable. Uniform initialisation with <code>{}</code> is the modern, safest way to ensure your boxes start with known contents.
          </div>

          <div class="mistake">
            <strong>Common Mistake:</strong> Using quotation marks around a variable name. <code>std::cout &lt;&lt; "score";</code> prints the actual letters s-c-o-r-e. To print the value inside the box, remove the quotes: <code>std::cout &lt;&lt; score;</code>
          </div>

          <h3>Predict Activity</h3>
          <p>Look at the code below. Without running it, predict exactly what will appear on the screen. Pay close attention to what is inside quotation marks and what is not.</p>
        `,
        codeExample: `#include <iostream>\n\nint main() {\n    int score{100};\n    std::cout << "Score: " << score << "\\n";\n    return 0;\n}`,
        expectedOutput: "Score: 100",
        exercises: [
          {
            instruction: "Modify the program so it creates an integer variable named 'lives' initialized to 3 using uniform initialization (curly braces). The program should print exactly:\nLives: 3",
            starterCode: "#include <iostream>\n\nint main() {\n    int score{100};\n    std::cout << \"Score: \" << score << \"\\n\";\n    return 0;\n}",
            expectedOutput: "Lives: 3",
            exerciseType: "modify",
            hints: [
              "Change the variable name from 'score' to 'lives'.",
              "Change the initial value inside the curly braces from 100 to 3.",
              "Update the text in quotation marks to say \"Lives: \" and make sure you are printing the new 'lives' variable."
            ]
          }
        ],
        quiz: [
          {
            question: "What does the `int` keyword do in the statement `int age{25};`?",
            options: [
              "It tells the compiler the variable will hold a whole number.",
              "It prints the variable to the screen.",
              "It imports the integer library from the C++ standard.",
              "It creates a function named age."
            ],
            correctIndex: 0,
            explanation: "The 'int' keyword is a type specifier. It tells the compiler to allocate memory specifically sized and formatted for an integer (a whole number)."
          },
          {
            question: "What is the output of `std::cout << \"value\";` if there is a variable declared as `int value{42};`?",
            options: [
              "42",
              "value",
              "int value",
              "\"value\""
            ],
            correctIndex: 1,
            explanation: "Because \"value\" is enclosed in double quotes, it is treated as literal text. The program will print the word 'value'. To print the number 42, you would write std::cout << value; without quotes."
          },
          {
            question: "Why is uniform initialisation (e.g., `int score{10};`) recommended in modern C++?",
            options: [
              "It is the only way to declare variables in C++.",
              "It runs significantly faster than using an equals sign.",
              "It prevents certain types of accidental data loss, like trying to fit a decimal into a whole number box.",
              "It allows the variable to hold multiple values at once."
            ],
            correctIndex: 2,
            explanation: "Uniform initialisation is safer. If you try to write int score{3.14};, the compiler will generate an error because 3.14 is a decimal, preventing accidental loss of the .14 part."
          }
        ]
      },
      {
        id: "ch2-l2",
        title: "Numeric Types: int and double",
        difficulty: "beginner",
        content: `
          <h2>Whole Numbers vs. Decimals</h2>
          <p>Not all numbers are the same. If you are counting inventory, you need whole numbers (you can't have half an apple). If you are measuring temperature, you need decimal precision. C++ provides different data types for these different situations.</p>

          <h3>The Mental Model</h3>
          <p>Imagine two different kinds of boxes. One box is designed to hold individual solid marbles (<code>int</code>). You cannot put half a marble in it. The other box has a built-in measuring scale for liquids, allowing it to hold precise fractional amounts (<code>double</code>).</p>

          <h3>Prerequisites</h3>
          <p>You should know how to declare an integer variable using uniform initialisation (<code>int age{25};</code>) and how to print it.</p>

          <h3>The Core Concept: Type Safety</h3>
          <p>C++ is a <strong>statically typed</strong> language. The compiler determines and tracks the type of every variable when it compiles your code, and you must choose the correct type for the data you want to store. While C++ permits some automatic conversions between types, choosing the right type is crucial because the computer processes them entirely differently. For example, dividing two <code>int</code> values will discard any remainder, which can lead to surprising bugs.</p>

          <h3>Syntax Breakdown</h3>
          <pre><code>int apples{5};
double price{1.75};</code></pre>
          <ul>
            <li><code>int</code>: Used for whole numbers.</li>
            <li><code>double</code>: Used for decimal numbers. The "double" refers to "double-precision floating point", which means it has a high degree of accuracy.</li>
          </ul>

          <h3>Worked Example: Line by Line</h3>
          <ol>
            <li><code>#include &lt;iostream&gt;</code> — Essential for screen output.</li>
            <li><code>int main() {</code> — The start of our program.</li>
            <li><code>int apples{5};</code> — Declares a whole-number variable and initialises it to 5.</li>
            <li><code>double price{1.75};</code> — Declares a decimal variable and initialises it to 1.75.</li>
            <li><code>std::cout &lt;&lt; "Apples: " &lt;&lt; apples &lt;&lt; "\\n";</code> — Prints the integer.</li>
            <li><code>std::cout &lt;&lt; "Price: " &lt;&lt; price &lt;&lt; "\\n";</code> — Prints the decimal number.</li>
            <li><code>return 0;</code> — Program ends successfully.</li>
            <li><code>}</code> — Closes the main function.</li>
          </ol>

          <div class="note">
            <strong>Note:</strong> C++ also has a type called <code>float</code> for decimals, but it has less precision than <code>double</code>. In modern C++, <code>double</code> is the recommended default for all decimal values.
          </div>

          <div class="mistake">
            <strong>Common Mistake:</strong> Integer division. If you write <code>int result{7 / 2};</code>, the answer is <strong>3</strong>, not 3.5. Because both 7 and 2 are integers, C++ performs integer division and entirely discards the remainder. If you need a decimal result, use a double and decimal numbers: <code>double result{7.0 / 2.0};</code>
          </div>

          <h3>Predict Activity</h3>
          <p>Look at the code below. Will the output show a decimal point on both lines, or only one? Think about the specific type of each variable.</p>
        `,
        codeExample: `#include <iostream>\n\nint main() {\n    int apples{5};\n    double price{1.75};\n    std::cout << "Apples: " << apples << "\\n";\n    std::cout << "Price: " << price << "\\n";\n    return 0;\n}`,
        expectedOutput: "Apples: 5\nPrice: 1.75",
        exercises: [
          {
            instruction: "Modify the program to declare a double variable named 'temperature' initialized to 36.6. Print it so the output is exactly:\nTemperature: 36.6",
            starterCode: "#include <iostream>\n\nint main() {\n    int apples{5};\n    std::cout << \"Apples: \" << apples << \"\\n\";\n    return 0;\n}",
            expectedOutput: "Temperature: 36.6",
            exerciseType: "modify",
            hints: [
              "Change the type from 'int' to 'double' because you are storing a decimal number.",
              "Change the variable name to 'temperature' and the initial value to 36.6.",
              "Update the text in the std::cout statement to match the required output."
            ]
          },
          {
            instruction: "The following program tries to calculate 5 divided by 2. Because it uses integer division, it incorrectly prints 2. Fix the bug by changing the variable type and the numbers so it prints the correct decimal answer:\nResult: 2.5",
            starterCode: "#include <iostream>\n\nint main() {\n    int result{5 / 2};\n    std::cout << \"Result: \" << result << \"\\n\";\n    return 0;\n}",
            expectedOutput: "Result: 2.5",
            exerciseType: "debug",
            hints: [
              "The variable 'result' is an int, which cannot hold decimals. Change it to a double.",
              "Even if 'result' is a double, '5 / 2' is still integer division. You must add '.0' to the numbers to make them decimals.",
              "The correct declaration is: double result{5.0 / 2.0};"
            ]
          }
        ],
        quiz: [
          {
            question: "What is the fundamental difference between `int` and `double`?",
            options: [
              "int can be negative, but double must be positive.",
              "int is used for text, double is used for numbers.",
              "int stores whole numbers, double stores numbers with a decimal fractional part.",
              "There is no difference; they are interchangeable."
            ],
            correctIndex: 2,
            explanation: "An int is strictly for whole numbers (integers), while a double allows for floating-point precision, meaning it can store fractions and decimals."
          },
          {
            question: "What will be stored in the variable `x` after the following declaration? `double x{9 / 2};`",
            options: [
              "4.5",
              "4.0",
              "5.0",
              "A compiler error"
            ],
            correctIndex: 1,
            explanation: "Because both 9 and 2 are integers, C++ evaluates '9 / 2' as integer division first, resulting in 4. That 4 is then converted to a double (4.0) to be stored in x. To get 4.5, you must write 9.0 / 2.0."
          }
        ]
      },
      {
        id: "ch2-l3",
        title: "Characters, Booleans, and Strings",
        difficulty: "beginner",
        content: `
          <h2>Beyond Just Numbers</h2>
          <p>Programs do much more than calculate math. They need to store text, single letters, and yes/no true/false conditions. C++ provides dedicated types for all of these.</p>

          <h3>The Mental Model</h3>
          <p>Imagine a filing cabinet with highly specialised drawers. A tiny slot holds exactly one letter—no more, no less (<code>char</code>). A light switch drawer holds only an ON or OFF state (<code>bool</code>). An expandable folder holds an entire sequence of letters forming words or sentences (<code>std::string</code>).</p>

          <h3>Prerequisites</h3>
          <p>You should understand how to declare variables with types like <code>int</code> and <code>double</code> using uniform initialisation <code>{}</code>.</p>

          <h3>The Core Concepts</h3>
          <ul>
            <li><code>char</code> (Character): Stores exactly one character. Characters are always surrounded by <strong>single quotes</strong> (<code>'A'</code>).</li>
            <li><code>bool</code> (Boolean): Stores a truth value. It can only hold the keywords <code>true</code> or <code>false</code>.</li>
            <li><code>std::string</code>: Stores a sequence of text. Strings are always surrounded by <strong>double quotes</strong> (<code>"Hello"</code>). To use strings, you must add <code>#include &lt;string&gt;</code> at the top of your file.</li>
          </ul>

          <h3>Syntax Breakdown</h3>
          <pre><code>char grade{'A'};
bool isPassed{true};
std::string name{"Alice"};</code></pre>

          <h3>Worked Example: Line by Line</h3>
          <ol>
            <li><code>#include &lt;iostream&gt;</code> — Needed for screen output.</li>
            <li><code>#include &lt;string&gt;</code> — <strong>Crucial:</strong> Needed to use the <code>std::string</code> type.</li>
            <li><code>int main() {</code> — Program entry point.</li>
            <li><code>char grade{'A'};</code> — A single character. Note the single quotes.</li>
            <li><code>bool isPassed{true};</code> — A boolean value. No quotes are used around <code>true</code>.</li>
            <li><code>std::string name{"Alice"};</code> — A text string. Note the double quotes.</li>
            <li><code>std::cout &lt;&lt; name &lt;&lt; " got grade " &lt;&lt; grade &lt;&lt; "\\n";</code> — We can chain multiple variables and literal text together using <code>&lt;&lt;</code>.</li>
            <li><code>std::cout &lt;&lt; "Passed: " &lt;&lt; isPassed &lt;&lt; "\\n";</code> — Prints the boolean. In C++, <code>true</code> prints as the number <code>1</code>, and <code>false</code> prints as <code>0</code> by default.</li>
            <li><code>return 0;</code></li>
            <li><code>}</code></li>
          </ol>

          <div class="mistake">
            <strong>Common Mistake:</strong> Mixing up single and double quotes. <code>'A'</code> is a <code>char</code>. <code>"A"</code> is a <code>std::string</code> containing one letter. They are entirely different types to the compiler, and using the wrong quotes will cause errors.
          </div>

          <div class="note">
            <strong>Note:</strong> Why does <code>std::cout &lt;&lt; true;</code> print <code>1</code> instead of the word "true"? Under the hood, computers represent true as 1 and false as 0. By default, C++ prints the numeric representation.
          </div>

          <h3>Predict Activity</h3>
          <p>Before running the code, predict what the final line will output. What number represents <code>true</code>?</p>
        `,
        codeExample: `#include <iostream>\n#include <string>\n\nint main() {\n    char grade{'A'};\n    bool isPassed{true};\n    std::string name{"Alice"};\n    std::cout << name << " got grade " << grade << "\\n";\n    std::cout << "Passed: " << isPassed << "\\n";\n    return 0;\n}`,
        expectedOutput: "Alice got grade A\nPassed: 1",
        exercises: [
          {
            instruction: "Modify the program to describe a different student. Change the name to \"Bob\", the grade to 'C', and isPassed to false. The output must be exactly:\nBob got grade C\nPassed: 0",
            starterCode: "#include <iostream>\n#include <string>\n\nint main() {\n    char grade{'A'};\n    bool isPassed{true};\n    std::string name{\"Alice\"};\n    std::cout << name << \" got grade \" << grade << \"\\n\";\n    std::cout << \"Passed: \" << isPassed << \"\\n\";\n    return 0;\n}",
            expectedOutput: "Bob got grade C\nPassed: 0",
            exerciseType: "modify",
            hints: [
              "Change the string initialization to {\"Bob\"}. Double quotes are required.",
              "Change the char initialization to {'C'}. Single quotes are required.",
              "Change true to false. Remember, false prints as 0 automatically."
            ]
          }
        ],
        quiz: [
          {
            question: "What is the crucial difference between `'X'` and `\"X\"` in C++?",
            options: [
              "'X' is a single character (char), while \"X\" is a string of text (std::string).",
              "They are identical; C++ allows single or double quotes for text.",
              "'X' is a variable name, while \"X\" is literal text.",
              "'X' is used for numbers, and \"X\" is used for letters."
            ],
            correctIndex: 0,
            explanation: "Single quotes always represent a single char. Double quotes always represent a std::string. They are completely different data types in memory."
          },
          {
            question: "Which preprocessor directive is absolutely required to use the `std::string` type safely?",
            options: [
              "#include <iostream>",
              "#include <string>",
              "#include <text>",
              "#include <char>"
            ],
            correctIndex: 1,
            explanation: "You must include the <string> header. While <iostream> occasionally includes it behind the scenes on some compilers, relying on that is bad practice and non-portable."
          },
          {
            question: "If you declare `bool isGameOver{false};`, what will `std::cout << isGameOver;` print to the screen?",
            options: [
              "false",
              "1",
              "0",
              "It prints nothing."
            ],
            correctIndex: 2,
            explanation: "By default, C++ outputs boolean values as their underlying integer representations: 1 for true, and 0 for false."
          }
        ]
      },
      {
        id: "ch2-l4",
        title: "Assignment and Naming",
        difficulty: "beginner",
        content: `
          <h2>Changing Values and Naming Rules</h2>
          <p>Variables are called "variables" because their values can <em>vary</em> (change) while the program runs. After we set an initial value, we might want to update it later. We also need to follow strict rules for what we name our boxes so the compiler understands us.</p>

          <h3>The Mental Model</h3>
          <p>Imagine your labelled box again. <strong>Initialisation</strong> is putting an item into the box the moment you build it. <strong>Assignment</strong> is throwing away the current item and putting a new item in the box later. To do this, you just refer to the label (the variable's name)—you do not need to build a new box.</p>

          <h3>Prerequisites</h3>
          <p>You should know how to declare variables of all five fundamental types: <code>int</code>, <code>double</code>, <code>char</code>, <code>bool</code>, and <code>std::string</code>.</p>

          <h3>Core Concepts</h3>
          <h4>Initialisation vs. Assignment</h4>
          <p>You <em>declare</em> a variable only once using a type keyword (like <code>int</code>). When you want to change its value later, you use the <strong>assignment operator</strong> (<code>=</code>) without repeating the type.</p>
          <pre><code>int level{1};  // Declaration and initialisation
level = 2;     // Assignment (replaces the 1 with 2)</code></pre>

          <h4>C++ Naming Rules (Identifiers)</h4>
          <ul>
            <li>Names must start with a letter or an underscore <code>_</code>. They <strong>cannot start with a number</strong>.</li>
            <li>Names can only contain letters, numbers, and underscores. No spaces or special characters like <code>-</code> or <code>@</code>.</li>
            <li>Names are case-sensitive. <code>Score</code> and <code>score</code> are two completely different variables.</li>
            <li>You cannot use C++ keywords (like <code>int</code> or <code>return</code>) as names.</li>
            <li><strong>Convention:</strong> Programmers usually use <code>camelCase</code> for variables (e.g., <code>playerScore</code>) so they are instantly recognizable and easy to read.</li>
          </ul>

          <h3>Worked Example: Line by Line</h3>
          <ol>
            <li><code>#include &lt;iostream&gt;</code></li>
            <li><code>int main() {</code></li>
            <li><code>int currentLevel{1};</code> — Declares an integer box named <code>currentLevel</code> using camelCase and initialises it to 1.</li>
            <li><code>std::cout &lt;&lt; "Start Level: " &lt;&lt; currentLevel &lt;&lt; "\\n";</code> — Prints 1.</li>
            <li><code>currentLevel = 2;</code> — The assignment operator replaces the 1 with a 2. We do <strong>not</strong> write <code>int currentLevel = 2;</code> because the box already exists.</li>
            <li><code>std::cout &lt;&lt; "Next Level: " &lt;&lt; currentLevel &lt;&lt; "\\n";</code> — Prints 2.</li>
            <li><code>return 0;</code></li>
            <li><code>}</code></li>
          </ol>

          <div class="mistake">
            <strong>Common Mistake:</strong> Repeating the type keyword when assigning a new value. If you write <code>int currentLevel{1};</code> and later write <code>int currentLevel = 2;</code>, the compiler will fail with a "redefinition" error because it thinks you are trying to create a second box with the exact same name. Drop the <code>int</code> on the second line.
          </div>

          <h3>Predict Activity</h3>
          <p>Trace the code below line by line. What three numbers will be printed to the screen? Notice how <code>score</code> is updated over time.</p>
        `,
        codeExample: `#include <iostream>\n\nint main() {\n    int score{0};\n    std::cout << "Score: " << score << "\\n";\n    score = 50;\n    std::cout << "Score: " << score << "\\n";\n    score = 100;\n    std::cout << "Score: " << score << "\\n";\n    return 0;\n}`,
        expectedOutput: "Score: 0\nScore: 50\nScore: 100",
        exercises: [
          {
            instruction: "Modify the code to track a player's score. Declare an integer named 'score' initialized to 0 and print it. Then, reassign 'score' to be 100, and print it again. The output must be exactly:\nScore: 0\nScore: 100",
            starterCode: "#include <iostream>\n\nint main() {\n    int level{1};\n    std::cout << \"Start Level: \" << level << \"\\n\";\n    level = 2;\n    std::cout << \"Next Level: \" << level << \"\\n\";\n    return 0;\n}",
            expectedOutput: "Score: 0\nScore: 100",
            exerciseType: "modify",
            hints: [
              "Rename the variable to 'score' and change its initialization to 0.",
              "Change the assignment line from `level = 2;` to `score = 100;`. Remember, do not use the 'int' keyword here.",
              "Update the text inside the quotation marks in both std::cout statements to say \"Score: \"."
            ]
          },
          {
            instruction: "This program calculates a level multiplier. However, the multiplier never updates, so it prints 'Multiplier: 1' twice. Fix the logic bug so the multiplier is correctly updated to 5.",
            starterCode: "#include <iostream>\n\nint main() {\n    int multiplier{1};\n    std::cout << \"Multiplier: \" << multiplier << \"\\n\";\n\n    // We meant to reassign the multiplier to 5\n    int newMultiplier{5};\n\n    std::cout << \"Multiplier: \" << multiplier << \"\\n\";\n    return 0;\n}",
            expectedOutput: "Multiplier: 1\nMultiplier: 5",
            exerciseType: "debug",
            hints: [
              "The code declares a new variable 'newMultiplier' but never updates the original 'multiplier' variable.",
              "Since the second cout prints 'multiplier', we need to change its value.",
              "Replace `int newMultiplier{5};` with an assignment statement: `multiplier = 5;`."
            ]
          }
        ],
        quiz: [
          {
            question: "Which of the following is an example of correct assignment to an existing variable named `health`?",
            options: [
              "int health = 50;",
              "health = 50;",
              "health{50};",
              "int health{50};"
            ],
            correctIndex: 1,
            explanation: "To assign a new value to a variable that already exists, you use the assignment operator '=' and omit the type keyword. Repeating the type keyword would attempt to declare a second variable with the same name."
          },
          {
            question: "Why does `int score{0}; int score = 10;` cause an error?",
            options: [
              "You are attempting to declare a new variable with a name that already exists in the same scope.",
              "You cannot mix uniform initialisation with the equals sign.",
              "10 is not a valid integer.",
              "Variables in C++ can only be assigned once."
            ],
            correctIndex: 0,
            explanation: "The 'int' keyword is a declaration. By writing 'int score' a second time, you are asking the compiler to create a second box with the exact same label, which is illegal. To reassign, drop the 'int': score = 10;."
          },
          {
            question: "Which of the following is a valid C++ variable name?",
            options: [
              "2ndPlayer",
              "player-score",
              "player_score",
              "double"
            ],
            correctIndex: 2,
            explanation: "player_score is valid because it uses only letters and underscores. 2ndPlayer is invalid because it starts with a number. player-score contains a hyphen. double is a reserved C++ keyword."
          }
        ]
      },
      {
        id: "ch2-l5",
        title: "Compiler Inference and Size",
        difficulty: "beginner",
        content: `
          <h2>Letting the Compiler Do the Work</h2>
          <p>Sometimes, explicitly writing out data types feels redundant. If you initialise a variable with the number 42, the compiler is smart enough to know that 42 is an integer. C++ provides a keyword that asks the compiler to figure out the type automatically. We can also peek under the hood to see exactly how much memory these types consume.</p>

          <h3>The Mental Model</h3>
          <p>Using <code>auto</code> is like handing an unlabelled box to the compiler and saying, "Look at what I am putting inside, and stamp the correct label on the outside for me." Using <code>sizeof</code> is like asking the compiler exactly how much memory (in bytes) it allocates for a specific box.</p>

          <h3>Prerequisites</h3>
          <p>You should understand the basic types (<code>int</code>, <code>double</code>, <code>char</code>) and how uniform initialisation works.</p>

          <h3>Core Concepts: auto and sizeof</h3>
          <h4>The <code>auto</code> Keyword</h4>
          <p>When you declare a variable with <code>auto</code> instead of a specific type, the compiler deduces the type based on the initial value. You <strong>must</strong> provide an initial value when using <code>auto</code>, or the compiler won't have anything to guess from.</p>
          <pre><code>auto age{25};       // Compiler deduces int
auto price{1.99};   // Compiler deduces double
auto initial{'X'};  // Compiler deduces char</code></pre>

          <h4>The <code>sizeof</code> Operator</h4>
          <p>Memory is measured in bytes. Different types require different amounts of bytes. The <code>sizeof</code> operator evaluates the size of a specific type or variable in bytes as defined by C++. Sizes can vary depending on your computer system.</p>

          <h3>Worked Example: Line by Line</h3>
          <ol>
            <li><code>#include &lt;iostream&gt;</code></li>
            <li><code>int main() {</code></li>
            <li><code>auto magicNumber{42};</code> — The compiler sees the whole number 42 and makes <code>magicNumber</code> an <code>int</code>.</li>
            <li><code>std::cout &lt;&lt; "Number: " &lt;&lt; magicNumber &lt;&lt; "\\n";</code> — Prints 42.</li>
            <li><code>std::cout &lt;&lt; "Size of int: " &lt;&lt; sizeof(int) &lt;&lt; " bytes\\n";</code> — Prints the memory size of the <code>int</code> type (typically 4 bytes on modern systems).</li>
            <li><code>std::cout &lt;&lt; "Size of double: " &lt;&lt; sizeof(double) &lt;&lt; " bytes\\n";</code> — Prints the memory size of a <code>double</code> (typically 8 bytes).</li>
            <li><code>return 0;</code></li>
            <li><code>}</code></li>
          </ol>

          <div class="note">
            <strong>Note:</strong> The exact sizes returned by <code>sizeof</code> can vary depending on your computer's architecture (e.g., 32-bit vs 64-bit), but <code>sizeof(char)</code> is strictly guaranteed by the C++ standard to always be exactly 1 byte.
          </div>

          <div class="mistake">
            <strong>Common Mistake:</strong> Trying to declare <code>auto count;</code> without an initial value. The compiler will fail because it cannot deduce the type of nothing. You must write <code>auto count{0};</code> so it can deduce an integer.
          </div>

          <h3>Predict Activity</h3>
          <p>Look at the code below. On most modern systems, a double is twice as large as an integer. Predict what the two byte sizes will be when printed.</p>
        `,
        codeExample: `#include <iostream>\n\nint main() {\n    auto magicNumber{42};\n    std::cout << "Number: " << magicNumber << "\\n";\n    std::cout << "Size of int: " << sizeof(int) << " bytes\\n";\n    std::cout << "Size of double: " << sizeof(double) << " bytes\\n";\n    return 0;\n}`,
        expectedOutput: null,
        exercises: [
          {
            instruction: "Write a program that uses 'auto' to deduce the types of three variables: a whole number (7), a decimal (3.14), and a character ('Z'). Print them out exactly as:\nWhole: 7\nDecimal: 3.14\nChar: Z",
            starterCode: "#include <iostream>\n\nint main() {\n    // Use auto for all three variables\n    \n\n    // Print them here\n    \n\n    return 0;\n}",
            expectedOutput: "Whole: 7\nDecimal: 3.14\nChar: Z",
            exerciseType: "write",
            hints: [
              "Declare three variables like: auto wholeNum{7};",
              "Ensure the decimal uses a decimal point (3.14), and the character uses single quotes ('Z').",
              "Print them using std::cout. Don't forget the \"\\n\" at the end of each print statement."
            ]
          }
        ],
        quiz: [
          {
            question: "What data type does the compiler assign to `x` in the statement `auto x{9.81};`?",
            options: [
              "int",
              "double",
              "char",
              "bool"
            ],
            correctIndex: 1,
            explanation: "Because 9.81 contains a decimal point, the compiler recognizes it as a floating-point literal and assigns the 'double' type to x."
          },
          {
            question: "Why does `auto myVar;` cause a compiler error?",
            options: [
              "auto can only be used with numbers, not variables.",
              "myVar is a reserved keyword.",
              "The compiler has no initial value to look at, so it cannot deduce the type.",
              "You must write 'auto int myVar;'."
            ],
            correctIndex: 2,
            explanation: "The 'auto' keyword relies entirely on the initialisation value to figure out the type. Without an initial value, the compiler is blind."
          },
          {
            question: "What does the `sizeof` operator do?",
            options: [
              "It returns the number of digits in a number.",
              "It increases the maximum value a variable can hold.",
              "It counts the number of characters in a string.",
              "It returns the memory size (in bytes) of a data type or variable."
            ],
            correctIndex: 3,
            explanation: "sizeof is a compile-time operator that reports how many bytes of memory the compiler allocates for a specific type or variable."
          }
        ]
      },
      {
        id: "ch2-l6",
        title: "Review: Variables and Data Types",
        difficulty: "beginner",
        content: `
          <h2>Synthesising What You've Learned</h2>
          <p>Congratulations! You have mastered the foundational building blocks of data storage in C++. You can now give your programs a memory, choose the right type for the job, and protect data from accidental modification.</p>

          <h3>Chapter Review</h3>
          <ul>
            <li><strong>Variables:</strong> Named boxes in memory that store values.</li>
            <li><strong>Uniform Initialisation:</strong> Safely assigning a starting value using curly braces, e.g., <code>int age{25};</code>.</li>
            <li><strong><code>int</code> vs <code>double</code>:</strong> <code>int</code> stores whole numbers and truncates division. <code>double</code> stores precise decimal values.</li>
            <li><strong><code>char</code> vs <code>std::string</code>:</strong> <code>char</code> uses single quotes for a single letter. <code>std::string</code> uses double quotes for text.</li>
            <li><strong><code>bool</code>:</strong> Stores <code>true</code> (1) or <code>false</code> (0).</li>
            <li><strong>Assignment:</strong> Changing a variable's value later using <code>=</code>. Do not repeat the type keyword.</li>
            <li><strong><code>auto</code>:</strong> Lets the compiler deduce the type from the initial value.</li>
            <li><strong><code>sizeof</code>:</strong> Reveals how many bytes of memory a type consumes.</li>
          </ul>

          <h3>Bringing It All Together</h3>
          <p>The code example below is a complete character sheet for a game. It demonstrates every type we have learned working together. Take a close look at how each type is perfectly suited for the specific piece of data it holds.</p>

          <div class="note">
            <strong>Looking Ahead:</strong> Right now, we are hardcoding all our data into the source code. In Chapter 3, you will learn how to use <code>std::cin</code> to ask the user to type in data while the program is running, making your programs truly interactive!
          </div>
        `,
        codeExample: `#include <iostream>\n#include <string>\n\nint main() {\n    // A complete character profile\n    std::string name{"Arthur"};\n    char classRank{'S'};\n    int level{42};\n    double health{98.5};\n    bool isPoisoned{false};\n\n    std::cout << "--- Character Profile ---\\n";\n    std::cout << "Name: " << name << "\\n";\n    std::cout << "Rank: " << classRank << "\\n";\n    std::cout << "Level: " << level << "\\n";\n    std::cout << "Health: " << health << "\\n";\n    std::cout << "Poisoned: " << isPoisoned << "\\n";\n\n    return 0;\n}`,
        expectedOutput: "--- Character Profile ---\nName: Arthur\nRank: S\nLevel: 42\nHealth: 98.5\nPoisoned: 0",
        exercises: [
          {
            instruction: "Write a complete program from scratch that declares variables for a product in a store. Declare a string 'item' initialized to \"Potion\", an int 'quantity' initialized to 3, a double 'price' initialized to 15.99, and a bool 'inStock' initialized to true. Print them all exactly as shown in the expected output:\nItem: Potion\nQuantity: 3\nPrice: 15.99\nIn Stock: 1",
            starterCode: "// Write your complete program below\n#include <iostream>\n#include <string>\n\nint main() {\n    // Declare your variables here\n\n\n    // Print them here\n\n\n    return 0;\n}",
            expectedOutput: "Item: Potion\nQuantity: 3\nPrice: 15.99\nIn Stock: 1",
            exerciseType: "review",
            hints: [
              "Remember to use uniform initialisation: std::string item{\"Potion\"};",
              "The boolean variable inStock should be set to true. When printed, it will display as 1 automatically.",
              "Use std::cout for each variable, making sure to include the exact label text (like \"Item: \") and a \"\\n\" at the end."
            ]
          },
          {
            instruction: "This program has two logic bugs. It calculates a speed by dividing 9 by 2, but it prints 'Speed: 4' instead of 'Speed: 4.5'. It also incorrectly prints the word 'true' instead of checking a boolean. Fix both bugs so the program outputs:\nSpeed: 4.5\nIs Active: 1",
            starterCode: "#include <iostream>\n#include <string>\n\nint main() {\n    double speed{9 / 2};\n    std::cout << \"Speed: \" << speed << \"\\n\";\n\n    std::string isActive{\"true\"};\n    std::cout << \"Is Active: \" << isActive << \"\\n\";\n\n    return 0;\n}",
            expectedOutput: "Speed: 4.5\nIs Active: 1",
            exerciseType: "review",
            hints: [
              "Bug 1: `9 / 2` performs integer division. Change the numbers to decimals (e.g., `9.0 / 2.0`) to get a floating-point result.",
              "Bug 2: `isActive` is declared as a std::string containing the text \"true\". Change its type to `bool` and its value to the keyword `true` (without quotes)."
            ]
          }
        ],
        quiz: [
          {
            question: "If you need a variable to store the exact mathematical value of Pi (3.14159), which declaration is correct?",
            options: [
              "int pi{3.14159};",
              "char pi{'3.14159'};",
              "double pi{3.14159};",
              "std::string pi{\"3.14159\"};"
            ],
            correctIndex: 2,
            explanation: "Pi is a decimal number, so it requires a double. An int would drop the fractional part, a char only holds one character, and a string treats it as text rather than a calculable number."
          },
          {
            question: "What is the result of the following code? `int health{100}; health = health - 20;`",
            options: [
              "A compiler error because health is declared twice.",
              "The variable health now contains 80.",
              "The variable health remains 100, and a new temporary variable holds 80.",
              "A compiler error because you cannot use the variable's own name on the right side of the equals sign."
            ],
            correctIndex: 1,
            explanation: "Assignment evaluates the right side first. It takes the current value of health (100), subtracts 20 to get 80, and then stores that 80 back into the health variable, replacing the old value."
          },
          {
            question: "Why does `char initial{\"A\"};` cause a compiler error?",
            options: [
              "Double quotes create a string, not a character. A char requires single quotes.",
              "The letter A is a reserved keyword.",
              "You cannot initialise a char using curly braces.",
              "You must include <string> to use the letter A."
            ],
            correctIndex: 0,
            explanation: "Double quotes strictly create a std::string literal. To initialise a char, you must use single quotes: char initial{'A'};."
          }
        ]
      }
    ]
  });
})();
