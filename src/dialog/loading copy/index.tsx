import { CircularProgress, circularProgressClasses } from '@mui/material'
import styles from './loading.module.scss'

interface LoadingProps {
  type?: 'normal'
  size?: 'small' | 'medium'
}

const Loading = (props: LoadingProps) => {
  return (
    <CircularProgress
      variant="indeterminate"
      disableShrink
      className={`${styles.default}`}
      sx={{
        animationDuration: '350ms'
      }}
      size={props.size === 'small' ? 20 : 40}
      thickness={4}
      {...props}
    />
  )
}

export default Loading