import ClipLoader from 'react-spinners/ClipLoader'

const Spinner = ({ loading = false, color = '#005ec2', size = 50 }) => {
  if (!loading) return null

  return (
    <div className="spinner-container">
      <ClipLoader color={color} loading={loading} size={size} />
    </div>
  )
}

export default Spinner