const LIBRARIES = {
  Axios: require("axios"),
  Skill: require("../../../Libraries/Skill"),
  Message: require("../../../Message")
};

class Webhooks extends LIBRARIES.Skill {
  constructor(_main, _settings, _folder) {
    super(_main, _settings, _folder);
    const SELF = this;

    _main.ClientIO.on("connection", function(socket){
      // L'utilisateur envoie un message
      socket.on("cs_message", function(_message) {
        loop:
        for(let i = 0; i < _settings.length; i++){
          for(let j = 0; j < _settings[i].utterances.length; j++){
            if(_settings[i].utterances[j] == _message.Content){
              for(let k = 0; k < _settings[i].urls.length; k++){
                LIBRARIES.Axios.get(_settings[i].urls[k]).then(res => {
                  const TEXT = _settings[i].answers[Math.floor(Math.random() * _settings[i].answers.length)];
                  socket.emit("sc_message", new LIBRARIES.Message(TEXT, true));
                })
                .catch(error => {
                  console.error(error);
                });
              }
              break loop;
            }
          }
        }
      });
    });
  }
}

module.exports = Webhooks;
