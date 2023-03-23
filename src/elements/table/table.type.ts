export interface listTable<T> {
  data?: T[]
  dataheader: string[]
  rowItem: (item: T, index: number) => React.ReactNode
}
