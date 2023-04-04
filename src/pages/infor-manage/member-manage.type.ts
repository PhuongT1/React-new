import { ParamPage } from 'models/common.type'
import { searchForm } from 'models/search.type'
export interface OptionSearch {
  value: string
  label: string
}

export interface NftSearchItem extends searchForm, ParamPage {
  order_by: string
  created_at_btw?: string
}
