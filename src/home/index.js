
import React from 'react'
// import styles from './home.module.scss'
import { connect } from 'react-redux';
import Header from './header'
const Home = (props) => {

  return (
    <div className="main-layout">
      <Header />
      <div className="content-item">

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
