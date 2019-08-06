import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  height: 100vh;
  z-index: 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-context: space-between
  z-index: 1;
`

const ContentContainer = styled(Container)`
  background-image: url(${props => props.imagePath});
  max-width: 100%;
  max-height: 100%;
`

const ImgCont = styled.img`
  max-width: 90%;
  // max-height: 60%;
`
const ImgRotateLeft270 = styled(ImgCont)`
  transform: rotate(10deg);
  position: relative;
  margin-top: 25%;
  margin-bottom: -10%;
`
const RelDiv = styled.span`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  align-items: center;
`

const SplashText = styled.span`
  font-family: 'Raleway', sans-serif;
  color: yellow;
  font-size: 40px;
`

const ShovelPanelText = styled.div`
  margin-top: 25%;
`

/**
 * COMPONENT
 */
const Splash = props => {
  return (
    <div>
      <Container>
        <ContentContainer imagePath="https://miro.medium.com/max/1838/1*d8DyNLUIa8xo5rGrO-2FSg.jpeg">
          <div>
            <RelDiv>
              <ImgRotateLeft270
                className="hehe"
                src="../../public/assets/Shovel-PNG-Picture.png"
              />
            </RelDiv>
          </div>
          <div>
            <ShovelPanelText>
              <SplashText>find something...</SplashText>
            </ShovelPanelText>
          </div>
        </ContentContainer>
      </Container>
    </div>
  )
}

export default Splash
