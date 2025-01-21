#!/usr/bin/env node

let a = ['a', 'b', 'c', 'd'];
b = a.splice(2, 3);
b[4] = 'z';
console.log("a:", a);
console.log("b:", b);