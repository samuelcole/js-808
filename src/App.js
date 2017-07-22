import React, { Component } from "react";
import Instrument from "./Instrument";
import "./App.css";
import { times, map } from "lodash";

const BEAT_COUNT = 16;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBeat: 0,
      instruments: [
        {
          name: "Kick",
          beats: new Array(BEAT_COUNT)
        },
        {
          name: "Snare",
          beats: new Array(BEAT_COUNT)
        },
        {
          name: "Open Hat",
          beats: new Array(BEAT_COUNT)
        },
        {
          name: "Closed Hat",
          beats: new Array(BEAT_COUNT)
        }
      ]
    };
    this.interval = setInterval(() => {
      const newBeat =
        this.state.currentBeat < BEAT_COUNT - 1
          ? this.state.currentBeat + 1
          : 0;
      this.setState({
        currentBeat: newBeat
      });
    }, 500);
  }
  toggleBeat(instrumentIndex, beatIndex) {
    const beats = this.state.instruments[instrumentIndex].beats.slice();
    beats[beatIndex] = !beats[beatIndex];
    const instruments = this.state.instruments.slice();
    instruments[instrumentIndex].beats = beats;
    this.setState({
      instruments: instruments
    });
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Music Man</h2>
        </div>
        <table>
          <thead>
            {times(BEAT_COUNT, i => {
              return (
                <td>
                  {i + 1}
                </td>
              );
            })}
          </thead>
          <tbody>
            {map(this.state.instruments, (instrument, instrumentIndex) =>
              <Instrument
                name={instrument.name}
                beatCount={BEAT_COUNT}
                currentBeat={this.state.currentBeat}
                beats={instrument.beats}
                onToggle={beatIndex =>
                  this.toggleBeat(instrumentIndex, beatIndex)}
              />
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
