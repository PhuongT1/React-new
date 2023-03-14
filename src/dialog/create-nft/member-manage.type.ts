import { string } from "yup"

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

export interface searchPage {
    per_page?: number
    page?: number
    order_by?: string
    created_at_btw?: string
    search_like?: string
    [key: string]: any
}    