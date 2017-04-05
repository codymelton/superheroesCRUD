console.log("Hello from hero.js inside of public directory");

var sampleVue = new Vue({
  el: "#sample",
  data: {
    numbers: [1,2,3,4,5,6,7,8,9],
    title: "Hello from sample",
    heroes: []
  },
});

fetch("/superheroes")  //Gets the information from json
  .then(function(blob){  //consuming a promise chain - gets data from database
    return blob.json();  //makes get request to database
  })
  .then(function(data){
    console.table(data);
    sampleVue.heroes = data;
  })
