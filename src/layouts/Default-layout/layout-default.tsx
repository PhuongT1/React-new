import styles from './home.module.scss';
import { connect } from 'react-redux';
import Header from '../Header';
import Sidebar from '../sidebar';
import { Outlet } from 'react-router-dom';

const LayoutDefault = ({ children }: any) => {
  return (
    <>
      <div className={styles['main-layout']}>
        <Header />
        <Sidebar />
        <div className={styles['main-content']}>
          <div className={styles['page-content']}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: { token: any }) => {
  return {
    tokenRedux: state.token
  };
};

export default connect(mapStateToProps)(LayoutDefault);