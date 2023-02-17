
import React from 'react'
// import styles from './home.module.scss'
import  HomeChild from './home-child'

const Home = () => {
  const phuong1 = 'assign data for child Test data nhe'

  const callBackChild = (data) => {
    console.log('data', data)
  }

  const fetchData = () => {
    // Where we're fetching data from
    return fetch("http://www.abc.cd/test")
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch ((error) => console.error(error));
  }

  fetchData();

  return (
    <div>
      Phuong Tran Parent
      <HomeChild  phuong= {phuong1} parentToChild={callBackChild} />
      </div>
  )
}

export default Home
