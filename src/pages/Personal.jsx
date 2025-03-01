import React from 'react';
import PageHeader from '../components/PageHeader';
import styles from '../css/Personal.module.css';
import { useSelector } from 'react-redux';
import { Card } from 'antd';
import PersonalInfoItem from '../components/PersonalInfoItem';

export default function Personal() {
  const { userInfo } = useSelector((state) => state.user);
  return (
    <div>
      <PageHeader title="个人中心" />
      <div className={styles.container}>
        <div className={styles.row}>
          <Card
            title="基本信息"
            extra={<div className={styles.edit}>编辑</div>}
          >
            <PersonalInfoItem
              info={{
                itemName: '登陆账号',
                itemValue: userInfo.loginId,
              }}
            ></PersonalInfoItem>
          </Card>
        </div>
        <div className={styles.row}>
          <Card
            title="社交帐号"
            extra={<div className={styles.edit}>编辑</div>}
          ></Card>
        </div>
        <div className={styles.row}>
          <Card
            title="个人简介"
            extra={<div className={styles.edit}>编辑</div>}
          >
            <p></p>
          </Card>
        </div>
      </div>
    </div>
  );
}
