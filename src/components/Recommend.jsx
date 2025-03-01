import { Card, Carousel } from 'antd';
import React from 'react';
import styles from '../css/Recommend.module.css';
import RecommendItem from './RecommendItem';

export default function Recommend() {
  return (
    <Card title="推荐内容">
      <div style={{ marginBottom: '20px' }}>
        <Carousel autoplay>
          <div>
            <a
              style={{
                background:
                  'url(https://segmentfault.com/img/bVdeju3?spec=cover) center/cover no-repeat',
              }}
              className={styles.contentStyle}
              href="https://segmentfault.com/a/1190000045318212"
              target="_blank"
              rel="noreferrer"
            ></a>
          </div>
          <div>
            <a
              style={{
                background:
                  'url(https://segmentfault.com/img/bVdfOzq?spec=cover) center/cover no-repeat',
              }}
              className={styles.contentStyle}
              href="https://segmentfault.com/a/1190000045676331"
              target="_blank"
              rel="noreferrer"
            ></a>
          </div>
          <div>
            <a
              style={{
                background:
                  'url(https://segmentfault.com/img/bVddUyh?spec=cover) center/cover no-repeat',
              }}
              className={styles.contentStyle}
              href="https://segmentfault.com/a/1190000045356274"
              target="_blank"
              rel="noreferrer"
            ></a>
          </div>
          <div>
            <a
              style={{
                background:
                  'url(https://segmentfault.com/img/bVdfaJv?spec=cover) center/cover no-repeat',
              }}
              className={styles.contentStyle}
              href="https://segmentfault.com/a/1190000045522840?utm_source=sf-similar-article"
              target="_blank"
              rel="noreferrer"
            ></a>
          </div>
        </Carousel>
      </div>

      <RecommendItem
        recommendInfo={{
          num: 1,
          title: 'yarn安装包后报错，怎么解决？',
          href: 'https://segmentfault.com/q/1010000046099878',
        }}
      />
      <RecommendItem
        recommendInfo={{
          num: 2,
          title: 'vite 打包后的index-8e00179a.js，有2000kb，算大吗？',
          href: 'https://segmentfault.com/q/1010000045658381',
        }}
      />
    </Card>
  );
}
