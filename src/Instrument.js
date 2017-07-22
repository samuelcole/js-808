import React from 'react';
import styles from './Instrument.css'
import classNames from 'classnames';
import {times} from 'lodash';

function Instrument(props) {
  return <tr className={classNames(styles.global, {
    on: props.beats[props.currentBeat]
  })}>
    {times(props.beatCount, i => {
      return <td
        onClick={() => props.onToggle(i)}
        className={classNames({
          on: props.beats[i],
          currentBeat: props.currentBeat === i
        })}
      />;
    })}
  </tr>;
};

export default Instrument;