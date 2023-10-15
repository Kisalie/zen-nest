import ClipLoader from 'react-spinners/ClipLoader'

const Spinner = ({ loading = false, color = '#005ec2', size = 50 }) => {
  if (!loading) return null

  return (
    <div className="flex justify-center items-center min-h-[200px]">
      <div className="spinner-container">
        <ClipLoader color={color} loading={loading} size={size} />
      </div>
    </div>

  )
}

export default Spinner