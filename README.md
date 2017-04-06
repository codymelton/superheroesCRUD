It's nice to update our .gitignore before our first commit.

had to run npm init to make a package.json => every node proj has one of these

had to install express so we can use it as our dev server

create an endpoint /test to handle a GET request...


We defined a mongoose schema in the file models/superhero
A schema is like a blueprint, it defines what all future heroes will
look like.  It will be a constructor function we will use to actually
make new superheroes.

need to make anything that accesses the backend database have /api like in the server.js example.

Ternary Statement format
var number = 100;

if (number>50){
  console.log("I am greater than 50")
} else{
  console.log("I am not greater than 50")
};

//THIS WAY
number > 50 ? console.log("I am greater than 50") : console.log("I am not greater than 50");
