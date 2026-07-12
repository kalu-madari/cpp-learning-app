// Chapter 5: Loops
// Auto-migrated from lessons-data.js
(function () {
  window.CPP_CHAPTERS = window.CPP_CHAPTERS || [];
  window.CPP_CHAPTERS.push({
  "id": 5,
  "title": "Loops",
  "description": "Repeat actions with for, while, and do-while",
  "icon": "🔄",
  "lessons": [
    {
      "id": "ch5-l1",
      "title": "For Loops",
      "difficulty": "beginner",
      "content": "<h2>Repeating with For Loops</h2><p>The <code>for</code> loop repeats a block of code a specific number of times:</p><p><code>for (init; condition; update) { body }</code></p><ul><li><strong>init</strong>: Runs once at the start (e.g., <code>int i = 0</code>)</li><li><strong>condition</strong>: Checked before each iteration</li><li><strong>update</strong>: Runs after each iteration (e.g., <code>i++</code>)</li></ul><p>When the condition becomes false, the loop stops.</p>",
      "codeExample": "#include <iostream>\nusing namespace std;\n\nint main() {\n    // Count from 1 to 5\n    for (int i = 1; i <= 5; i++) {\n        cout << i << \" \";\n    }\n    cout << endl;\n\n    // Sum of 1 to 10\n    int sum = 0;\n    for (int i = 1; i <= 10; i++) {\n        sum += i;\n    }\n    cout << \"Sum: \" << sum << endl;\n\n    return 0;\n}",
      "expectedOutput": "1 2 3 4 5 \nSum: 55",
      "exercise": {
        "instruction": "Write a for loop that prints the multiplication table of 5 (5x1=5 through 5x10=50).",
        "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    // Print: 5 x 1 = 5, etc.\n    for (int i = 1; i <= 10; i++) {\n        // Your code here\n    }\n    return 0;\n}",
        "expectedOutput": null,
        "hints": [
          "cout << \"5 x \" << i << \" = \" << 5*i << endl;",
          "The loop already goes from 1 to 10"
        ]
      },
      "quiz": [
        {
          "question": "How many times does for(int i=0; i<5; i++) execute?",
          "options": [
            "4",
            "5",
            "6",
            "Infinite"
          ],
          "correctIndex": 1,
          "explanation": "i takes values 0,1,2,3,4 (five iterations). When i becomes 5, the condition i<5 is false."
        },
        {
          "question": "What is the sum of integers from 1 to 10?",
          "options": [
            "45",
            "50",
            "55",
            "100"
          ],
          "correctIndex": 2,
          "explanation": "The sum formula is n*(n+1)/2 = 10*11/2 = 55."
        }
      ]
    },
    {
      "id": "ch5-l2",
      "title": "While and Do-While Loops",
      "difficulty": "beginner",
      "content": "<h2>Conditional Loops</h2><p>The <code>while</code> loop repeats as long as a condition is true:</p><p><code>while (condition) { body }</code></p><p>The <code>do-while</code> loop is similar but guarantees at least one execution:</p><p><code>do { body } while (condition);</code></p><h3>When to Use Which</h3><ul><li><strong>for</strong>: When you know the number of iterations</li><li><strong>while</strong>: When the number of iterations depends on a condition</li><li><strong>do-while</strong>: When you need at least one execution</li></ul>",
      "codeExample": "#include <iostream>\nusing namespace std;\n\nint main() {\n    // While: count down from 5\n    int n = 5;\n    while (n > 0) {\n        cout << n << \" \";\n        n--;\n    }\n    cout << endl;\n\n    // Do-while\n    int x = 1;\n    do {\n        cout << \"x = \" << x << endl;\n        x *= 2;\n    } while (x <= 8);\n\n    return 0;\n}",
      "expectedOutput": "5 4 3 2 1 \nx = 1\nx = 2\nx = 4\nx = 8",
      "exercise": {
        "instruction": "Write a while loop that finds and prints the first power of 2 greater than 1000.",
        "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int power = 1;\n    // Keep doubling until > 1000\n    // Print the result\n    return 0;\n}",
        "expectedOutput": "1024",
        "hints": [
          "while (power <= 1000) { power *= 2; }",
          "The answer is 1024 (2^10)"
        ]
      },
      "quiz": [
        {
          "question": "What is the key difference between while and do-while?",
          "options": [
            "No difference",
            "do-while always executes at least once",
            "while is faster",
            "do-while cannot use break"
          ],
          "correctIndex": 1,
          "explanation": "do-while checks the condition after executing the body, guaranteeing at least one execution."
        },
        {
          "question": "What causes an infinite loop?",
          "options": [
            "Using break",
            "A condition that never becomes false",
            "Using continue",
            "Having too many iterations"
          ],
          "correctIndex": 1,
          "explanation": "If the loop condition never becomes false, the loop runs forever (infinite loop)."
        }
      ]
    },
    {
      "id": "ch5-l3",
      "title": "Break, Continue, and Nested Loops",
      "difficulty": "intermediate",
      "content": "<h2>Loop Control</h2><p><code>break</code> immediately exits the innermost loop. <code>continue</code> skips the rest of the current iteration and moves to the next one.</p><h3>Nested Loops</h3><p>A loop inside another loop. The inner loop runs completely for each iteration of the outer loop. Common for 2D patterns, grids, and matrix operations.</p>",
      "codeExample": "#include <iostream>\nusing namespace std;\n\nint main() {\n    // Break: find first multiple of 7 above 50\n    for (int i = 51; ; i++) {\n        if (i % 7 == 0) {\n            cout << \"Found: \" << i << endl;\n            break;\n        }\n    }\n\n    // Nested loop: simple pattern\n    for (int i = 1; i <= 3; i++) {\n        for (int j = 1; j <= i; j++) {\n            cout << \"* \";\n        }\n        cout << endl;\n    }\n\n    return 0;\n}",
      "expectedOutput": "Found: 56\n* \n* * \n* * * ",
      "exercise": {
        "instruction": "Write a nested loop that prints a 4x4 grid of numbers (1-16).",
        "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int num = 1;\n    // 4 rows, 4 columns\n    return 0;\n}",
        "expectedOutput": null,
        "hints": [
          "Use two nested for loops",
          "cout << num++ << \" \" in the inner loop",
          "Print endl after each row"
        ]
      },
      "quiz": [
        {
          "question": "What does break do inside a loop?",
          "options": [
            "Pauses the loop",
            "Exits the innermost loop immediately",
            "Exits all loops",
            "Restarts the loop"
          ],
          "correctIndex": 1,
          "explanation": "break exits only the innermost loop it appears in."
        },
        {
          "question": "What does continue do?",
          "options": [
            "Exits the loop",
            "Skips to the next iteration",
            "Pauses execution",
            "Goes back to the start of the program"
          ],
          "correctIndex": 1,
          "explanation": "continue skips the remaining code in the current iteration and jumps to the loop's condition check."
        }
      ]
    }
  ]
});
})();
