const Notification = ({ message, type }) => {
  if (message === null) {
   return null
  }
 
  if(type === 'success'){
   return (
    <div className="success">
     {message}
    </div>
  )}

  if(type === 'error'){
   return (
    <div className="error">
     {message}
    </div>
  )}

  else {
   return null
  }
}

export default Notification