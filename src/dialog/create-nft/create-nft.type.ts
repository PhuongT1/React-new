import { Nft } from 'models/nft.type'

// interface for Props
export interface CreateNftProps {
  open: boolean
  onClose: (value?: string) => void
}

export interface ErrorRespond {
  message: Partial<Nft>
}
