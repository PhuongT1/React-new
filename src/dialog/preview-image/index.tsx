import { Button, Dialog, DialogActions, DialogContent } from '@mui/material'
import style from './preview-image.module.scss'
// interface for Props
export interface Preview {
  open: boolean
  imageUrl?: string | File[] | File
  onClose: () => void
}

const PreviewImage = (props: Preview) => {
  const { imageUrl, open, onClose } = props

  return (
    <Dialog fullWidth={true} maxWidth={'lg'} open={open}>
      <DialogContent>
        <img
          className={`${style['img-item']}`}
          src={imageUrl as string}
          alt="Preview image"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export default PreviewImage
