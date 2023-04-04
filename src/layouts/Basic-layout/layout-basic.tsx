import styles from './home.module.scss';
import { connect } from 'react-redux';
import Header from '../Header';
import Sidebar from '../sidebar';
import { Outlet } from 'react-router-dom';

const LayoutBasic = () => {
  return (
    <>
      <div className={styles['main-layout']}>
        <div className={styles['main-content']}>
          <div className={styles['page-content']}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutBasic;
