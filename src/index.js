const LIBRARIES = {
  Axios: require("axios"),
  Skill: require("../../../Libraries/Skill"),
  Message: require("../../../Message")
};

class Webhooks extends LIBRARIES.Skill {
  constructor(_main, _settings, _folder) {
    super(_main, _settings, _folder);
    const SELF = this;

    for(let i = 0; i < _settings.length; i++){
      const INTENT = "webkooks.intent_" + i;
      _main.Manager.addDocuments(INTENT, _settings[i].utterances);
      _main.Manager.addAnswers(INTENT, _settings[i].answers);
      _main.Manager.addAction(INTENT, function(_intent, _socket){
        for(let k = 0; k < _settings[i].urls.length; k++){
          LIBRARIES.Axios.get(_settings[i].urls[k]).then(res => {
            //const TEXT = _settings[i].answers[Math.floor(Math.random() * _settings[i].answers.length)];
            //_socket.emit("sc_message", new LIBRARIES.Message(TEXT, true));
            //_main.TTS(_socket, TEXT);
          })
          .catch(error => {
            console.error(error);
          });
        }
      });
    }
  }
}

module.exports = Webhooks;
