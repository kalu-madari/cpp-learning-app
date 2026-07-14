(function() {
  window.CPP_CHAPTERS = window.CPP_CHAPTERS || [];
  window.CPP_CHAPTERS.push({
    id: 5,
    title: "Conditions and Decisions",
    description: "Control the flow of your programs.",
    icon: "🚦",
    lessons: [
      {
        id: "ch5-l1",
        title: "Making Decisions with if",
        difficulty: "beginner",
        content: `
<h2>Making Decisions with if</h2>
<p>So far, our programs have executed every statement in sequence, from top to bottom. But real-world programs need to make decisions. For example, a game should only grant a point if the player hits the target.</p>
<p><strong>Mental Model:</strong> Think of an <code>if</code> statement as a guarded path. The code inside the <code>if</code> block is protected by a condition. If the condition is true, the gate opens and the code runs. If false, the program skips the code entirely.</p>

<h3>The Syntax</h3>
<pre><code>if (condition) {
    // Code to run if condition is true
}</code></pre>
<p>The condition must be an expression that evaluates to a <code>bool</code> (true or false). You can use the comparison operators we learned in Chapter 4 (like <code>&gt;</code>, <code>==</code>, <code>&lt;=</code>).</p>

<h3>Worked Example</h3>
<p>Let's check if a user is old enough to vote.</p>
<div class="tip">
  <strong>Best Practice:</strong> Always use curly braces <code>{}</code> after an <code>if</code>, even if there is only one statement inside. It prevents accidental bugs if you add more lines later.
</div>
<div class="mistake">
  <strong>Common Mistake:</strong> Using assignment (<code>=</code>) instead of equality (<code>==</code>).
  <pre><code>if (age = 18) // BUG! This assigns 18 to age and evaluates to true!
if (age == 18) // Correct. This compares age to 18.</code></pre>
</div>
<p>What happens if the age is 17? The condition evaluates to <code>false</code>, the block is skipped, and it only prints "Program continues".</p>
        `,
        codeExample: `#include <iostream>\n\nint main() {\n    int age{20};\n    \n    std::cout << "Checking age...\\n";\n    \n    if (age >= 18) {\n        std::cout << "You can vote!\\n";\n    }\n    \n    std::cout << "Program continues.\\n";\n    return 0;\n}`,
        expectedOutput: "Checking age...\nYou can vote!\nProgram continues.\n",
        exercises: [
          {
            exerciseType: "complete",
            instruction: "Write an `if` statement that checks if the `temperature` is greater than 100. If so, print `\"Water is boiling\\n\"`.",
            starterCode: `#include <iostream>\n\nint main() {\n    int temperature{105};\n    \n    // Write your if statement below\n    \n    \n    std::cout << "Done\\n";\n    return 0;\n}`,
            expectedOutput: "Water is boiling\nDone\n",
            hints: [
              "Start with `if (temperature > 100)`.",
              "Don't forget the curly braces `{}` around the `std::cout` statement."
            ]
          }
        ],
        quiz: [
          {
            question: "What does an `if` statement do?",
            options: [
              "It loops over a block of code multiple times.",
              "It executes a block of code only if its condition evaluates to true.",
              "It stops the program from running.",
              "It converts a variable to a boolean."
            ],
            correctIndex: 1,
            explanation: "An `if` statement acts as a gatekeeper, running the code inside its block only if the provided condition is true."
          },
          {
            question: "What is the result of `if (x = 5)`?",
            options: [
              "It correctly checks if x is equal to 5.",
              "It causes a compiler error.",
              "It assigns 5 to x, evaluates to true, and the block always runs.",
              "It assigns 5 to x, evaluates to false, and the block never runs."
            ],
            correctIndex: 2,
            explanation: "The single equals sign `=` is assignment. `x = 5` sets `x` to 5 and returns 5, which is treated as `true` in C++. You should use `==` for comparison."
          },
          {
            question: "Why is it recommended to always use curly braces `{}` with `if` statements?",
            options: [
              "The compiler requires them by law.",
              "They make the program run faster.",
              "They prevent bugs when you later add more statements to the block.",
              "They automatically format your code."
            ],
            correctIndex: 2,
            explanation: "While C++ allows omitting braces for a single statement, adding a second statement later without adding braces will cause that second statement to run unconditionally, creating subtle bugs."
          }
        ]
      },
      {
        id: "ch5-l2",
        title: "Choosing Between Two Paths with if-else",
        difficulty: "beginner",
        content: `
<h2>Choosing Between Two Paths with if-else</h2>
<p>An <code>if</code> statement is great for running code conditionally, but what if you want to do something <em>else</em> when the condition is false? You could write two separate <code>if</code> statements, but C++ provides a better way: <code>if-else</code>.</p>
<p><strong>Mental Model:</strong> Think of <code>if-else</code> as a fork in the road. You must choose exactly one path. If the condition is true, you take the first path (the <code>if</code> block). If it is false, you take the second path (the <code>else</code> block). <strong>One path executes, never both.</strong></p>

<h3>The Syntax</h3>
<pre><code>if (condition) {
    // Runs if condition is true
} else {
    // Runs if condition is false
}</code></pre>
<p>Notice that <code>else</code> does not have its own condition. It simply catches everything that failed the <code>if</code> condition.</p>

<h3>Worked Example</h3>
<p>Let's check if a password matches.</p>
<div class="note">
  <strong>Note:</strong> We compare <code>std::string</code> variables using the <code>==</code> operator, just like we do with integers.
</div>
<p>If we change the <code>input</code> to "12345", the condition <code>input == password</code> evaluates to false. The <code>if</code> block is skipped, and the <code>else</code> block executes, printing "Access denied".</p>
        `,
        codeExample: `#include <iostream>\n#include <string>\n\nint main() {\n    std::string password{"secret"};\n    std::string input{"secret"};\n    \n    if (input == password) {\n        std::cout << "Access granted!\\n";\n    } else {\n        std::cout << "Access denied!\\n";\n    }\n    \n    return 0;\n}`,
        expectedOutput: "Access granted!\n",
        exercises: [
          {
            exerciseType: "debug",
            instruction: "This program checks if a number is even or odd, but the logic is broken. It prints the wrong result! Fix the condition so it prints correctly.",
            starterCode: `#include <iostream>\n\nint main() {\n    int number{4};\n    \n    // Bug: This logic is backward!\n    if (number % 2 == 1) {\n        std::cout << "Even\\n";\n    } else {\n        std::cout << "Odd\\n";\n    }\n    \n    return 0;\n}`,
            expectedOutput: "Even\n",
            hints: [
              "The remainder of an even number divided by 2 is 0.",
              "Change the condition to check if `number % 2` is equal to 0."
            ]
          }
        ],
        quiz: [
          {
            question: "In an `if-else` statement, is it possible for both blocks of code to run?",
            options: [
              "Yes, if the condition changes while the program is running.",
              "Yes, if the condition is neither true nor false.",
              "No, exactly one block will execute.",
              "No, they might both be skipped."
            ],
            correctIndex: 2,
            explanation: "An `if-else` statement guarantees that exactly one branch will execute. If the condition is true, the `if` block runs. Otherwise, the `else` block runs."
          },
          {
            question: "Does an `else` block require a condition?",
            options: [
              "Yes, it requires the opposite condition of the `if` statement.",
              "No, it automatically executes if the `if` condition is false.",
              "Only if you are comparing strings.",
              "Yes, otherwise the compiler throws an error."
            ],
            correctIndex: 1,
            explanation: "The `else` keyword does not take a condition. It serves as a catch-all for whenever the preceding `if` condition evaluates to false."
          },
          {
            question: "Why is `if-else` preferred over writing two separate `if` statements?",
            options: [
              "It is easier to read and guarantees that only one path executes.",
              "It makes the variables inside it global.",
              "Two `if` statements cannot be used in the same program.",
              "It allows the program to skip both blocks."
            ],
            correctIndex: 0,
            explanation: "Using `if-else` clearly expresses your intent that these are mutually exclusive choices. It's safer and easier for others to read than evaluating two separate conditions."
          }
        ]
      },
      {
        id: "ch5-l3",
        title: "Handling Multiple Choices with else-if Chains",
        difficulty: "beginner",
        content: `
<h2>Handling Multiple Choices with else-if Chains</h2>
<p>Sometimes a decision has more than two possible outcomes. For example, a grading system might output A, B, C, or F depending on the score. We can chain conditions together using <code>else if</code>.</p>
<p><strong>Mental Model:</strong> Think of an <code>else if</code> chain as an ordered checklist. The program checks conditions from top to bottom. As soon as it finds a <strong>true</strong> condition, it executes that block and <strong>skips the rest of the chain completely</strong>. If nothing is true, it executes the final <code>else</code> (if provided).</p>

<h3>The Syntax</h3>
<pre><code>if (condition1) {
    // Runs if condition1 is true
} else if (condition2) {
    // Runs if condition1 is false AND condition2 is true
} else {
    // Runs if ALL conditions above are false
}</code></pre>
<p>You can have as many <code>else if</code> blocks as you need.</p>

<h3>Condition Ordering Matters!</h3>
<div class="mistake">
  <strong>Common Mistake:</strong> Overlapping ranges. If you check <code>if (score >= 60)</code> before checking <code>if (score >= 90)</code>, a score of 95 will trigger the 60 block and skip the rest!
</div>
<p>Because the first true branch wins, you must order your conditions logically—usually from most restrictive to least restrictive.</p>
        `,
        codeExample: `#include <iostream>\n\nint main() {\n    int score{85};\n    \n    // Checked from top to bottom\n    if (score >= 90) {\n        std::cout << "Grade: A\\n";\n    } else if (score >= 80) {\n        std::cout << "Grade: B\\n";\n    } else if (score >= 70) {\n        std::cout << "Grade: C\\n";\n    } else {\n        std::cout << "Grade: F\\n";\n    }\n    \n    return 0;\n}`,
        expectedOutput: "Grade: B\n",
        exercises: [
          {
            exerciseType: "debug",
            instruction: "This program assigns a discount category based on age. Seniors (65+) get a 20% discount. Adults (18-64) get no discount. Children (under 18) get a 50% discount. The `else-if` chain is out of order, so some people get the wrong discount. Fix the ordering.",
            starterCode: `#include <iostream>\n\nint main() {\n    int age{70};\n    \n    // Bug: The first true condition wins, so order matters!\n    if (age >= 0) {\n        std::cout << "Child: 50% discount\\n";\n    } else if (age >= 18) {\n        std::cout << "Adult: No discount\\n";\n    } else if (age >= 65) {\n        std::cout << "Senior: 20% discount\\n";\n    }\n    \n    return 0;\n}`,
            expectedOutput: "Senior: 20% discount\n",
            hints: [
              "If `age` is 70, `age >= 0` evaluates to true, so it incorrectly prints the Child discount.",
              "Test the most restrictive (highest) age first: `age >= 65`.",
              "End with a final `else` for the Child discount to catch any remaining ages."
            ]
          }
        ],
        quiz: [
          {
            question: "In an `else if` chain, what happens after the first true condition is found and its block executes?",
            options: [
              "The program skips the rest of the chain.",
              "The program continues checking the remaining conditions.",
              "The program crashes.",
              "The program executes the final `else` block as well."
            ],
            correctIndex: 0,
            explanation: "An `if / else if / else` chain guarantees that at most one block executes. Once a true condition is found, its block runs and the entire rest of the chain is skipped."
          },
          {
            question: "Why does the order of conditions matter in an `else if` chain?",
            options: [
              "Because C++ compiles from bottom to top.",
              "Because the first true condition wins, which can hide more specific conditions if they are placed lower down.",
              "Because you cannot mix `<` and `>` in the same chain.",
              "It doesn't matter; the compiler automatically sorts them."
            ],
            correctIndex: 1,
            explanation: "Since evaluation stops at the first true condition, checking a broad condition (like `age >= 0`) before a specific one (like `age >= 65`) will prevent the specific one from ever running."
          },
          {
            question: "Is the final `else` block mandatory at the end of an `else if` chain?",
            options: [
              "Yes, every chain must end with `else`.",
              "No, you can omit it. If no conditions are true, the entire chain is just skipped.",
              "Yes, but only if you use more than two `else if` blocks.",
              "No, but omitting it causes a compiler warning."
            ],
            correctIndex: 1,
            explanation: "The final `else` is completely optional. If you omit it and none of the `if` or `else if` conditions are true, the program safely does nothing and moves on."
          }
        ]
      },
      {
        id: "ch5-l4",
        title: "Combining and Nesting Conditions",
        difficulty: "beginner",
        content: `
<h2>Combining and Nesting Conditions</h2>
<p>What if a decision requires multiple facts to be true at the same time? For example, to ride a rollercoaster, you must be tall enough <strong>AND</strong> old enough.</p>
<p>We can use the Logical Operators from Chapter 4 (<code>&&</code> for AND, <code>||</code> for OR, <code>!</code> for NOT) directly inside our <code>if</code> conditions.</p>

<h3>Short-Circuit Evaluation</h3>
<p>When C++ evaluates combined conditions, it is lazy (in a good way!). This is called <strong>short-circuit evaluation</strong>.</p>
<ul>
  <li>For <code>A && B</code>: If <code>A</code> is false, C++ knows the whole expression must be false, so it <em>never even checks</em> <code>B</code>.</li>
  <li>For <code>A || B</code>: If <code>A</code> is true, C++ knows the whole expression must be true, so it skips checking <code>B</code>.</li>
</ul>

<h3>Nested Decisions</h3>
<p>Sometimes you need to make a decision <em>inside</em> another decision. You can simply place an <code>if</code> statement inside the block of another <code>if</code> statement. This is called <strong>nesting</strong>.</p>

<h3>Using bool Variables Directly</h3>
<div class="tip">
  <strong>Best Practice:</strong> Don't write <code>if (hasTicket == true)</code>. A <code>bool</code> variable is already true or false! Just write <code>if (hasTicket)</code>. It is much cleaner and reads like English.
</div>
        `,
        codeExample: `#include <iostream>\n\nint main() {\n    bool hasTicket{true};\n    int heightCm{130};\n    \n    // Using a bool directly, combined with a comparison\n    if (hasTicket && heightCm >= 120) {\n        std::cout << "Welcome to the ride!\\n";\n        \n        // Nested decision\n        if (heightCm > 200) {\n            std::cout << "Watch your head!\\n";\n        }\n    } else {\n        std::cout << "Sorry, you cannot ride.\\n";\n    }\n    \n    return 0;\n}`,
        expectedOutput: "Welcome to the ride!\n",
        exercises: [
          {
            exerciseType: "modify",
            instruction: "Modify the boolean `canRide` to use the Logical OR (`||`) operator. The user can ride if they are at least 15 years old OR if they have parental consent.",
            starterCode: `#include <iostream>\n\nint main() {\n    int age{14};\n    bool hasParentalConsent{true};\n    \n    // Modify this variable's initialization\n    bool canRide = false;\n    \n    if (canRide) {\n        std::cout << "Can ride\\n";\n    } else {\n        std::cout << "Cannot ride\\n";\n    }\n    \n    return 0;\n}`,
            expectedOutput: "Can ride\n",
            hints: [
              "Assign `canRide` the result of a boolean expression.",
              "The expression should check if `age >= 15` OR `hasParentalConsent`.",
              "Use `age >= 15 || hasParentalConsent`."
            ]
          }
        ],
        quiz: [
          {
            question: "What is short-circuit evaluation?",
            options: [
              "When a program crashes due to a power failure.",
              "When C++ skips evaluating the second half of a logical expression because the result is already known.",
              "When an `if` statement is written on a single line.",
              "When the compiler removes unused variables."
            ],
            correctIndex: 1,
            explanation: "If C++ evaluates the first part of an `&&` and it is false, it knows the whole thing is false and skips the rest. This saves time and is called short-circuiting."
          },
          {
            question: "Why is `if (isReady)` preferred over `if (isReady == true)`?",
            options: [
              "Because `== true` causes a compiler error.",
              "Because `isReady` is an integer.",
              "Because `isReady` already evaluates to a boolean `true` or `false`, making `== true` redundant and cluttered.",
              "Because `isReady` is a function."
            ],
            correctIndex: 2,
            explanation: "Boolean variables inherently represent truth or falsehood. Comparing them to `true` is redundant (like saying 'is it true that it is true?')."
          },
          {
            question: "What is a nested `if` statement?",
            options: [
              "An `if` statement that is written inside the curly braces of another `if` statement.",
              "An `if` statement that has no `else` block.",
              "An `if` statement that checks multiple conditions using `&&`.",
              "A syntax error in C++."
            ],
            correctIndex: 0,
            explanation: "Nesting refers to placing one control structure inside another, creating a decision within a decision."
          }
        ]
      },
      {
        id: "ch5-l5",
        title: "The switch Statement and Ternary Operator",
        difficulty: "beginner",
        content: `
<h2>The switch Statement and Ternary Operator</h2>
<p>C++ provides two additional tools for making decisions that can make your code cleaner in specific situations.</p>

<h3>The switch Statement</h3>
<p>If you need to check a single integer or character against many specific exact values, a <code>switch</code> statement is often cleaner than a long <code>else if</code> chain.</p>
<pre><code>switch (variable) {
    case 1:
        // do something
        break;
    case 2:
        // do something else
        break;
    default:
        // do this if no cases match
}</code></pre>
<p><strong>Crucial Rule:</strong> You must include the <code>break;</code> statement at the end of each case. If you forget it, the program will "fall through" and execute the next case's code as well, even if the value doesn't match!</p>

<h3>The Ternary Operator (?:)</h3>
<p>The conditional ternary operator is a shortcut for a simple <code>if-else</code> statement that returns a value. It asks a question and returns one of two values based on the answer.</p>
<pre><code>result = (condition) ? valueIfTrue : valueIfFalse;</code></pre>
<p>Example: <code>int max = (a &gt; b) ? a : b;</code></p>
<p>Use it sparingly! It is great for tiny assignments, but terrible for complex logic.</p>
        `,
        codeExample: `#include <iostream>\n\nint main() {\n    int rank{2};\n    \n    // Using switch for exact matches\n    switch (rank) {\n        case 1:\n            std::cout << "Gold\\n";\n            break;\n        case 2:\n            std::cout << "Silver\\n";\n            break;\n        case 3:\n            std::cout << "Bronze\\n";\n            break;\n        default:\n            std::cout << "Participant\\n";\n    }\n    \n    // Using ternary operator for a quick assignment\n    int points = (rank == 1) ? 100 : 10;\n    std::cout << "Points: " << points << "\\n";\n    \n    return 0;\n}`,
        expectedOutput: "Silver\nPoints: 10\n",
        exercises: [
          {
            exerciseType: "debug",
            instruction: "This program uses a `switch` statement to print a direction (1 = North, 2 = East). But it has a 'fall-through' bug. Fix it.",
            starterCode: `#include <iostream>\n\nint main() {\n    int direction{1};\n    \n    switch (direction) {\n        case 1:\n            std::cout << "North\\n";\n        case 2:\n            std::cout << "East\\n";\n        case 3:\n            std::cout << "South\\n";\n        case 4:\n            std::cout << "West\\n";\n        default:\n            std::cout << "Unknown\\n";\n    }\n    \n    return 0;\n}`,
            expectedOutput: "North\n",
            hints: [
              "When `direction` is 1, it starts executing at `case 1:`.",
              "Because there is nothing telling it to stop, it continues executing the code inside `case 2`, `case 3`, etc.",
              "Add a `break;` statement at the end of every case."
            ]
          }
        ],
        quiz: [
          {
            question: "What happens if you forget the `break;` statement in a `switch` case?",
            options: [
              "The compiler throws an error.",
              "The program skips all the remaining cases.",
              "The program falls through and executes the code in the following cases as well.",
              "The program automatically breaks at the next `case` label."
            ],
            correctIndex: 2,
            explanation: "This is known as 'fall-through'. Execution continues into the next case's block, ignoring the case label entirely, until it hits a break or the end of the switch."
          },
          {
            question: "What does the `default:` label do in a `switch` statement?",
            options: [
              "It sets a variable to its default value.",
              "It acts like the final `else` in an `else if` chain, executing if no cases match.",
              "It is required at the top of every switch statement.",
              "It prevents fall-through bugs."
            ],
            correctIndex: 1,
            explanation: "The `default` case handles any values that were not explicitly matched by previous `case` statements."
          },
          {
            question: "What is the purpose of the conditional ternary operator (`?:`)?",
            options: [
              "To check three different variables at once.",
              "To replace large `switch` statements.",
              "To provide a concise way to assign one of two values based on a single condition.",
              "To create infinite loops."
            ],
            correctIndex: 2,
            explanation: "The ternary operator is essentially a compact `if-else` that evaluates to a result, making it perfect for small inline conditional assignments."
          }
        ]
      },
      {
        id: "ch5-l6",
        title: "Review: Conditions and Decisions",
        difficulty: "beginner",
        content: `
<h2>Review: Conditions and Decisions</h2>
<p>Great job! You now know how to make your programs smart enough to make decisions and handle different scenarios.</p>

<h3>Chapter Summary</h3>
<ul>
  <li><strong><code>if</code></strong>: Executes a block of code only if the condition is true.</li>
  <li><strong><code>if-else</code></strong>: A fork in the road. Exactly one of the two blocks executes.</li>
  <li><strong><code>else if</code> chains</strong>: An ordered checklist. The first true condition wins, and the rest are skipped.</li>
  <li><strong>Logical Operators</strong>: Combine conditions using <code>&&</code> (AND), <code>||</code> (OR), and <code>!</code> (NOT).</li>
  <li><strong><code>switch</code></strong>: Clean syntax for comparing a single value against many exact matches. Don't forget the <code>break;</code>!</li>
</ul>

<p>In the upcoming chapters, we will learn how to make our code repeat itself using loops, which will finally allow us to build continuous programs!</p>
        `,
        codeExample: `#include <iostream>\n\nint main() {\n    int batteryPercent{15};\n    bool isCharging{true};\n    \n    std::cout << "System Status:\\n";\n    \n    // Synthesizing everything!\n    if (isCharging) {\n        std::cout << "Charging...\\n";\n    } else if (batteryPercent > 20) {\n        std::cout << "Battery OK.\\n";\n    } else if (batteryPercent > 0) {\n        std::cout << "Low battery warning!\\n";\n    } else {\n        std::cout << "Shutting down.\\n";\n    }\n    \n    return 0;\n}`,
        expectedOutput: "System Status:\nCharging...\n",
        exercises: [
          {
            exerciseType: "review",
            instruction: "Write a program that evaluates a temperature and a weather condition. If `isRaining` is true AND `temperature` is below 15, print `\"Wear a heavy coat\\n\"`. If `isRaining` is true but `temperature` is 15 or higher, print `\"Bring an umbrella\\n\"`. Otherwise, print `\"Looks clear\\n\"`. Use an `if` / `else if` / `else` chain.",
            starterCode: `#include <iostream>\n\nint main() {\n    int temperature{10};\n    bool isRaining{true};\n    \n    // Add your logic here\n    // Print exactly: "Wear a heavy coat\\n", "Bring an umbrella\\n", or "Looks clear\\n"\n    \n    \n    return 0;\n}`,
            expectedOutput: "Wear a heavy coat\n",
            hints: [
              "First condition: `if (isRaining && temperature < 15)`",
              "Second condition: `else if (isRaining)` (we already know temperature is not < 15 if we reach here, so just checking `isRaining` is enough!)",
              "Final fallback: `else`"
            ]
          },
          {
            exerciseType: "debug",
            instruction: "This program tries to grant VIP access if the user's role is 1 (Admin) OR their level is above 50. However, the logic operator is wrong. Fix it.",
            starterCode: `#include <iostream>\n\nint main() {\n    int role{2};     // 2 = Standard User\n    int level{55};\n    \n    // Bug: Uses AND instead of OR\n    if (role == 1 && level > 50) {\n        std::cout << "VIP Access Granted\\n";\n    } else {\n        std::cout << "Access Denied\\n";\n    }\n    \n    return 0;\n}`,
            expectedOutput: "VIP Access Granted\n",
            hints: [
              "The `&&` operator means BOTH sides must be true.",
              "The `||` operator means AT LEAST ONE side must be true.",
              "Change `&&` to `||`."
            ]
          }
        ],
        quiz: [
          {
            question: "Which of the following scenarios is best handled by a `switch` statement?",
            options: [
              "Checking if a player's score is greater than 1000.",
              "Checking if an error code is exactly 404, 500, or 403.",
              "Checking if a user is both an admin and logged in.",
              "Checking if a temperature is between 0 and 100."
            ],
            correctIndex: 1,
            explanation: "A `switch` statement is designed specifically for testing a single value against multiple exact, distinct integer or character matches. It cannot test ranges or complex combined conditions."
          },
          {
            question: "If a boolean variable `isLightOn` is `false`, what does `!isLightOn` evaluate to?",
            options: [
              "false",
              "true",
              "It causes an error.",
              "0"
            ],
            correctIndex: 1,
            explanation: "The Logical NOT operator (`!`) flips a boolean value. If it was false, it becomes true."
          },
          {
            question: "Why should you avoid overlapping ranges in an `else if` chain?",
            options: [
              "Because it uses too much memory.",
              "Because the compiler will reject it.",
              "Because the first true condition will execute and skip the rest, meaning lower conditions might never run.",
              "Because it requires a `switch` statement instead."
            ],
            correctIndex: 2,
            explanation: "In an `else if` chain, only the first matching branch executes. If a higher branch is too broad (e.g., `x > 0`), more specific branches below it (e.g., `x > 100`) become unreachable."
          }
        ]
      }
    ]
  });
})();
