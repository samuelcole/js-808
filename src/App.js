import React, { Component } from "react";
import Instrument from "./Instrument";
import "./App.css";
import { times, map } from "lodash";

const BEAT_COUNT = 16;

class App extends Component {
  constructor(props) {
    super(props);
    const instruments = [
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
    ];

    const createEmptySequenceValue = () => {
      return map(instruments, () => {
        return new Array(BEAT_COUNT);
      });
    };
    console.log(createEmptySequenceValue());

    this.state = {
      bpm: 60,
      currentBeat: 0,
      currentSequence: 0,
      sequences: [
        {
          name: "Sequence 1",
          value: createEmptySequenceValue()
        },
        {
          name: "Sequence 2",
          value: createEmptySequenceValue()
        },
        {
          name: "Sequence 3",
          value: createEmptySequenceValue()
        }
      ],
      instruments: instruments
    };
    this.startInterval(this.state.bpm);
  }
  componentWillUpdate(nextProps, nextState) {
    if (this.state.bpm !== nextState.bpm) {
      this.stopInterval();
      this.startInterval(nextState.bpm);
    }
  }
  startInterval(bpm) {
    this.interval = setInterval(() => {
      const newBeat =
        this.state.currentBeat < BEAT_COUNT - 1
          ? this.state.currentBeat + 1
          : 0;
      this.setState({
        currentBeat: newBeat
      });
    }, 60000 / bpm);
  }
  stopInterval = () => {
    clearInterval(this.interval);
  };
  toggleBeat(instrumentIndex, beatIndex) {
    const sequence = this.state.sequences[this.state.currentSequence].value[
      instrumentIndex
    ];
    sequence[beatIndex] = !sequence[beatIndex];
    const sequences = this.state.sequences.slice();
    sequences[this.state.currentSequence].value[instrumentIndex] = sequence;
    this.setState({
      sequences: sequences
    });
  }
  changeBpm = event => {
    this.setState({
      bpm: event.target.value
    });
  };
  changeSequence = event => {
    this.setState({
      currentSequence: event.target.value
    });
  };
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Music Man</h2>
        </div>
        <label>
          BPM:
          <input value={this.state.bpm} onChange={this.changeBpm} />
        </label>
        <label>
          Sequence:
          <select
            onChange={this.changeSequence}
            value={this.state.currentSequence}
          >
            {map(this.state.sequences, (sequence, sequenceIndex) =>
              <option value={sequenceIndex} key={sequenceIndex}>
                {sequence.name}
              </option>
            )}
          </select>
        </label>
        <table>
          <thead>
            <tr>
              <th />
              {times(BEAT_COUNT, i => {
                return (
                  <th key={i}>
                    {i + 1}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {map(this.state.instruments, (instrument, instrumentIndex) =>
              <Instrument
                key={instrumentIndex}
                name={instrument.name}
                beatCount={BEAT_COUNT}
                currentBeat={this.state.currentBeat}
                beats={
                  this.state.sequences[this.state.currentSequence].value[
                    instrumentIndex
                  ]
                }
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
