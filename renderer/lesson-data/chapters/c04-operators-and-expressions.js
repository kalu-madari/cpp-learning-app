(function() {
  window.CPP_CHAPTERS = window.CPP_CHAPTERS || [];
  window.CPP_CHAPTERS.push({
    id: 4,
    title: "Operators and Expressions",
    description: "Learn how to perform calculations, compare values, and combine data.",
    icon: "🧮",
    lessons: [
      {
        id: "ch4-l1",
        title: "Arithmetic Operators and Integer Division",
        difficulty: "beginner",
        content: `
          <h2>Performing Calculations</h2>
          <p>Programs are not just about storing and printing data; they are about processing it. In C++, we use <strong>arithmetic operators</strong> to perform mathematical calculations.</p>

          <h3>The Mental Model</h3>
          <p>Think of an <strong>expression</strong> as a math problem, and an <strong>operator</strong> as the action you take. When C++ sees an expression like <code>5 + 3</code>, it evaluates it, finds the answer (8), and then uses that single resulting value in your program.</p>

          <h3>Prerequisite Recall</h3>
          <p>In Chapter 2, we learned about the <code>int</code> and <code>double</code> data types. We also learned how to assign values to variables using the assignment operator <code>=</code>.</p>

          <h3>The Core Concept: Arithmetic Operators</h3>
          <p>C++ provides five fundamental arithmetic operators:</p>
          <ul>
            <li><code>+</code> : Addition</li>
            <li><code>-</code> : Subtraction</li>
            <li><code>*</code> : Multiplication</li>
            <li><code>/</code> : Division</li>
            <li><code>%</code> : Remainder (often called modulo)</li>
          </ul>
          <p>The remainder operator <code>%</code> divides two numbers and gives you only the remainder. It requires both numbers to be integers. (e.g., <code>10 % 3</code> is 1, because 10 divided by 3 is 3 with a remainder of 1).</p>

          <h3>Integer Division Truncates!</h3>
          <p>The most important rule in C++ arithmetic is how division works with integers. If you divide an <code>int</code> by an <code>int</code>, the result is <em>always</em> an <code>int</code>. The fractional part is completely discarded (truncated toward zero). It does <strong>not</strong> round.</p>
          <ul>
            <li><code>10.0 / 4.0</code> results in <code>2.5</code> (because they are doubles).</li>
            <li><code>10 / 4</code> results in <code>2</code> (because they are integers).</li>
          </ul>

          <h3>Syntax Breakdown</h3>
          <pre><code>int result = 10 / 4;</code></pre>
          <ul>
            <li><code>10 / 4</code>: The arithmetic expression.</li>
            <li><code>/</code>: The division operator.</li>
            <li><code>=</code>: The assignment operator, which takes the evaluated result (2) and stores it in the variable.</li>
          </ul>

          <h3>Worked Example: Line by Line</h3>
          <ol>
            <li><code>#include &lt;iostream&gt;</code></li>
            <li><code>int main() {</code></li>
            <li><code>int slices{11};</code> — We have 11 slices of pizza.</li>
            <li><code>int people{4};</code> — We have 4 people.</li>
            <li><code>int slicesPerPerson = slices / people;</code> — 11 / 4 evaluates to 2 (fractional part is discarded).</li>
            <li><code>int leftover = slices % people;</code> — 11 divided by 4 leaves a remainder of 3.</li>
            <li><code>std::cout &lt;&lt; "Each person gets " &lt;&lt; slicesPerPerson &lt;&lt; " slices.\\n";</code> — Prints 2.</li>
            <li><code>std::cout &lt;&lt; "Leftover slices: " &lt;&lt; leftover &lt;&lt; "\\n";</code> — Prints 3.</li>
            <li><code>return 0;</code></li>
            <li><code>}</code></li>
          </ol>

          <div class="mistake">
            <strong>Common Mistake:</strong> Using <code>%</code> with <code>double</code> variables. The remainder operator is only defined for integral types (like <code>int</code>). The compiler will throw an error if you try to use it with floating-point numbers.
          </div>

          <h3>Predict Activity</h3>
          <p>If you write <code>int x = 99 / 100;</code>, what exact value will be stored in <code>x</code>?</p>
        `,
        codeExample: "#include <iostream>\n\nint main() {\n    int a{15};\n    int b{4};\n    \n    std::cout << \"a + b = \" << a + b << \"\\n\";\n    std::cout << \"a - b = \" << a - b << \"\\n\";\n    std::cout << \"a * b = \" << a * b << \"\\n\";\n    std::cout << \"a / b = \" << a / b << \"\\n\";\n    std::cout << \"a % b = \" << a % b << \"\\n\";\n    \n    return 0;\n}",
        expectedOutput: "a + b = 19\na - b = 11\na * b = 60\na / b = 3\na % b = 3\n",
        exercises: [
          {
            instruction: "Write a program that calculates how many weeks and extra days are in a given number of days. The starter code has a variable for 45 days. Use the `/` operator to find the weeks, and the `%` operator to find the remaining days. Store them in the provided variables and print the result.",
            starterCode: "#include <iostream>\n\nint main() {\n    int totalDays{45};\n    \n    // Calculate weeks and extraDays here\n    int weeks{0};\n    int extraDays{0};\n    \n    std::cout << totalDays << \" days is \" << weeks << \" weeks and \" << extraDays << \" days.\\n\";\n    return 0;\n}",
            expectedOutput: "45 days is 6 weeks and 3 days.\n",
            exerciseType: "complete",
            hints: [
              "There are 7 days in a week.",
              "Set `weeks = totalDays / 7;`.",
              "Set `extraDays = totalDays % 7;`."
            ]
          }
        ],
        quiz: [
          {
            question: "What is the result of the expression 7 / 2 in C++?",
            options: [
              "3.5",
              "3",
              "4",
              "It causes a compiler error."
            ],
            correctIndex: 1,
            explanation: "Because both 7 and 2 are integers, C++ performs integer division. The fractional part (.5) is truncated, leaving exactly 3."
          },
          {
            question: "What does the % operator do?",
            options: [
              "Calculates the percentage of a number.",
              "Divides two numbers and returns the decimal part.",
              "Divides two integers and returns the remainder.",
              "Multiplies two numbers."
            ],
            correctIndex: 2,
            explanation: "The % operator (remainder) divides two integers and returns whatever is left over. For example, 10 % 3 is 1."
          },
          {
            question: "Which of the following is true about integer division?",
            options: [
              "It truncates the fractional part, effectively rounding towards zero.",
              "It always rounds to the nearest whole number.",
              "It only works with even numbers.",
              "It automatically converts the result into a double."
            ],
            correctIndex: 0,
            explanation: "Integer division simply drops the fractional part entirely. 99 / 100 becomes 0, because the 0.99 is discarded."
          }
        ]
      },
      {
        id: "ch4-l2",
        title: "Implicit Conversions and static_cast",
        difficulty: "beginner",
        content: `
          <h2>Mixing Types and Forcing Decimals</h2>
          <p>We know that integer division truncates. But what if we <em>want</em> the exact decimal result of an equation involving variables? We need to understand how C++ handles types when they are mixed together.</p>

          <h3>The Mental Model</h3>
          <p>Imagine you have a glass of water (an <code>int</code>) and a large jug of juice (a <code>double</code>). If you mix them together, the entire mixture becomes juice. In C++, if an expression contains both an <code>int</code> and a <code>double</code>, the compiler automatically upgrades the <code>int</code> to a <code>double</code> so no information is lost.</p>

          <h3>The Core Concept: Implicit Conversion</h3>
          <p>When you perform arithmetic with a <code>double</code> and an <code>int</code>, C++ automatically converts the <code>int</code> into a <code>double</code> behind the scenes before calculating. This is called <strong>implicit conversion</strong>.</p>
          <p>For example, <code>5.0 / 2</code>: C++ sees the <code>5.0</code> (double), temporarily turns the <code>2</code> into <code>2.0</code>, and performs floating-point division to yield <code>2.5</code>.</p>

          <h3>The Core Concept: static_cast</h3>
          <p>If both variables are integers, implicit conversion won't happen. <code>int / int</code> is still integer division. To force floating-point division, we can explicitly convert one of the integers into a <code>double</code> using a tool called <code>static_cast</code>.</p>

          <h3>Syntax Breakdown</h3>
          <pre><code>double result = static_cast&lt;double&gt;(score) / total;</code></pre>
          <ul>
            <li><code>static_cast</code>: The C++ keyword for a safe, explicit type conversion.</li>
            <li><code>&lt;double&gt;</code>: The target type we want to convert to.</li>
            <li><code>(score)</code>: The variable we are converting.</li>
          </ul>
          <p>Because <code>score</code> is cast to a <code>double</code>, the entire division becomes floating-point division!</p>

          <h3>Worked Example: Line by Line</h3>
          <ol>
            <li><code>#include &lt;iostream&gt;</code></li>
            <li><code>int main() {</code></li>
            <li><code>int points{7};</code></li>
            <li><code>int maxPoints{10};</code></li>
            <li><code>double wrong = points / maxPoints;</code> — Integer division happens <em>first</em> (7 / 10 = 0). Then 0 is implicitly converted to <code>0.0</code> and stored. This is usually a bug!</li>
            <li><code>double correct = static_cast&lt;double&gt;(points) / maxPoints;</code> — <code>points</code> becomes <code>7.0</code>. Then <code>7.0 / 10</code> yields <code>0.7</code>.</li>
            <li><code>std::cout &lt;&lt; "Wrong math: " &lt;&lt; wrong &lt;&lt; "\\n";</code></li>
            <li><code>std::cout &lt;&lt; "Correct math: " &lt;&lt; correct &lt;&lt; "\\n";</code></li>
            <li><code>return 0;</code></li>
            <li><code>}</code></li>
          </ol>

          <div class="note">
            <strong>Note:</strong> <code>static_cast</code> does not permanently change the variable's type. It just creates a temporary converted value for that specific calculation.
          </div>

          <div class="mistake">
            <strong>Common Mistake:</strong> Writing <code>static_cast&lt;double&gt;(points / maxPoints)</code>. This casts the <em>result</em> of the division. The integer division (7 / 10 = 0) already happened inside the parentheses! You must cast one of the variables before the division happens.
          </div>

          <h3>Predict Activity</h3>
          <p>If you write <code>double x = 5 / 2;</code>, what value is stored in <code>x</code>, and why?</p>
        `,
        codeExample: "#include <iostream>\n\nint main() {\n    int sum{25};\n    int count{4};\n    \n    // Integer division\n    int intAverage = sum / count;\n    std::cout << \"Integer average: \" << intAverage << \"\\n\";\n    \n    // Floating-point division using static_cast\n    double preciseAverage = static_cast<double>(sum) / count;\n    std::cout << \"Precise average: \" << preciseAverage << \"\\n\";\n    \n    return 0;\n}",
        expectedOutput: "Integer average: 6\nPrecise average: 6.25\n",
        exercises: [
          {
            instruction: "You are writing a program to calculate the average temperature over 3 days. The temperatures are integers, but the average must be exact (a double). Use static_cast on the `sum` variable to ensure floating-point division is used.",
            starterCode: "#include <iostream>\n\nint main() {\n    int day1{72};\n    int day2{75};\n    int day3{70};\n    \n    int sum = day1 + day2 + day3;\n    int days = 3;\n    \n    // Fix the line below to use static_cast<double>\n    double average = sum / days;\n    \n    std::cout << \"Average temp: \" << average << \"\\n\";\n    return 0;\n}",
            expectedOutput: "Average temp: 72.3333\n",
            exerciseType: "modify",
            hints: [
              "Currently, `sum / days` is an `int / int`, which truncates the result.",
              "Change the assignment to: `double average = static_cast<double>(sum) / days;`."
            ]
          }
        ],
        quiz: [
          {
            question: "What happens when an expression contains both an int and a double (e.g., 5.0 + 2)?",
            options: [
              "The double is implicitly converted to an int, dropping the decimal.",
              "The int is implicitly converted to a double before the calculation.",
              "The compiler throws a type mismatch error.",
              "The program crashes at runtime."
            ],
            correctIndex: 1,
            explanation: "C++ implicitly converts the smaller or less precise type (int) into the more precise type (double) to prevent data loss."
          },
          {
            question: "Why does `double result = 5 / 2;` result in 2.0 instead of 2.5?",
            options: [
              "Because the result variable is not large enough.",
              "Because you need to `#include <math>`.",
              "Because C++ always rounds down.",
              "Because integer division (5 / 2) happens first, yielding 2. The 2 is then implicitly converted to 2.0 to be stored in the double."
            ],
            correctIndex: 3,
            explanation: "The expression on the right side of the assignment is evaluated first. Since both 5 and 2 are integers, integer division yields 2. Only after that is the 2 converted to a double for assignment."
          },
          {
            question: "What is the correct syntax to force floating-point division when dividing int variable 'a' by int variable 'b'?",
            options: [
              "static_cast<double>(a) / b",
              "static_cast<double>(a / b)",
              "static_cast(double, a) / b",
              "(double) a / b"
            ],
            correctIndex: 0,
            explanation: "static_cast<double>(a) explicitly converts 'a' into a double. Since one operand is now a double, implicit conversion takes care of 'b', and floating-point division is used."
          }
        ]
      },
      {
        id: "ch4-l3",
        title: "Comparison and Logical Operators",
        difficulty: "beginner",
        content: `
          <h2>Evaluating Truth</h2>
          <p>Programs need to compare data to make decisions. Are two variables equal? Is one greater than the other? We answer these questions using <strong>comparison operators</strong> and <strong>logical operators</strong>, which evaluate to boolean values (<code>true</code> or <code>false</code>).</p>

          <h3>The Mental Model</h3>
          <p>Think of a comparison operator like a judge. You hand it two values (e.g., <code>5 &gt; 3</code>), and it bangs its gavel and issues a verdict: <code>true</code> (1) or <code>false</code> (0). You can then combine multiple verdicts using logical operators (AND, OR, NOT) to form complex conclusions.</p>

          <h3>Prerequisite Recall</h3>
          <p>In Chapter 2, we learned about the <code>bool</code> data type, which stores <code>true</code> or <code>false</code>. When a <code>bool</code> is printed to the console using <code>std::cout</code>, it prints as <code>1</code> (for true) or <code>0</code> (for false).</p>

          <h3>The Core Concept: Comparison Operators</h3>
          <p>C++ uses these operators to compare values:</p>
          <ul>
            <li><code>==</code> : Equal to (notice it is TWO equals signs)</li>
            <li><code>!=</code> : Not equal to</li>
            <li><code>&lt;</code> : Less than</li>
            <li><code>&gt;</code> : Greater than</li>
            <li><code>&lt;=</code> : Less than or equal to</li>
            <li><code>&gt;=</code> : Greater than or equal to</li>
          </ul>

          <h3>The Core Concept: Logical Operators</h3>
          <p>Logical operators allow you to combine boolean verdicts:</p>
          <ul>
            <li><code>&amp;&amp;</code> (Logical AND) : True ONLY if <strong>both</strong> sides are true.</li>
            <li><code>||</code> (Logical OR) : True if <strong>at least one</strong> side is true.</li>
            <li><code>!</code> (Logical NOT) : Flips the truth value. True becomes false; false becomes true.</li>
          </ul>

          <h3>Syntax Breakdown</h3>
          <pre><code>bool isWinner = (score &gt;= 100) &amp;&amp; (time &lt; 60);</code></pre>
          <ul>
            <li><code>(score &gt;= 100)</code>: A comparison expression evaluating to true/false.</li>
            <li><code>(time &lt; 60)</code>: Another comparison expression.</li>
            <li><code>&amp;&amp;</code>: Combines them. <code>isWinner</code> is only true if BOTH conditions are met.</li>
          </ul>

          <h3>Worked Example: Line by Line</h3>
          <ol>
            <li><code>#include &lt;iostream&gt;</code></li>
            <li><code>int main() {</code></li>
            <li><code>int age{20};</code></li>
            <li><code>bool hasLicense{true};</code></li>
            <li><code>bool canRentCar = (age &gt;= 25);</code> — Evaluates to false (0), because 20 is not &gt;= 25.</li>
            <li><code>bool canDrive = (age &gt;= 16) &amp;&amp; hasLicense;</code> — Evaluates to true (1), because BOTH are true.</li>
            <li><code>std::cout &lt;&lt; "Can drive: " &lt;&lt; canDrive &lt;&lt; "\\n";</code> — Prints 1.</li>
            <li><code>std::cout &lt;&lt; "Can rent car: " &lt;&lt; canRentCar &lt;&lt; "\\n";</code> — Prints 0.</li>
            <li><code>return 0;</code></li>
            <li><code>}</code></li>
          </ol>

          <div class="tip">
            <strong>Printing True/False:</strong> By default, <code>cout</code> prints bools as 1 and 0. If you insert <code>std::boolalpha</code> into the stream (e.g., <code>std::cout &lt;&lt; std::boolalpha &lt;&lt; canDrive;</code>), it will print the words "true" and "false" instead!
          </div>

          <div class="mistake">
            <strong>Common Mistake:</strong> Confusing the assignment operator <code>=</code> with the equality operator <code>==</code>. <code>a = b</code> assigns the value of b to a. <code>a == b</code> compares them and yields true or false. This is a very frequent source of bugs!
          </div>

          <h3>Predict Activity</h3>
          <p>What is the boolean result of <code>!(5 == 5)</code>?</p>
        `,
        codeExample: "#include <iostream>\n\nint main() {\n    int battery{15};\n    bool isPluggedIn{false};\n    \n    // Using std::boolalpha to print \"true\" or \"false\"\n    std::cout << std::boolalpha;\n    \n    bool lowBatteryWarning = (battery <= 20) && !isPluggedIn;\n    std::cout << \"Show warning: \" << lowBatteryWarning << \"\\n\";\n    \n    bool isCharging = isPluggedIn || (battery == 100);\n    std::cout << \"Is charging: \" << isCharging << \"\\n\";\n    \n    return 0;\n}",
        expectedOutput: "Show warning: true\nIs charging: false\n",
        exercises: [
          {
            instruction: "You are writing a security script. Access is granted if the user's role is 1 (Admin) OR if their role is 2 (Manager) AND they have the security clearance key (hasKey = true). Update the `accessGranted` boolean expression to reflect these rules.",
            starterCode: "#include <iostream>\n\nint main() {\n    int role{2};\n    bool hasKey{true};\n    \n    // Modify the line below using logical operators\n    bool accessGranted = false;\n    \n    std::cout << std::boolalpha;\n    std::cout << \"Access Granted: \" << accessGranted << \"\\n\";\n    return 0;\n}",
            expectedOutput: "Access Granted: true\n",
            exerciseType: "complete",
            hints: [
              "You need to check if `role == 1`.",
              "You also need to check if `role == 2 && hasKey`.",
              "Combine them with the OR operator: `(role == 1) || (role == 2 && hasKey)`."
            ]
          },
          {
            instruction: "This code is supposed to check if a number is between 10 and 20 (inclusive). However, the logic is incorrect. Fix the boolean expression.",
            starterCode: "#include <iostream>\n\nint main() {\n    int value{15};\n    \n    // Bug: You cannot chain comparisons like this in C++!\n    bool inRange = (10 <= value <= 20);\n    \n    std::cout << std::boolalpha;\n    std::cout << \"In range: \" << inRange << \"\\n\";\n    return 0;\n}",
            expectedOutput: "In range: true\n",
            exerciseType: "debug",
            hints: [
              "In math you can write `10 <= value <= 20`, but in C++ this evaluates `10 <= value` into a boolean (true/1), and then checks if `1 <= 20`.",
              "You must split it into two distinct checks combined with Logical AND (`&&`).",
              "Change it to: `(value >= 10) && (value <= 20)`."
            ]
          }
        ],
        quiz: [
          {
            question: "What is the difference between = and == ?",
            options: [
              "= assigns a value to a variable, == compares two values for equality.",
              "There is no difference.",
              "= compares two values, == assigns a value.",
              "== is used for numbers, = is used for text."
            ],
            correctIndex: 0,
            explanation: "The single equals sign (=) is the assignment operator. The double equals sign (==) is the equality comparison operator."
          },
          {
            question: "If `bool a = true;` and `bool b = false;`, what does `a && b` evaluate to?",
            options: [
              "true",
              "It causes an error.",
              "false",
              "1"
            ],
            correctIndex: 2,
            explanation: "The && (Logical AND) operator requires BOTH sides to be true. Since b is false, the entire expression evaluates to false."
          },
          {
            question: "What does the Logical NOT (!) operator do?",
            options: [
              "It deletes a variable.",
              "It inverts the boolean value (true becomes false, false becomes true).",
              "It subtracts 1 from a number.",
              "It crashes the program if the value is false."
            ],
            correctIndex: 1,
            explanation: "The NOT operator (!) simply flips the truth. !true is false, and !false is true."
          }
        ]
      },
      {
        id: "ch4-l4",
        title: "Expressions and Operator Precedence",
        difficulty: "beginner",
        content: `
          <h2>Putting It All Together</h2>
          <p>Just like in normal mathematics, C++ expressions can become complex. When you mix arithmetic, comparison, and logical operators in the same line, the compiler needs rules to decide which operation to perform first. This is called <strong>operator precedence</strong>.</p>

          <h3>The Mental Model</h3>
          <p>C++ uses the standard mathematical order of operations (often remembered as BODMAS or PEMDAS). Multiplication and division happen before addition and subtraction. But C++ extends these rules to logical and comparison operators too!</p>

          <h3>Prerequisite Recall</h3>
          <p>We have now learned arithmetic (<code>*</code>, <code>+</code>), comparison (<code>&gt;</code>, <code>==</code>), logical (<code>&amp;&amp;</code>, <code>||</code>), and assignment (<code>=</code>) operators.</p>

          <h3>The Core Concept: Operator Precedence</h3>
          <p>Here is the general order in which C++ evaluates operators (from highest priority to lowest):</p>
          <ol>
            <li><strong>Parentheses</strong> <code>()</code> — Always evaluated first!</li>
            <li><strong>Logical NOT</strong> <code>!</code></li>
            <li><strong>Multiplication/Division/Remainder</strong> <code>*</code>, <code>/</code>, <code>%</code></li>
            <li><strong>Addition/Subtraction</strong> <code>+</code>, <code>-</code></li>
            <li><strong>Comparisons</strong> <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code></li>
            <li><strong>Equality</strong> <code>==</code>, <code>!=</code></li>
            <li><strong>Logical AND</strong> <code>&amp;&amp;</code></li>
            <li><strong>Logical OR</strong> <code>||</code></li>
            <li><strong>Assignment</strong> <code>=</code> — Evaluated last.</li>
          </ol>

          <h3>Syntax Breakdown</h3>
          <pre><code>bool isValid = count * 2 &gt; 10 &amp;&amp; !isGameOver;</code></pre>
          <p>How does C++ solve this?</p>
          <ol>
            <li><strong>NOT:</strong> Evaluates <code>!isGameOver</code>.</li>
            <li><strong>Arithmetic:</strong> Evaluates <code>count * 2</code>.</li>
            <li><strong>Comparison:</strong> Evaluates <code>(result of count * 2) &gt; 10</code>.</li>
            <li><strong>AND:</strong> Evaluates <code>(result of comparison) &amp;&amp; (result of NOT)</code>.</li>
            <li><strong>Assignment:</strong> Stores the final boolean in <code>isValid</code>.</li>
          </ol>

          <h3>Worked Example: Line by Line</h3>
          <ol>
            <li><code>#include &lt;iostream&gt;</code></li>
            <li><code>int main() {</code></li>
            <li><code>int x{5};</code></li>
            <li><code>int y{10};</code></li>
            <li><code>int z = x + y * 2;</code> — Multiplication happens first! <code>10 * 2 = 20</code>, then <code>5 + 20 = 25</code>.</li>
            <li><code>int zCorrected = (x + y) * 2;</code> — Parentheses happen first! <code>15 * 2 = 30</code>.</li>
            <li><code>std::cout &lt;&lt; "z: " &lt;&lt; z &lt;&lt; "\\n";</code></li>
            <li><code>std::cout &lt;&lt; "zCorrected: " &lt;&lt; zCorrected &lt;&lt; "\\n";</code></li>
            <li><code>return 0;</code></li>
            <li><code>}</code></li>
          </ol>

          <div class="tip">
            <strong>Best Practice:</strong> Do not rely on memorizing the precedence table! If your expression has more than two operators, <strong>use parentheses</strong> to make your intention explicitly clear to both the compiler and anyone reading your code. Parentheses are free!
          </div>

          <h3>Predict Activity</h3>
          <p>What is the result of the expression <code>10 - 2 * 3</code>?</p>
        `,
        codeExample: "#include <iostream>\n\nint main() {\n    int a{10};\n    int b{5};\n    bool flag{true};\n    \n    // Precedence in action\n    bool complexResult = a - b == 5 && !flag || b > 2;\n    \n    // Same logic, but infinitely more readable using parentheses:\n    bool readableResult = (((a - b) == 5) && (!flag)) || (b > 2);\n    \n    std::cout << std::boolalpha;\n    std::cout << \"Result: \" << complexResult << \"\\n\";\n    std::cout << \"Readable: \" << readableResult << \"\\n\";\n    \n    return 0;\n}",
        expectedOutput: "Result: true\nReadable: true\n",
        exercises: [
          {
            instruction: "The formula to convert Fahrenheit to Celsius is (F - 32) * (5.0 / 9.0). The provided code forgets the parentheses, causing the multiplication to happen before the subtraction. Fix the expression using parentheses.",
            starterCode: "#include <iostream>\n\nint main() {\n    double fahrenheit{98.6};\n    \n    // Fix the precedence bug below by adding parentheses\n    double celsius = fahrenheit - 32.0 * 5.0 / 9.0;\n    \n    std::cout << \"Celsius: \" << celsius << \"\\n\";\n    return 0;\n}",
            expectedOutput: "Celsius: 37\n",
            exerciseType: "debug",
            hints: [
              "Because `*` has higher precedence than `-`, C++ is calculating `32.0 * 5.0` first.",
              "Wrap `fahrenheit - 32.0` in parentheses so it calculates the subtraction first."
            ]
          }
        ],
        quiz: [
          {
            question: "Which operator has the highest precedence (is evaluated first) in C++?",
            options: [
              "Addition (+)",
              "Parentheses ()",
              "Assignment (=)",
              "Logical AND (&&)"
            ],
            correctIndex: 1,
            explanation: "Parentheses always have the highest priority. They force the compiler to evaluate the expression inside them before anything else."
          },
          {
            question: "What is the result of `5 + 4 % 3`?",
            options: [
              "6",
              "0",
              "3",
              "9"
            ],
            correctIndex: 0,
            explanation: "The remainder operator (%) has the same precedence as multiplication and division, which is higher than addition. So, 4 % 3 is evaluated first (yielding 1). Then 5 + 1 yields 6."
          },
          {
            question: "Why is it recommended to use parentheses even if the default operator precedence would produce the correct answer?",
            options: [
              "Because the compiler runs faster with parentheses.",
              "Because the precedence rules are different on Windows and Mac.",
              "To make the code readable and make your mathematical intentions explicitly clear to other programmers.",
              "Because C++ requires them by law."
            ],
            correctIndex: 2,
            explanation: "Relying on obscure precedence rules makes code hard to read. Parentheses clearly document your intent and prevent accidental bugs."
          }
        ]
      },
      {
        id: "ch4-l5",
        title: "Review: Operators and Expressions",
        difficulty: "beginner",
        content: `
          <h2>Synthesising What You've Learned</h2>
          <p>You now have the tools to perform calculations, compare data, and build complex logical expressions. These are the fundamental building blocks of all algorithms.</p>

          <h3>Chapter Review</h3>
          <ul>
            <li><strong>Arithmetic:</strong> <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, <code>%</code> (remainder).</li>
            <li><strong>Integer Division:</strong> Dividing two integers drops the decimal completely.</li>
            <li><strong>Type Conversion:</strong> <code>static_cast&lt;double&gt;(x)</code> converts <code>x</code> to a double, allowing floating-point division.</li>
            <li><strong>Comparison:</strong> <code>==</code>, <code>!=</code>, <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code> yield boolean values.</li>
            <li><strong>Logical:</strong> <code>&amp;&amp;</code> (AND), <code>||</code> (OR), <code>!</code> (NOT) combine boolean values.</li>
            <li><strong>Precedence:</strong> Use parentheses <code>()</code> to control the order of evaluation and make code readable!</li>
          </ul>

          <h3>Bringing It All Together</h3>
          <p>The code example below combines these concepts into a mini physics calculator. It calculates the velocity of an object and checks if it exceeds a speed limit.</p>

          <div class="note">
            <strong>Looking Ahead:</strong> Right now, we can calculate whether a condition is true or false. In Chapter 5, we will use these boolean expressions to control the flow of our program using <code>if</code> statements, allowing the program to execute different code depending on the truth!
          </div>
        `,
        codeExample: "#include <iostream>\n\nint main() {\n    int distance{150}; // meters\n    int time{4};       // seconds\n    \n    // Integer division would truncate, so we cast to double\n    double velocity = static_cast<double>(distance) / time;\n    \n    int speedLimit{30};\n    bool isSpeeding = velocity > speedLimit;\n    \n    std::cout << \"Velocity: \" << velocity << \" m/s\\n\";\n    std::cout << std::boolalpha;\n    std::cout << \"Speeding violation: \" << isSpeeding << \"\\n\";\n    \n    return 0;\n}",
        expectedOutput: "Velocity: 37.5 m/s\nSpeeding violation: true\n",
        exercises: [
          {
            instruction: "Write a program that calculates a student's grade percentage. The student earned 42 points out of 50. Calculate the exact percentage (which should be 84.0). Check if the student passed (percentage >= 60.0) and print the boolean result.",
            starterCode: "// Write your code here\n#include <iostream>\n\nint main() {\n    int earned{42};\n    int possible{50};\n    \n    // 1. Calculate the percentage as a double (don't forget static_cast and multiplying by 100)\n    \n    // 2. Evaluate if they passed (percentage >= 60.0)\n    \n    // 3. Print the percentage and the boolean pass/fail status\n    \n    return 0;\n}",
            expectedOutput: "Percentage: 84\nPassed: true\n",
            exerciseType: "review",
            hints: [
              "To get the decimal fraction, use `static_cast<double>(earned) / possible`.",
              "Multiply that result by 100 to get the percentage.",
              "Create a `bool passed = percentage >= 60.0;`.",
              "Use `std::cout << std::boolalpha;` before printing the boolean.",
              "Make sure you print exact text: 'Percentage: 84' followed by 'Passed: true' (both followed by newlines)."
            ]
          },
          {
            instruction: "This program tries to calculate if a year is a leap year. A year is a leap year if it is evenly divisible by 4 (remainder is 0). However, the logic is broken due to incorrect operators and missing parentheses. Fix the bugs.",
            starterCode: "#include <iostream>\n\nint main() {\n    int year{2024};\n    \n    // Bug: Incorrect use of / instead of %, and missing parentheses!\n    bool isLeapYear = year / 4 == 0;\n    \n    std::cout << std::boolalpha;\n    std::cout << \"Is Leap Year: \" << isLeapYear << \"\\n\";\n    return 0;\n}",
            expectedOutput: "Is Leap Year: true\n",
            exerciseType: "debug",
            hints: [
              "To check if something is evenly divisible, use the remainder operator (`%`).",
              "Make sure you are using the equality operator (`==`), not assignment (`=`).",
              "Wrap the remainder calculation in parentheses for readability: `(year % 4) == 0`."
            ]
          }
        ],
        quiz: [
          {
            question: "To evaluate if an integer 'x' is an even number, which expression should you use?",
            options: [
              "(x / 2) == 0",
              "x == 2",
              "(x % 2) == 0",
              "(x * 2) == 0"
            ],
            correctIndex: 2,
            explanation: "The remainder operator (%) gives the remainder of division. If a number divided by 2 leaves a remainder of 0, the number is even."
          },
          {
            question: "Which of the following statements correctly uses `static_cast` to prevent integer division?",
            options: [
              "double result = static_cast<double>(10) / 4;",
              "double result = static_cast<double>(10 / 4);",
              "double result = 10 / static_cast(double)(4);",
              "double result = (double) 10 / 4;"
            ],
            correctIndex: 0,
            explanation: "static_cast<double>(10) safely casts 10 to 10.0 before the division occurs, forcing C++ to perform floating-point division. The first option performs integer division before casting the result."
          },
          {
            question: "What is the final value of the boolean `flag`? \n`bool flag = (10 > 5) && !(4 == 4);`",
            options: [
              "true",
              "It will not compile.",
              "1",
              "false"
            ],
            correctIndex: 3,
            explanation: "(10 > 5) is true. (4 == 4) is true, but the ! NOT operator flips it to false. Finally, true && false evaluates to false."
          }
        ]
      }
    ]
  });
})();
