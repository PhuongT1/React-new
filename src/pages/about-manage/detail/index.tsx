import React from "react"
import NftDetail from "./nft"
import style from "./detail.module.scss"
import MonthlyQuest from "./monthly-quest"
const Loading = React.lazy(() => import("elements/loading"))

const DetailNft = () => {
  return (
    <div className={`${style["page-detail"]}`}>
      <h3>NFT</h3>
      <NftDetail />
      <MonthlyQuest />
    </div>
  );
};
export default DetailNft;
