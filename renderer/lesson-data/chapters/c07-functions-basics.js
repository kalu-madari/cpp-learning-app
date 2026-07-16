(function() {
  window.CPP_CHAPTERS = window.CPP_CHAPTERS || [];
  window.CPP_CHAPTERS.push({
    id: 7,
    title: "Functions: Basics",
    description: "Break your code into reusable blocks.",
    icon: "📦",
    lessons: [
      {
        id: "ch7-l1",
        title: "Introduction to Functions",
        difficulty: "beginner",
        content: `
<h2>Introduction to Functions</h2>
<p>As your C++ programs grow, writing everything inside <code>main()</code> becomes overwhelming. If you need to perform the same task multiple times, you might find yourself copying and pasting the same block of code over and over. This makes your program long, difficult to read, and hard to update.</p>
<p><strong>Functions</strong> are the solution. A function is a named, reusable block of code that performs a specific task. By using functions, you can break a massive program down into small, manageable pieces.</p>

<h3>The Mental Model</h3>
<p>Think of a function like a recipe in a cookbook. You write the recipe (the code) exactly once. Then, whenever you want to bake the cake, you simply refer to the recipe by its name. You can "bake" (execute) that recipe as many times as you want without rewriting all the instructions.</p>
<p><em>Prerequisite Recall:</em> You have actually been using a function in every single program you have written! <code>main()</code> is a function. It is the special function where the C++ operating system begins executing your code.</p>

<h3>The Syntax: Defining a Function</h3>
<p>To create a function, you must <strong>define</strong> it. A function definition has three main parts: a return type, a name, and a body (the code inside the curly braces).</p>
<pre><code>void functionName() {
    // Code to execute goes here
}</code></pre>
<p>For now, we are creating functions that just perform an action (like printing to the screen) and don't give any data back. For these functions, we use the return type <strong><code>void</code></strong>, which literally means "nothing".</p>

<h3>The Syntax: Calling a Function</h3>
<p>Defining a function doesn't run it—it just tells the compiler that the function exists. To actually execute the code inside, you must <strong>call</strong> (or invoke) the function by writing its name followed by parentheses and a semicolon.</p>
<pre><code>functionName();</code></pre>

<h3>Worked Example: Line by Line</h3>
<ol>
  <li><code>void sayHello() {</code> — We define a new function named <code>sayHello</code> that returns nothing.</li>
  <li><code>std::cout &lt;&lt; "Hello!\\n";</code> — The code that will run when the function is called.</li>
  <li><code>int main() {</code> — The program always starts running here.</li>
  <li><code>sayHello();</code> — The program jumps up to the <code>sayHello</code> function, prints "Hello!", and then jumps back.</li>
  <li><code>sayHello();</code> — The program jumps up again, prints "Hello!" a second time, and returns.</li>
</ol>

<div class="tip">
  <strong>Tip:</strong> In C++, the compiler reads your file from top to bottom. Therefore, you must define a function <em>above</em> <code>main()</code> so the compiler knows it exists before you try to call it!
</div>

<div class="mistake">
  <strong>Common Mistake:</strong> Forgetting the parentheses when calling a function! If you write <code>sayHello;</code> instead of <code>sayHello();</code>, the compiler will not execute the function. The parentheses are the trigger that tells C++ to run the code.
</div>

<h3>Predict Activity</h3>
<p>If you define a function <code>void printWarning() { std::cout &lt;&lt; "Warning!"; }</code> above <code>main()</code>, but inside <code>main()</code> you never write <code>printWarning();</code>, how many times will "Warning!" be printed when you run the program?</p>
        `,
        codeExample: `#include <iostream>\n\n// 1. Defining the function (above main!)\nvoid printGreeting() {\n    std::cout << "Welcome to the C++ mastery course!\\n";\n    std::cout << "We hope you enjoy learning.\\n";\n}\n\nint main() {\n    std::cout << "Program starting...\\n\\n";\n    \n    // 2. Calling the function\n    printGreeting();\n    \n    std::cout << "\\nDoing some other work...\\n\\n";\n    \n    // 3. Calling it again! Reusing code is easy.\n    printGreeting();\n    \n    std::cout << "\\nProgram ending.\\n";\n    return 0;\n}`,
        expectedOutput: "Program starting...\n\nWelcome to the C++ mastery course!\nWe hope you enjoy learning.\n\nDoing some other work...\n\nWelcome to the C++ mastery course!\nWe hope you enjoy learning.\n\nProgram ending.\n",
        exercises: [
          {
            exerciseType: "modify",
            instruction: "Modify the program so that `sayHello()` is called three times in a row. Then, define a brand new function called `sayGoodbye()` above `main`, and call it exactly once at the end of the program.",
            starterCode: `#include <iostream>\n\nvoid sayHello() {\n    std::cout << "Hello!\\n";\n}\n\n// 1. Define void sayGoodbye() here\n\n\nint main() {\n    // 2. Call sayHello 3 times\n    sayHello();\n    \n    // 3. Call sayGoodbye once\n    \n    return 0;\n}`,
            expectedOutput: "Hello!\nHello!\nHello!\nGoodbye!\n",
            hints: [
              "Add `sayHello();` two more times inside `main()`.",
              "The definition for `sayGoodbye` should look exactly like `sayHello`, but with `cout << \"Goodbye!\\n\";`",
              "Don't forget to call `sayGoodbye();` inside `main()` before `return 0;`."
            ]
          }
        ],
        quiz: [
          {
            question: "What is the primary purpose of the `void` keyword when defining a function?",
            options: [
              "It indicates that the function takes no arguments.",
              "It indicates that the function performs an action but does not return any data back to the caller.",
              "It prevents the function from being called more than once.",
              "It hides the function from the `main()` function."
            ],
            correctIndex: 1,
            explanation: "`void` literally means 'nothing' or 'empty'. It tells the compiler that when this function finishes, it will not hand any calculated value back to the place where it was called."
          },
          {
            question: "If you define a completely valid function but never call it inside `main()`, what happens?",
            options: [
              "The compiler throws a syntax error.",
              "The function executes exactly once automatically at the start of the program.",
              "The program compiles perfectly, but the function's code is never executed.",
              "The program crashes when it reaches `return 0;`."
            ],
            correctIndex: 2,
            explanation: "Defining a function merely stores the 'recipe' in memory. Unless you explicitly call the function (execute the recipe), the code inside it will simply sit there unused."
          },
          {
            question: "Why must a function typically be defined above `main()` in a single-file C++ program?",
            options: [
              "Because `main()` is always the last function to execute.",
              "Because C++ compilers read the file from top to bottom, and they need to know a function exists before they see it being called.",
              "It doesn't matter; functions can be placed anywhere without issue.",
              "Because `void` functions must always be at the top of the file."
            ],
            correctIndex: 1,
            explanation: "C++ requires that all names (like function names) be declared or defined before they are used. Reading top-to-bottom means the definition must come first."
          }
        ]
      },
      {
        id: "ch7-l2",
        title: "Parameters and Arguments",
        difficulty: "beginner",
        content: `
<h2>Parameters and Arguments</h2>
<p>Functions that simply execute the exact same code every time are useful, but they become incredibly powerful when they can adapt to different inputs. Imagine a coffee machine: you don't just push a generic 'brew' button; you insert different types of coffee pods to get different drinks.</p>
<p><strong>Parameters</strong> and <strong>Arguments</strong> allow you to pass data into a function, changing how it behaves each time it is called.</p>

<h3>The Mental Model</h3>
<p>Think of a function as a machine with a slot on the top. The <strong>parameter</strong> is the shape of the slot (e.g., "this slot only accepts integers"). The <strong>argument</strong> is the actual coin (the specific value) you drop into the slot when you turn the machine on.</p>
<p><em>Prerequisite Recall:</em> Variables must always have a specific type (like <code>int</code>, <code>double</code>, or <code>std::string</code>). Function parameters are just variables, so they require strict types too!</p>

<h3>The Syntax</h3>
<p>You define parameters inside the parentheses of the function definition. When you call the function, you provide the arguments inside those parentheses.</p>
<pre><code>// 'name' is the PARAMETER
void greetPerson(std::string name) {
    std::cout &lt;&lt; "Hello, " &lt;&lt; name &lt;&lt; "!\\n";
}

int main() {
    // "Alice" is the ARGUMENT
    greetPerson("Alice");
}</code></pre>

<h3>Worked Example: Line by Line</h3>
<ol>
  <li><code>void printSquare(int number) {</code> — We define a function with one parameter named <code>number</code> of type <code>int</code>.</li>
  <li><code>std::cout &lt;&lt; number * number;</code> — The function uses the parameter to do math.</li>
  <li><code>printSquare(5);</code> — In <code>main</code>, we call the function and pass the argument <code>5</code>.</li>
  <li>C++ automatically creates the <code>number</code> variable and assigns it the value <code>5</code>.</li>
  <li>The function prints <code>25</code>.</li>
</ol>

<div class="note">
  <strong>Terminology Check:</strong> The <strong>Parameter</strong> is the variable in the function definition (e.g., <code>int number</code>). The <strong>Argument</strong> is the actual value passed during the call (e.g., <code>5</code>). Developers often use these terms interchangeably, but knowing the difference is important!
</div>

<div class="mistake">
  <strong>Common Mistake: Type Mismatches!</strong> If a function expects an <code>int</code>, and you try to pass it a <code>std::string</code> like <code>printSquare("Hello");</code>, the C++ compiler will aggressively reject your code with an error. C++ is strongly typed!
</div>
        `,
        codeExample: `#include <iostream>\n#include <string>\n\n// 'playerName' and 'score' are parameters\nvoid printScore(std::string playerName, int score) {\n    std::cout << "Player: " << playerName << " | Score: " << score << "\\n";\n}\n\nint main() {\n    // Passing literal values as arguments\n    printScore("Alice", 1500);\n    \n    // Passing variables as arguments\n    std::string user = "Bob";\n    int userScore = 850;\n    printScore(user, userScore);\n    \n    // Passing expressions (math) as arguments\n    printScore("Charlie", 500 + 300);\n    \n    return 0;\n}`,
        expectedOutput: "Player: Alice | Score: 1500\nPlayer: Bob | Score: 850\nPlayer: Charlie | Score: 800\n",
        exercises: [
          {
            exerciseType: "complete",
            instruction: "Complete the `multiplyByTen` function. It should take an integer parameter named `val`, multiply it by 10, and print the result. Then call it from `main()`.",
            starterCode: `#include <iostream>\n\n// 1. Add the integer parameter inside the parentheses\nvoid multiplyByTen( /* ??? */ ) {\n    // 2. Print the parameter multiplied by 10\n    \n}\n\nint main() {\n    // 3. Call the function and pass the number 7\n    \n    \n    // Call it again with the number 42\n    multiplyByTen(42);\n    \n    return 0;\n}`,
            expectedOutput: "70\n420\n",
            hints: [
              "The function signature should be `void multiplyByTen(int val)`.",
              "Inside the function, use `std::cout << (val * 10) << \"\\n\";`.",
              "Inside `main`, write `multiplyByTen(7);`."
            ]
          }
        ],
        quiz: [
          {
            question: "What is the technical difference between a parameter and an argument?",
            options: [
              "They are completely identical terms with no distinction.",
              "A parameter is the variable defined in the function signature, while an argument is the concrete value provided when the function is called.",
              "An argument is the variable defined in the function signature, while a parameter is the concrete value provided when the function is called.",
              "Parameters are used for numbers, and arguments are used for strings."
            ],
            correctIndex: 1,
            explanation: "Parameters act as placeholders in the function definition (like `int x`). Arguments are the actual data passed in (like `5`)."
          },
          {
            question: "If a function is defined as `void displayPrice(double price)`, which of the following is an INVALID way to call it?",
            options: [
              "`displayPrice(9.99);`",
              "`displayPrice(100.50 + 5.0);`",
              "`displayPrice(\"Free\");`",
              "`double cost = 3.50; displayPrice(cost);`"
            ],
            correctIndex: 2,
            explanation: "The parameter requires a `double` (a floating-point number). Passing a `std::string` (\"Free\") will cause a compiler type-mismatch error."
          },
          {
            question: "Can you pass a variable as an argument to a function?",
            options: [
              "Yes, the function will receive the current value stored inside that variable.",
              "No, you can only pass raw numbers or text strings (literals).",
              "Yes, but the variable's name must perfectly match the parameter's name.",
              "No, passing variables causes the program to crash."
            ],
            correctIndex: 0,
            explanation: "Absolutely! When you pass a variable (like `printScore(userScore)`), C++ looks inside the variable, grabs its value, and passes that value into the function."
          }
        ]
      },
      {
        id: "ch7-l3",
        title: "Return Values",
        difficulty: "beginner",
        content: `
<h2>Return Values</h2>
<p>So far, our functions have only performed actions—specifically, printing text to the screen—using the <code>void</code> return type. However, functions are often used to perform mathematical calculations or process data. In these cases, you want the function to <strong>return</strong> an answer back to the code that called it, much like a calculator giving you a result.</p>

<h3>The Mental Model</h3>
<p>Think of a function with a return value as a factory machine. You put raw materials in (arguments), the machine processes them, and it spits out a finished product (the return value) on a conveyor belt. You can then take that finished product and use it however you want.</p>
<p><em>Prerequisite Recall:</em> <code>main()</code> is a function that returns an <code>int</code>. It always ends with <code>return 0;</code> to tell the operating system that the program finished successfully.</p>

<h3>The Syntax</h3>
<p>To return a value, replace <code>void</code> with the specific data type you intend to send back (e.g., <code>int</code>, <code>double</code>, <code>bool</code>). Inside the function, use the <code>return</code> keyword followed by the value or variable you want to output.</p>
<pre><code>int calculateArea(int width, int height) {
    int area = width * height;
    return area; // Sends the integer back to the caller!
}</code></pre>

<h3>Consuming the Return Value</h3>
<p>When the function is called, the function call itself <em>evaluates to the returned value</em>. This means you can store it in a variable, print it directly, or even use it inside a math equation!</p>
<pre><code>int myRoom = calculateArea(10, 12);
std::cout &lt;&lt; "Double the area is: " &lt;&lt; calculateArea(10, 12) * 2;</code></pre>

<div class="mistake">
  <strong>Common Mistake:</strong> Forgetting the <code>return</code> statement in a function that promises to return data (like an <code>int</code> function). If you promise C++ an integer and fail to provide one, it leads to <strong>Undefined Behavior (UB)</strong>. Your program might crash or output garbage data!
</div>

<h3>Predict Activity</h3>
<p>If you have a function <code>bool isPositive(int number) { return number &gt; 0; }</code>, what will be stored in the variable \`result\` if you write <code>bool result = isPositive(-5);</code>?</p>
        `,
        codeExample: `#include <iostream>\n\n// This function takes a double, and promises to return a double\ndouble fahrenheitToCelsius(double fahrenheit) {\n    double celsius = (fahrenheit - 32.0) * 5.0 / 9.0;\n    return celsius; // Sends the computed value back!\n}\n\nint main() {\n    // 1. Storing the return value in a variable\n    double bodyTempF = 98.6;\n    double bodyTempC = fahrenheitToCelsius(bodyTempF);\n    std::cout << "Normal body temp in C is: " << bodyTempC << "\\n";\n    \n    // 2. Using the return value directly in a cout statement\n    std::cout << "Freezing in C is: " << fahrenheitToCelsius(32.0) << "\\n";\n    \n    // 3. Using the return value in a math expression\n    double boilingC = fahrenheitToCelsius(212.0);\n    std::cout << "Boiling in C plus 10 degrees is: " << (boilingC + 10.0) << "\\n";\n    \n    return 0;\n}`,
        expectedOutput: "Normal body temp in C is: 37\nFreezing in C is: 0\nBoiling in C plus 10 degrees is: 110\n",
        exercises: [
          {
            exerciseType: "write",
            instruction: "Write a function named `isEven` that takes an `int` parameter and returns a `bool`. It should return `true` if the number is even (divisible by 2) and `false` otherwise. Then test it in `main`.",
            starterCode: `#include <iostream>\n\n// 1. Define bool isEven(int num) here\n// Use the modulo operator: num % 2 == 0\n\n\nint main() {\n    std::cout << std::boolalpha; // Forces bools to print as "true"/"false" instead of 1/0\n    \n    // 2. Call your function inside the cout statements\n    std::cout << "Is 4 even? " << /* call isEven with 4 */ << "\\n";\n    std::cout << "Is 7 even? " << /* call isEven with 7 */ << "\\n";\n    \n    return 0;\n}`,
            expectedOutput: "Is 4 even? true\nIs 7 even? false\n",
            hints: [
              "The signature is `bool isEven(int num)`.",
              "Inside the function, you can write: `if (num % 2 == 0) { return true; } else { return false; }`.",
              "Or, even shorter: `return num % 2 == 0;`.",
              "In main, write `isEven(4)` and `isEven(7)`."
            ]
          }
        ],
        quiz: [
          {
            question: "What happens when a `return` statement is executed inside a function?",
            options: [
              "The function pauses until `main()` finishes.",
              "The function instantly terminates, destroys its local variables, and hands the specified value back to the caller.",
              "The returned value is automatically printed to the console.",
              "The function skips to the next `return` statement."
            ],
            correctIndex: 1,
            explanation: "The `return` statement is an absolute exit door. The moment it is executed, the function's job is done, and control flows back to wherever the function was called."
          },
          {
            question: "If a function is defined as `std::string getUsername()`, what must be true about its `return` statement?",
            options: [
              "It must return an integer, because `main` returns an integer.",
              "It does not need a `return` statement because strings are text.",
              "It must use `return 0;`.",
              "It must return a value of type `std::string`."
            ],
            correctIndex: 3,
            explanation: "The return type declared in the function signature (`std::string`) is a strict contract. You must return data that exactly matches that type."
          },
          {
            question: "Why is it dangerous to forget a `return` statement in a function that promises to return an `int`?",
            options: [
              "It causes Undefined Behavior, meaning the program might crash or use garbage memory data as the result.",
              "It will automatically return 0.",
              "It will automatically return -1.",
              "The program will delete your source code."
            ],
            correctIndex: 0,
            explanation: "Unlike some other languages that return a default value like `null` or `0`, C++ invokes Undefined Behavior if a path fails to return a value when promised. Always fulfill your return contracts!"
          }
        ]
      },
      {
        id: "ch7-l4",
        title: "Early Returns and Control Flow",
        difficulty: "intermediate",
        content: `
<h2>Early Returns and Control Flow</h2>
<p>As we learned in the last lesson, a <code>return</code> statement instantly terminates the function. But did you know you can have <em>multiple</em> <code>return</code> statements inside a single function? This is an incredibly powerful tool for managing control flow.</p>

<h3>The Mental Model</h3>
<p>Think of a function like a maze. A <code>return</code> statement is an emergency exit door. As soon as the code walks through a <code>return</code> door, it instantly teleports out of the maze and back to <code>main()</code>. Any code located after the executed <code>return</code> statement is completely ignored.</p>

<h3>Multiple Returns</h3>
<p>It is very common to use <code>if</code> statements to return different values based on the input. Once a return executes, the function stops, meaning you often don't even need to use <code>else</code> blocks!</p>
<pre><code>int absoluteValue(int num) {
    if (num &lt; 0) {
        return num * -1; // If negative, exit immediately with positive value
    }
    return num; // If positive, we reach this line and exit
}</code></pre>

<h3>Early Returns in void Functions</h3>
<p>Even though a <code>void</code> function cannot return <em>data</em>, you can still use the <code>return;</code> keyword (with no value) to exit the function early. This is often used as a "guard clause" to stop the function if invalid data is passed in.</p>
<pre><code>void printDivide(int a, int b) {
    if (b == 0) {
        std::cout &lt;&lt; "Error: Division by zero!\\n";
        return; // Bail out of the function early!
    }
    std::cout &lt;&lt; a / b &lt;&lt; "\\n"; // This won't run if b is 0
}</code></pre>

<div class="tip">
  <strong>Tip: Guard Clauses:</strong> Putting <code>if</code> statements with early returns at the very top of your function to handle invalid inputs (like negative ages, or zero division) is a widely used professional best practice. It keeps the rest of your code clean and avoids deeply nested <code>if-else</code> blocks.
</div>
        `,
        codeExample: `#include <iostream>\n#include <string>\n\n// This function uses early returns for invalid data\nvoid processOrder(int quantity) {\n    // Guard Clause 1\n    if (quantity < 0) {\n        std::cout << "Error: Cannot order negative items.\\n";\n        return; // Exits the function instantly!\n    }\n    \n    // Guard Clause 2\n    if (quantity == 0) {\n        std::cout << "Notice: Empty order ignored.\\n";\n        return; // Exits the function instantly!\n    }\n    \n    // If we survived the guard clauses, process the order\n    std::cout << "Success: Processing order for " << quantity << " items.\\n";\n    \n    // An invisible 'return;' automatically happens at the final brace for void functions.\n}\n\nint main() {\n    processOrder(-5);\n    processOrder(0);\n    processOrder(42);\n    \n    return 0;\n}`,
        expectedOutput: "Error: Cannot order negative items.\nNotice: Empty order ignored.\nSuccess: Processing order for 42 items.\n",
        exercises: [
          {
            exerciseType: "modify",
            instruction: "Refactor this function! The provided code uses an unnecessary `else` block. Modify the `checkTemperature` function to use an early return inside the `if` statement, and remove the `else` keyword entirely.",
            starterCode: `#include <iostream>\n#include <string>\n\nstd::string checkTemperature(int temp) {\n    if (temp > 100) {\n        return "Too hot!";\n    } else {\n        return "Just right.";\n    }\n}\n\nint main() {\n    std::cout << "Temp 120: " << checkTemperature(120) << "\\n";\n    std::cout << "Temp 75: " << checkTemperature(75) << "\\n";\n    return 0;\n}`,
            expectedOutput: "Temp 120: Too hot!\nTemp 75: Just right.\n",
            hints: [
              "Inside the `if` block, keep the `return \"Too hot!\";`.",
              "Delete the words `else {` and the closing `}` for the else block.",
              "The `return \"Just right.\";` should just sit normally at the bottom of the function. If the `if` statement triggers, it returns early and never reaches the bottom anyway!"
            ]
          }
        ],
        quiz: [
          {
            question: "What happens if a function executes a `return` statement, but there is still more code written below it in the function body?",
            options: [
              "The function finishes executing the remaining code, then returns the value.",
              "The compiler moves the remaining code back to `main()`.",
              "The remaining code is completely ignored and will never run.",
              "The program crashes due to a syntax error."
            ],
            correctIndex: 2,
            explanation: "A `return` statement causes an immediate, unconditional exit from the function. Any code located after it is essentially 'dead code' and will be skipped."
          },
          {
            question: "Can you use the `return` keyword in a `void` function?",
            options: [
              "No, `void` functions can never contain the word `return`.",
              "Yes, but you must write `return 0;`.",
              "Yes, you can write `return;` by itself to instantly exit the function without sending back a value.",
              "Yes, but it will turn the function into an `int` function."
            ],
            correctIndex: 2,
            explanation: "Writing `return;` in a `void` function is perfectly legal and is a great way to bail out of a function early if an error condition is met."
          },
          {
            question: "What is a 'Guard Clause'?",
            options: [
              "A security feature in C++ compilers.",
              "An `if` statement at the top of a function that returns early if the inputs are invalid, protecting the rest of the code.",
              "A special loop that prevents infinite loops.",
              "A way to protect variables from being deleted."
            ],
            correctIndex: 1,
            explanation: "Guard clauses 'guard' the main logic of your function by filtering out bad data and returning early, keeping the core code clean and un-nested."
          }
        ]
      },
      {
        id: "ch7-l5",
        title: "Scope and the Stack",
        difficulty: "intermediate",
        content: `
<h2>Scope and the Stack</h2>
<p>When you declare a variable inside a function, can another function see it? The answer is an emphatic <strong>NO</strong>, and understanding why is critical to writing bug-free C++ code.</p>
<p><strong>Scope</strong> refers to the region of your code where a variable is visible and accessible. A variable declared inside a function is known as a <strong>local variable</strong>. It is created when the function starts and permanently destroyed when the function ends.</p>
<p><em>Prerequisite Recall:</em> Think back to <code>for</code> loops. A variable declared inside a loop's curly braces only exists inside that loop. Functions use the exact same concept of brace-enclosed scope.</p>

<h3>The Stack-Frame Mental Model</h3>
<p>Imagine your computer's memory as a physical stack of boxes. When your program starts, <code>main()</code> gets a box (called a <strong>stack frame</strong>) to hold its local variables. When <code>main()</code> calls a function like <code>calculateArea()</code>, a brand new box is placed directly on top of <code>main()</code>'s box.</p>
<p>While <code>calculateArea()</code> is running, it can only look inside its own box. It is completely blind to the variables inside <code>main()</code>'s box. When <code>calculateArea()</code> executes a <code>return</code> statement, its box is thrown away, and all of its local variables are destroyed! Control then drops back down to <code>main()</code>'s box.</p>

<h3>Variable Shadowing and Independence</h3>
<p>Because functions have completely isolated scopes, you can have variables with the exact same name in different functions, and they will not interfere with each other.</p>
<pre><code>void doWork() {
    int count = 10; // This 'count' is completely isolated
}
int main() {
    int count = 5; // This is a totally different 'count'
}</code></pre>

<div class="mistake">
  <strong>Common Mistake: Scope Errors!</strong> Trying to use a variable declared in one function inside another function will result in a <code>"was not declared in this scope"</code> compiler error. Data must be explicitly passed between functions using parameters (input) and return values (output).
</div>

<h3>Predict Activity</h3>
<p>In the interactive example below, notice there are two variables named <code>x</code>. When <code>modifyNumber(x)</code> is called, does it change the <code>x</code> inside <code>main</code>?</p>
        `,
        codeExample: `#include <iostream>\n\nvoid modifyNumber(int x) {\n    // This 'x' is a local parameter in modifyNumber's scope.\n    // It's a completely separate copy from the 'x' in main!\n    x = 100;\n    std::cout << "Inside modifyNumber, x is now: " << x << "\\n";\n}\n\nint main() {\n    // This 'x' is local to main's scope.\n    int x = 5;\n    \n    std::cout << "Before function, x is: " << x << "\\n";\n    \n    // We pass the VALUE of x (which is 5) into the function.\n    modifyNumber(x);\n    \n    // modifyNumber changed ITS local copy, not main's copy!\n    std::cout << "After function, x is still: " << x << "\\n";\n    \n    return 0;\n}`,
        expectedOutput: "Before function, x is: 5\nInside modifyNumber, x is now: 100\nAfter function, x is still: 5\n",
        exercises: [
          {
            exerciseType: "debug",
            instruction: "The code below tries to calculate the square of a number, but it won't compile because of a severe scope error. `calculateSquare` is trying to access variables that belong to `main`! Fix the bug by passing data correctly using a parameter and a return value.",
            starterCode: `#include <iostream>\n\n// 1. Give this function an int parameter, and make it return an int.\nvoid calculateSquare() {\n    // 2. Remove this global-like assignment. Just return the math.\n    result = value * value;\n}\n\nint main() {\n    int value = 7;\n    int result = 0;\n    \n    // 3. Pass 'value' in, and assign the return to 'result'\n    calculateSquare();\n    \n    std::cout << "Square is: " << result << "\\n";\n    return 0;\n}`,
            expectedOutput: "Square is: 49\n",
            hints: [
              "Change the signature: `int calculateSquare(int val)`.",
              "Inside the function, remove the assignment. Just use `return val * val;`.",
              "In `main`, update the call to capture the return: `result = calculateSquare(value);`"
            ]
          }
        ],
        quiz: [
          {
            question: "What happens to a local variable when the function it is defined in finishes executing?",
            options: [
              "It is saved permanently in memory for future function calls.",
              "It is automatically sent back to the `main()` function.",
              "Its stack frame is popped off the stack, and the variable is destroyed and erased from memory.",
              "It becomes a global variable."
            ],
            correctIndex: 2,
            explanation: "Function local variables are temporary. They are created when the function starts and entirely destroyed when the function returns."
          },
          {
            question: "If `main()` has a variable named `score` and a function `calculateBonus()` also has a variable named `score`, what is the relationship between them?",
            options: [
              "The program will fail to compile because all variable names must be globally unique.",
              "Changing `score` in `calculateBonus()` will instantly update `score` in `main()`.",
              "They are two completely independent variables that happen to share a name, existing in different stack frames.",
              "The compiler merges them into a single super-variable."
            ],
            correctIndex: 2,
            explanation: "Because they exist in separate scopes (separate boxes on the stack), they have zero connection to each other. They are as separate as two different people named 'John' living in different houses."
          },
          {
            question: "Why do we need parameters and return values?",
            options: [
              "To make the code compile faster.",
              "Because scopes are isolated. Parameters let us securely pass data IN to a function's scope, and return values let us pass data OUT.",
              "They are required to prevent infinite loops.",
              "Because `main()` is not allowed to do math."
            ],
            correctIndex: 1,
            explanation: "Because a function cannot reach into `main`'s stack frame to grab variables, parameters act as the bridge to pass data in, and return values act as the bridge to pass answers out."
          }
        ]
      },
      {
        id: "ch7-l6",
        title: "Review: Functions Basics",
        difficulty: "beginner",
        content: `
<h2>Review: Functions Basics</h2>
<p>Congratulations! You have successfully learned how to modularize your C++ programs using functions. This is arguably the most important architectural concept in all of software engineering. Every major application on Earth is built by combining thousands of small, specialized functions.</p>

<h3>Chapter Summary</h3>
<ul>
  <li><strong>Definition vs. Call:</strong> Defining a function creates the recipe. Calling a function executes it.</li>
  <li><strong><code>void</code> Functions:</strong> Functions that perform actions but do not return data back to the caller.</li>
  <li><strong>Parameters and Arguments:</strong> Parameters define the input slots (variables) in the function signature. Arguments are the concrete values you pass in during the call.</li>
  <li><strong>Return Values:</strong> A function can compute data and send it back to the caller using the <code>return</code> keyword. The function call evaluates to this returned value.</li>
  <li><strong>Early Returns:</strong> <code>return</code> acts as an emergency exit. It instantly terminates the function, which is highly useful for guard clauses.</li>
  <li><strong>Scope and the Stack:</strong> Variables declared inside a function are strictly local to that function's stack frame. They cannot be seen or modified by other functions.</li>
</ul>

<h3>Putting It All Together</h3>
<p>The code example below demonstrates a complete, cohesive program that uses multiple functions to calculate a shopping cart's total, applying taxes and handling error conditions gracefully. Read through it carefully and trace how data flows from <code>main()</code> into the functions and back out!</p>

<div class="note">
  <strong>Looking Ahead to Chapter 8:</strong> You learned today that when you pass a variable to a function, C++ makes a <em>copy</em> of it. The original variable in <code>main()</code> is completely safe from modification. But what if you <em>want</em> a function to modify the original variable? In Chapter 8, we will explore <strong>Pass-by-Reference</strong>, default arguments, and function overloading!
</div>
        `,
        codeExample: `#include <iostream>\n\n// 1. A function that takes data and returns data\ndouble calculateTax(double price, double taxRate) {\n    return price * taxRate;\n}\n\n// 2. A void function that uses an early return for error handling\nvoid printReceipt(double price, double tax) {\n    if (price < 0) {\n        std::cout << "Error: Invalid negative price.\\n";\n        return; // Exit early!\n    }\n    \n    std::cout << "--- RECEIPT ---\\n";\n    std::cout << "Price: $" << price << "\\n";\n    std::cout << "Tax:   $" << tax << "\\n";\n    std::cout << "Total: $" << (price + tax) << "\\n";\n    std::cout << "---------------\\n";\n}\n\nint main() {\n    double itemPrice = 50.0;\n    double currentTaxRate = 0.08; // 8% tax\n    \n    // Data flows IN via arguments, and OUT via the return value\n    double taxAmount = calculateTax(itemPrice, currentTaxRate);\n    \n    // Data flows IN via arguments, and the function performs an action\n    printReceipt(itemPrice, taxAmount);\n    \n    std::cout << "\\nAttempting to print an invalid receipt:\\n";\n    printReceipt(-10.0, 0);\n    \n    return 0;\n}`,
        expectedOutput: "--- RECEIPT ---\nPrice: $50\nTax:   $4\nTotal: $54\n---------------\n\nAttempting to print an invalid receipt:\nError: Invalid negative price.\n",
        exercises: [
          {
            exerciseType: "review",
            instruction: "Write a complete program that acts as a simple calculator. Create a function `add` that takes two integers and returns their sum, and a function `subtract` that takes two integers and returns their difference. Then, call both functions in `main()` to compute and print the results of 15 + 8 and 100 - 37.",
            starterCode: `#include <iostream>\n\n// 1. Define the 'add' function here\n\n\n// 2. Define the 'subtract' function here\n\n\nint main() {\n    // 3. Call the functions and print the results\n    // Make sure your output matches exactly: "15 + 8 = 23" etc.\n    \n    \n    return 0;\n}`,
            expectedOutput: "15 + 8 = 23\n100 - 37 = 63\n",
            hints: [
              "The signatures should be `int add(int a, int b)` and `int subtract(int a, int b)`.",
              "Inside the functions, just `return a + b;` and `return a - b;`.",
              "In `main()`, use `std::cout << \"15 + 8 = \" << add(15, 8) << \"\\n\";`",
              "Don't forget to implement and call the `subtract` function similarly."
            ]
          },
          {
            exerciseType: "write",
            instruction: "Stage 2 Mini-Project: Create a function called `printBanner` that takes an integer `length` as a parameter. It should use a `for` loop to print a line of `=` characters of that exact length, followed by a newline. Call it from `main()` to print a banner of length 5, and then another of length 12.",
            starterCode: `#include <iostream>\n\n// 1. Define void printBanner(int length) here\n// Put a for loop inside it that runs 'length' times.\n\n\nint main() {\n    // 2. Call printBanner(5)\n    \n    \n    // 3. Call printBanner(12)\n    \n    \n    return 0;\n}`,
            expectedOutput: "=====\n============\n",
            hints: [
              "Signature: `void printBanner(int length)`",
              "Inside the function: `for (int i = 0; i < length; i++) { std::cout << \"=\"; }`",
              "Make sure to print a newline `std::cout << \"\\n\";` AFTER the loop finishes, but still inside the function.",
              "In main, just call `printBanner(5);` and `printBanner(12);`."
            ]
          }
        ],
        quiz: [
          {
            question: "Which of the following best summarizes why we use functions?",
            options: [
              "To make the code execute faster on the CPU.",
              "To satisfy the C++ compiler's strict formatting rules.",
              "To break complex problems into smaller, reusable, and testable pieces of logic.",
              "To permanently store data on the hard drive."
            ],
            correctIndex: 2,
            explanation: "Modularity and reusability are the core tenets of software engineering. Functions allow us to build complex systems cleanly."
          },
          {
            question: "Look at this code: `double result = calculateDensity(mass, volume);`. What must be true about the `calculateDensity` function?",
            options: [
              "It must have a return type of `void`.",
              "It must take exactly one parameter.",
              "It must return a value of type `double` (or a type that can be converted to a `double`).",
              "It must contain a `for` loop."
            ],
            correctIndex: 2,
            explanation: "Because the function's result is being assigned to a `double` variable, the function's return type must provide compatible data."
          },
          {
            question: "If a function does not need to return any data, what return type should be placed in its signature?",
            options: [
              "`int`",
              "`null`",
              "`none`",
              "`void`"
            ],
            correctIndex: 3,
            explanation: "The `void` keyword explicitly tells the compiler that the function performs an action but will not return a value."
          }
        ]
      }
    ]
  });
})();
