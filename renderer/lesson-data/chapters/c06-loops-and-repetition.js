(function() {
  window.CPP_CHAPTERS = window.CPP_CHAPTERS || [];
  window.CPP_CHAPTERS.push({
    id: 6,
    title: "Loops and Repetition",
    description: "Learn how to make your programs repeat tasks automatically.",
    icon: "🔁",
    lessons: [
      {
        id: "ch6-l1",
        title: "The while Loop",
        difficulty: "beginner",
        content: `
<h2>The while Loop</h2>
<p>Imagine you are tasked with writing a program that prints "Hello" 100 times. You could write <code>std::cout &lt;&lt; "Hello\\n";</code> one hundred times, but what if you needed it 1,000 times? This is why <strong>repetition</strong> (or looping) exists in programming.</p>

<h3>The Mental Model</h3>
<p>Think of a <code>while</code> loop as an <code>if</code> statement that repeats. An <code>if</code> statement checks its condition, runs its block once if true, and moves on. A <code>while</code> loop checks its condition, runs its block if true, and then <strong>jumps back to the top</strong> to check the condition again. It keeps looping as long as the condition remains true.</p>

<h3>The Syntax</h3>
<pre><code>while (condition) {
    // Code to repeat
}</code></pre>

<h3>Tracing Iterations</h3>
<p>An <strong>iteration</strong> is one complete execution of the loop's block. To prevent a loop from running forever, something inside the loop must eventually change the condition to <code>false</code>. Usually, we use a counter variable.</p>

<h3>Worked Example: Line by Line</h3>
<ol>
  <li><code>int countdown{3};</code> — We create a counter starting at 3.</li>
  <li><code>while (countdown &gt; 0) {</code> — C++ checks if 3 &gt; 0. It is true, so we enter the loop.</li>
  <li><code>std::cout &lt;&lt; countdown &lt;&lt; "\\n";</code> — Prints "3".</li>
  <li><code>countdown = countdown - 1;</code> — The counter becomes 2.</li>
  <li><strong>Jump back to the top!</strong> C++ checks if 2 &gt; 0. True. Enters loop.</li>
  <li>Prints "2", counter becomes 1.</li>
  <li><strong>Jump back!</strong> 1 &gt; 0. True. Enters loop.</li>
  <li>Prints "1", counter becomes 0.</li>
  <li><strong>Jump back!</strong> 0 &gt; 0. False! The loop is finished, and the program moves to the code after the loop.</li>
</ol>

<div class="mistake">
  <strong>Common Mistake: Infinite Loops!</strong> If you forget to update the counter inside the loop (e.g., you forget <code>countdown = countdown - 1;</code>), the condition will <em>always</em> be true, and the loop will run forever until the program crashes.
</div>

<h3>Predict Activity</h3>
<p>If we started with <code>int count{0};</code> and the condition was <code>while (count &lt; 2)</code>, how many times would the loop print?</p>
        `,
        codeExample: `#include <iostream>\n\nint main() {\n    int countdown{3};\n    \n    std::cout << "Starting countdown:\\n";\n    \n    while (countdown > 0) {\n        std::cout << countdown << "\\n";\n        countdown = countdown - 1; // Update the counter!\n    }\n    \n    std::cout << "Liftoff!\\n";\n    return 0;\n}`,
        expectedOutput: "Starting countdown:\n3\n2\n1\nLiftoff!\n",
        exercises: [
          {
            exerciseType: "complete",
            instruction: "Write a `while` loop that counts up from 1 to 3. The `counter` variable is already created for you. Make sure to print the counter and then increase it by 1 inside the loop.",
            starterCode: `#include <iostream>\n\nint main() {\n    int counter{1};\n    \n    // Write your while loop here\n    // It should loop as long as counter <= 3\n    \n    \n    std::cout << "Done\\n";\n    return 0;\n}`,
            expectedOutput: "1\n2\n3\nDone\n",
            hints: [
              "The condition should be `while (counter <= 3)`.",
              "Inside the loop, first `std::cout << counter << \"\\n\";`",
              "Then update the counter: `counter = counter + 1;`."
            ]
          }
        ],
        quiz: [
          {
            question: "What is the primary difference between an `if` statement and a `while` loop?",
            options: [
              "An `if` statement evaluates a boolean condition, but a `while` loop evaluates an integer.",
              "An `if` statement executes its block once if true, whereas a `while` loop executes its block repeatedly as long as it remains true.",
              "A `while` loop does not require curly braces.",
              "There is no difference."
            ],
            correctIndex: 1,
            explanation: "Both evaluate a condition. The key difference is that the `while` loop jumps back to re-evaluate the condition after finishing the block."
          },
          {
            question: "What causes an infinite loop?",
            options: [
              "Using a negative number in the condition.",
              "Failing to include a condition in the `while` parentheses.",
              "The condition never becoming false (e.g., forgetting to update the counter).",
              "Using the `!=` operator."
            ],
            correctIndex: 2,
            explanation: "If the variables controlling the condition are never modified inside the loop, the condition's truth value will never change, causing it to run forever."
          },
          {
            question: "If `int i{5};` and the loop is `while (i < 5)`, how many times will the loop's block execute?",
            options: [
              "0 times",
              "1 time",
              "5 times",
              "Infinite times"
            ],
            correctIndex: 0,
            explanation: "The condition `5 < 5` is evaluated immediately. Since it is false from the very beginning, the loop is skipped entirely and runs 0 times."
          }
        ]
      },
      {
        id: "ch6-l2",
        title: "The do-while Loop",
        difficulty: "beginner",
        content: `
<h2>The do-while Loop</h2>
<p>The <code>while</code> loop checks its condition <em>before</em> running the code. As we learned in the previous quiz, if the condition is false immediately, the code runs 0 times.</p>
<p>But what if you are building a menu, and you want to show the menu to the user <strong>at least once</strong> before asking them if they want to quit? This is where the <code>do-while</code> loop shines.</p>

<h3>The Mental Model</h3>
<p>A <code>do-while</code> loop is an "act first, ask questions later" loop. It executes the code block first, and only checks the condition at the very end. If the condition is true, it jumps back to the top and does it again.</p>

<h3>The Syntax</h3>
<pre><code>do {
    // Code to repeat (runs AT LEAST once)
} while (condition);</code></pre>

<div class="mistake">
  <strong>Common Mistake:</strong> Forgetting the semicolon <code>;</code> at the end of the <code>do-while</code> statement! Unlike standard <code>while</code> loops, a <code>do-while</code> loop requires a semicolon after the closing parenthesis of the condition.
</div>

<h3>When to use which?</h3>
<ul>
  <li>Use <code>while</code> when the loop might need to run 0 times.</li>
  <li>Use <code>do-while</code> when the loop MUST run at least 1 time.</li>
</ul>

<h3>Predict Activity</h3>
<p>If we have <code>int x{10};</code> and we run a <code>do { std::cout &lt;&lt; x; } while (x &lt; 5);</code>, what will be printed?</p>
        `,
        codeExample: `#include <iostream>\n\nint main() {\n    int energy{0};\n    \n    std::cout << "Starting do-while loop:\\n";\n    // This will run exactly once, even though energy is already 0!\n    do {\n        std::cout << "Running...\\n";\n        energy = energy - 1;\n    } while (energy > 0);\n    \n    std::cout << "Loop finished.\\n";\n    return 0;\n}`,
        expectedOutput: "Starting do-while loop:\nRunning...\nLoop finished.\n",
        exercises: [
          {
            exerciseType: "modify",
            instruction: "This program is supposed to print a welcome message at least once, even if `wantsToPlay` is false. However, it currently uses a standard `while` loop, so it prints nothing. Change it to a `do-while` loop.",
            starterCode: `#include <iostream>\n\nint main() {\n    bool wantsToPlay{false};\n    \n    // Modify this to be a do-while loop\n    while (wantsToPlay) {\n        std::cout << "Welcome to the game!\\n";\n        // The user instantly quits\n        wantsToPlay = false;\n    }\n    \n    return 0;\n}`,
            expectedOutput: "Welcome to the game!\n",
            hints: [
              "Move the `while (wantsToPlay)` condition to the end of the curly braces.",
              "Add the `do` keyword right before the opening curly brace.",
              "Don't forget the semicolon `;` at the end of the `while (wantsToPlay);` condition!"
            ]
          }
        ],
        quiz: [
          {
            question: "What is the guarantee provided by a `do-while` loop?",
            options: [
              "It will never cause an infinite loop.",
              "It will execute its code block at least once.",
              "It will execute its code block exactly twice.",
              "It runs faster than a standard `while` loop."
            ],
            correctIndex: 1,
            explanation: "Because the condition is checked at the bottom of the loop, the block of code inside the `do` statement is guaranteed to run at least one time before any condition is evaluated."
          },
          {
            question: "Which loop requires a semicolon at the very end of its syntax?",
            options: [
              "`while` loops",
              "`for` loops",
              "`do-while` loops",
              "None of them require a semicolon."
            ],
            correctIndex: 2,
            explanation: "A `do-while` loop ends with `while (condition);`. Forgetting that semicolon is a very common syntax error."
          },
          {
            question: "If a user needs to be prompted for input until they type a valid number, which loop is naturally the best fit?",
            options: [
              "`while` loop",
              "`do-while` loop",
              "Neither, an `if` statement is better."
            ],
            correctIndex: 1,
            explanation: "A `do-while` loop is perfect here because you must prompt the user and read their input at least once before you can check if it is valid."
          }
        ]
      },
      {
        id: "ch6-l3",
        title: "The for Loop",
        difficulty: "beginner",
        content: `
<h2>The for Loop</h2>
<p>We've seen that standard loops usually need three things: a counter variable (<strong>initialization</strong>), a rule to keep going (<strong>condition</strong>), and a way to change the counter (<strong>update</strong>). In a <code>while</code> loop, these three parts are scattered. A <code>for</code> loop condenses them all into one clean, readable line.</p>

<h3>The Mental Model</h3>
<p>Think of a <code>for</code> loop as a specialized tool specifically designed for counting and repeating a known number of times. It gathers the setup, the check, and the step into the loop's header, making it impossible to forget to update the counter!</p>

<h3>The Syntax</h3>
<pre><code>for (initialization; condition; update) {
    // Code to repeat
}</code></pre>

<h3>Worked Example: Line by Line</h3>
<pre><code>for (int i = 1; i &lt;= 3; i = i + 1) {
    std::cout &lt;&lt; i;
}</code></pre>
<ol>
  <li><strong>Initialization:</strong> <code>int i = 1;</code> runs exactly <em>once</em> at the very beginning.</li>
  <li><strong>Condition:</strong> C++ checks if <code>i &lt;= 3</code>. It is true, so it enters the loop.</li>
  <li><strong>Execution:</strong> It prints "1".</li>
  <li><strong>Update:</strong> The loop finishes the block and jumps to the update step: <code>i = i + 1</code> (so <code>i</code> becomes 2).</li>
  <li><strong>Repeat:</strong> It jumps back to Step 2 to check the condition again.</li>
</ol>
<p>Eventually, <code>i</code> becomes 4, the condition <code>4 &lt;= 3</code> is false, and the loop ends.</p>

<div class="tip">
  <strong>Best Practice:</strong> Programmers almost always use the variable name <code>i</code> (for "iterator" or "index") when writing <code>for</code> loops. They also use the shorthand <code>i++</code> instead of <code>i = i + 1</code>. <code>i++</code> simply means "add 1 to i".
</div>

<div class="note">
  <strong>Range-for Preview:</strong> Later in C++, when we learn about lists of items, we'll see a modern, shorter version called the "range-based for loop" that automatically loops over every item in a list!
</div>
        `,
        codeExample: `#include <iostream>\n\nint main() {\n    std::cout << "Counting by twos:\\n";\n    \n    // i starts at 0. Keeps going while i <= 10. Adds 2 every lap.\n    for (int i = 0; i <= 10; i = i + 2) {\n        std::cout << i << " ";\n    }\n    \n    std::cout << "\\nDone.\\n";\n    return 0;\n}`,
        expectedOutput: "Counting by twos:\n0 2 4 6 8 10 \nDone.\n",
        exercises: [
          {
            exerciseType: "modify",
            instruction: "Modify the `for` loop so that it counts DOWN from 5 to 1. Currently, it counts up from 1 to 5.",
            starterCode: `#include <iostream>\n\nint main() {\n    // Modify the initialization, condition, and update steps\n    for (int i = 1; i <= 5; i = i + 1) {\n        std::cout << i << "\\n";\n    }\n    \n    std::cout << "Blastoff!\\n";\n    return 0;\n}`,
            expectedOutput: "5\n4\n3\n2\n1\nBlastoff!\n",
            hints: [
              "Initialization: Start `i` at 5.",
              "Condition: Keep looping as long as `i >= 1`.",
              "Update: Subtract 1 from `i` each time (`i = i - 1`)."
            ]
          }
        ],
        quiz: [
          {
            question: "In a `for` loop, how many times does the initialization step execute?",
            options: [
              "Every time the loop repeats.",
              "Exactly once, at the very beginning before the first condition check.",
              "It executes at the end of every loop.",
              "It executes only if the condition is true."
            ],
            correctIndex: 1,
            explanation: "The initialization (e.g., `int i = 0;`) sets up the starting state and is only run a single time when the loop first begins."
          },
          {
            question: "When does the update step (e.g., `i = i + 1`) occur in a `for` loop?",
            options: [
              "Before the condition is checked for the first time.",
              "Immediately after the condition is checked, before the code block runs.",
              "At the very end of each iteration, right before checking the condition for the next lap.",
              "Only when the loop finishes completely."
            ],
            correctIndex: 2,
            explanation: "The flow is: Condition Check -> Code Block -> Update Step -> Loop back to Condition Check."
          },
          {
            question: "What does `i++` do?",
            options: [
              "It adds 2 to `i`.",
              "It multiplies `i` by itself.",
              "It is shorthand for `i = i + 1`, increasing the value of `i` by 1.",
              "It makes `i` positive."
            ],
            correctIndex: 2,
            explanation: "`++` is the increment operator. It is the most common way to add 1 to a loop counter in C++."
          }
        ]
      },
      {
        id: "ch6-l4",
        title: "Loop Control: break and continue",
        difficulty: "beginner",
        content: `
<h2>Loop Control: break and continue</h2>
<p>Sometimes you need to interrupt a loop's normal flow. Perhaps you are searching for a specific file and want to stop the loop as soon as you find it, rather than searching the rest of the computer. C++ provides two keywords for this: <code>break</code> and <code>continue</code>.</p>

<h3>The break Keyword</h3>
<p>We already saw <code>break</code> in Chapter 5 when using <code>switch</code> statements. Inside a loop, <code>break</code> immediately <strong>destroys the loop</strong>. The program instantly jumps out of the loop entirely and continues with the rest of the program.</p>

<h3>The continue Keyword</h3>
<p>Unlike break, <code>continue</code> does not destroy the loop. Instead, it <strong>skips the rest of the current iteration</strong> and immediately jumps back up to the next lap (the update and condition check). It essentially says, "I'm done with this specific lap, let's move on to the next one."</p>

<h3>The Mental Model</h3>
<ul>
  <li><code>break</code> = "Stop running this loop forever."</li>
  <li><code>continue</code> = "Skip the rest of this lap, but keep looping."</li>
</ul>

<h3>Worked Example</h3>
<p>Imagine printing numbers from 1 to 5, but skipping the number 3, and stopping entirely if we hit 5.</p>
        `,
        codeExample: `#include <iostream>\n\nint main() {\n    for (int i = 1; i <= 10; i = i + 1) {\n        if (i == 3) {\n            // Skip the number 3\n            continue;\n        }\n        \n        if (i == 6) {\n            // Stop the loop completely when we reach 6\n            break;\n        }\n        \n        std::cout << i << " ";\n    }\n    \n    std::cout << "\\nLoop ended.\\n";\n    return 0;\n}`,
        expectedOutput: "1 2 4 5 \nLoop ended.\n",
        exercises: [
          {
            exerciseType: "debug",
            instruction: "This loop is supposed to print numbers from 1 to 5, but skip the number 4 using an `if` statement. However, the programmer used the wrong keyword, so the loop stops completely at 4. Fix it to skip 4 but still print 5.",
            starterCode: `#include <iostream>\n\nint main() {\n    for (int i = 1; i <= 5; i = i + 1) {\n        if (i == 4) {\n            // Bug: This destroys the whole loop!\n            break;\n        }\n        std::cout << i << "\\n";\n    }\n    \n    return 0;\n}`,
            expectedOutput: "1\n2\n3\n5\n",
            hints: [
              "The `break` keyword stops the entire loop.",
              "The `continue` keyword skips only the current lap.",
              "Replace `break;` with `continue;`."
            ]
          }
        ],
        quiz: [
          {
            question: "What is the difference between `break` and `continue` inside a loop?",
            options: [
              "`break` pauses the loop, `continue` unpauses it.",
              "`break` exits the entire loop instantly, `continue` skips the rest of the current iteration and starts the next one.",
              "`break` skips one lap, `continue` loops forever.",
              "There is no difference."
            ],
            correctIndex: 1,
            explanation: "`break` is a hard stop for the loop. `continue` is just a fast-forward to the next iteration."
          },
          {
            question: "If a `continue` statement executes inside a `for` loop, what happens next?",
            options: [
              "The program crashes.",
              "The loop condition is checked immediately without updating the counter.",
              "The loop's update step (e.g., `i = i + 1`) executes, and then the condition is checked for the next iteration.",
              "The program jumps to the code after the loop."
            ],
            correctIndex: 2,
            explanation: "`continue` skips the remaining code in the block, but it properly triggers the `for` loop's update step so the counter keeps progressing."
          },
          {
            question: "Can `break` be used in a `while` loop?",
            options: [
              "Yes, `break` works in `for`, `while`, and `do-while` loops.",
              "No, `break` is only for `switch` statements.",
              "No, it only works in `for` loops.",
              "Yes, but it requires special headers."
            ],
            correctIndex: 0,
            explanation: "`break` is a universal control statement used to exit any loop early, as well as exiting `switch` cases."
          }
        ]
      },
      {
        id: "ch6-l5",
        title: "Nested Loops",
        difficulty: "beginner",
        content: `
<h2>Nested Loops</h2>
<p>Just as you can place an <code>if</code> statement inside another <code>if</code> statement, you can place a loop inside another loop. This is called a <strong>nested loop</strong>.</p>

<h3>The Mental Model</h3>
<p>Think of a clock. The minute hand is an inner loop, and the hour hand is an outer loop. For every <em>single</em> tick of the hour hand (outer loop), the minute hand must complete <em>60 full ticks</em> (inner loop). The inner loop completely finishes all of its iterations for every single lap of the outer loop.</p>

<h3>Why nest loops?</h3>
<p>Nested loops are essential anytime you are dealing with two-dimensional data. If you want to print a grid, process an image (which has an X and Y coordinate for pixels), or compare every item in a list against every other item, you will use nested loops.</p>

<h3>Tracing Iterations</h3>
<pre><code>for (int row = 1; row &lt;= 3; row++) {
    for (int col = 1; col &lt;= 2; col++) {
        std::cout << "*";
    }
    std::cout << "\\n";
}</code></pre>
<p>Let's trace this!</p>
<ol>
  <li>Outer loop starts: <code>row = 1</code>.</li>
  <li>Inner loop starts: <code>col = 1</code>. Prints "*".</li>
  <li>Inner loop updates: <code>col = 2</code>. Prints "*".</li>
  <li>Inner loop ends.</li>
  <li>Outer loop prints a newline <code>"\\n"</code>.</li>
  <li>Outer loop updates: <code>row = 2</code>.</li>
  <li>Inner loop starts completely over! <code>col = 1</code>...</li>
</ol>

<div class="note">
  <strong>Note:</strong> We are using <code>row++</code> and <code>col++</code> here. This is standard C++ shorthand for <code>row = row + 1</code>.
</div>
        `,
        codeExample: `#include <iostream>\n\nint main() {\n    // Outer loop controls the rows\n    for (int row = 1; row <= 3; row++) {\n        \n        std::cout << "Row " << row << ": ";\n        \n        // Inner loop controls the columns\n        for (int col = 1; col <= 4; col++) {\n            std::cout << col << " ";\n        }\n        \n        // Move to the next line after the inner loop finishes\n        std::cout << "\\n";\n    }\n    \n    return 0;\n}`,
        expectedOutput: "Row 1: 1 2 3 4 \nRow 2: 1 2 3 4 \nRow 3: 1 2 3 4 \n",
        exercises: [
          {
            exerciseType: "predict",
            instruction: "Look at the nested loop in the starter code. How many total stars (`*`) will this program print? (Modify the `expectedAnswer` variable to the correct integer to pass).",
            starterCode: `#include <iostream>\n\nint main() {\n    // Predict the total number of stars printed.\n    int expectedAnswer = 0;\n    \n    /* \n    int count = 0;\n    for (int i = 0; i < 5; i++) {\n        for (int j = 0; j < 3; j++) {\n            count++;\n        }\n    }\n    */\n    \n    std::cout << expectedAnswer << "\\n";\n    return 0;\n}`,
            expectedOutput: "15\n",
            hints: [
              "The outer loop runs 5 times (i = 0, 1, 2, 3, 4).",
              "The inner loop runs 3 times (j = 0, 1, 2) FOR EACH outer loop.",
              "Total executions = outer loops multiplied by inner loops. 5 * 3."
            ]
          }
        ],
        quiz: [
          {
            question: "In a nested loop, how often does the inner loop execute?",
            options: [
              "Once per program.",
              "It executes fully from start to finish for EVERY single iteration of the outer loop.",
              "It only executes when the outer loop finishes.",
              "It alternates turns with the outer loop."
            ],
            correctIndex: 1,
            explanation: "Every time the outer loop makes one lap, the inner loop is initialized again and runs through all of its iterations before the outer loop can move to its next lap."
          },
          {
            question: "If an outer loop runs 10 times, and its inner loop runs 10 times, how many times does the code inside the inner loop run in total?",
            options: [
              "10",
              "20",
              "100",
              "0"
            ],
            correctIndex: 2,
            explanation: "10 outer laps * 10 inner laps per outer lap = 100 total executions of the innermost code."
          }
        ]
      },
      {
        id: "ch6-l6",
        title: "Review: Loops and Repetition",
        difficulty: "beginner",
        content: `
<h2>Review: Loops and Repetition</h2>
<p>Congratulations! You have mastered the core control flow mechanisms of C++. With variables, conditions, and loops, your programs can now perform complex algorithms, make decisions, and automate repetitive tasks.</p>

<h3>Chapter Summary</h3>
<ul>
  <li><strong><code>while</code></strong>: Repeats as long as a condition is true. Best when you don't know exactly how many times the loop will run.</li>
  <li><strong><code>do-while</code></strong>: Like a <code>while</code> loop, but guarantees the code runs at least once before checking the condition.</li>
  <li><strong><code>for</code></strong>: A compact loop that gathers initialization, condition, and update in one line. Best when you know exactly how many times to count.</li>
  <li><strong><code>break</code></strong>: Instantly destroys and exits the loop.</li>
  <li><strong><code>continue</code></strong>: Skips the rest of the current iteration and jumps to the next lap.</li>
  <li><strong>Nested Loops</strong>: A loop inside a loop, multiplying the number of executions.</li>
</ul>

<h3>The Accumulator Pattern</h3>
<p>A very common pattern with loops is the <strong>accumulator</strong>. This is where you create a variable outside the loop (like <code>int total = 0;</code>), and then add to it over and over inside the loop. When the loop finishes, you have a final accumulated total.</p>

<div class="note">
  <strong>Stage 1 Complete!</strong> After this lesson, you will have completed Stage 1: Foundations. You now know the absolute core of C++. In Stage 2, we will learn how to organize larger programs using Functions, and store lists of data using Vectors!
</div>
        `,
        codeExample: `#include <iostream>\n\nint main() {\n    int sum{0};\n    \n    // The Accumulator Pattern\n    for (int i = 1; i <= 5; i++) {\n        sum = sum + i;\n        std::cout << "Added " << i << ", current sum is " << sum << "\\n";\n    }\n    \n    std::cout << "Final Total: " << sum << "\\n";\n    \n    return 0;\n}`,
        expectedOutput: "Added 1, current sum is 1\nAdded 2, current sum is 3\nAdded 3, current sum is 6\nAdded 4, current sum is 10\nAdded 5, current sum is 15\nFinal Total: 15\n",
        exercises: [
          {
            exerciseType: "review",
            instruction: "Use a `for` loop and the accumulator pattern to calculate the product (multiplication) of the numbers 1 through 4 (1 * 2 * 3 * 4). Print only the final result.",
            starterCode: `#include <iostream>\n\nint main() {\n    // We start at 1. (If we started at 0, multiplying would always result in 0!)\n    int product{1};\n    \n    // Write a for loop that goes from i = 1 up to and including 4\n    // Inside the loop, do: product = product * i;\n    \n    \n    std::cout << "Product: " << product << "\\n";\n    return 0;\n}`,
            expectedOutput: "Product: 24\n",
            hints: [
              "Your loop should look like: `for (int i = 1; i <= 4; i++)`.",
              "Inside the loop, update the variable: `product = product * i;`"
            ]
          },
          {
            exerciseType: "write",
            instruction: "Stage 1 Project: Write a program that uses nested loops to print a right-angled triangle of stars. The triangle should have 4 rows. Row 1 has 1 star, Row 2 has 2 stars, Row 3 has 3 stars, and Row 4 has 4 stars.",
            starterCode: `#include <iostream>\n\nint main() {\n    // Write an outer loop for rows (1 to 4)\n    \n    // Inside it, write an inner loop for columns.\n    // Here's the trick: the inner loop should run as long as col <= row!\n    // Inside the inner loop, print "*"\n    \n    // After the inner loop finishes, print a newline "\\n"\n    \n    \n    return 0;\n}`,
            expectedOutput: "*\n**\n***\n****\n",
            hints: [
              "Outer loop: `for (int row = 1; row <= 4; row++) {`",
              "Inner loop: `for (int col = 1; col <= row; col++) {`",
              "Inside the inner loop: `std::cout << \"*\";`",
              "After the inner loop closes, but inside the outer loop: `std::cout << \"\\n\";`"
            ]
          }
        ],
        quiz: [
          {
            question: "Which loop is the best choice if you know exactly how many times you want the code to repeat?",
            options: [
              "The `while` loop.",
              "The `do-while` loop.",
              "The `for` loop.",
              "The `if` statement."
            ],
            correctIndex: 2,
            explanation: "The `for` loop is explicitly designed for counting iterations because it groups the initialization, condition, and update steps all in one place."
          },
          {
            question: "What is an accumulator variable?",
            options: [
              "A variable that causes an infinite loop.",
              "A variable declared outside a loop that collects a running total or combined result as the loop executes.",
              "A special C++ keyword.",
              "A variable that holds a boolean value."
            ],
            correctIndex: 1,
            explanation: "An accumulator 'accumulates' results (like sums, products, or building a long string) over multiple loop iterations."
          },
          {
            question: "Why might a program print nothing instead of a grid when using nested loops?",
            options: [
              "Nested loops are not supported in C++17.",
              "The inner loop's condition was instantly false, preventing it from ever running.",
              "The outer loop lacked a `break` statement.",
              "The compiler optimized the loops away."
            ],
            correctIndex: 1,
            explanation: "If the inner loop's condition is poorly constructed and evaluates to false immediately, its block is skipped completely, meaning no output is produced during that iteration."
          }
        ]
      }
    ]
  });
})();
