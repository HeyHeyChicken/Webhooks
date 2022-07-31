const LIBRARIES = {
  Skill: require("../../../Libraries/Skill")
};

class Webhooks extends LIBRARIES.Skill {
  constructor(_main, _settings, _folder) {
    super(_main, _settings, _folder);
    const SELF = this;

    this.Main.ClientIO.on("connection", function(socket){
      // L'utilisateur envoie un message
      socket.on("cs_message", function(_message) {
        console.log(_message);
      });
    });
  }
}

module.exports = Webhooks;
