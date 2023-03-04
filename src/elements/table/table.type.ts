import { FunctionComponent } from "react"

export type listTable<T> = {
  data: Array<T>
  dataheader: Array<string>
  rowItem: FunctionComponent<any>
}
