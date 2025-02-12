import React from "react";
import PageHeader from "../components/PageHeader";
import styles from "../css/Issue.module.css";

function Issues(props) {
  return (
    <div>
      <PageHeader title="问答列表" />
      <div className={styles.issueContainer}>
        <div className={styles.leftSide}></div>
        <div className={styles.rightSide}></div>
      </div>
    </div>
  );
}

export default Issues;
