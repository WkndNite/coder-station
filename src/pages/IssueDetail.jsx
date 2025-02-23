import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getIssueById } from "../api/issue";
import styles from "../css/IssueDetail.module.css";
import PageHeader from "../components/PageHeader";
import Recommend from "../components/Recommend";
import ScoreRank from "../components/ScoreRank";
import { Avatar } from "antd";
import { getUserById } from "../api/user";
import { formatDate } from "../utils/tools";
import Discuss from "../components/Discuss";

export default function IssueDetail() {
  const { issueId } = useParams();
  const [issueInfo, setIssueInfo] = useState({});
  const [issueUser, setIssueUser] = useState({});

  useEffect(() => {
    async function fetchIssueData() {
      const { data } = await getIssueById(issueId);
      setIssueInfo(data);
      const userInfo = await getUserById(data.userId);
      setIssueUser(userInfo.data);
    }
    fetchIssueData();
  }, [issueId]);

  return (
    <div>
      <PageHeader title="问题详情"></PageHeader>
      <div className={styles.detailContainer}>
        <div className={styles.leftSide}>
          <div className={styles.question}>
            <h1>{issueInfo.issueTitle}</h1>
            <div className={styles.questioner}>
              <Avatar size="small" src={issueUser.avatar} />
              <span className={styles.user}>{issueUser.nickname}</span>
              <span>发布于：{formatDate(issueInfo.issueDate)}</span>
            </div>
            <div className={styles.content}>
              <div
                dangerouslySetInnerHTML={{ __html: issueInfo.issueContent }}
              ></div>
            </div>
          </div>
          <Discuss
            commentType={1}
            targetId={issueInfo._id}
            issueInfo={issueInfo}
          />
        </div>
        <div className={styles.rightSide}>
          <div
            style={{
              marginBottom: "20px",
            }}
          >
            <Recommend />
          </div>
          <div
            style={{
              marginBottom: "20px",
            }}
          >
            <ScoreRank />
          </div>
        </div>
      </div>
    </div>
  );
}
