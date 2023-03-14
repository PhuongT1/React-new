export interface Nft {
    id?: number
    name: string
    contract_address: string
    block_chain: string
    token_standard: string | any
    image: File | any
    imageName?: string
}