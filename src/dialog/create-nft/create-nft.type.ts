import { Nft } from 'models/nft.type'

// interface for Props
export interface CreateNftProps {
  open: boolean
  onClose: (value?: string) => void
}

export interface ErrorRespond {
  message: Partial<Nft>
}

export type NftForm = Pick<
  Nft,
  'name' | 'contract_address' | 'token_standard' | 'block_chain' | 'image'
>
