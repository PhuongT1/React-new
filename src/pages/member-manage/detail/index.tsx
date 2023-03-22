import { useParams } from 'react-router-dom'

const DetailMember = () => {
  const { id } = useParams()
  return (
    <>
      <p>detail member with id {id}</p>
    </>
  )
}
export default DetailMember
