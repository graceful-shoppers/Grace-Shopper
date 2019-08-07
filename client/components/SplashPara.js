import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

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

const SplashText = styled.h1`
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
  perspective: 1px;
  // transform-style: preserve-3d;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
`

const ContentContainer = styled.div`
  position: relative;
  display: block;
  background-color: white;
  z-index: 1;
  transform-origin: 100% 50%;
`

const Content = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 75px 0;
  color: white;
`
const ParallaxContainer = styled.div`
  display: flex;
  flex: 1 0 auto;
  position: relative;
  z-index: -1;
  height: 100vh;
  justify-content: center;
  align-items: center;
  transform: translateZ(-1px) scale(2);
  background: url(${props => props.img});
  background-color: rgb(250, 228, 216);
  background-size: cover;
`
const LinkButt = styled.div`
  width: 30%;
  margin: auto;
  border-radius: 50%;
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
      </MainContainer>
      <MainContainer>
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
      </MainContainer>
      <MainContainer>
        <ParallaxContainer img="assets/spoon.jpg" />
        <ContentContainer>
          <Content>
            <SplashText>
              <br />
              <br />
              do<br /> EVERYTHING<br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <Link to="/shovels">
                <LinkButt>start here</LinkButt>
              </Link>
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
