import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
`

const ContentContainer = styled(Container)`
  background-image: url(${props => props.imageUrl});
`

/**
 * COMPONENT
 */
const UserHome = props => {
  return (
    <div>
      <Container>
        <ContentContainer imageUrl="https://miro.medium.com/max/1838/1*d8DyNLUIa8xo5rGrO-2FSg.jpeg">
          <div>
            <img src="https://banner2.kisspng.com/20180410/dxe/kisspng-shovel-hand-tool-spatula-material-shovel-5acc9f46763c44.5125105115233595584843.jpg" />
          </div>
        </ContentContainer>
      </Container>
    </div>
  )
}

export default UserHome
