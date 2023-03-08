export interface listTable<T> {
  data: Array<T> | any
  dataheader: Array<string>
  rowItem: (item: any, index: number) => JSX.Element
}