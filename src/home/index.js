
import React from 'react'
// import styles from './home.module.scss'
import { connect } from 'react-redux';

const Home = (props) => {

  return (
    <div>
      Hompage
      Token Item {props.tokenRedux.access_token}
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
