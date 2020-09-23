import  React  from 'react'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

export const BackButton = ({ children }) => {
  const history = useHistory();
  return (
    <Button type="button" onClick={() => history.goBack()}>
      {children}
    </Button>
  )
}

