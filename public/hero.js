// test to ensure that the js files were linked.
// console.log("Hello from hero.js inside of public directory");

var componentVue = new Vue({
  el: "#heropannel",
  data: {
    heroes: [],
    hero: {},
    newName: "",//*****MATCH TO SUPERHERO.JS SCHEMA and line 28
    newSuperpower: "",
    newUniverse: "",
    newEvil: "",
    newRank: "",
    newImg: ""
  },
  methods: {
    deleteHero: function(id){
      if (confirm("Do you want to delete?")) {
        $.ajax({
          url: "/api/superheroes/"+id,
          method: "DELETE"
        }).done(function(data){
          window.location = "/heroes"
        })
      }
    },
    submitHero: function(e) {
      e.preventDefault()
      alert("I was found")
      var data = {
        name:         this.newName, //GET THIS ALL SET UP
        superPowers:  this.newSuperpower,
        universe:     this.newUniverse,
        evil:         this.newEvil,
        rank:         this.newRank,
        img:          this.newImg
      }
      $.ajax({
        url: "/api/superheroes",
        method: "POST",
        data: data
      }).done(function(res){
        console.log(res);
      })
    }
  }
});

fetch("/api/superheroes")  //Gets the information from json
  .then(function(blob){  //consuming a promise chain - gets data from database
    return blob.json();  //makes get request to database
  })
  .then(function(data){
    console.table(data);
    componentVue.heroes = data.data;
    componentVue.hero = data[1];
  })
