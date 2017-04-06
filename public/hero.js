// test to ensure that the js files were linked.
// console.log("Hello from hero.js inside of public directory");

var componentVue = new Vue({
  el: "#component",
  data: {
    numbers: [1,2,3,4,5,6,7,8,9],
    title: "Hello from sample",
    heroes: [],
    hero: {}
  },
});

fetch("/api/superheroes")  //Gets the information from json
  .then(function(blob){  //consuming a promise chain - gets data from database
    return blob.json();  //makes get request to database
  })
  .then(function(data){
    console.table(data);
    componentVue.heroes = data;
    componentVue.hero = data[1];
  })
