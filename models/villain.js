var mongoose = require('mongoose');

var VillainSchema = new mongoose.Schema({
  name: String,
  evilPower: String,
  evil: {default: true, type: Boolean},
  nemesis: String
});

module.exports = mongoose.model('Villain', VillainSchema);
