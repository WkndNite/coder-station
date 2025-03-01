import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTypeList, updateIssueTypeId } from '../redux/typeSlice';
import { Tag } from 'antd';

export default function TypeSelect() {
  const { typeList } = useSelector((state) => state.type);
  const dispatch = useDispatch();
  const colorArr = [
    '#108ee9',
    '#2db7f5',
    '#ff4500',
    '#008000',
    '#87d068',
    '#0000ff',
    '#ff0000',
    '#800080',
  ];
  const [tagContainer, setTagContainer] = useState([]);

  const changeTypeHandler = (id) => {
    if (location.pathname === '/issues') {
      dispatch(updateIssueTypeId(id));
    } else if (location.pathname === '/books') {
    }
  };

  useEffect(() => {
    if (!typeList.length) {
      dispatch(getTypeList);
    } else {
      const arr = [];
      arr.push(
        <Tag
          color="magenta"
          value="all"
          key="all"
          style={{ cursor: 'pointer' }}
          onClick={() => changeTypeHandler('all')}
        >
          全部
        </Tag>,
      );
      typeList.forEach((item, index) => {
        arr.push(
          <Tag
            color={colorArr[index % colorArr.length]}
            value={item._id}
            key={item._id}
            style={{ cursor: 'pointer' }}
            onClick={() => changeTypeHandler(item._id)}
          >
            {item.typeName}
          </Tag>,
        );
      });
      setTagContainer(arr);
    }
  }, [typeList]);

  return <div>{tagContainer}</div>;
}
