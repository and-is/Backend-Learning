const fs = require("fs");

console.log(1);
fs.readFile("text.txt", (error, data) => console.log(data.toString()));
console.log(2);
