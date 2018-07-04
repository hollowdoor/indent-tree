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

output = indentTree.parse(`
    first

    second

    third
      child
            sub child 1

            sub child 2
`, {noBlankLines: false});

purdy(output, {depth: 12, indent: 2});
