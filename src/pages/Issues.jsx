import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import styles from "../css/Issue.module.css";
import { getIssuesByPage } from "../api/issue";
import IssueItem from "../components/IssueItem";

function Issues(props) {
  const [pageInfo, setPageInfo] = useState({
    current: 1,
    pageSize: 15,
    total: 0,
  });
  const [issueInfo, setIssueInfo] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await getIssuesByPage({
        current: pageInfo.current,
        pageSize: pageInfo.pageSize,
        issueStatus: true,
      });
      setIssueInfo(data.data);
      setPageInfo({
        current: data.currentPage,
        pageSize: data.eachPage,
        total: data.count,
      });
    }
    fetchData();
  }, [pageInfo.current, pageInfo.pageSize]);

  let issueList = [];
  for (let i = 0; i < issueInfo.length; i++) {
    issueList.push(
      <IssueItem key={issueInfo[i]._id} issueInfo={issueInfo[i]} />,
    );
  }

  return (
    <div>
      <PageHeader title="问答列表" />
      <div className={styles.issueContainer}>
        <div className={styles.leftSide}>{issueList}</div>
        <div className={styles.rightSide}></div>
      </div>
    </div>
  );
}

export default Issues;
