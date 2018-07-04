'use strict';

function convertTabs(src, length = 4){
    let s = ' ';

    for(let i=0; i<length; i++){
        s += ' ';
    }

    return src.replace(/\t/, s);
}


function parse(src, {
    noBlankLines = true,
    noLeadingBlankLines = true,
    indentDivision = null,
    startLine = 1,
    tabToSpaces = null,
    space = /^[ ]*/
} = {}){

    if(typeof src !== 'string'){
        throw new TypeError(`first argument should be a string, and value (${src}) is ${typeof src}`);
    }

    if(indentDivision !== null && !isNaN(indentDivision)){
        throw new TypeError(`option indentDivision should be null, or an integer instead of ${indentDivision}`);
    }

    if(tabToSpaces){
        if(!isNaN(tabToSpaces)){
            throw new TypeError(`tabToSpaces option should be an integer, or null`);
        }
        src = convertTabs(src, tabToSpaces);
    }

    let lines = src.split(/\n/);
    let notspace = /\S/g;

    let subtree = [];
    let depth = 0, lineNumber = startLine - 1;

    let tree = {
        root: true,
        startLine,
        subtree
    };

    let branch = subtree, lastBranch;

    if(noLeadingBlankLines){
        for(let i=0; i<lines.length; i++){

            if(!lines.length){
                return tree;
            }

            if(notspace.test(lines[i])){
                break;
            }

            ++lineNumber;

            if(lines[i] === ''){
                lines.shift(); --i;
            }

            if(!notspace.test(lines[i])){
                lines.shift(); --i;
            }
        }
    }

    let first = lines[0].match(space)[0];
    let dent = first, prev;

    for(let i=0; i<lines.length; i++){
        let line = lines[i];

        ++lineNumber;

        if(noBlankLines && !notspace.test(line)){
            continue;
        }

        prev = dent;
        dent = line.match(space)[0];

        if(indentDivision && dent.length){
            if(dent.length % indentDivision !== 0){
                throw new Error(`Syntax error: indent is not divisible by ${indentDivision} at line number ${lineNumber}`);
            }
        }

        if(!dent.length && prev.length > dent.length){
            dent = prev;
        }

        if(dent.length === prev.length){
            let value = line.replace(space, '');

            branch.push({
                value,
                indent: dent,
                depth,
                lineNumber,
                subtree: []
            });
        }else if(dent.length < prev.length){
            branch = lastBranch;
            --i; --depth; --lineNumber;
        }else if(dent.length > prev.length){

            lastBranch = branch; branch = [];

            lastBranch[lastBranch.length - 1]
            .subtree = branch;

            --i; ++depth; --lineNumber;

        }
    }

    return tree;

}

const ex = {parse};

module.exports = ex;
