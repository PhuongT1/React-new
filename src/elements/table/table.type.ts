export interface listTable<T> {
  data?: T[]
  dataheader: string[]
  rowItem: (item: any, index: number) => JSX.Element
}
