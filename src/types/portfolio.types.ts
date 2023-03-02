export interface IPortfolio {
  thumbnail: string
  title: string
  spaceType: string
  scale: string
  style: string
  partnerInfo: IInteriorPartner
  listImages: Array<string> | undefined
}
interface IInteriorPartner {
  avatar?: string
  name: string
}
