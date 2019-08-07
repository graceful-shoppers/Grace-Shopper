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
  position: relative;
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

// img: https://miro.medium.com/max/1838/1*d8DyNLUIa8xo5rGrO-2FSg.jpeg           assets/snowStuff.jpg  assets/spoon.jpg
// pics: assets/Shovel-PNG-Picture.png   assets/snowShovel.png

const BgImg = styled.div`
  position: relative;
  opacity: 0.65;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
  background-image: url(${props => props.url});
  z-index: -1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: scroll;
`

const Caption = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  text-align: center;
  color: #000;
  z-index: 0;
`

/**
 * COMPONENT
 */
const Splash = props => {
  return (
    <div>
      <BgImg url="assets/snowStuff.jpg">
        <ImgCont src="assets/snowShovel.png" />
      </BgImg>
      <div>
        <SplashText>find something...</SplashText>
      </div>
      <BgImg url="https://miro.medium.com/max/1838/1*d8DyNLUIa8xo5rGrO-2FSg.jpeg" />
    </div>
  )
}

export default Splash
