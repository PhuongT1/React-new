import React from "react";
import { useParams } from "react-router-dom";
import NftDetail from "./nft";
import style from "./detail.module.scss";
const Loading = React.lazy(() => import("elements/loading"));

const DetailNft = () => {
  return (
    <div className={`${style["page-detail"]}`}>
      <h3>NFT</h3>
      <NftDetail />
    </div>
  );
};
export default DetailNft;
