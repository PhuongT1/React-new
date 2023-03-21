export interface Nft {
  nft_id: number
  id?: number
  name: string
  contract_address: string
  block_chain: string
  token_standard: string | any
  image: FileList | null | any
  imageName?: string
  type: number
}
