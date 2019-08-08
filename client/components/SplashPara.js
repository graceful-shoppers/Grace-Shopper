import React from 'react'
import styled from 'styled-components'

// const Container = styled.div`
//   width: 100%;
//   height: 100vh;
//   z-index: 0;
//   text-align: center;
//   display: flex;
//   flex-direction: column;
//   justify-context: space-between
//   z-index: 0;
// `

// const ContentContainer = styled(Container)`
//   background-image: url(${props => props.imagePath});
//   max-width: 100%;
//   max-height: 100%;
// `

const ImgCont = styled.img`
  max-width: 90%;
  // max-height: 60%;
`
const ImgRotateLeft270 = styled(ImgCont)`
  transform: rotate(10deg);
  position: relative;
`
// const RelDiv = styled.span`
//   display: flex;
//   flex-direction: column;
//   overflow: hidden;
//   align-items: center;
// `

const SplashText = styled.div`
  letter-spacing: 15px;
  font-family: 'Raleway', sans-serif;
  color: grey;
  text-align: center;
  font-size: 20px;
  font-weight: 400;
  line-height: 75px;
`

const ShovelPanelText = styled.div`
  margin-top: 25%;
`

const MainContainer = styled.div`
  scroll-behavior: smooth;
  perspective: 100px;
  // transform-style: preserve-3d;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
`

const ContentContainer = styled.div`
  // position: relative;
  display: block;
  z-index: 1;
  height: 100vh
  width: 100%;
`

const Content = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 20px 0;
  color: white;
  height: 20%;
  background-color: white;
  // transform-origin: 100% 100%;
  position: relative;
  top: 50%;
  transform: translateZ(-75px) scale(2);
`
const ParallaxContainer = styled.div`
  display: flex;
  flex: 1 0 auto;
  position: relative;
  z-index: -1;
  height: 100vh;
  justify-content: center;
  align-items: center;
  transform: translateZ(-100px) scale(2);
  background: url(${props => props.img});
  background-color: rgb(250, 228, 216);
  background-size: cover;
`
const LinkButt = styled.div`
  border-radius: 50%;
  &:hover {
    box-shadow: 0px 0px 5px black;
  }
`

{
  /* <ImgRotateLeft270
className="hehe"
src="http://www.pngall.com/wp-content/uploads/2016/04/Shovel-PNG-Picture.png"
/> */
}

/**
 * COMPONENT
 */
const Splash = props => {
  return (
    <div>
      <MainContainer>
        <ParallaxContainer img="assets/snowStuff.jpg">
          <ImgCont src="assets/snowShovel.png" />
        </ParallaxContainer>
        <ContentContainer>
          <Content>
            <SplashText>
              be<br /> SOMEONE...
            </SplashText>
          </Content>
        </ContentContainer>
        <ParallaxContainer img="https://miro.medium.com/max/1838/1*d8DyNLUIa8xo5rGrO-2FSg.jpeg">
          <ImgRotateLeft270
            className="hehe"
            src="assets/Shovel-PNG-Picture.png"
          />
        </ParallaxContainer>

        <ContentContainer>
          <Content>
            <SplashText>find something...</SplashText>
          </Content>
        </ContentContainer>
        <ParallaxContainer img="assets/spoon.jpg" />
        <ContentContainer>
          <Content>
            <SplashText>
              do<br /> EVERYTHING<br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <LinkButt>
                <div>start here</div>
              </LinkButt>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </SplashText>
          </Content>
        </ContentContainer>
      </MainContainer>
    </div>
  )
}

export default Splash
