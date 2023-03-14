import React from "react";
import { useParams } from "react-router-dom";
const Loading = React.lazy(() => import("elements/loading"));

const NftDetail = (route: any) => {
  const {id} = useParams()
  console.log('location', location)
  return(
    <>
      <p>nft detail</p>
    </>
  )
};
export default NftDetail;
