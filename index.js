const musics = [
  {
    trigger: "Q",
    address: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },

  {
    trigger: "W",
    address: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },

  {
    trigger: "E",
    address: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },

  {
    trigger: "A",
    address: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },

  {
    trigger: "S",
    address: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },

  {
    trigger: "D",
    address: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },

  {
    trigger: "Z",
    address: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },

  {
    trigger: "X",
    address: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },

  {
    trigger: "C",
    address: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

function App() {
  return (
    <div id="display">
      <div class="row">
        <div>
          <h1>Drum Machine</h1>
          <div>
            <h2></h2>
          </div>
        </div>
      </div>
      {musics.map((music, index) => (
        <Drum_Pad text={music.trigger} trigger={index} audio={music.address} />
      ))}
    </div>
  );
}

class Drum_Pad extends React.Component {
  constructor(props) {
    super(props);
    this.audio = React.createRef();
  }

  componentDidMount() {
    this.audio.current.addEventListener("ended", (event) => {
      var data = event.target.parentNode;
      data.classList.remove("active");
    });
  }

  playMusic = () => {
    this.audio.current.play();
    var id = this.audio.current.id;
    var data = this.audio.current.parentNode;
    data.classList.add("active");

    const drum = data.parentNode;
    drum.querySelector("h2").innerText = id;
  };

  render() {
    const { text, audio } = this.props;

    return (
      <div className="drum-pad" onClick={this.playMusic} id={`drum-${text}`}>
        {text}
        <audio ref={this.audio} src={audio} className="clip" id={text} />
      </div>
    );
  }
}

document.addEventListener("keydown", (event) => {
  var id = event.key.toUpperCase();
  var audio = document.getElementById(id);

  if (audio) {
    var data = audio.parentNode;
    data.classList.add("active");
    audio.currentTime = 0;
    audio.play();
  }
});

ReactDOM.render(<App />, document.getElementById("drum-machine"));
