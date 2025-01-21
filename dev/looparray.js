#!/usr/bin/env node

const a = ['aaa', 'bbb', 'ccc'];

for (let i = 0; i < 5; i++) {
    if (a[i] == undefined) break;
    console.log(i, a[i]);
}

a.forEach((b, j) => {
    console.log(j, a[j]);
});
console.log('Done')