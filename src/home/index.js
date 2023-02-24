
import React from 'react'
import styles from './home.module.scss'
import { connect } from 'react-redux';
import Header from './header'
import Sidebar from './sidebar'
import { Outlet } from 'react-router-dom'

const Home = (props) => {

  return (
    <div className={styles['main-layout']}>
      <Header />
      <Sidebar />
      <div className={styles['main-content']}>
        <div className={styles['page-content']}>
          <Outlet  />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log('state home', state);
  return {  
    tokenRedux: state.token,
  }; 
};

export default connect(mapStateToProps)(Home)
