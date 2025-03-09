import styles from './index.module.css';

import DemoBar from './Charts/DemoBar';
import DemoColumn from './Charts/DemoColumn';
import DemoPie from './Charts/DemoPie';

function HomePage() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <DemoPie />
        </div>
        <div className={styles.middle}>
          <DemoBar />
        </div>
        <div className={styles.right}>
          <DemoPie />
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <DemoBar />
        </div>
        <div className={styles.right}>
          <DemoColumn />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
