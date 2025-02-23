import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import styles from "../css/Issue.module.css";
import { getIssuesByPage } from "../api/issue";
import IssueItem from "../components/IssueItem";
import { Pagination } from "antd";
import AddIssueBtn from "../components/AddIssueBtn";
import Recommend from "../components/Recommend";
import ScoreRank from "../components/ScoreRank";
import TypeSelect from "../components/TypeSelect";
import { useSelector } from "react-redux";

function Issues(props) {
  const [pageInfo, setPageInfo] = useState({
    current: 1,
    pageSize: 15,
    total: 0,
  });
  const [issueInfo, setIssueInfo] = useState([]);
  const { issueTypeId } = useSelector((state) => state.type);

  useEffect(() => {
    async function fetchData() {
      let searchParams = {
        current: pageInfo.current,
        pageSize: pageInfo.pageSize,
        issueStatus: true,
      };

      if (issueTypeId !== "all") {
        searchParams.typeId = issueTypeId;
        searchParams.current = 1;
      }

      const { data } = await getIssuesByPage(searchParams);
      setIssueInfo(data.data);
      setPageInfo({
        current: data.currentPage,
        pageSize: data.eachPage,
        total: data.count,
      });
    }
    fetchData();
  }, [pageInfo.current, pageInfo.pageSize, issueTypeId]);

  function pageChangeHandler(current, pageSize) {
    setPageInfo({
      current,
      pageSize,
    });
  }

  function pageSizeChangeHandler(current, pageSize) {
    setPageInfo({
      current: 1,
      pageSize,
    });
  }

  let issueList = [];
  for (let i = 0; i < issueInfo.length; i++) {
    issueList.push(
      <IssueItem key={issueInfo[i]._id} issueInfo={issueInfo[i]} />
    );
  }

  return (
    <div>
      <PageHeader title="问答列表">
        <TypeSelect />
      </PageHeader>
      <div className={styles.issueContainer}>
        <div className={styles.leftSide}>
          {issueList}
          <div className="paginationContainer">
            {issueInfo.length > 0 ? (
              <Pagination
                showQuickJumper
                defaultCurrent={1}
                {...pageInfo}
                pageSizeOptions={[5, 10, 15]}
                showSizeChanger
                onShowSizeChange={pageSizeChangeHandler}
                onChange={pageChangeHandler}
              />
            ) : (
              <div className={styles.noIssue}>有问题，就来 coder station!</div>
            )}
          </div>
        </div>

        <div className={styles.rightSide}>
          <AddIssueBtn />
          <div
            style={{
              marginBottom: "20px",
            }}
          >
            <Recommend />
          </div>
          <ScoreRank />
        </div>
      </div>
    </div>
  );
}

export default Issues;
