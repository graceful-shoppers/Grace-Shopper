import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const NotFoundImage = styled.img`
  width: 100%;
`

const HomeButton = styled(Link)`
  background: plum;
  color: #fff;
  border: none;
  font-size: 40px;
  padding: 0 1em;
  vertical-align: center;
  border-radius: 15px;
`

const CenterFile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

class NotFound extends React.Component {
  render() {
    return (
      <div>
        <CenterFile>
          <NotFoundImage src="http://mauibrewingco.com/maui-content/uploads/2018/11/404-page-04.png" />
          <HomeButton to="/home">Home</HomeButton>
        </CenterFile>
      </div>
    )
  }
}

export default NotFound
