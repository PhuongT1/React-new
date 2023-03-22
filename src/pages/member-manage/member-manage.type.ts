import { searchForm } from 'models/search.type'
import { string } from 'yup'

export interface Member {
  id: number
  provider: string
  name: string
  created_at: any
  status: number
}

export interface optionSearch {
  value: string
  label: string
}

export interface searchPage extends searchForm {
  per_page?: number
  page?: number
  created_at_btw?: string
}
