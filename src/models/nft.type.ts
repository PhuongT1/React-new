export interface Nft {
    [x: string]: any
    id?: number
    name: string
    contract_address: string
    block_chain: string
    token_standard: string | any
    image: FileList | null | any
    imageName?: string
}