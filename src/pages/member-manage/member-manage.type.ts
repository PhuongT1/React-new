import { ParamPage } from 'models/common.type'
import { searchForm } from 'models/search.type'

export interface Member {
  id: number
  provider: string
  name: string
  created_at: any
  status: number
}
export interface searchPage extends searchForm, ParamPage {
  created_at_btw?: string
}
