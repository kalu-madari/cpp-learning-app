(function () {
  window.CPP_CHAPTERS = window.CPP_CHAPTERS || [];
  window.CPP_CHAPTERS.push({
    "id": 7,
    "title": "Functions: Basics",
    "description": "Break your code into reusable blocks",
    "icon": "📦",
    "lessons": [
      {
        "id": "ch7-l1",
        "title": "Introduction to Functions",
        "difficulty": "beginner",
        "content": "<h2>Introduction to Functions</h2>\n<p>As our programs grow larger, writing everything inside <code>main()</code> becomes messy and repetitive. If you need to do the same task multiple times, you don't want to copy and paste the same code over and over.</p>\n<p><strong>Functions</strong> solve this problem. A function is a named, reusable block of code that performs a specific task. You can think of it like a recipe: you write the recipe once, and then you can cook the meal (execute the code) as many times as you want just by using its name.</p>\n<p><em>Prerequisite Recall:</em> You already know how to use one function! Every C++ program must have a <code>main()</code> function, which is where the program starts running.</p>\n<h3>Defining and Calling a Function</h3>\n<p>To create a function, you must <strong>define</strong> it by giving it a return type, a name, and a body (the code it runs). For a function that just does an action and doesn't return any data, we use the return type <code>void</code>.</p>\n<pre><code>void functionName() {\n    // Code to execute\n}</code></pre>\n<p>Once defined, you can <strong>call</strong> (or invoke) the function by writing its name followed by parentheses and a semicolon: <code>functionName();</code>.</p>\n<p>In our example below, we define a function <code>sayHello()</code> and call it twice inside <code>main()</code>.</p>\n<div class=\"tip\">\n    <strong>Tip:</strong> In C++, you must define a function <em>before</em> you call it. That's why <code>sayHello()</code> is placed above <code>main()</code> in the file.\n</div>\n<div class=\"mistake\">\n    <strong>Common Mistake:</strong> Forgetting the parentheses when calling a function. Writing <code>sayHello;</code> instead of <code>sayHello();</code> won't execute the function (and often won't cause a compiler error, it just does nothing).\n</div>\n<p><strong>Predict:</strong> What would happen if we removed the lines <code>sayHello();</code> from <code>main()</code>, but kept the function definition?</p>",
        "codeExample": "#include <iostream>\n\n// Defining the function\nvoid sayHello() {\n    std::cout << \"Hello, C++ Programmer!\\n\";\n}\n\nint main() {\n    std::cout << \"Program starting...\\n\";\n    \n    // Calling the function twice\n    sayHello();\n    sayHello();\n    \n    std::cout << \"Program ending.\\n\";\n    return 0;\n}",
        "expectedOutput": "Program starting...\nHello, C++ Programmer!\nHello, C++ Programmer!\nProgram ending.",
        "exercises": [
          {
            "instruction": "Modify the program so that `sayHello()` is called three times, and then a new function `sayGoodbye()` is called once. You'll need to define `sayGoodbye()` yourself!",
            "starterCode": "#include <iostream>\n\nvoid sayHello() {\n    std::cout << \"Hello!\\n\";\n}\n\n// Write sayGoodbye() here\n\nint main() {\n    // Call sayHello 3 times\n    sayHello();\n    \n    // Call sayGoodbye once\n    \n    return 0;\n}",
            "expectedOutput": "Hello!\nHello!\nHello!\nGoodbye!",
            "exerciseType": "modify",
            "hints": [
              "Define `void sayGoodbye()` above `main()` just like `sayHello()`.",
              "Inside `sayGoodbye()`, print \"Goodbye!\\n\".",
              "Inside `main()`, use `sayGoodbye();` to call it."
            ]
          }
        ],
        "quiz": [
          {
            "question": "What is the purpose of the `void` keyword when defining a function like `void sayHello()`?",
            "options": [
              "It means the function takes no arguments.",
              "It means the function does not return any data.",
              "It prevents the function from being called more than once.",
              "It deletes the function from memory after it runs."
            ],
            "correctIndex": 1,
            "explanation": "`void` specifically means the function has no return value. It performs an action but doesn't give data back to where it was called."
          },
          {
            "question": "If you define a function but never call it inside `main()`, what happens when you run the program?",
            "options": [
              "The compiler throws an error.",
              "The function executes exactly once automatically.",
              "The code compiles, but the function's code never runs.",
              "The program crashes."
            ],
            "correctIndex": 2,
            "explanation": "A function's code is only executed when it is explicitly called. Defining it just tells the compiler it exists, but doesn't run it."
          }
        ]
      },
      {
        "id": "ch7-l2",
        "title": "Parameters and Arguments",
        "difficulty": "beginner",
        "content": "<h2>Parameters and Arguments</h2>\n<p>Functions are useful for repeating code, but they become incredibly powerful when they can adapt to different inputs. Imagine a coffee machine: you don't just push a button; you put in beans and water to get different types of coffee.</p>\n<p><strong>Parameters</strong> act as variables that receive data when the function is called. <strong>Arguments</strong> are the actual values you pass into those parameters.</p>\n<p><em>Prerequisite Recall:</em> Remember how variable types matter (e.g., <code>int</code>, <code>std::string</code>). Function parameters also require strict types.</p>\n<h3>Passing Data into Functions</h3>\n<p>You define parameters inside the parentheses of the function definition, specifying the type and name for each. When you call the function, you provide arguments in the exact same order.</p>\n<pre><code>void printSum(int a, int b) {\n    std::cout &lt;&lt; a + b &lt;&lt; \"\\n\";\n}</code></pre>\n<p>In the example below, we pass different strings and integers into <code>printScore</code> to customize its output.</p>\n<div class=\"note\">\n    <strong>Terminology:</strong> The variable in the definition (like <code>int score</code>) is the <strong>parameter</strong>. The value passed during the call (like <code>95</code>) is the <strong>argument</strong>.\n</div>\n<div class=\"mistake\">\n    <strong>Common Mistake:</strong> Passing the wrong type or wrong number of arguments. If a function expects an <code>int</code> and a <code>std::string</code>, passing two <code>int</code>s will cause a compiler error.\n</div>\n<p><strong>Predict:</strong> What will be printed if we call <code>printScore(\"Charlie\", 50 + 25);</code>?</p>",
        "codeExample": "#include <iostream>\n#include <string>\n\n// Function with two parameters: a string and an int\nvoid printScore(std::string name, int score) {\n    std::cout << name << \" scored: \" << score << \" points.\\n\";\n}\n\nint main() {\n    // Passing arguments to the function\n    printScore(\"Alice\", 95);\n    \n    std::string player2 = \"Bob\";\n    int score2 = 82;\n    printScore(player2, score2); // Using variables as arguments\n    \n    printScore(\"Charlie\", 50 + 25); // Using an expression\n    \n    return 0;\n}",
        "expectedOutput": "Alice scored: 95 points.\nBob scored: 82 points.\nCharlie scored: 75 points.",
        "exercises": [
          {
            "instruction": "Complete the `multiplyAndPrint` function so that it takes two integers, multiplies them, and prints the result in the format: `[a] * [b] = [result]`.",
            "starterCode": "#include <iostream>\n\n// Add parameters a and b here\nvoid multiplyAndPrint( /* ??? */ ) {\n    // Print the multiplication equation here\n    \n}\n\nint main() {\n    multiplyAndPrint(4, 5);\n    multiplyAndPrint(10, -3);\n    return 0;\n}",
            "expectedOutput": "4 * 5 = 20\n10 * -3 = -30",
            "exerciseType": "complete",
            "hints": [
              "The parameter list should be `int a, int b`.",
              "Use `std::cout << a << \" * \" << b << \" = \" << (a * b) << \"\\n\";`"
            ]
          }
        ],
        "quiz": [
          {
            "question": "What is the difference between a parameter and an argument?",
            "options": [
              "They are exactly the same thing, just different names.",
              "A parameter is the variable in the function definition, an argument is the actual value passed in.",
              "An argument is the variable in the function definition, a parameter is the actual value passed in.",
              "Parameters are for integers, arguments are for strings."
            ],
            "correctIndex": 1,
            "explanation": "Parameters define the expected inputs in the function signature, while arguments are the concrete values provided when calling the function."
          },
          {
            "question": "If you have a function `void display(double x)`, which of the following is a valid way to call it?",
            "options": [
              "display(void);",
              "double display(5.5);",
              "display(3.14);",
              "display();"
            ],
            "correctIndex": 2,
            "explanation": "You call the function by its name and provide a matching argument (a double) inside the parentheses."
          }
        ]
      },
      {
        "id": "ch7-l3",
        "title": "Return Values",
        "difficulty": "beginner",
        "content": "<h2>Return Values</h2>\n<p>So far, our functions have only performed actions (printing to the screen) using the <code>void</code> return type. Often, we want a function to perform a calculation and <strong>return</strong> the result back to the code that called it, like a calculator giving you an answer.</p>\n<p><strong>Return values</strong> allow a function to compute data and pass it back to the caller.</p>\n<p><em>Prerequisite Recall:</em> <code>main()</code> always ends with <code>return 0;</code> to tell the operating system the program finished successfully.</p>\n<h3>Using the <code>return</code> Statement</h3>\n<p>To return a value, replace <code>void</code> with the data type you want to return (e.g., <code>int</code>, <code>double</code>). Inside the function, use the <code>return</code> keyword followed by the value to send back.</p>\n<pre><code>int calculateArea(int width, int height) {\n    return width * height;\n}</code></pre>\n<p>When the function is called, the function call itself evaluates to the returned value. You can store this value in a variable, print it, or use it in math.</p>\n<div class=\"tip\">\n    <strong>Tip:</strong> The <code>return</code> statement immediately exits the function. Any code written after a <code>return</code> statement in the same block will never run!\n</div>\n<div class=\"mistake\">\n    <strong>Common Mistake:</strong> Forgetting the <code>return</code> statement in a function that declares a return type (like <code>int</code>). This leads to Undefined Behavior (UB), which is very dangerous in C++!\n</div>\n<p><strong>Predict:</strong> In the example below, what would happen if we wrote <code>std::cout &lt;&lt; \"Done!\";</code> immediately after the line <code>return celsius;</code>?</p>",
        "codeExample": "#include <iostream>\n\n// Function that takes a double and returns a double\ndouble fahrenheitToCelsius(double fahrenheit) {\n    double celsius = (fahrenheit - 32.0) * 5.0 / 9.0;\n    return celsius; // Sends the value back\n}\n\nint main() {\n    // The returned value is stored in a variable\n    double tempC = fahrenheitToCelsius(98.6);\n    std::cout << \"Body temp in C: \" << tempC << \"\\n\";\n    \n    // You can also use the returned value directly\n    std::cout << \"Freezing in C: \" << fahrenheitToCelsius(32.0) << \"\\n\";\n    \n    return 0;\n}",
        "expectedOutput": "Body temp in C: 37\nFreezing in C: 0",
        "exercises": [
          {
            "instruction": "Write a function `isEven` that takes an `int` parameter and returns a `bool`. It should return `true` if the number is even (divisible by 2) and `false` otherwise.",
            "starterCode": "#include <iostream>\n\n// Define isEven(int num) here\n\nint main() {\n    std::cout << std::boolalpha; // Prints true/false instead of 1/0\n    \n    std::cout << \"4 is even: \" << isEven(4) << \"\\n\";\n    std::cout << \"7 is even: \" << isEven(7) << \"\\n\";\n    \n    return 0;\n}",
            "expectedOutput": "4 is even: true\n7 is even: false",
            "exerciseType": "write",
            "hints": [
              "The function signature should be `bool isEven(int num)`.",
              "Use the modulo operator `%`. If `num % 2 == 0`, it's even.",
              "You can directly `return num % 2 == 0;`"
            ]
          }
        ],
        "quiz": [
          {
            "question": "What happens when a `return` statement is executed in a function?",
            "options": [
              "The function pauses until `main()` finishes.",
              "The function immediately exits and passes the value back to the caller.",
              "It prints the returned value to the console.",
              "It skips to the next `return` statement in the function."
            ],
            "correctIndex": 1,
            "explanation": "A `return` statement stops the function's execution entirely and hands the specified value back to where the function was called."
          },
          {
            "question": "If a function is defined as `std::string getName()`, what must be true about its `return` statement?",
            "options": [
              "It must return an integer.",
              "It does not need a `return` statement.",
              "It must return a value of type `std::string`.",
              "It must use `return 0;`."
            ],
            "correctIndex": 2,
            "explanation": "The declared return type (`std::string`) dictates exactly what type of data the function must return."
          }
        ]
      },
      {
        "id": "ch7-l4",
        "title": "Scope and the Stack",
        "difficulty": "intermediate",
        "content": "<h2>Scope and the Stack</h2>\n<p>When you declare a variable inside a function, can another function see it? The answer is no, and understanding why is critical to writing bug-free C++ code.</p>\n<p><strong>Scope</strong> refers to the region of code where a variable is visible and accessible. A variable declared inside a function is a <strong>local variable</strong>. It is created when the function starts and destroyed when the function ends.</p>\n<p><em>Prerequisite Recall:</em> Think back to loops. Variables declared inside a <code>for</code> loop's braces only exist inside that loop. Functions work the same way.</p>\n<h3>The Stack-Frame Mental Model</h3>\n<p>Imagine your computer's memory as a stack of boxes. When <code>main()</code> starts, it gets a box (a <strong>stack frame</strong>) to hold its local variables. When <code>main()</code> calls a function like <code>calculate()</code>, a new box is placed directly on top of <code>main()</code>'s box.</p>\n<p>While <code>calculate()</code> runs, it can only see inside its own box. It cannot see the variables inside <code>main()</code>'s box. When <code>calculate()</code> finishes, its box is thrown away, and all its variables are destroyed!</p>\n<div class=\"tip\">\n    <strong>Tip:</strong> Because functions have isolated scopes, you can have variables with the exact same name (like <code>result</code>) in two different functions, and they won't interfere with each other.\n</div>\n<div class=\"mistake\">\n    <strong>Common Mistake:</strong> Trying to use a variable declared in one function inside another function. This will result in a \"was not declared in this scope\" compiler error.\n</div>\n<p><strong>Predict:</strong> In the example, notice there are two variables named <code>x</code>. Are they the same variable?</p>",
        "codeExample": "#include <iostream>\n\nvoid modifyNumber(int x) {\n    // This 'x' is a local parameter in modifyNumber's scope.\n    // It's a completely separate copy from the 'x' in main.\n    x = 100;\n    std::cout << \"Inside modifyNumber, x is: \" << x << \"\\n\";\n}\n\nint main() {\n    // This 'x' is local to main's scope.\n    int x = 5;\n    \n    std::cout << \"Before function, x is: \" << x << \"\\n\";\n    \n    modifyNumber(x);\n    \n    // modifyNumber changed ITS copy, not main's copy!\n    std::cout << \"After function, x is: \" << x << \"\\n\";\n    \n    return 0;\n}",
        "expectedOutput": "Before function, x is: 5\nInside modifyNumber, x is: 100\nAfter function, x is: 5",
        "exercises": [
          {
            "instruction": "The code below tries to calculate the square of a number, but it won't compile because of a scope error. Fix the bug by passing the necessary data using parameters and return values.",
            "starterCode": "#include <iostream>\n\nvoid calculateSquare() {\n    // ERROR: 'value' is not in this scope!\n    // ERROR: 'result' is not in this scope!\n    result = value * value;\n}\n\nint main() {\n    int value = 7;\n    int result = 0;\n    \n    calculateSquare();\n    \n    std::cout << \"Square is: \" << result << \"\\n\";\n    return 0;\n}",
            "expectedOutput": "Square is: 49",
            "exerciseType": "debug",
            "hints": [
              "Change `calculateSquare` to take an `int` parameter and return an `int`.",
              "Instead of modifying global-like variables, use `return val * val;` inside the function.",
              "In `main`, assign the return value to `result`: `result = calculateSquare(value);`"
            ]
          }
        ],
        "quiz": [
          {
            "question": "What happens to a local variable when the function it is defined in finishes executing?",
            "options": [
              "It is saved permanently in memory.",
              "It is sent back to the `main()` function.",
              "It is destroyed and its memory is reclaimed.",
              "It becomes a global variable."
            ],
            "correctIndex": 2,
            "explanation": "When a function returns, its stack frame is popped off the stack, and all of its local variables are destroyed."
          },
          {
            "question": "If `main()` has a variable named `count` and a function `doWork()` also has a variable named `count`, what happens?",
            "options": [
              "The program will fail to compile because variable names must be unique everywhere.",
              "Changing `count` in `doWork()` will automatically change `count` in `main()`.",
              "They are two completely separate variables that happen to share a name.",
              "The compiler merges them into a single variable."
            ],
            "correctIndex": 2,
            "explanation": "Because they exist in separate scopes (separate stack frames), they are completely independent variables."
          }
        ]
      },
      {
        "id": "ch7-l5",
        "title": "Review: Functions Basics",
        "difficulty": "intermediate",
        "content": "<h2>Review: Functions Basics</h2>\n<p>Congratulations! You've learned how to structure your C++ programs using functions. This is one of the most important concepts in programming, as it forms the basis of all modern software architecture.</p>\n<p>Let's review the key concepts:</p>\n<ul>\n    <li><strong>Definition vs. Call:</strong> You define a function to specify what it does, and call it to execute that code.</li>\n    <li><strong>Parameters and Arguments:</strong> Parameters define the input slots; arguments are the values you pass in.</li>\n    <li><strong>Return Values:</strong> A function can send a computed value back to the caller using the <code>return</code> keyword. If it returns nothing, its type is <code>void</code>.</li>\n    <li><strong>Scope:</strong> Variables declared inside a function are local to that function's stack frame. They cannot be seen by other functions.</li>\n</ul>\n<p>In the next chapter, we will dive deeper into functions, exploring how to allow functions to modify the original variables passed to them (Pass-by-Reference), how to have multiple functions with the same name, and more.</p>\n<h3>Putting It All Together</h3>\n<p>The example below demonstrates a complete, small program that uses multiple functions to calculate the total cost of an item with tax. Read through the code and trace how the data flows from <code>main()</code> into the functions and back out.</p>",
        "codeExample": "#include <iostream>\n\n// Function to calculate tax\ndouble calculateTax(double price, double taxRate) {\n    return price * taxRate;\n}\n\n// Function to print a receipt (void, returns nothing)\nvoid printReceipt(double price, double tax) {\n    std::cout << \"--- RECEIPT ---\\n\";\n    std::cout << \"Price: $\" << price << \"\\n\";\n    std::cout << \"Tax:   $\" << tax << \"\\n\";\n    std::cout << \"Total: $\" << (price + tax) << \"\\n\";\n    std::cout << \"---------------\\n\";\n}\n\nint main() {\n    double itemPrice = 50.0;\n    double currentTaxRate = 0.08; // 8% tax\n    \n    // 1. Call function to get a value\n    double taxAmount = calculateTax(itemPrice, currentTaxRate);\n    \n    // 2. Call void function to perform an action\n    printReceipt(itemPrice, taxAmount);\n    \n    return 0;\n}",
        "expectedOutput": "--- RECEIPT ---\nPrice: $50\nTax:   $4\nTotal: $54\n---------------",
        "exercises": [
          {
            "instruction": "Write a complete program that acts as a simple calculator. Create a function `add` that takes two integers and returns their sum, and a function `subtract` that takes two integers and returns their difference. Then, call both functions in `main()` to compute and print the results of 15 + 8 and 100 - 37.",
            "starterCode": "#include <iostream>\n\n// Define the add function here\n\n// Define the subtract function here\n\nint main() {\n    // Call the functions and print the results\n    // Ensure your output EXACTLY matches the expected format.\n    \n    return 0;\n}",
            "expectedOutput": "15 + 8 = 23\n100 - 37 = 63",
            "exerciseType": "review",
            "hints": [
              "The signatures should be `int add(int a, int b)` and `int subtract(int a, int b)`.",
              "In `main()`, use `std::cout << \"15 + 8 = \" << add(15, 8) << \"\\n\";`",
              "Don't forget to implement and call the `subtract` function similarly."
            ]
          },
          {
            "instruction": "Fix the bug! This program should calculate and print the area of a rectangle, but it has scope, return, and parameter issues.",
            "starterCode": "#include <iostream>\n\nvoid getArea(int width) {\n    int area = width * length;\n}\n\nint main() {\n    int length = 5;\n    int result = getArea(10);\n    std::cout << \"Area: \" << result << \"\\n\";\n    return 0;\n}",
            "expectedOutput": "Area: 50",
            "exerciseType": "debug",
            "hints": [
              "`getArea` needs to know the length! Add a second parameter: `int getArea(int width, int length)`.",
              "`getArea` currently returns `void`. Change it to return `int` and add a `return` statement.",
              "In `main`, pass `length` as the second argument: `getArea(10, length)`."
            ]
          }
        ],
        "quiz": [
          {
            "question": "What is the primary benefit of using functions in your code?",
            "options": [
              "They make the program execute faster on the CPU.",
              "They allow you to reuse code, organize logic, and avoid repetition.",
              "They are required by the C++ standard for everything except loops.",
              "They reduce the amount of memory a program uses."
            ],
            "correctIndex": 1,
            "explanation": "Functions are primarily an organizational tool that promotes code reuse, readability, and modularity."
          },
          {
            "question": "If a function is defined as `void displayTotal(double total)`, what can it do with the variable `total`?",
            "options": [
              "It can read the value of `total` but modifying it won't affect the original argument passed from `main`.",
              "It can modify the variable and the changes will permanently alter the argument passed from `main`.",
              "It can only use `total` if a global variable named `total` exists.",
              "It can return `total` back to the caller."
            ],
            "correctIndex": 0,
            "explanation": "The parameter is a local copy. Modifying this copy inside the function does not change the original variable passed from the calling function. (We'll learn how to change the original in Chapter 8!)."
          },
          {
            "question": "Look at this code: `int x = myFunction();`. What must be true about `myFunction`?",
            "options": [
              "It must take an integer as a parameter.",
              "It must have a return type of `void`.",
              "It must return a value that can be stored in an `int`.",
              "It must be defined inside `main()`."
            ],
            "correctIndex": 2,
            "explanation": "Because its result is being assigned to an `int` variable, the function must return an `int` (or a type that can be converted to an `int`)."
          }
        ]
      }
    ]
  });
})();
