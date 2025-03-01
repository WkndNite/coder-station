import React, { useEffect, useState } from 'react';
import { getUserByPointRank } from '../api/user';
import { Card } from 'antd';
import ScoreItem from './ScoreItem';

export default function ScoreRank() {
  const [rankList, setRankList] = useState([]);

  useEffect(() => {
    async function fetchUserData() {
      const { data } = await getUserByPointRank();
      setRankList(data);
    }
    fetchUserData();
  }, []);

  const userPointRankArr = [];
  if (rankList.length) {
    rankList.forEach((item, index) => {
      userPointRankArr.push(
        <ScoreItem
          rankInfo={item}
          rank={index + 1}
          key={item._id}
        />,
      );
    });
  }

  return <Card title="积分排行榜">{userPointRankArr}</Card>;
}
