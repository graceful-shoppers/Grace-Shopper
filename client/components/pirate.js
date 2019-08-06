import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const PirateImage = styled.img`
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

class Pirate extends React.Component {
  render() {
    return (
      <div>
        <CenterFile>
          <PirateImage src="https://previews.123rf.com/images/noam/noam0905/noam090500012/4865686-pirate-attacking-with-a-knife-a-laptop-computer.jpg" />
          <HomeButton to="/home">Home</HomeButton>
        </CenterFile>
      </div>
    )
  }
}

export default Pirate
