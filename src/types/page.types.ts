type PageMeta = {
  current_page?: number
  from?: number
  last_page?: number
  per_page?: number
  to?: number
  total?: number
}

export class Page<T> {
  data: Array<T> = []
  meta?: PageMeta
}
