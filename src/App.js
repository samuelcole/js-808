import React, { Component } from "react";
import Instrument from "./Instrument";
import styles from "./App.css";
import { times, map } from "lodash";
import load from 'audio-loader';

const BEAT_COUNT = 16;

class App extends Component {
  constructor(props) {
    super(props);
    const instruments = [
      {
        name: "Kick",
        beats: new Array(BEAT_COUNT),
        soundPromise: load(require('./sounds/A.wav'))
      },
      {
        name: "Snare",
        beats: new Array(BEAT_COUNT),
        soundPromise: load(require('./sounds/C.wav'))
      },
      {
        name: "Open Hat",
        beats: new Array(BEAT_COUNT),
        soundPromise: load(require('./sounds/F.wav'))
      },
      {
        name: "Closed Hat",
        beats: new Array(BEAT_COUNT),
        soundPromise: load(require('./sounds/G.wav'))
      }
    ];

    const createEmptySequenceValue = () => {
      return map(instruments, () => {
        return new Array(BEAT_COUNT);
      });
    };

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
  startInterval = bpm => {
    if (this.interval) {
      return;
    }
    bpm = bpm || this.state.bpm;
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
    delete(this.interval);
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
      <div className={styles.global}>
        <h1>Music Man</h1>
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
        <button onClick={this.stopInterval}>stop</button>
        <button onClick={() => this.startInterval()}>play</button>
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
                soundPromise={instrument.soundPromise}
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
