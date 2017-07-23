import React from "react";
import styles from "./Instrument.css";
import classNames from "classnames";
import { times } from "lodash";
import play from 'audio-play';

function Instrument(props) {
  const on = props.beats[props.currentBeat];
  if (on && props.soundPromise) {
    props.soundPromise.then(play);
  }
  return (
    <tr
      className={classNames(styles.global, {
        on: on
      })}
    >
      <td className="name">{props.name}</td>
      {times(props.beatCount, i => {
        return (
          <td
            key={i}
            onClick={() => props.onToggle(i)}
            className={classNames({
              on: props.beats[i],
              currentBeat: props.currentBeat === i
            })}
          />
        );
      })}
    </tr>
  );
}

export default Instrument;
