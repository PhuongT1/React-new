export interface listTable<T> {
  data: Array<T>
  dataheader: Array<string>
  rowItem: (item: any, index: number) => JSX.Element
}