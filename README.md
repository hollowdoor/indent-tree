indent-tree
====

Install
----

`npm install indent-tree`

Example
----

```javascript
const indentTree = require('../');
const purdy = require('purdy');

let output = indentTree.parse(`
    first
        first child
    second
        second child 1
        second child 2
    third
        child
            sub child 1
            sub child 2
`);

purdy(output, {depth: 9, indent: 2});


//result
/*
{
  root: true,
  startLine: 1,
  subtree: [
    [0] {
      value: 'first',
      indent: '    ',
      depth: 0,
      lineNumber: 2,
      subtree: [
        [0] {
          value: 'first child',
          indent: '        ',
          depth: 1,
          lineNumber: 3,
          subtree: []
        }
      ]
    },
    [1] {
      value: 'second',
      indent: '    ',
      depth: 0,
      lineNumber: 4,
      subtree: [
        [0] {
          value: 'second child 1',
          indent: '        ',
          depth: 1,
          lineNumber: 5,
          subtree: []
        },
        [1] {
          value: 'second child 2',
          indent: '        ',
          depth: 1,
          lineNumber: 6,
          subtree: []
        }
      ]
    },
    [2] {
      value: 'third',
      indent: '    ',
      depth: 0,
      lineNumber: 7,
      subtree: [
        [0] {
          value: 'child',
          indent: '        ',
          depth: 1,
          lineNumber: 8,
          subtree: [
            [0] {
              value: 'sub child 1',
              indent: '            ',
              depth: 2,
              lineNumber: 9,
              subtree: []
            },
            [1] {
              value: 'sub child 2',
              indent: '            ',
              depth: 2,
              lineNumber: 10,
              subtree: []
            }
          ]
        }
      ]
    }
  ]
}

*/
```

API
---

```javascript
indentTree.parse('', {
    //skip blank lines
    noBlankLines: true,
    //skip blank lines at the start
    noLeadingBlankLines: true,
    //make indent % indentDivision = 0
    //indentDivision should be an integer
    indentDivision: null,
    //where should lines start
    startLine: 1,
    //The matcher for indents
    space: /^[ ]*/,
    //Set tabToSpaces to an integer
    //That integer converts tabs into
    //that many spaces.
    tabToSpaces: null
});
```

### options.indentDivision

When `indentDivision` is set to `null` the indent length of previous lines are used to regulate successive lines.

`indentTree.parse()` throws when `indentDivision` is set to an integer, and `indent % indentDivision !== 0`.

### options.tabToSpaces

When `tabToSpaces` is set to null tabs will not be converted to spaces.

About
---

This is for looking at the structure of indented text, and using the result structure elsewhere.
