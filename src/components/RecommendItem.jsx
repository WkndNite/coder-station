import React from 'react';
import styles from '../css/RecommendItem.module.css';

export default function RecommendItem(props) {
  return (
    <div>
      <a
        href={props.recommendInfo.href}
        className={styles.container}
        target="_blank"
        rel="noreferrer"
      >
        <div className={styles.leftSide}>{props.recommendInfo.num}</div>
        <div className={styles.rightSide}>{props.recommendInfo.title}</div>
      </a>
    </div>
  );
}
