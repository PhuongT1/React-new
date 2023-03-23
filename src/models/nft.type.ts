export interface Nft {
  nft_id: number
  id?: number
  name: string
  contract_address: string
  block_chain: string
  token_standard: string | any
  image: File[] | string
  imageName: string
  type: number
}
