import { CircularProgress } from '@mui/material'
import styles from './loading.module.scss'

interface LoadingProps {
  type?: 'normal'
  size?: 'small' | 'medium'
}

const Loading = (props: LoadingProps) => {
  return (
    <CircularProgress
      className={`${styles.default} ${props.type === 'normal' ? styles.loading_normal : styles.loading_standard}`}
      size={props.size === 'small' ? 20 : 40}
    />
  )
}

export default Loading
