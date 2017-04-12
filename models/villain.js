var mongoose = require('mongoose');

var VillainSchema = new mongoose.Schema({
  name:       String,
  evilPowers: { default: [], type: Array },
  evil:       {default: true, type: Boolean},
  nemesis:    String,
  img:        String
});

VillainSchema.methods.loadData = function(data){
  this.name       = data.name ? data.name : this.name;
  this.evil       = data.evil ? data.evil : this.evil;
  this.nemesis    = data.nemesis ? data.nemesis : this.nemesis;
  this.img        = data.img ? data.img : this.img;
}

VillainSchema.methods.loadPower = function(powerN) {
  this.evilPowers.push(powerN)
}

module.exports = mongoose.model('Villain', VillainSchema);
