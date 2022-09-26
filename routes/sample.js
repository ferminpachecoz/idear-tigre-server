let bcrypt = require('bcryptjs');

let boole = bcrypt.compareSync("fermin", "$2a$10$YvnDdyAbTXTAt2IcDY5MmOrJz98OMin3a2PCrnutetrYx7KWlbuYe")

console.log(boole);
