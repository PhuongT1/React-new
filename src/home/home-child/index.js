
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
// import styles from './home.module.scss'

const HomeChild = (prop) => {
  prop.parentToChild('Child To Parent');
  const [count, setCount] = useState(0)
  const decreate = () => {
    setCount(count + 1)
  }

  const increate = () => {
    setCount(count + 1)
  }

  useEffect(() =>{
    
  })

  return (
    <div>
      Phuong Tran Child 1 {prop.count} <br></br>
      <button onClick={decreate}>+</button>
      <div>{count}</div>
      <button onClick={increate}>-</button>
    </div>
  )
}

function maptoState(state) {
  return {count: 'count phuong oi'}
}

export default connect(maptoState)(HomeChild)

// export default HomeChild
