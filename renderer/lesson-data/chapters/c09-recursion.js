(function() {
  window.CPP_CHAPTERS = window.CPP_CHAPTERS || [];
  window.CPP_CHAPTERS.push({
    id: 9,
    title: "Recursion",
    description: "Understand how functions can call themselves to solve problems.",
    icon: "🔄",
    lessons: [
      {
        id: "ch9-l1",
        title: "What Is Recursion?",
        difficulty: "beginner",
        content: `
<h2>What Is Recursion?</h2>
<p>In Chapter 7, you learned that functions can call other functions. In Chapter 8, you deepened your understanding of how data flows between functions through parameters and return values. Now we're going to explore a powerful — and initially mind-bending — idea: <strong>what happens when a function calls itself?</strong></p>
<p>This concept is called <strong>recursion</strong>, and it is one of the most important ideas in computer science. Many problems that seem impossibly complex can be broken down into simple, elegant recursive solutions.</p>

<h3>Why Learn Recursion?</h3>
<p>You might wonder: "If I can already solve problems with <code>for</code> and <code>while</code> loops, why do I need recursion?" Great question! Recursion offers a fundamentally different way of thinking about problems. Instead of telling the computer <em>step-by-step how to repeat something</em>, recursion lets you describe <em>how a big problem relates to a smaller version of itself</em>.</p>
<p>Some problems — like navigating folder structures, analyzing tree-shaped data, or computing mathematical sequences — are naturally recursive. While we won't tackle those advanced topics yet, learning to think recursively now will prepare you for them later.</p>

<h3>The Mental Model: Russian Nesting Dolls</h3>
<p>Imagine a set of Russian nesting dolls (matryoshka). You open the largest doll and find a smaller doll inside. You open that one and find an even smaller doll. You keep opening dolls until you reach the tiniest one that doesn't open — it's solid. That's the <strong>base case</strong>. Then you close them back up, one by one, in reverse order.</p>
<p>Recursion works exactly this way:</p>
<ol>
  <li>A function receives a problem.</li>
  <li>If the problem is small enough to solve directly, it solves it and returns. (This is the <strong>base case</strong>.)</li>
  <li>Otherwise, it breaks the problem into a <em>slightly smaller</em> version and calls <em>itself</em> to solve that smaller version. (This is the <strong>recursive case</strong>.)</li>
  <li>When the smallest problem is solved, the answers "bubble back up" through each call.</li>
</ol>
<p><em>Prerequisite Recall:</em> In Chapter 7's "Scope and the Stack" lesson, you learned that each function call gets its own stack frame — a private box of memory for its local variables. This is absolutely critical for recursion: every time a function calls itself, a <em>brand new</em> stack frame is created. Each call has its own independent copy of parameters and local variables.</p>

<h3>The Two Essential Parts</h3>
<p>Every recursive function <strong>must</strong> have exactly two things:</p>
<table>
  <tr><th>Part</th><th>Purpose</th><th>What Happens</th></tr>
  <tr><td><strong>Base Case</strong></td><td>Stopping condition</td><td>Returns a result directly without calling itself again</td></tr>
  <tr><td><strong>Recursive Case</strong></td><td>Progress toward base case</td><td>Calls the function with a <em>simpler</em> or <em>smaller</em> input</td></tr>
</table>

<h3>Your First Recursive Function: Countdown</h3>
<p>Let's start with the simplest possible example. We want to print a countdown from a given number down to 1, then print "Liftoff!". Here's how to think about it recursively:</p>
<ul>
  <li><strong>Base case:</strong> If the number is 0 or less, print "Liftoff!" and stop.</li>
  <li><strong>Recursive case:</strong> Print the current number, then count down from <code>number - 1</code>.</li>
</ul>

<h3>Worked Example: Line by Line</h3>
<ol>
  <li><code>void countdown(int n)</code> — We define a function that takes an integer.</li>
  <li><code>if (n &lt;= 0)</code> — This is the <strong>base case</strong>. When <code>n</code> reaches 0, we stop recursing.</li>
  <li><code>std::cout &lt;&lt; "Liftoff!"</code> — The base case action: print the final message and return.</li>
  <li><code>std::cout &lt;&lt; n</code> — The recursive case: print the current number.</li>
  <li><code>countdown(n - 1)</code> — The function calls <strong>itself</strong> with a smaller number. This is the recursive step!</li>
</ol>

<h3>Tracing the Execution</h3>
<p>When we call <code>countdown(3)</code>, here's exactly what happens:</p>
<pre><code>countdown(3):  prints "3", then calls countdown(2)
  countdown(2):  prints "2", then calls countdown(1)
    countdown(1):  prints "1", then calls countdown(0)
      countdown(0):  prints "Liftoff!" and RETURNS
    countdown(1):  returns
  countdown(2):  returns
countdown(3):  returns</code></pre>
<p>Notice the indentation — each nested call goes deeper. When the base case finally triggers, execution "unwinds" back through each call in reverse order.</p>

<div class="tip">
  <strong>Tip:</strong> When you see a recursive function, always identify the base case first. If you can't find a clear base case, the function will call itself forever — just like an infinite loop, but worse (it will crash your program by exhausting memory).
</div>

<div class="mistake">
  <strong>Common Mistake:</strong> Forgetting the base case! Without <code>if (n &lt;= 0)</code>, the function would call <code>countdown(-1)</code>, then <code>countdown(-2)</code>, then <code>countdown(-3)</code>... forever. This is called <strong>infinite recursion</strong>, and it causes a <strong>stack overflow</strong> — your program runs out of stack memory and crashes.
</div>

<h3>Predict Activity</h3>
<p>If you call <code>countdown(5)</code>, how many times does the function call itself before reaching the base case? And what is the very first thing printed?</p>
        `,
        codeExample: `#include <iostream>\n\n// A recursive function that counts down from n to 1\nvoid countdown(int n) {\n    // BASE CASE: stop when n reaches 0\n    if (n <= 0) {\n        std::cout << "Liftoff!\\n";\n        return;  // Stop recursing!\n    }\n    \n    // RECURSIVE CASE: print n, then count down from n-1\n    std::cout << n << "...\\n";\n    countdown(n - 1);  // The function calls ITSELF!\n}\n\nint main() {\n    std::cout << "Countdown from 3:\\n";\n    countdown(3);\n    \n    std::cout << "\\nCountdown from 5:\\n";\n    countdown(5);\n    \n    return 0;\n}`,
        expectedOutput: "Countdown from 3:\n3...\n2...\n1...\nLiftoff!\n\nCountdown from 5:\n5...\n4...\n3...\n2...\n1...\nLiftoff!\n",
        exercises: [
          {
            exerciseType: "predict",
            instruction: "Read the code carefully. Trace the recursive calls by hand. What will this program print? Set the `answer` variable to the number of times 'Hello' is printed.",
            starterCode: `#include <iostream>\n\nvoid repeat(int n) {\n    if (n <= 0) {\n        return;\n    }\n    std::cout << "Hello\\n";\n    repeat(n - 1);\n}\n\nint main() {\n    repeat(4);\n    \n    // How many times is "Hello" printed?\n    // Replace 0 with your answer.\n    int answer = 0;\n    std::cout << answer << "\\n";\n    return 0;\n}`,
            expectedOutput: "Hello\nHello\nHello\nHello\n4\n",
            hints: [
              "repeat(4) prints Hello then calls repeat(3).",
              "repeat(3) prints Hello then calls repeat(2), and so on.",
              "repeat(0) hits the base case and stops. Count the prints!"
            ]
          },
          {
            exerciseType: "modify",
            instruction: "Modify the `countUp` function so that it counts UP from 1 to `n` instead of down. Hint: in a recursive count-up, you should make the recursive call BEFORE printing the current number. The base case remains the same.",
            starterCode: `#include <iostream>\n\nvoid countUp(int n) {\n    // Base case\n    if (n <= 0) {\n        return;\n    }\n    \n    // Currently counts DOWN. Rearrange these two lines\n    // so that it counts UP from 1 to n instead.\n    std::cout << n << " ";\n    countUp(n - 1);\n}\n\nint main() {\n    countUp(5);\n    std::cout << "\\n";\n    return 0;\n}`,
            expectedOutput: "1 2 3 4 5 \n",
            hints: [
              "Think about when the printing happens relative to the recursive call.",
              "If you call countUp(n - 1) BEFORE std::cout << n, the smaller numbers get printed first.",
              "The recursive call unwinds from the base case (1) back up to n (5), printing as it returns."
            ]
          }
        ],
        quiz: [
          {
            question: "What are the two essential parts that every recursive function must have?",
            options: [
              "A `for` loop and a `while` loop.",
              "A header file and a `main()` function.",
              "A `return 0;` statement and a global variable.",
              "A base case (stopping condition) and a recursive case (self-call with a smaller problem)."
            ],
            correctIndex: 3,
            explanation: "Every recursive function needs a base case to stop the recursion and a recursive case that calls itself with a simpler input, making progress toward the base case."
          },
          {
            question: "What happens if a recursive function does not have a base case?",
            options: [
              "The function calls itself infinitely, eventually causing a stack overflow crash.",
              "The compiler automatically adds a base case.",
              "The function runs once and stops normally.",
              "The function returns 0 by default."
            ],
            correctIndex: 0,
            explanation: "Without a base case, the function never stops calling itself. Each call adds a new stack frame, and eventually the program runs out of stack memory and crashes — this is called a stack overflow."
          },
          {
            question: "When `countdown(3)` is called, how many total stack frames for `countdown` exist at the deepest point of recursion?",
            options: [
              "1 — only the original call.",
              "3 — one for countdown(3), one for countdown(2), one for countdown(1).",
              "4 — one for countdown(3), countdown(2), countdown(1), and countdown(0).",
              "0 — recursive functions don't use stack frames."
            ],
            correctIndex: 2,
            explanation: "Each call creates its own stack frame: countdown(3) calls countdown(2) calls countdown(1) calls countdown(0). At the deepest point, all 4 frames exist simultaneously on the stack."
          }
        ]
      },
      {
        id: "ch9-l2",
        title: "The Call Stack and Returning Values",
        difficulty: "beginner",
        content: `
<h2>The Call Stack and Returning Values</h2>
<p>In the previous lesson, our recursive <code>countdown</code> function printed output but didn't return any values — it was a <code>void</code> function. Now we're going to unlock the real power of recursion: <strong>computing and returning values</strong>. This is where recursion transforms from a curiosity into a genuinely useful problem-solving technique.</p>

<h3>Why Return Values Matter</h3>
<p>Many mathematical problems have naturally recursive definitions. For example, the sum of numbers from 1 to <em>n</em> can be defined as:</p>
<ul>
  <li><strong>Base case:</strong> The sum from 1 to 1 is just 1.</li>
  <li><strong>Recursive case:</strong> The sum from 1 to <em>n</em> is <em>n</em> plus the sum from 1 to <em>(n-1)</em>.</li>
</ul>
<p>This is the key insight: <code>sum(n) = n + sum(n-1)</code>. The function computes part of the answer, then delegates the rest to a smaller version of itself.</p>

<h3>The Mental Model: Stack of Sticky Notes</h3>
<p>Imagine you're computing <code>sum(4)</code>. You write on a sticky note: "I need to compute 4 + sum(3). Let me figure out sum(3) first." You set this note aside and start a new one for <code>sum(3)</code>: "I need 3 + sum(2)." You set that aside too. This continues until you reach <code>sum(1)</code>, which you know is just <code>1</code>.</p>
<p>Now you start picking up the sticky notes in reverse order, filling in the answers:</p>
<pre><code>sum(1) = 1                        → returns 1
sum(2) = 2 + sum(1) = 2 + 1      → returns 3
sum(3) = 3 + sum(2) = 3 + 3      → returns 6
sum(4) = 4 + sum(3) = 4 + 6      → returns 10</code></pre>
<p><em>Prerequisite Recall:</em> Remember from Chapter 7 that when a function calls another function, the caller <em>pauses</em> and waits for the called function to return. In recursion, <code>sum(4)</code> pauses while <code>sum(3)</code> runs, which pauses while <code>sum(2)</code> runs, and so on. Each paused call is a stack frame waiting on the call stack.</p>

<h3>Call Stack Diagram for sum(4)</h3>
<p>Here is what the call stack looks like at the deepest point of recursion, just before <code>sum(1)</code> returns:</p>
<pre><code>┌─────────────────────────────┐
│ sum(1)  → returns 1         │  ← TOP (active)
├─────────────────────────────┤
│ sum(2)  → waiting for sum(1)│
├─────────────────────────────┤
│ sum(3)  → waiting for sum(2)│
├─────────────────────────────┤
│ sum(4)  → waiting for sum(3)│
├─────────────────────────────┤
│ main()  → waiting for sum(4)│  ← BOTTOM
└─────────────────────────────┘</code></pre>
<p>Each box is a stack frame with its own local copy of <code>n</code>. When <code>sum(1)</code> returns <code>1</code>, its stack frame is destroyed, and <code>sum(2)</code> resumes — receiving the value <code>1</code> and computing <code>2 + 1 = 3</code>.</p>

<h3>Step-by-Step Execution Trace</h3>
<p>Let's trace <code>sum(4)</code> with complete detail:</p>
<ol>
  <li><code>main()</code> calls <code>sum(4)</code>. A stack frame for <code>sum</code> is created with <code>n = 4</code>.</li>
  <li><code>n</code> is not 1, so we compute <code>4 + sum(3)</code>. But first, we must evaluate <code>sum(3)</code>. Execution <strong>pauses</strong>.</li>
  <li>A new stack frame is created with <code>n = 3</code>. We need <code>3 + sum(2)</code>. Execution <strong>pauses</strong> again.</li>
  <li>A new stack frame: <code>n = 2</code>. We need <code>2 + sum(1)</code>. Execution <strong>pauses</strong> again.</li>
  <li>A new stack frame: <code>n = 1</code>. This is the <strong>base case</strong>! We return <code>1</code> immediately.</li>
  <li>The <code>sum(1)</code> frame is destroyed. <code>sum(2)</code> <strong>resumes</strong>: computes <code>2 + 1 = 3</code>, returns <code>3</code>.</li>
  <li>The <code>sum(2)</code> frame is destroyed. <code>sum(3)</code> <strong>resumes</strong>: computes <code>3 + 3 = 6</code>, returns <code>6</code>.</li>
  <li>The <code>sum(3)</code> frame is destroyed. <code>sum(4)</code> <strong>resumes</strong>: computes <code>4 + 6 = 10</code>, returns <code>10</code>.</li>
  <li><code>main()</code> receives <code>10</code> and prints it.</li>
</ol>

<div class="note">
  <strong>Key Insight:</strong> The value flows <em>upward</em> through the call stack. Each function waits for the one above it to return, then uses that returned value to compute its own result. This "unwinding" phase is just as important as the "winding down" phase.
</div>

<div class="tip">
  <strong>Tip:</strong> When tracing recursive functions, write down each call and its argument. Then, starting from the base case, fill in the return values going back up. This "trace table" technique makes recursion much easier to understand.
</div>

<div class="mistake">
  <strong>Common Mistake:</strong> Using the wrong base case value! If you write <code>if (n &lt;= 0) return 0;</code> instead of <code>if (n == 1) return 1;</code>, calling <code>sum(1)</code> would compute <code>1 + sum(0)</code> = <code>1 + 0</code> = <code>1</code>, which happens to work — but calling <code>sum(-3)</code> could recurse infinitely. Always think carefully about what inputs your base case needs to handle.
</div>

<h3>Predict Activity</h3>
<p>If you have <code>int mystery(int n) { if (n == 0) return 0; return n + mystery(n - 1); }</code>, what does <code>mystery(5)</code> return? Trace it by hand before checking.</p>
        `,
        codeExample: `#include <iostream>\n\n// Recursive sum: computes 1 + 2 + 3 + ... + n\nint sum(int n) {\n    // BASE CASE: the sum from 1 to 1 is just 1\n    if (n == 1) {\n        std::cout << "  Base case: sum(1) = 1\\n";\n        return 1;\n    }\n    \n    // RECURSIVE CASE: sum(n) = n + sum(n-1)\n    int smallerSum = sum(n - 1);\n    int result = n + smallerSum;\n    std::cout << "  sum(" << n << ") = " << n << " + " << smallerSum << " = " << result << "\\n";\n    return result;\n}\n\nint main() {\n    std::cout << "Tracing sum(4):\\n";\n    int answer = sum(4);\n    std::cout << "Final answer: " << answer << "\\n";\n    \n    std::cout << "\\nTracing sum(6):\\n";\n    answer = sum(6);\n    std::cout << "Final answer: " << answer << "\\n";\n    \n    return 0;\n}`,
        expectedOutput: "Tracing sum(4):\n  Base case: sum(1) = 1\n  sum(2) = 2 + 1 = 3\n  sum(3) = 3 + 3 = 6\n  sum(4) = 4 + 6 = 10\nFinal answer: 10\n\nTracing sum(6):\n  Base case: sum(1) = 1\n  sum(2) = 2 + 1 = 3\n  sum(3) = 3 + 3 = 6\n  sum(4) = 4 + 6 = 10\n  sum(5) = 5 + 10 = 15\n  sum(6) = 6 + 15 = 21\nFinal answer: 21\n",
        exercises: [
          {
            exerciseType: "complete",
            instruction: "Complete the recursive `product` function that computes the product of all integers from 1 to n (i.e., 1 * 2 * 3 * ... * n). This is also known as n factorial, but focus on the recursive pattern: product(n) = n * product(n - 1), with a base case of product(1) = 1.",
            starterCode: `#include <iostream>\n\nint product(int n) {\n    // 1. Add the base case: if n is 1, return 1\n    \n    \n    // 2. Recursive case: return n * product(n - 1)\n    \n}\n\nint main() {\n    std::cout << "product(1) = " << product(1) << "\\n";\n    std::cout << "product(4) = " << product(4) << "\\n";\n    std::cout << "product(5) = " << product(5) << "\\n";\n    return 0;\n}`,
            expectedOutput: "product(1) = 1\nproduct(4) = 24\nproduct(5) = 120\n",
            hints: [
              "The base case is: `if (n == 1) { return 1; }`",
              "The recursive case is: `return n * product(n - 1);`",
              "Trace: product(4) = 4 * product(3) = 4 * 3 * product(2) = 4 * 3 * 2 * product(1) = 4 * 3 * 2 * 1 = 24"
            ]
          },
          {
            exerciseType: "write",
            instruction: "Write a recursive function `power` that computes `base` raised to the `exp` power (base^exp). The base case is: any number raised to the power 0 is 1. The recursive case is: power(base, exp) = base * power(base, exp - 1). Test it in main().",
            starterCode: `#include <iostream>\n\n// Write your recursive power function here\n// int power(int base, int exp)\n// Base case: exp == 0 -> return 1\n// Recursive case: return base * power(base, exp - 1)\n\n\nint main() {\n    // Uncomment these after writing your function:\n    // std::cout << "2^0 = " << power(2, 0) << "\\n";\n    // std::cout << "2^5 = " << power(2, 5) << "\\n";\n    // std::cout << "3^4 = " << power(3, 4) << "\\n";\n    \n    return 0;\n}`,
            expectedOutput: "2^0 = 1\n2^5 = 32\n3^4 = 81\n",
            hints: [
              "The signature is `int power(int base, int exp)`.",
              "Base case: `if (exp == 0) { return 1; }`",
              "Recursive case: `return base * power(base, exp - 1);`"
            ]
          }
        ],
        quiz: [
          {
            question: "In the recursive `sum(4)` function, what is the first value returned (from the deepest recursive call)?",
            options: [
              "10 — the final answer.",
              "1 — the base case returns 1 when n equals 1.",
              "4 — the original input.",
              "0 — the function returns 0 by default."
            ],
            correctIndex: 1,
            explanation: "The deepest call is sum(1), which hits the base case and returns 1. This is the first value returned, and it starts the chain of computations back up the call stack."
          },
          {
            question: "How many stack frames exist simultaneously at the deepest point when computing `sum(5)`?",
            options: [
              "5 — one for each call: sum(5), sum(4), sum(3), sum(2), sum(1).",
              "10 — two frames per recursive call.",
              "1 — only the current active frame exists.",
              "6 — the 5 sum frames plus the main() frame."
            ],
            correctIndex: 3,
            explanation: "At the deepest point, main() is waiting for sum(5), which is waiting for sum(4), which waits for sum(3), then sum(2), then sum(1). That's 6 total frames on the stack."
          },
          {
            question: "What does 'unwinding' mean in the context of recursion?",
            options: [
              "The phase where each recursive call returns its result back to the caller, from the deepest call back to the original.",
              "The phase where base cases are being searched for.",
              "The process of deleting the function from memory.",
              "The process of converting recursion to a loop."
            ],
            correctIndex: 0,
            explanation: "Unwinding is the return phase: after the base case returns, each waiting call receives the result, computes its own answer, and returns it upward — like unraveling a chain from the bottom up."
          }
        ]
      },
      {
        id: "ch9-l3",
        title: "Factorial, Fibonacci, and Common Pitfalls",
        difficulty: "intermediate",
        content: `
<h2>Factorial, Fibonacci, and Common Pitfalls</h2>
<p>Now that you understand the mechanics of recursion — base cases, recursive cases, and call stack unwinding — let's apply these skills to two classic problems: <strong>factorial</strong> and <strong>Fibonacci</strong>. Along the way, we'll examine the most common mistakes beginners make and learn how to avoid them.</p>

<h3>Factorial: The Perfect Recursive Problem</h3>
<p>The <strong>factorial</strong> of a number <em>n</em> (written as <em>n!</em>) is the product of all positive integers from 1 to <em>n</em>. For example:</p>
<ul>
  <li><code>5! = 5 × 4 × 3 × 2 × 1 = 120</code></li>
  <li><code>3! = 3 × 2 × 1 = 6</code></li>
  <li><code>1! = 1</code></li>
  <li><code>0! = 1</code> (by mathematical convention)</li>
</ul>
<p>The recursive definition is beautifully simple:</p>
<pre><code>factorial(0) = 1              // Base case
factorial(n) = n * factorial(n - 1)  // Recursive case</code></pre>

<h3>Execution Trace: factorial(5)</h3>
<pre><code>factorial(5) = 5 * factorial(4)
  factorial(4) = 4 * factorial(3)
    factorial(3) = 3 * factorial(2)
      factorial(2) = 2 * factorial(1)
        factorial(1) = 1 * factorial(0)
          factorial(0) = 1            ← base case!
        factorial(1) = 1 * 1 = 1     ← unwinding begins
      factorial(2) = 2 * 1 = 2
    factorial(3) = 3 * 2 = 6
  factorial(4) = 4 * 6 = 24
factorial(5) = 5 * 24 = 120          ← final answer</code></pre>

<h3>Fibonacci: Understanding Exponential Recursion</h3>
<p>The <strong>Fibonacci sequence</strong> is: 0, 1, 1, 2, 3, 5, 8, 13, 21, ... Each number is the sum of the two numbers before it. The recursive definition is:</p>
<pre><code>fib(0) = 0              // Base case 1
fib(1) = 1              // Base case 2
fib(n) = fib(n-1) + fib(n-2)  // Recursive case</code></pre>
<p>Notice something different: Fibonacci has <strong>two base cases</strong> and each recursive call makes <strong>two</strong> further calls. This creates a tree-shaped pattern of calls.</p>

<h3>Execution Trace: fib(4)</h3>
<pre><code>fib(4) = fib(3) + fib(2)
  fib(3) = fib(2) + fib(1)
    fib(2) = fib(1) + fib(0)
      fib(1) = 1         ← base case
      fib(0) = 0         ← base case
    fib(2) = 1 + 0 = 1
    fib(1) = 1           ← base case
  fib(3) = 1 + 1 = 2
  fib(2) = fib(1) + fib(0)
    fib(1) = 1           ← base case
    fib(0) = 0           ← base case
  fib(2) = 1 + 0 = 1
fib(4) = 2 + 1 = 3</code></pre>
<p>Notice that <code>fib(2)</code> was computed <strong>twice</strong>! For larger inputs, this duplication grows dramatically. <code>fib(30)</code> would make over a <em>billion</em> function calls. This is why naive recursive Fibonacci is very slow for large inputs — but it's an excellent tool for understanding how recursion works.</p>

<div class="warning">
  <strong>Performance Warning:</strong> The recursive Fibonacci function is intentionally inefficient. We study it here to understand recursion, NOT as a model for efficient code. In later chapters, you'll learn techniques to solve Fibonacci efficiently. For now, test only with small values (n &lt; 30).
</div>

<h3>Common Recursion Mistakes</h3>
<p>Here are the most frequent errors beginners make with recursion:</p>

<h3>Mistake 1: Missing Base Case</h3>
<pre><code>int badFactorial(int n) {
    return n * badFactorial(n - 1); // No base case! Infinite recursion!
}</code></pre>
<p>This will crash with a <strong>stack overflow</strong> because the function never stops calling itself.</p>

<h3>Mistake 2: Recursive Case Doesn't Make Progress</h3>
<pre><code>int brokenSum(int n) {
    if (n == 0) return 0;
    return n + brokenSum(n); // Bug: should be n-1, not n!
}</code></pre>
<p>The recursive call passes <code>n</code> unchanged, so it will never reach the base case.</p>

<h3>Mistake 3: Wrong Base Case Value</h3>
<pre><code>int wrongFactorial(int n) {
    if (n == 0) return 0; // Should return 1, not 0!
    return n * wrongFactorial(n - 1);
}</code></pre>
<p>Since everything is multiplied by the base case, returning 0 makes <em>every</em> result 0.</p>

<div class="tip">
  <strong>Recursion Checklist:</strong> Before writing recursive code, verify: (1) Does the base case return the correct value? (2) Does the recursive case make the problem smaller? (3) Will every possible input eventually reach the base case?
</div>

<div class="mistake">
  <strong>Common Mistake:</strong> For factorial, a common error is using base case <code>if (n == 0) return 0;</code>. Since <code>0! = 1</code> (not 0), this causes every factorial computation to return 0 because multiplying by 0 at the bottom zeroes out the entire chain.
</div>

<h3>Predict Activity</h3>
<p>What does <code>factorial(0)</code> return? And what does <code>fib(6)</code> return? Trace them by hand.</p>
        `,
        codeExample: `#include <iostream>\n\n// Factorial: n! = n * (n-1) * ... * 1\nint factorial(int n) {\n    if (n <= 1) {\n        return 1;  // 0! = 1 and 1! = 1\n    }\n    return n * factorial(n - 1);\n}\n\n// Fibonacci: each number is the sum of the two before it\nint fib(int n) {\n    if (n == 0) return 0;  // Base case 1\n    if (n == 1) return 1;  // Base case 2\n    return fib(n - 1) + fib(n - 2);  // Two recursive calls!\n}\n\nint main() {\n    // Factorial examples\n    std::cout << "Factorials:\\n";\n    for (int i = 0; i <= 6; i++) {\n        std::cout << "  " << i << "! = " << factorial(i) << "\\n";\n    }\n    \n    // Fibonacci examples\n    std::cout << "\\nFirst 10 Fibonacci numbers:\\n";\n    for (int i = 0; i < 10; i++) {\n        std::cout << "  fib(" << i << ") = " << fib(i) << "\\n";\n    }\n    \n    return 0;\n}`,
        expectedOutput: "Factorials:\n  0! = 1\n  1! = 1\n  2! = 2\n  3! = 6\n  4! = 24\n  5! = 120\n  6! = 720\n\nFirst 10 Fibonacci numbers:\n  fib(0) = 0\n  fib(1) = 1\n  fib(2) = 1\n  fib(3) = 2\n  fib(4) = 3\n  fib(5) = 5\n  fib(6) = 8\n  fib(7) = 13\n  fib(8) = 21\n  fib(9) = 34\n",
        exercises: [
          {
            exerciseType: "debug",
            instruction: "This factorial function has TWO bugs! One is in the base case (it returns the wrong value), and the other is in the recursive case (it doesn't make progress toward the base case). Fix both bugs so the function computes factorial correctly.",
            starterCode: `#include <iostream>\n\nint factorial(int n) {\n    // Bug 1: Wrong base case value\n    if (n <= 1) {\n        return 0;\n    }\n    // Bug 2: Recursive case doesn't shrink\n    return n * factorial(n);\n}\n\nint main() {\n    std::cout << "3! = " << factorial(3) << "\\n";\n    std::cout << "5! = " << factorial(5) << "\\n";\n    return 0;\n}`,
            expectedOutput: "3! = 6\n5! = 120\n",
            hints: [
              "Bug 1: 0! and 1! both equal 1, not 0. Change `return 0;` to `return 1;`.",
              "Bug 2: `factorial(n)` calls itself with the SAME value. Change to `factorial(n - 1)` to make progress.",
              "After fixes: base case returns 1, and recursive case calls factorial(n-1)."
            ]
          },
          {
            exerciseType: "write",
            instruction: "Write a recursive function `sumOfDigits` that takes a positive integer and returns the sum of its individual digits. For example, sumOfDigits(123) should return 6 (1 + 2 + 3). Hint: `n % 10` gives the last digit, and `n / 10` removes the last digit.",
            starterCode: `#include <iostream>\n\n// Write your recursive sumOfDigits function here\n// Base case: if n is a single digit (n < 10), return n\n// Recursive case: return (n % 10) + sumOfDigits(n / 10)\n\n\nint main() {\n    // Uncomment after writing your function:\n    // std::cout << "sumOfDigits(123) = " << sumOfDigits(123) << "\\n";\n    // std::cout << "sumOfDigits(9999) = " << sumOfDigits(9999) << "\\n";\n    // std::cout << "sumOfDigits(5) = " << sumOfDigits(5) << "\\n";\n    \n    return 0;\n}`,
            expectedOutput: "sumOfDigits(123) = 6\nsumOfDigits(9999) = 36\nsumOfDigits(5) = 5\n",
            hints: [
              "The signature is `int sumOfDigits(int n)`.",
              "Base case: `if (n < 10) return n;` — a single digit is its own sum.",
              "Recursive case: `return (n % 10) + sumOfDigits(n / 10);` — add last digit to sum of remaining digits."
            ]
          }
        ],
        quiz: [
          {
            question: "What is the value of `factorial(0)` using the standard mathematical definition?",
            options: [
              "0",
              "1",
              "undefined — factorial is not defined for 0.",
              "-1"
            ],
            correctIndex: 1,
            explanation: "By mathematical convention, 0! = 1. This is the base case for the factorial function. Returning 0 instead of 1 would cause every factorial to evaluate to 0."
          },
          {
            question: "Why is the naive recursive Fibonacci function extremely slow for large values of n?",
            options: [
              "Because it uses too much memory for storing the sequence.",
              "Because the compiler cannot optimize recursive functions.",
              "Because the base cases are wrong.",
              "Because each call makes TWO recursive calls, creating an exponentially growing tree of redundant computations."
            ],
            correctIndex: 3,
            explanation: "Each fib(n) call spawns two more calls, and many subproblems (like fib(2)) are recomputed many times. The number of calls grows exponentially — roughly 2^n — making it impractical for large n."
          },
          {
            question: "A student writes: `int f(int n) { if (n == 0) return 1; return n * f(n); }`. What will happen when they call `f(3)`?",
            options: [
              "It causes infinite recursion and a stack overflow, because the recursive call `f(n)` never changes `n`.",
              "It returns 3.",
              "It returns 6.",
              "It returns 0."
            ],
            correctIndex: 0,
            explanation: "The recursive call `f(n)` passes the same value of `n` every time, so it never reaches the base case `n == 0`. The function calls itself infinitely until the stack overflows."
          }
        ]
      },
      {
        id: "ch9-l4",
        title: "Recursion vs Iteration",
        difficulty: "intermediate",
        content: `
<h2>Recursion vs Iteration</h2>
<p>You might have noticed something: every recursive function we've written so far could also be written using a simple <code>for</code> or <code>while</code> loop. So why learn recursion at all? This lesson compares the two approaches and helps you understand when to choose one over the other.</p>

<h3>Motivation</h3>
<p>Both recursion and iteration are ways to repeat work. The key difference is in <em>how</em> they express the repetition:</p>
<table>
  <tr><th>Aspect</th><th>Iteration (Loops)</th><th>Recursion</th></tr>
  <tr><td><strong>How it repeats</strong></td><td>Uses a loop variable that changes each iteration</td><td>Calls itself with a modified argument</td></tr>
  <tr><td><strong>State management</strong></td><td>Explicit: you manage loop variables and accumulators</td><td>Implicit: each call's parameters are its state</td></tr>
  <tr><td><strong>Termination</strong></td><td>Loop condition becomes false</td><td>Base case is reached</td></tr>
  <tr><td><strong>Memory</strong></td><td>Constant (one stack frame)</td><td>Grows with recursion depth (one frame per call)</td></tr>
  <tr><td><strong>Readability</strong></td><td>Natural for step-by-step processes</td><td>Natural for problems defined in terms of subproblems</td></tr>
</table>

<h3>Side-by-Side: Factorial</h3>
<p>Let's see both approaches for computing factorial:</p>
<pre><code>// ITERATIVE factorial
int factorialLoop(int n) {
    int result = 1;
    for (int i = 2; i &lt;= n; i++) {
        result = result * i;
    }
    return result;
}

// RECURSIVE factorial
int factorialRec(int n) {
    if (n &lt;= 1) return 1;
    return n * factorialRec(n - 1);
}</code></pre>
<p>Both produce the same output. The iterative version uses a loop variable <code>i</code> and an accumulator <code>result</code>. The recursive version elegantly mirrors the mathematical definition: <code>n! = n × (n-1)!</code></p>

<h3>When to Use Each Approach</h3>
<p><strong>Choose iteration when:</strong></p>
<ul>
  <li>The problem is a straightforward repetition (counting, accumulating).</li>
  <li>You need maximum performance and minimal memory usage.</li>
  <li>The recursive depth could be very large (thousands of calls could overflow the stack).</li>
</ul>
<p><strong>Choose recursion when:</strong></p>
<ul>
  <li>The problem is naturally defined in terms of smaller subproblems (mathematical formulas, nested structures).</li>
  <li>The recursive solution is significantly clearer and simpler than the iterative one.</li>
  <li>The recursion depth is bounded and manageable (typically fewer than a few thousand calls).</li>
</ul>

<h3>The Stack Depth Problem</h3>
<p>Every recursive call adds a stack frame. Most systems allow roughly 1,000 to 10,000 stack frames before crashing. This means <code>factorial(100000)</code> using recursion would crash, while an iterative version would work fine (ignoring integer overflow).</p>
<pre><code>// This will crash with a stack overflow!
// factorial(100000);  // ~100,000 stack frames

// This iterative version handles it (ignoring overflow):
int result = 1;
for (int i = 2; i &lt;= 100000; i++) {
    result *= i;  // Would overflow int, but no stack crash
}</code></pre>

<div class="note">
  <strong>Note:</strong> For the problems we're learning now (factorial, sum, Fibonacci), iteration is usually the practical choice because the recursive versions offer no real advantage and use more memory. But recursion becomes essential when you encounter problems with inherently recursive structures — like navigating folders within folders, or processing nested data. You'll see these in later chapters.
</div>

<div class="tip">
  <strong>When in Doubt:</strong> Start with the approach that makes the problem easiest to understand. If you need to optimize later, you can always convert a recursive solution to an iterative one, or vice versa.
</div>

<div class="mistake">
  <strong>Common Mistake:</strong> Assuming recursion is always slower or always better than iteration. Neither is universally superior. The best approach depends on the specific problem, the depth of recursion, and the clarity of the code.
</div>

<h3>Predict Activity</h3>
<p>If you call a recursive function that counts down from <code>n</code> to 0, how many stack frames will be created for <code>n = 10000</code>? Would you expect this to work safely on most systems?</p>
        `,
        codeExample: `#include <iostream>\n\n// ITERATIVE version: uses a loop\nint sumIterative(int n) {\n    int total = 0;\n    for (int i = 1; i <= n; i++) {\n        total += i;\n    }\n    return total;\n}\n\n// RECURSIVE version: uses self-calls\nint sumRecursive(int n) {\n    if (n <= 0) return 0;\n    return n + sumRecursive(n - 1);\n}\n\n// ITERATIVE factorial\nint factorialIterative(int n) {\n    int result = 1;\n    for (int i = 2; i <= n; i++) {\n        result *= i;\n    }\n    return result;\n}\n\n// RECURSIVE factorial\nint factorialRecursive(int n) {\n    if (n <= 1) return 1;\n    return n * factorialRecursive(n - 1);\n}\n\nint main() {\n    // Both approaches give the same results!\n    std::cout << "Sum Comparison:\\n";\n    std::cout << "  Iterative sum(10) = " << sumIterative(10) << "\\n";\n    std::cout << "  Recursive sum(10) = " << sumRecursive(10) << "\\n";\n    \n    std::cout << "\\nFactorial Comparison:\\n";\n    std::cout << "  Iterative 7! = " << factorialIterative(7) << "\\n";\n    std::cout << "  Recursive 7! = " << factorialRecursive(7) << "\\n";\n    \n    std::cout << "\\nBoth approaches produce identical results!\\n";\n    \n    return 0;\n}`,
        expectedOutput: "Sum Comparison:\n  Iterative sum(10) = 55\n  Recursive sum(10) = 55\n\nFactorial Comparison:\n  Iterative 7! = 5040\n  Recursive 7! = 5040\n\nBoth approaches produce identical results!\n",
        exercises: [
          {
            exerciseType: "modify",
            instruction: "The code below computes the sum of integers from 1 to n using recursion. Convert it to use a `while` loop instead. Keep the function signature the same, but replace the recursive logic with iterative logic.",
            starterCode: `#include <iostream>\n\n// Convert this recursive function to use a while loop instead\nint sumToN(int n) {\n    if (n <= 0) return 0;\n    return n + sumToN(n - 1);\n}\n\nint main() {\n    std::cout << "sum(1) = " << sumToN(1) << "\\n";\n    std::cout << "sum(5) = " << sumToN(5) << "\\n";\n    std::cout << "sum(10) = " << sumToN(10) << "\\n";\n    return 0;\n}`,
            expectedOutput: "sum(1) = 1\nsum(5) = 15\nsum(10) = 55\n",
            hints: [
              "Create a `total` variable initialized to 0.",
              "Use `while (n > 0) { total += n; n--; }`",
              "Return `total` at the end of the function."
            ]
          }
        ],
        quiz: [
          {
            question: "What is the main advantage of iteration over recursion for simple problems like computing a sum?",
            options: [
              "Iteration produces different results than recursion.",
              "Iteration is always faster because the CPU processes loops differently.",
              "Iteration uses constant memory (one stack frame) regardless of the input size, while recursion adds a new stack frame for each call.",
              "Iteration doesn't require a base case."
            ],
            correctIndex: 2,
            explanation: "Iterative solutions reuse the same stack frame, using constant memory. Recursive solutions create a new stack frame per call, so memory usage grows linearly with recursion depth."
          },
          {
            question: "When is recursion typically a BETTER choice than iteration?",
            options: [
              "Always — recursion is superior for every problem.",
              "When counting from 1 to n.",
              "When you want to use less memory.",
              "When the problem is naturally defined in terms of smaller subproblems and the recursive solution is significantly clearer."
            ],
            correctIndex: 3,
            explanation: "Recursion shines when the problem structure is inherently recursive — like processing nested data structures or following branching paths. For simple counting or accumulating, loops are usually clearer and more efficient."
          },
          {
            question: "What typically happens if a recursive function has a recursion depth of 100,000?",
            options: [
              "It likely causes a stack overflow crash because most systems limit the call stack to a few thousand frames.",
              "It runs perfectly fine on all systems.",
              "The compiler automatically converts it to a loop.",
              "It uses less memory than an iterative solution."
            ],
            correctIndex: 0,
            explanation: "Most systems allocate a limited amount of memory for the call stack (typically a few MB). 100,000 nested stack frames would exceed this limit, causing a stack overflow and program crash."
          }
        ]
      },
      {
        id: "ch9-l5",
        title: "Review: Recursion",
        difficulty: "beginner",
        content: `
<h2>Review: Recursion</h2>
<p>Congratulations! You have learned one of the most fundamental and powerful concepts in computer science. Recursion is a technique that appears throughout programming — from mathematical computations to data processing to algorithm design. Even if you don't use recursion daily, understanding it is essential to becoming a well-rounded programmer.</p>

<h3>Chapter Summary</h3>
<ul>
  <li><strong>Recursion</strong> is when a function calls itself to solve a problem by breaking it into smaller, simpler versions of the same problem.</li>
  <li><strong>Base Case:</strong> The stopping condition that returns a result without making another recursive call. Without it, you get infinite recursion.</li>
  <li><strong>Recursive Case:</strong> The part that calls the function with a smaller or simpler input, making progress toward the base case.</li>
  <li><strong>Call Stack:</strong> Each recursive call creates a new stack frame. At the deepest point, all frames exist simultaneously. As base cases return, frames are destroyed in reverse order (unwinding).</li>
  <li><strong>Returning Values:</strong> Recursive functions can compute values by having each call contribute part of the answer and delegating the rest to the recursive call.</li>
  <li><strong>Factorial:</strong> <code>n! = n × (n-1)!</code> with base case <code>0! = 1</code>. A clean example of linear recursion.</li>
  <li><strong>Fibonacci:</strong> <code>fib(n) = fib(n-1) + fib(n-2)</code> with base cases <code>fib(0) = 0</code> and <code>fib(1) = 1</code>. Demonstrates two base cases and exponential call growth.</li>
  <li><strong>Recursion vs Iteration:</strong> Both can solve the same problems. Iteration uses constant memory; recursion uses memory proportional to depth. Choose based on problem structure and clarity.</li>
  <li><strong>Common Mistakes:</strong> Missing base case, base case with wrong value, recursive case that doesn't make progress.</li>
</ul>

<h3>The Recursion Checklist</h3>
<p>Before writing any recursive function, verify:</p>
<ol>
  <li>✅ Does the base case handle the simplest input correctly?</li>
  <li>✅ Does the recursive case make the problem <em>strictly</em> smaller?</li>
  <li>✅ Will every valid input eventually reach the base case?</li>
  <li>✅ Does the base case return the correct value (not just stop)?</li>
  <li>✅ Is the recursion depth manageable for expected inputs?</li>
</ol>

<h3>Putting It All Together</h3>
<p>The code example below demonstrates a complete program that uses recursion to solve two different problems: computing the sum of digits and counting how many digits a number has. Both functions follow the same recursive pattern of peeling off one digit at a time.</p>

<div class="note">
  <strong>Looking Ahead to Chapter 10:</strong> Now that you understand functions (Chapters 7-8) and recursion (Chapter 9), you're ready to work with <strong>collections of data</strong>. In Chapter 10, you'll learn about <code>std::vector</code> — a powerful container that can hold a sequence of values. You'll combine your function skills with vectors to write programs that process lists of data efficiently.
</div>
        `,
        codeExample: `#include <iostream>\n\n// Recursive sum of digits: 1234 -> 1 + 2 + 3 + 4 = 10\nint sumOfDigits(int n) {\n    if (n < 10) return n;  // Single digit: return it\n    return (n % 10) + sumOfDigits(n / 10);\n}\n\n// Recursive digit counter: 1234 -> 4 digits\nint countDigits(int n) {\n    if (n < 10) return 1;  // Single digit: count is 1\n    return 1 + countDigits(n / 10);\n}\n\n// Recursive power: base^exp\nint power(int base, int exp) {\n    if (exp == 0) return 1;\n    return base * power(base, exp - 1);\n}\n\nint main() {\n    // Sum of digits\n    std::cout << "Sum of digits:\\n";\n    std::cout << "  sumOfDigits(123) = " << sumOfDigits(123) << "\\n";\n    std::cout << "  sumOfDigits(9999) = " << sumOfDigits(9999) << "\\n";\n    \n    // Count digits\n    std::cout << "\\nDigit count:\\n";\n    std::cout << "  countDigits(7) = " << countDigits(7) << "\\n";\n    std::cout << "  countDigits(12345) = " << countDigits(12345) << "\\n";\n    \n    // Power\n    std::cout << "\\nPower:\\n";\n    std::cout << "  2^8 = " << power(2, 8) << "\\n";\n    std::cout << "  3^5 = " << power(3, 5) << "\\n";\n    \n    return 0;\n}`,
        expectedOutput: "Sum of digits:\n  sumOfDigits(123) = 6\n  sumOfDigits(9999) = 36\n\nDigit count:\n  countDigits(7) = 1\n  countDigits(12345) = 5\n\nPower:\n  2^8 = 256\n  3^5 = 243\n",
        exercises: [
          {
            exerciseType: "predict",
            instruction: "Trace this recursive function by hand. Write down every recursive call and its return value. Then set the `answer` variable to the value returned by `mystery(4)`.",
            starterCode: `#include <iostream>\n\nint mystery(int n) {\n    if (n <= 1) return 1;\n    return mystery(n - 1) + mystery(n - 2);\n}\n\nint main() {\n    // Trace mystery(4) by hand:\n    // mystery(4) = mystery(3) + mystery(2)\n    // mystery(3) = mystery(2) + mystery(1)\n    // mystery(2) = mystery(1) + mystery(0)\n    // mystery(1) = 1 (base case)\n    // mystery(0) = 1 (base case, n <= 1)\n    \n    // What does mystery(4) return?\n    int answer = 0;\n    std::cout << answer << "\\n";\n    return 0;\n}`,
            expectedOutput: "5\n",
            hints: [
              "mystery(0) = 1, mystery(1) = 1 (both hit the base case n <= 1).",
              "mystery(2) = mystery(1) + mystery(0) = 1 + 1 = 2.",
              "mystery(3) = mystery(2) + mystery(1) = 2 + 1 = 3.",
              "mystery(4) = mystery(3) + mystery(2) = 3 + 2 = 5."
            ]
          },
          {
            exerciseType: "review",
            instruction: "Write a complete program with TWO recursive functions: (1) `reverseCountdown` that takes an integer `n` and prints the numbers from 1 up to n (like counting up using recursion), and (2) `multiply` that takes two positive integers `a` and `b` and returns their product using only addition and recursion (multiply(a, b) = a + multiply(a, b-1), base case: multiply(a, 0) = 0).",
            starterCode: `#include <iostream>\n\n// 1. Write void reverseCountdown(int n)\n// Prints numbers from 1 to n using recursion\n// Hint: Make the recursive call BEFORE the print\n\n\n// 2. Write int multiply(int a, int b)\n// Computes a * b using only addition and recursion\n// Base case: if b == 0, return 0\n// Recursive case: return a + multiply(a, b - 1)\n\n\nint main() {\n    // Uncomment after writing your functions:\n    // std::cout << "Count up to 5: ";\n    // reverseCountdown(5);\n    // std::cout << "\\n";\n    // std::cout << "4 * 3 = " << multiply(4, 3) << "\\n";\n    // std::cout << "7 * 5 = " << multiply(7, 5) << "\\n";\n    \n    return 0;\n}`,
            expectedOutput: "Count up to 5: 1 2 3 4 5 \n4 * 3 = 12\n7 * 5 = 35\n",
            hints: [
              "For reverseCountdown: base case is `if (n <= 0) return;`, then call `reverseCountdown(n-1)` BEFORE `std::cout << n << \" \";`.",
              "For multiply: `if (b == 0) return 0;` then `return a + multiply(a, b - 1);`",
              "Think of multiply(4, 3) as: 4 + multiply(4, 2) = 4 + 4 + multiply(4, 1) = 4 + 4 + 4 + multiply(4, 0) = 12."
            ]
          },
          {
            exerciseType: "debug",
            instruction: "This recursive function is supposed to count down from n to 1 and then print 'Done!', but it has a bug that causes infinite recursion. Find and fix the bug.",
            starterCode: `#include <iostream>\n\nvoid countDown(int n) {\n    if (n <= 0) {\n        std::cout << "Done!\\n";\n        return;\n    }\n    std::cout << n << " ";\n    countDown(n + 1);  // Bug is here!\n}\n\nint main() {\n    countDown(3);\n    return 0;\n}`,
            expectedOutput: "3 2 1 Done!\n",
            hints: [
              "Look at the recursive call. Is the argument getting closer to the base case (0)?",
              "The function calls countDown(n + 1), which makes n LARGER, not smaller!",
              "Change `countDown(n + 1)` to `countDown(n - 1)` to make progress toward the base case."
            ]
          }
        ],
        quiz: [
          {
            question: "Which of the following best describes the relationship between recursion and iteration?",
            options: [
              "Recursion and iteration are completely unrelated techniques.",
              "Any problem solvable with recursion can also be solved with iteration, and vice versa, but some problems are more naturally expressed with one approach.",
              "Recursion can only solve mathematical problems, while iteration can solve any problem.",
              "Iteration is always faster, so recursion should never be used."
            ],
            correctIndex: 1,
            explanation: "Recursion and iteration are equivalent in computational power — anything one can do, the other can too. The choice depends on which approach leads to clearer, more maintainable code for the specific problem."
          },
          {
            question: "What is a 'stack overflow' in the context of recursion?",
            options: [
              "A compiler error when a function returns the wrong type.",
              "An error that occurs when you try to push too many elements into an array.",
              "A runtime crash that occurs when too many recursive calls exhaust the available stack memory.",
              "A website for asking programming questions."
            ],
            correctIndex: 2,
            explanation: "Each recursive call adds a stack frame. If the recursion is too deep (infinite recursion or extremely large input), the program runs out of stack memory and crashes with a stack overflow."
          },
          {
            question: "A recursive function has `if (n == 0) return 1;` as its base case and `return n * f(n - 1);` as its recursive case. What does `f(4)` compute?",
            options: [
              "10 (sum of 1 to 4)",
              "4 (just returns the input)",
              "24 (4 factorial: 4 × 3 × 2 × 1)",
              "0 (because the base case returns when n is 0)"
            ],
            correctIndex: 2,
            explanation: "f(4) = 4 * f(3) = 4 * 3 * f(2) = 4 * 3 * 2 * f(1) = 4 * 3 * 2 * 1 * f(0) = 4 * 3 * 2 * 1 * 1 = 24. This is the factorial function."
          },
          {
            question: "In the Fibonacci function, why are there TWO base cases instead of one?",
            options: [
              "There is no good reason; one base case would work fine.",
              "Because having two base cases makes the function faster.",
              "Because the compiler requires at least two return statements.",
              "Because the Fibonacci sequence starts with two predefined values (0 and 1) that cannot be computed from the recursive formula."
            ],
            correctIndex: 3,
            explanation: "The Fibonacci recursive formula fib(n) = fib(n-1) + fib(n-2) requires TWO previous values. Without both base cases (fib(0) = 0, fib(1) = 1), the recursion would go past 0 into negative numbers."
          },
          {
            question: "You need to process a list of 1,000,000 numbers by adding them up. Which approach is safer?",
            options: [
              "Iteration (a for loop), because 1,000,000 recursive calls would likely cause a stack overflow.",
              "Recursion, because it's more elegant.",
              "Neither — both would crash.",
              "Recursion, because it uses less memory."
            ],
            correctIndex: 0,
            explanation: "A for loop uses constant stack space regardless of the input size. A recursive solution making 1,000,000 nested calls would create 1,000,000 stack frames, almost certainly exceeding the stack limit and crashing."
          }
        ]
      }
    ]
  });
})();
