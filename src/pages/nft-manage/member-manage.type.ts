import { searchForm } from 'models/search.type'

export interface Nft {
  id: number
  name: string
  contract_address: string
  block_chain: string
  token_standard: string
}

export interface optionSearch {
  value: string
  label: string
}

export interface searchItem extends searchForm {
  per_page: number
  page: number
  order_by: string
  created_at_btw?: string
}
