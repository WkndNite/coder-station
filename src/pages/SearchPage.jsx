import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import styles from '../css/SearchPage.module.css';
import PageHeader from '../components/PageHeader';
import Recommend from '../components/Recommend';
import ScoreRank from '../components/ScoreRank';
import { getIssuesByPage } from '../api/issue';
import SearchResultItem from '../components/SearchResultItem';
import { getBookByPage } from '../api/book';
import { Pagination } from 'antd';

export default function SearchPage(props) {
  const location = useLocation();
  const [searchResult, setSearchResult] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  function handlePageChange(current, pageSize) {
    setPageInfo({
      current,
      pageSize,
    });
  }
  useEffect(() => {
    async function fetchData(state) {
      const { value, searchOption } = state;
      let searchParams = {
        current: pageInfo.current,
        pageSize: pageInfo.pageSize,
        issueStatus: true,
      };

      switch (searchOption) {
        case 'issue': {
          searchParams.issueTitle = value;
          const { data } = await getIssuesByPage(searchParams);
          setPageInfo({
            current: data.currentPage,
            pageSize: data.eachPage,
            total: data.count,
          });
          setSearchResult(data.data);
          break;
        }
        case 'book': {
          searchParams.bookTitle = value;
          const { data } = await getBookByPage(searchParams);
          setPageInfo({
            current: data.currentPage,
            pageSize: data.eachPage,
            total: data.count,
          });
          setSearchResult(data.data);
          break;
        }
        default:
          break;
      }
    }
    if (location.state) {
      fetchData(location.state);
    }
  }, [location.state]);

  return (
    <div className={styles.container}>
      <PageHeader title="搜索结果" />
      <div className={styles.searchPageContainer}>
        <div className={styles.leftSide}>
          {searchResult.map((item) => (
            <SearchResultItem
              info={item}
              key={item._id}
            />
          ))}
          {searchResult.length > 0 ? (
            <div className="paginationContainer">
              <Pagination
                showQuickJumper
                defaultCurrent={1}
                {...pageInfo}
                onChange={handlePageChange}
              />
            </div>
          ) : (
            <div className={styles.noResult}>未搜索到符合条件的条目</div>
          )}
        </div>
        <div className={styles.rightSide}>
          {' '}
          <div
            style={{
              marginBottom: '20px',
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
