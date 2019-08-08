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
  position: absolute;
  scroll-behavior: smooth;
  perspective-origin: 0 0;
  height: calc(100% - 77px);
  height: -o-calc(100% - 77px); /* opera */
  height: -webkit-calc(100% - 77px); /* google, safari */
  height: -moz-calc(100% - 77px); /* firefox */
  width: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
`

const ContentContainer = styled.div``

const Content = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 75px 0;
  color: white;
`
const ParallaxContainer = styled.div`
  transform-style: preserve-3d;
`

const ParallaxChild = styled.div`
  background: url(${props => props.img});
  transform-origin: 0 0;
  transform: translateZ(-2px) scale(3)
  perspective: 1px;
  top: 0px;
  position: -webkit-sticky;
  height: 90.5vh;
  width: 100%;
  position: relative;
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
        <ParallaxContainer>
          <ParallaxChild img="assets/snowStuff.jpg">
            {' '}
            <ImgCont src="assets/snowShovel.png" />
          </ParallaxChild>
          <ParallaxChild>
            <SplashText>find something...</SplashText>
          </ParallaxChild>
        </ParallaxContainer>
      </MainContainer>
    </div>
  )
}

export default Splash
