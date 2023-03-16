import React from "react";
import { useParams } from "react-router-dom";
const Loading = React.lazy(() => import("elements/loading"));

const DetailMember = (route: any) => {
  const { id } = useParams();
  console.log("location", location);
  return (
    <>
      <p>detail member with id {id}</p>
    </>
  );
};
export default DetailMember;
