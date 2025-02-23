import React, { useState, useEffect } from "react";
import styles from "../css/IssueItem.module.css";
import { formatDate } from "../utils/tools";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getTypeList } from "../redux/typeSlice";
import { Tag } from "antd";
import { getUserById } from "../api/user";
import { useNavigate } from "react-router";

export default function IssueItem(props) {
  const { typeList } = useSelector((state) => state.type);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!typeList.length) {
      dispatch(getTypeList());
    }
    async function fetchUserData() {
      const { data } = await getUserById(props.issueInfo.userId);
      setUserInfo(data);
    }
    fetchUserData();
  }, []);

  const colorArr = [
    "#108ee9",
    "#2db7f5",
    "#ff4500",
    "#008000",
    "#87d068",
    "#0000ff",
    "#ff0000",
    "#800080",
  ];
  const type = typeList.find((item) => item._id === props.issueInfo.typeId);

  const [userInfo, setUserInfo] = useState([]);

  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.issueNum}>
        <div>{props.issueInfo.commentNumber}</div>
        <div>回答</div>
      </div>
      <div className={styles.issueNum}>
        <div>{props.issueInfo.scanNumber}</div>
        <div>浏览</div>
      </div>
      <div className={styles.issueContainer}>
        <div className={styles.top} onClick={()=>{
          navigate(`/issues/${props.issueInfo._id}`)
        }}>{props.issueInfo.issueTitle}</div>
        <div className={styles.bottom}>
          <div className={styles.left}>
            <Tag color={colorArr[typeList.indexOf(type) % colorArr.length]}>
              {type?.typeName}
            </Tag>
          </div>
          <div className={styles.right}>
            <Tag color="volcano">{userInfo.nickname}</Tag>
            <span>{formatDate(props.issueInfo.issueDate, "year")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
