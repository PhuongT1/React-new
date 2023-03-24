export interface Nft {
  id?: number
  nft_id: number
  name: string
  verification_code: any
  contract_address: string
  token_standard: string
  block_chain: string
  image: File[] | string
  created_at: string
  updated_at: string
  deleted_at: any
  created_by: number
  imageName: string
  deleted_by: any
}
