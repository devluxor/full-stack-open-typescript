const Error = ({error}:{error:null | string}) => {
  if (!error) return

  return <p style={{ color: 'red' }}>{error}</p> 
}

export default Error