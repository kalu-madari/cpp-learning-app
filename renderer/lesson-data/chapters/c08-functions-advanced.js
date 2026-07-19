(function() {
  window.CPP_CHAPTERS = window.CPP_CHAPTERS || [];
  window.CPP_CHAPTERS.push({
    id: 8,
    title: "Functions: Advanced",
    description: "Master references, overloading, and smart parameter passing.",
    icon: "⚙️",
    lessons: [
      {
        id: "ch8-l1",
        title: "Pass-by-Value Revisited",
        difficulty: "beginner",
        content: `
<h2>Pass-by-Value Revisited</h2>
<p>In Chapter 7, we discovered something surprising: when you pass a variable to a function, the function receives a <strong>copy</strong> of the data. Changes made inside the function don't affect the original variable in <code>main()</code>. This behavior is called <strong>pass-by-value</strong>, and it is the default in C++.</p>
<p>But why does C++ make a copy? And when is this behavior a problem? This lesson dives deeper into pass-by-value so you understand exactly what happens in memory and why a new mechanism is sometimes needed.</p>

<h3>The Mental Model</h3>
<p>Imagine you have a handwritten letter (a variable) and you want to share it with a friend (a function). <strong>Pass-by-value</strong> means you walk to a photocopier, make a copy, and hand the copy to your friend. Your friend can scribble all over the copy, tear it up, or fold it into an origami crane — your original letter is completely unaffected.</p>
<p><em>Prerequisite Recall:</em> In Chapter 7's "Scope and the Stack" lesson, we learned that each function gets its own stack frame (a box of memory). Pass-by-value works because C++ creates a new local variable inside the function's box and copies the argument's value into it.</p>

<h3>The Copy in Action</h3>
<pre><code>void tryToDouble(int num) {
    num = num * 2; // Modifies the LOCAL copy only!
    std::cout &lt;&lt; "Inside: " &lt;&lt; num &lt;&lt; "\\n";
}

int main() {
    int value = 10;
    tryToDouble(value);
    std::cout &lt;&lt; "Outside: " &lt;&lt; value &lt;&lt; "\\n";
    // value is STILL 10!
}</code></pre>

<h3>When Pass-by-Value is Perfect</h3>
<ul>
  <li>When the function only needs to <strong>read</strong> the data (compute something from it).</li>
  <li>When you <strong>want</strong> a safe copy so the original can never be accidentally damaged.</li>
  <li>When the data is small (like an <code>int</code>, <code>double</code>, <code>char</code>, or <code>bool</code>).</li>
</ul>

<h3>When Pass-by-Value is a Problem</h3>
<ul>
  <li>When you <strong>need</strong> the function to modify the original variable (e.g., a swap function).</li>
  <li>When the data is <strong>large</strong> (like a long <code>std::string</code>). Copying a 10,000-character string every time you call a function is wasteful!</li>
</ul>

<div class="tip">
  <strong>Tip:</strong> For small, built-in types like <code>int</code>, <code>double</code>, <code>char</code>, and <code>bool</code>, pass-by-value is almost always the right choice. The copy is so tiny it's essentially free.
</div>

<div class="mistake">
  <strong>Common Mistake:</strong> Expecting a pass-by-value function to modify the original variable. If you write a <code>void doubleIt(int x) { x = x * 2; }</code> function, it will silently do nothing to the caller's variable! The fix is pass-by-reference, which we learn next.
</div>

<h3>Predict Activity</h3>
<p>If you write <code>void reset(int counter) { counter = 0; }</code> and call <code>reset(myScore);</code> where <code>myScore</code> is <code>100</code>, what is the value of <code>myScore</code> after the call?</p>
        `,
        codeExample: `#include <iostream>\n#include <string>\n\nvoid tryToChangeName(std::string name) {\n    // This 'name' is a COPY of the original\n    name = "CHANGED!";\n    std::cout << "Inside function: " << name << "\\n";\n}\n\nvoid tryToDoubleNumber(int num) {\n    // This 'num' is a COPY of the original\n    num = num * 2;\n    std::cout << "Inside function: " << num << "\\n";\n}\n\nint main() {\n    std::string myName = "Alice";\n    int myNumber = 42;\n    \n    std::cout << "Before calls:\\n";\n    std::cout << "  Name: " << myName << "\\n";\n    std::cout << "  Number: " << myNumber << "\\n\\n";\n    \n    tryToChangeName(myName);\n    tryToDoubleNumber(myNumber);\n    \n    std::cout << "\\nAfter calls (unchanged!):\\n";\n    std::cout << "  Name: " << myName << "\\n";\n    std::cout << "  Number: " << myNumber << "\\n";\n    \n    return 0;\n}`,
        expectedOutput: "Before calls:\n  Name: Alice\n  Number: 42\n\nInside function: CHANGED!\nInside function: 84\n\nAfter calls (unchanged!):\n  Name: Alice\n  Number: 42\n",
        exercises: [
          {
            exerciseType: "predict",
            instruction: "Read the code carefully. The `halve` function takes an integer by value and divides it by 2. Predict the exact output of this program. Set the `answer` variable to the correct final value of `total` after the function call.",
            starterCode: `#include <iostream>\n\nvoid halve(int x) {\n    x = x / 2;\n}\n\nint main() {\n    int total = 80;\n    halve(total);\n    \n    // What is total now? Replace 0 with your prediction.\n    int answer = 0;\n    \n    std::cout << answer << "\\n";\n    return 0;\n}`,
            expectedOutput: "80\n",
            hints: [
              "The function receives a COPY of `total`, not the original.",
              "Changes to `x` inside `halve` are discarded when the function returns.",
              "`total` remains 80 because pass-by-value never modifies the original."
            ]
          }
        ],
        quiz: [
          {
            question: "What does 'pass-by-value' mean in C++?",
            options: [
              "The function receives the original variable and can modify it directly.",
              "The function receives the memory address of the variable.",
              "The function receives a copy of the argument's value; changes to the copy do not affect the original.",
              "The function and the caller share a single global variable."
            ],
            correctIndex: 2,
            explanation: "Pass-by-value creates an independent copy inside the function's stack frame. The original variable in the caller is never touched."
          },
          {
            question: "Why might pass-by-value be wasteful for a large `std::string`?",
            options: [
              "Because strings cannot be passed to functions at all.",
              "Because copying a large string requires duplicating all of its characters in memory, which takes time and space.",
              "Because strings are always passed by reference automatically.",
              "Because the compiler refuses to compile string copies."
            ],
            correctIndex: 1,
            explanation: "A string containing thousands of characters must be character-by-character duplicated into the function's stack frame. For large data, this copy cost becomes significant."
          },
          {
            question: "For which of the following types is pass-by-value almost always the best default choice?",
            options: [
              "`int`, `double`, `char`, and `bool`",
              "`std::string` with 1000 characters",
              "A very large struct with many member variables",
              "Any type, regardless of size"
            ],
            correctIndex: 0,
            explanation: "Small, built-in types like `int` and `double` are only a few bytes. Copying them is essentially free and provides the safety guarantee that the original cannot be accidentally changed."
          }
        ]
      },
      {
        id: "ch8-l2",
        title: "Pass-by-Reference",
        difficulty: "intermediate",
        content: `
<h2>Pass-by-Reference</h2>
<p>We now know that pass-by-value creates a copy, and that copy is independent from the original. But what if you genuinely <em>need</em> a function to modify the caller's variable? For example, what if you want to write a <code>swap</code> function that exchanges the values of two variables?</p>
<p>This is where <strong>pass-by-reference</strong> comes in. Instead of copying the data, C++ gives the function a <strong>direct alias</strong> to the original variable. Any changes made through the reference affect the real variable immediately.</p>

<h3>The Mental Model</h3>
<p>Going back to our letter analogy: <strong>pass-by-reference</strong> means you don't photocopy the letter. Instead, you hand your friend a sticky note that says "the letter is on my desk." Your friend walks over to YOUR desk and writes directly on YOUR original letter. There is no copy — they are working with the real thing.</p>
<p><em>Prerequisite Recall:</em> In Chapter 7, we learned that variables in different functions are completely isolated in separate stack frames. References are the mechanism that bridges this isolation, allowing a function to "reach back" into the caller's stack frame.</p>

<h3>The Syntax: The Ampersand <code>&amp;</code></h3>
<p>To declare a reference parameter, place an ampersand <code>&amp;</code> between the type and the parameter name in the function signature:</p>
<pre><code>void doubleIt(int&amp; num) {  // Note the &amp; after int
    num = num * 2;  // Modifies the ORIGINAL variable!
}</code></pre>
<p>That single <code>&amp;</code> character is the entire difference between pass-by-value and pass-by-reference!</p>

<h3>Worked Example: Line by Line</h3>
<ol>
  <li><code>void doubleIt(int&amp; num) {</code> — We declare <code>num</code> as a reference parameter. It will alias the caller's variable.</li>
  <li><code>num = num * 2;</code> — This modifies the original variable in <code>main()</code>, not a copy!</li>
  <li><code>int score = 50;</code> — In <code>main</code>, we create a variable with value 50.</li>
  <li><code>doubleIt(score);</code> — <code>num</code> becomes an alias for <code>score</code>. The function doubles it.</li>
  <li>After the call, <code>score</code> is now <code>100</code>!</li>
</ol>

<div class="tip">
  <strong>Tip: Placement of <code>&amp;</code>:</strong> You may see the ampersand placed in different positions: <code>int&amp; num</code>, <code>int &amp;num</code>, or <code>int &amp; num</code>. All three are identical to the C++ compiler. The most common modern C++ style is <code>int&amp; num</code> (attached to the type).
</div>

<div class="mistake">
  <strong>Common Mistake:</strong> Trying to pass a literal value to a reference parameter! <code>doubleIt(42);</code> will fail to compile because <code>42</code> is a temporary value (an rvalue) — there is no original variable for the reference to alias. You must pass a named variable.
</div>

<h3>Predict Activity</h3>
<p>If you have <code>void addTen(int&amp; x) { x = x + 10; }</code> and call <code>addTen(myAge);</code> where <code>myAge</code> starts as <code>25</code>, what is <code>myAge</code> after the call?</p>
        `,
        codeExample: `#include <iostream>\n\n// Pass-by-VALUE: receives a copy\nvoid addTenCopy(int num) {\n    num = num + 10;\n    std::cout << "  Copy version inside: " << num << "\\n";\n}\n\n// Pass-by-REFERENCE: receives an alias to the original\nvoid addTenRef(int& num) {\n    num = num + 10;\n    std::cout << "  Reference version inside: " << num << "\\n";\n}\n\nint main() {\n    int score = 50;\n    \n    std::cout << "Original score: " << score << "\\n\\n";\n    \n    std::cout << "Calling addTenCopy:\\n";\n    addTenCopy(score);\n    std::cout << "Score after copy call: " << score << "\\n\\n";\n    \n    std::cout << "Calling addTenRef:\\n";\n    addTenRef(score);\n    std::cout << "Score after reference call: " << score << "\\n";\n    \n    return 0;\n}`,
        expectedOutput: "Original score: 50\n\nCalling addTenCopy:\n  Copy version inside: 60\nScore after copy call: 50\n\nCalling addTenRef:\n  Reference version inside: 60\nScore after reference call: 60\n",
        exercises: [
          {
            exerciseType: "complete",
            instruction: "Complete the `swap` function so that it exchanges the values of two integer variables. The function must use pass-by-reference so the swap is visible in `main()`. Use a temporary variable inside the function.",
            starterCode: `#include <iostream>\n\n// Complete the swap function using references\nvoid swap(/* add parameters here */) {\n    // Use a temporary variable to perform the swap\n    \n}\n\nint main() {\n    int a = 10;\n    int b = 20;\n    \n    std::cout << "Before swap: a=" << a << " b=" << b << "\\n";\n    // Uncomment after completing the swap parameters:\n    // swap(a, b);\n    std::cout << "After swap: a=" << a << " b=" << b << "\\n";\n    \n    return 0;\n}`,
            expectedOutput: "Before swap: a=10 b=20\nAfter swap: a=20 b=10\n",
            hints: [
              "The parameters should be `int& x, int& y` — both references.",
              "Inside the function: `int temp = x;` saves the first value.",
              "Then `x = y;` copies the second into the first.",
              "Finally `y = temp;` puts the saved value into the second."
            ]
          }
        ],
        quiz: [
          {
            question: "What does the `&` symbol mean when placed in a function parameter like `void foo(int& x)`?",
            options: [
              "It means `x` is a pointer to an integer.",
              "It means `x` is a reference — an alias for the caller's original variable.",
              "It means the function returns an integer.",
              "It means `x` is a constant that cannot be changed."
            ],
            correctIndex: 1,
            explanation: "The `&` after the type name declares a reference parameter. The function's `x` is not a copy — it IS the caller's variable under a different name."
          },
          {
            question: "Why does `doubleIt(42);` fail to compile when `doubleIt` takes `int& num`?",
            options: [
              "Because 42 is too large for an integer.",
              "Because `doubleIt` must return an integer.",
              "Because you need to write `doubleIt(&42);`.",
              "Because the compiler cannot create a reference to a temporary literal value — there is no named variable to alias."
            ],
            correctIndex: 3,
            explanation: "A non-const reference must bind to a named variable (an lvalue). The literal `42` is a temporary value with no permanent home in memory, so it cannot be referenced."
          },
          {
            question: "If a function signature is `void reset(int& counter)` and you call `reset(myScore);`, what happens to `myScore`?",
            options: [
              "Nothing, because pass-by-value creates a copy.",
              "The program will crash because references are unsafe.",
              "It depends on what `reset` does to `counter` — any changes to `counter` directly modify `myScore`.",
              "`myScore` is deleted from memory."
            ],
            correctIndex: 2,
            explanation: "Because `counter` is a reference to `myScore`, any assignment to `counter` inside the function directly modifies `myScore` in `main()`."
          }
        ]
      },
      {
        id: "ch8-l3",
        title: "Const References",
        difficulty: "intermediate",
        content: `
<h2>Const References</h2>
<p>We've learned two ways to pass data: <strong>by value</strong> (safe copy, but potentially expensive) and <strong>by reference</strong> (no copy, but the function can modify the original). But what if you want the <em>best of both worlds</em> — no copy AND a guarantee that the function won't modify the original?</p>
<p>This is precisely what <strong>const references</strong> provide. They are one of the most important and frequently used parameter-passing strategies in professional C++ code.</p>

<h3>The Mental Model</h3>
<p>Imagine a museum. A <strong>pass-by-value</strong> visitor gets a photograph of the painting (a copy). A <strong>pass-by-reference</strong> visitor gets to walk right up to the original painting with a marker. A <strong>const reference</strong> visitor gets to stand right next to the original painting and admire it, but there is a glass barrier — they can look but <em>not touch</em>.</p>
<p><em>Prerequisite Recall:</em> In Chapter 2, we learned about the <code>const</code> keyword, which makes a variable read-only. A const reference applies the same idea to a function parameter: the reference provides access but forbids modification.</p>

<h3>The Syntax</h3>
<pre><code>void printName(const std::string&amp; name) {
    std::cout &lt;&lt; "Hello, " &lt;&lt; name &lt;&lt; "!\\n";
    // name = "Bob"; // ERROR! Cannot modify a const reference!
}</code></pre>
<p>The keyword <code>const</code> before the type, combined with <code>&amp;</code>, creates a read-only alias. The function can read the data but not write to it.</p>

<h3>Why Use Const References?</h3>
<table>
  <tr><th>Strategy</th><th>Copies?</th><th>Can Modify Original?</th><th>Best For</th></tr>
  <tr><td><code>int x</code> (by value)</td><td>Yes</td><td>No</td><td>Small types (int, double, bool)</td></tr>
  <tr><td><code>int&amp; x</code> (by reference)</td><td>No</td><td>Yes</td><td>When you NEED to modify the original</td></tr>
  <tr><td><code>const int&amp; x</code> (const ref)</td><td>No</td><td>No</td><td>Large types you only need to READ</td></tr>
</table>

<h3>The Golden Rule of Parameter Passing</h3>
<ul>
  <li><strong>Small types</strong> (<code>int</code>, <code>double</code>, <code>char</code>, <code>bool</code>): Pass by value.</li>
  <li><strong>Large types you need to READ</strong> (<code>std::string</code>, large structs): Pass by <code>const&amp;</code>.</li>
  <li><strong>Variables you need to MODIFY</strong>: Pass by <code>&amp;</code> (non-const reference).</li>
</ul>

<div class="tip">
  <strong>Tip:</strong> <code>const std::string&amp;</code> is the single most common way to pass strings to functions in professional C++ code. It avoids copying potentially huge strings while guaranteeing the function won't corrupt them.
</div>

<div class="mistake">
  <strong>Common Mistake:</strong> Trying to modify a const reference parameter! If you declare <code>void process(const std::string&amp; s)</code> and then write <code>s = "new value";</code> inside the function, the compiler will produce a clear error: <code>"assignment of read-only reference 's'"</code>.
</div>

<h3>Predict Activity</h3>
<p>Given the function <code>void show(const int&amp; x) { std::cout &lt;&lt; x; }</code>, can you call <code>show(42);</code>? Think back to the previous lesson where passing a literal to a non-const reference failed.</p>
        `,
        codeExample: `#include <iostream>\n#include <string>\n\n// BAD: Copies the entire string every call\nvoid printLengthCopy(std::string text) {\n    std::cout << "Copy version: \\"" << text << "\\" has " << text.size() << " chars\\n";\n}\n\n// GOOD: No copy, and we promise not to modify the original\nvoid printLengthConstRef(const std::string& text) {\n    std::cout << "Const ref version: \\"" << text << "\\" has " << text.size() << " chars\\n";\n}\n\n// This function NEEDS to modify the original, so non-const ref is correct\nvoid makeUpperFirst(std::string& text) {\n    if (!text.empty()) {\n        // toupper converts a char to uppercase\n        text[0] = static_cast<char>(std::toupper(text[0]));\n    }\n}\n\nint main() {\n    std::string greeting = "hello world";\n    \n    // Both work, but the const ref version avoids a copy\n    printLengthCopy(greeting);\n    printLengthConstRef(greeting);\n    \n    // This one modifies the original\n    std::cout << "\\nBefore modify: " << greeting << "\\n";\n    makeUpperFirst(greeting);\n    std::cout << "After modify: " << greeting << "\\n";\n    \n    return 0;\n}`,
        expectedOutput: "Copy version: \"hello world\" has 11 chars\nConst ref version: \"hello world\" has 11 chars\n\nBefore modify: hello world\nAfter modify: Hello world\n",
        exercises: [
          {
            exerciseType: "modify",
            instruction: "The function `printInfo` currently takes a `std::string` by value, causing an unnecessary copy. Modify the function signature to use `const std::string&` instead. The program's output should remain identical.",
            starterCode: `#include <iostream>\n#include <string>\n\n// Change this to use const std::string&\nvoid printInfo(std::string message) {\n    std::cout << "Info: " << message << "\\n";\n    std::cout << "Length: " << message.size() << "\\n";\n}\n\nint main() {\n    std::string msg = "C++ is powerful";\n    printInfo(msg);\n    return 0;\n}`,
            expectedOutput: "Info: C++ is powerful\nLength: 15\n",
            hints: [
              "Change the parameter from `std::string message` to `const std::string& message`.",
              "The body of the function stays exactly the same — you are only reading from `message`, not writing to it.",
              "The output will be identical because we only changed HOW the data is passed, not WHAT we do with it."
            ]
          }
        ],
        quiz: [
          {
            question: "What is the key advantage of `const std::string&` over `std::string` as a function parameter?",
            options: [
              "It avoids copying the string (saving time and memory) while guaranteeing the function cannot modify the original.",
              "It forces the function to modify the original string.",
              "It makes the function run on a separate CPU core.",
              "It converts the string to an integer automatically."
            ],
            correctIndex: 0,
            explanation: "The `const` ensures read-only access, and the `&` ensures no copy is made. You get efficiency AND safety — the best of both worlds."
          },
          {
            question: "Can you call `void show(const int& x)` with `show(42);`?",
            options: [
              "No, references can never bind to literals.",
              "Yes, because a CONST reference can bind to a temporary value (like a literal), unlike a non-const reference.",
              "Yes, but only if you use `show(&42);`.",
              "No, you must first store 42 in a variable."
            ],
            correctIndex: 1,
            explanation: "A const reference CAN bind to a temporary value because it promises not to modify it. Non-const references cannot, because modifying a temporary would be meaningless."
          },
          {
            question: "According to the Golden Rule, how should you pass an `int` to a function that only needs to read it?",
            options: [
              "By `const int&` — always use const references.",
              "By `int&` — use a non-const reference for efficiency.",
              "By value (`int x`) — copying an `int` is essentially free.",
              "By pointer (`int* x`)."
            ],
            correctIndex: 2,
            explanation: "Small types like `int` are cheaper to copy than to reference. The overhead of indirection through a reference can actually be slower than a simple copy for tiny types."
          }
        ]
      },
      {
        id: "ch8-l4",
        title: "Function Overloading",
        difficulty: "intermediate",
        content: `
<h2>Function Overloading</h2>
<p>What if you want a function called <code>print</code> that can print an integer, a double, AND a string? In many programming languages, you would need three different function names like <code>printInt</code>, <code>printDouble</code>, and <code>printString</code>. C++ has a far more elegant solution: <strong>function overloading</strong>.</p>
<p>Function overloading allows you to define <strong>multiple functions with the same name</strong> as long as they differ in their parameter lists. The compiler automatically picks the correct version based on the arguments you pass!</p>

<h3>The Mental Model</h3>
<p>Think of a universal remote control. When you press the "Power" button, the remote figures out which device to turn on based on context — the TV, the sound system, or the projector. The button name is the same, but the action varies based on what you're pointing at. Similarly, overloaded functions share a name, but C++ picks the right one based on the argument types.</p>
<p><em>Prerequisite Recall:</em> C++ is strongly typed. Every variable and parameter has an exact type. The compiler uses these types to decide which overloaded function to call.</p>

<h3>The Syntax</h3>
<p>Just define multiple functions with the same name but different parameter lists:</p>
<pre><code>void display(int value) {
    std::cout &lt;&lt; "Integer: " &lt;&lt; value &lt;&lt; "\\n";
}

void display(double value) {
    std::cout &lt;&lt; "Double: " &lt;&lt; value &lt;&lt; "\\n";
}

void display(std::string value) {
    std::cout &lt;&lt; "String: " &lt;&lt; value &lt;&lt; "\\n";
}</code></pre>

<h3>How the Compiler Decides</h3>
<p>The compiler looks at the <strong>number and types</strong> of arguments in the function call and matches them to the closest overload:</p>
<ul>
  <li><code>display(42);</code> → calls the <code>int</code> version</li>
  <li><code>display(3.14);</code> → calls the <code>double</code> version</li>
  <li><code>display("hello");</code> → calls the <code>std::string</code> version</li>
</ul>

<h3>Rules for Valid Overloading</h3>
<p>Functions can be overloaded if they differ in:</p>
<ul>
  <li>The <strong>number</strong> of parameters</li>
  <li>The <strong>types</strong> of parameters</li>
</ul>
<p>Functions <strong>cannot</strong> be overloaded based on return type alone!</p>

<div class="mistake">
  <strong>Common Mistake: Ambiguous Overloads!</strong> If the compiler cannot decide which overload to call, it produces an "ambiguous call" error. For example, calling <code>display(5.0f)</code> when you have overloads for <code>int</code> and <code>double</code> might be ambiguous because a <code>float</code> can convert to either. Always test your overloads with various argument types.
</div>

<div class="note">
  <strong>Note:</strong> You can also overload functions by having different numbers of parameters: <code>area(int side)</code> for squares and <code>area(int width, int height)</code> for rectangles. The name is the same, but the parameter count is different!
</div>

<h3>Predict Activity</h3>
<p>If you have <code>void print(int x)</code> and <code>void print(double x)</code>, which version will be called by <code>print(7);</code>? What about <code>print(7.0);</code>?</p>
        `,
        codeExample: `#include <iostream>\n#include <string>\n\n// Overload 1: one integer parameter\nint area(int side) {\n    std::cout << "Square with side " << side << ": ";\n    return side * side;\n}\n\n// Overload 2: two integer parameters\nint area(int width, int height) {\n    std::cout << "Rectangle " << width << "x" << height << ": ";\n    return width * height;\n}\n\n// Overload 3: one double parameter (circle area)\nint area(double radius) {\n    std::cout << "Circle with radius " << radius << ": ";\n    // Cast to int for simplicity (truncates the decimal)\n    return static_cast<int>(3.14159 * radius * radius);\n}\n\nint main() {\n    // The compiler picks the right version automatically!\n    std::cout << area(5) << "\\n";        // Calls Overload 1\n    std::cout << area(4, 7) << "\\n";     // Calls Overload 2\n    std::cout << area(3.0) << "\\n";      // Calls Overload 3\n    \n    return 0;\n}`,
        expectedOutput: "Square with side 5: 25\nRectangle 4x7: 28\nCircle with radius 3: 28\n",
        exercises: [
          {
            exerciseType: "write",
            instruction: "Write two overloaded functions both named `max`. The first should take two `int` parameters and return the larger one. The second should take three `int` parameters and return the largest of the three. Use them both in `main()`.",
            starterCode: `#include <iostream>\n\n// 1. Define int max(int a, int b) here\n// Return whichever is larger\n\n\n// 2. Define int max(int a, int b, int c) here\n// Hint: You can call max(a, b) inside this function!\n\n\nint main() {\n    // Uncomment these calls after defining your functions:\n    // std::cout << "Max of 10, 20: " << max(10, 20) << "\\n";\n    // std::cout << "Max of 5, 15, 10: " << max(5, 15, 10) << "\\n";\n    \n    return 0;\n}`,
            expectedOutput: "Max of 10, 20: 20\nMax of 5, 15, 10: 15\n",
            hints: [
              "For two params: `if (a > b) { return a; } return b;`",
              "For three params, you can reuse the two-param version: `return max(max(a, b), c);`",
              "Or use if-else chains to compare all three manually."
            ]
          }
        ],
        quiz: [
          {
            question: "What makes function overloading possible in C++?",
            options: [
              "The compiler distinguishes overloaded functions by the number and/or types of their parameters.",
              "The compiler ignores function names entirely.",
              "The compiler distinguishes overloaded functions by their return types.",
              "Function overloading only works with `void` functions."
            ],
            correctIndex: 0,
            explanation: "C++ uses the function's name combined with its parameter list (called the function signature) to distinguish between overloads. Return type alone is NOT sufficient."
          },
          {
            question: "Is the following valid overloading? `int compute(int x)` and `double compute(int x)` — same name, same parameter, different return types.",
            options: [
              "Yes, because the return types are different.",
              "Yes, but only if you use `auto` to call it.",
              "No, because overloading requires the parameter lists to differ, not just the return type.",
              "No, because `compute` is a reserved keyword."
            ],
            correctIndex: 2,
            explanation: "C++ cannot overload based solely on return type because the compiler often cannot determine which version to call just from the context of the call site."
          },
          {
            question: "If you have `void log(int x)` and `void log(double x)`, what happens when you call `log(3.14f);`?",
            options: [
              "The `int` version is called because `f` is for 'first'.",
              "The `double` version is called because `float` converts to `double` without loss of precision.",
              "The compiler throws an error because `float` is not `int` or `double`.",
              "Both versions are called simultaneously."
            ],
            correctIndex: 1,
            explanation: "A `float` value can be implicitly promoted to `double` without any data loss, so the compiler unambiguously selects the `double` overload."
          }
        ]
      },
      {
        id: "ch8-l5",
        title: "Default Arguments and Forward Declarations",
        difficulty: "intermediate",
        content: `
<h2>Default Arguments and Forward Declarations</h2>
<p>Sometimes a function is usually called with the same value for a particular parameter. For example, a <code>printLine</code> function might print a line of dashes by default, but occasionally you want stars instead. Rather than forcing the caller to specify every argument every time, C++ lets you provide <strong>default values</strong> for parameters.</p>

<h3>The Mental Model</h3>
<p>Think of ordering coffee at a café. If you just say "coffee," you get the default: medium size, no sugar, regular milk. But if you want something specific, you can say "large, two sugars, oat milk." Default arguments work the same way — if you don't specify a value, the function uses its built-in default.</p>
<p><em>Prerequisite Recall:</em> You have already been using a default argument without realizing it! <code>main()</code> returns <code>int</code>, and the operating system assumes a default return value of 0 if you omit the <code>return 0;</code> statement (though it's best practice to include it).</p>

<h3>The Syntax</h3>
<pre><code>void printLine(int length = 20, char symbol = '-') {
    for (int i = 0; i &lt; length; i++) {
        std::cout &lt;&lt; symbol;
    }
    std::cout &lt;&lt; "\\n";
}</code></pre>

<h3>Calling with Defaults</h3>
<pre><code>printLine();        // Uses both defaults: 20 dashes
printLine(10);      // Uses default symbol: 10 dashes
printLine(5, '*');  // Overrides both: 5 stars</code></pre>

<h3>The Right-to-Left Rule</h3>
<p>Default arguments must be assigned from <strong>right to left</strong>. You cannot have a default parameter followed by a non-default parameter.</p>
<pre><code>// VALID: defaults are rightmost
void foo(int a, int b = 5, int c = 10);

// INVALID: default in the middle, non-default at end
void bar(int a, int b = 5, int c); // COMPILER ERROR!</code></pre>

<div class="tip">
  <strong>Tip:</strong> Default arguments make your API easier to use for the common case while still allowing full customization when needed. Use them when a parameter has a sensible, obvious default.
</div>

<div class="mistake">
  <strong>Common Mistake:</strong> Trying to skip a middle argument! If you have <code>void draw(int width = 10, char fill = '#', bool border = true)</code>, you cannot call <code>draw(20, , false)</code> to skip <code>fill</code>. You must provide all arguments up to the last non-default one you want to set.
</div>

<h3>Forward Declarations</h3>
<p>In Chapter 7, we noted that functions must be defined above <code>main()</code>. But as programs grow, you might want <code>main()</code> at the top of the file for readability. A <strong>forward declaration</strong> (also called a function prototype) tells the compiler a function's name, return type, and parameters — without providing the body:</p>
<pre><code>// Forward declaration (prototype)
int add(int a, int b);

int main() {
    std::cout &lt;&lt; add(3, 4); // Compiler knows about add()
}

// Full definition comes later
int add(int a, int b) {
    return a + b;
}</code></pre>

<div class="note">
  <strong>Note:</strong> When a function has default arguments AND a forward declaration, the defaults must appear in the <em>declaration</em> (the prototype), NOT in the definition. This prevents conflicts if the function is declared in multiple places.
</div>

<h3>Predict Activity</h3>
<p>If you have <code>void greet(std::string name = "World")</code>, what does <code>greet();</code> print? What does <code>greet("Alice");</code> print?</p>
        `,
        codeExample: `#include <iostream>\n\n// Forward declaration with default arguments\nvoid printBorder(int length = 30, char ch = '=');\n\nint main() {\n    // Using all defaults\n    printBorder();\n    std::cout << "Welcome to C++ Mastery!\\n";\n    printBorder();\n    \n    std::cout << "\\n";\n    \n    // Overriding length only (uses default char)\n    printBorder(15);\n    std::cout << "Short section\\n";\n    printBorder(15);\n    \n    std::cout << "\\n";\n    \n    // Overriding both\n    printBorder(10, '*');\n    std::cout << "Star style\\n";\n    printBorder(10, '*');\n    \n    return 0;\n}\n\n// Full definition (no defaults here — they go in the declaration above)\nvoid printBorder(int length, char ch) {\n    for (int i = 0; i < length; i++) {\n        std::cout << ch;\n    }\n    std::cout << "\\n";\n}`,
        expectedOutput: "==============================\nWelcome to C++ Mastery!\n==============================\n\n===============\nShort section\n===============\n\n**********\nStar style\n**********\n",
        exercises: [
          {
            exerciseType: "modify",
            instruction: "Modify the `createGreeting` function to use default arguments. The `name` parameter should default to `\"World\"` and the `punctuation` parameter should default to `\"!\"`. Then test it with no arguments, one argument, and two arguments.",
            starterCode: `#include <iostream>\n#include <string>\n\n// Add default values to both parameters\nvoid createGreeting(std::string name, std::string punctuation) {\n    std::cout << "Hello, " << name << punctuation << "\\n";\n}\n\nint main() {\n    createGreeting("Alice", "!");\n    // Uncomment these after adding defaults:\n    // createGreeting("Bob");\n    // createGreeting();\n    return 0;\n}`,
            expectedOutput: "Hello, Alice!\nHello, Bob!\nHello, World!\n",
            hints: [
              "Change the signature to: `void createGreeting(std::string name = \"World\", std::string punctuation = \"!\")`",
              "Uncomment the two additional calls in `main()`.",
              "Remember: defaults go from right to left. Both parameters can have defaults because there are no non-default parameters after them."
            ]
          }
        ],
        quiz: [
          {
            question: "What is a default argument in C++?",
            options: [
              "An argument that the compiler generates randomly.",
              "A value specified in the function declaration that is used when the caller does not provide that argument.",
              "An argument that must always be provided by the caller.",
              "A global variable that all functions share."
            ],
            correctIndex: 1,
            explanation: "Default arguments allow the caller to omit arguments. The function uses the pre-specified value from its declaration as a fallback."
          },
          {
            question: "Why must default arguments be assigned from right to left in the parameter list?",
            options: [
              "Because C++ reads parameters backwards.",
              "Because left parameters are always integers.",
              "It's just a style convention, not a compiler rule.",
              "Because arguments are matched left-to-right during a function call, so missing arguments must be at the end where defaults can fill in."
            ],
            correctIndex: 3,
            explanation: "When you call `foo(1, 2)`, the compiler assigns 1 to the first parameter and 2 to the second. If a third parameter exists with a default, it's filled automatically. This only works if defaults are at the end."
          },
          {
            question: "What is the purpose of a forward declaration (function prototype)?",
            options: [
              "To inform the compiler about a function's name, return type, and parameters before the full definition appears later in the file.",
              "To make the function run faster.",
              "To create a copy of the function.",
              "To delete a function from memory."
            ],
            correctIndex: 0,
            explanation: "A forward declaration is a promise to the compiler: 'This function exists and will be defined later.' It allows you to call the function before its full definition appears in the source code."
          }
        ]
      },
      {
        id: "ch8-l6",
        title: "Review: Functions Advanced",
        difficulty: "beginner",
        content: `
<h2>Review: Functions Advanced</h2>
<p>Congratulations! You have now mastered the advanced toolkit for writing functions in C++. You can control exactly how data flows into and out of functions, write flexible APIs with overloading and default arguments, and organize your code with forward declarations.</p>

<h3>Chapter Summary</h3>
<ul>
  <li><strong>Pass-by-Value:</strong> The default. Creates a copy. Original is safe. Best for small types (<code>int</code>, <code>double</code>, <code>bool</code>).</li>
  <li><strong>Pass-by-Reference (<code>&amp;</code>):</strong> Creates an alias. No copy. The function can modify the original. Required for swap-style operations.</li>
  <li><strong>Const Reference (<code>const&amp;</code>):</strong> Creates a read-only alias. No copy. The function cannot modify the original. The gold standard for passing large read-only data like <code>std::string</code>.</li>
  <li><strong>Function Overloading:</strong> Multiple functions with the same name but different parameter lists. The compiler selects the correct version based on argument types.</li>
  <li><strong>Default Arguments:</strong> Parameters can have fallback values specified from right to left. Callers can omit trailing arguments.</li>
  <li><strong>Forward Declarations:</strong> Prototypes that allow you to call a function before its full definition appears in the file.</li>
</ul>

<h3>The Decision Flowchart</h3>
<p>When deciding how to pass a parameter, ask yourself:</p>
<ol>
  <li>Does the function need to <strong>modify</strong> the original? → Use <code>&amp;</code> (non-const reference).</li>
  <li>Is the type <strong>small</strong> (like <code>int</code>, <code>double</code>)? → Use pass-by-value.</li>
  <li>Is the type <strong>large</strong> (like <code>std::string</code>) and only needs to be <strong>read</strong>? → Use <code>const&amp;</code>.</li>
</ol>

<h3>Brief Preview: lvalues and rvalues</h3>
<p>Throughout this chapter, we've mentioned that non-const references can only bind to named variables, while const references can also bind to temporary values like <code>42</code>. In C++, named variables that have a persistent location in memory are called <strong>lvalues</strong> (they can appear on the <em>left</em> side of an assignment). Temporary values that exist only momentarily are called <strong>rvalues</strong> (they can only appear on the <em>right</em> side). This distinction will become critical later when we study move semantics in Chapter 25.</p>

<div class="note">
  <strong>Looking Ahead to Chapter 9:</strong> Now that you fully understand how functions work — including how they can call each other — we are ready to explore a mind-bending idea: what happens when a function calls <em>itself</em>? This is called <strong>recursion</strong>, and it unlocks elegant solutions to problems that would be extremely difficult to solve with loops alone.
</div>
        `,
        codeExample: `#include <iostream>\n#include <string>\n\n// Forward declarations\nvoid printHeader(const std::string& title, int width = 40, char border = '=');\nstd::string formatScore(const std::string& name, int score);\nvoid applyBonus(int& score, int bonus = 10);\n\nint main() {\n    std::string player = "Alice";\n    int score = 85;\n    \n    printHeader("SCORE REPORT");\n    std::cout << formatScore(player, score) << "\\n";\n    \n    // Apply the default bonus of 10\n    applyBonus(score);\n    std::cout << "After default bonus: " << formatScore(player, score) << "\\n";\n    \n    // Apply a custom bonus of 25\n    applyBonus(score, 25);\n    std::cout << "After custom bonus: " << formatScore(player, score) << "\\n";\n    \n    printHeader("END OF REPORT", 20, '-');\n    \n    return 0;\n}\n\n// Definitions\nvoid printHeader(const std::string& title, int width, char border) {\n    for (int i = 0; i < width; i++) {\n        std::cout << border;\n    }\n    std::cout << "\\n" << title << "\\n";\n    for (int i = 0; i < width; i++) {\n        std::cout << border;\n    }\n    std::cout << "\\n";\n}\n\nstd::string formatScore(const std::string& name, int score) {\n    return name + ": " + std::to_string(score) + " pts";\n}\n\nvoid applyBonus(int& score, int bonus) {\n    score = score + bonus;\n}`,
        expectedOutput: "========================================\nSCORE REPORT\n========================================\nAlice: 85 pts\nAfter default bonus: Alice: 95 pts\nAfter custom bonus: Alice: 120 pts\n--------------------\nEND OF REPORT\n--------------------\n",
        exercises: [
          {
            exerciseType: "review",
            instruction: "Write a function `clamp` that takes three parameters: a value `int& val` (by reference), a `const int& minVal`, and a `const int& maxVal`. If `val` is below `minVal`, set it to `minVal`. If above `maxVal`, set it to `maxVal`. Otherwise leave it unchanged. Test it in `main()` with three different values.",
            starterCode: `#include <iostream>\n\n// 1. Define void clamp(int& val, const int& minVal, const int& maxVal)\n// It should modify val in-place if it's out of range\n\n\nint main() {\n    int a = 150;\n    int b = -5;\n    int c = 50;\n    \n    // Uncomment after defining clamp:\n    // clamp(a, 0, 100);\n    // clamp(b, 0, 100);\n    // clamp(c, 0, 100);\n    \n    std::cout << "a: " << a << "\\n";\n    std::cout << "b: " << b << "\\n";\n    std::cout << "c: " << c << "\\n";\n    \n    return 0;\n}`,
            expectedOutput: "a: 100\nb: 0\nc: 50\n",
            hints: [
              "The signature is: `void clamp(int& val, const int& minVal, const int& maxVal)`",
              "Inside: `if (val < minVal) { val = minVal; }` then `if (val > maxVal) { val = maxVal; }`",
              "`val` is a reference so changes persist. `minVal` and `maxVal` are const refs because we only read them."
            ]
          },
          {
            exerciseType: "write",
            instruction: "Write two overloaded functions named `describe`. The first takes a single `const std::string& item` and prints `\"Item: <item>\"`. The second takes `const std::string& item` and an `int quantity`, and prints `\"Item: <item>, Qty: <quantity>\"`. Call both from `main()`.",
            starterCode: `#include <iostream>\n#include <string>\n\n// 1. Define void describe(const std::string& item)\n// Prints: "Item: <item>"\n\n\n// 2. Define void describe(const std::string& item, int quantity)\n// Prints: "Item: <item>, Qty: <quantity>"\n\n\nint main() {\n    // Uncomment after defining describe:\n    // describe("Laptop");\n    // describe("Mouse", 3);\n    \n    return 0;\n}`,
            expectedOutput: "Item: Laptop\nItem: Mouse, Qty: 3\n",
            hints: [
              "First function: `void describe(const std::string& item) { std::cout << \"Item: \" << item << \"\\n\"; }`",
              "Second function: `void describe(const std::string& item, int quantity) { ... }`",
              "Note: Do NOT use a default argument on the second overload here, because `describe(\"Laptop\")` must call the first overload, not the second with a default. Defaults would cause ambiguity.",
              "Print with: `std::cout << \"Item: \" << item << \", Qty: \" << quantity << \"\\n\";`"
            ]
          }
        ],
        quiz: [
          {
            question: "In the decision flowchart, when should you use `const&` to pass a parameter?",
            options: [
              "When the type is small like `int` or `bool`.",
              "When you need the function to modify the original variable.",
              "When the type is large (like `std::string`) and the function only needs to read it, not modify it.",
              "When you want to create a copy for safety."
            ],
            correctIndex: 2,
            explanation: "Const references avoid copying large types while providing a read-only safety guarantee. They are the default choice for passing strings and other large objects that don't need modification."
          },
          {
            question: "What is the difference between an lvalue and an rvalue?",
            options: [
              "An lvalue is a value on the left side of an equation; an rvalue is on the right.",
              "An lvalue is a named variable with a persistent memory location; an rvalue is a temporary value without a permanent address.",
              "An lvalue is a large value; an rvalue is a small value.",
              "There is no difference; they are the same thing."
            ],
            correctIndex: 1,
            explanation: "lvalues (like named variables) persist in memory and can be referenced. rvalues (like the literal `42` or the result of `a + b`) are temporary and exist only momentarily during an expression's evaluation."
          },
          {
            question: "Which of the following is NOT a valid reason to use function overloading?",
            options: [
              "To provide the same operation for different data types (e.g., `max(int, int)` and `max(double, double)`).",
              "To provide the same operation with different numbers of arguments.",
              "To define two functions that differ only in return type, not parameters.",
              "To create a clean, consistent API where the function name describes the operation."
            ],
            correctIndex: 2,
            explanation: "C++ does not allow overloading based solely on return type. The parameter lists must differ for the compiler to distinguish which function to call."
          }
        ]
      }
    ]
  });
})();
