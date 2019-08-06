import React from 'react'
import styled from 'styled-components'

const ImgCont = styled.img`
  max-width: 90%;
  // max-height: 60%;
`
const ImgRotateLeft270 = styled(ImgCont)`
  transform: rotate(10deg);
  position: relative;
`

const ShovelPanelText = styled.div`
  margin-bottom; 1.5em
`

const SplashText = styled.h1`
  letter-spacing: 15px;
  font-family: 'Raleway', sans-serif;
  color: grey;
  text-align: center;
  font-size: 20px;
  font-weight: 400;
  line-height: 75px;
`

{
  /* <ImgRotateLeft270
className="hehe"
src="http://www.pngall.com/wp-content/uploads/2016/04/Shovel-PNG-Picture.png"
/> */
}

const bsize = {
  boxSizing: 'border-box',
  margin: 0
}

/**
 * COMPONENT
 */

const Slides = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  perspective: 300px;
  scroll-behavior: smooth;
  scroll-snap-destination: 0% 0%;
  scroll-snap-type: mandatory;

  #slide1 {
    background: url(https://miro.medium.com/max/1838/1*d8DyNLUIa8xo5rGrO-2FSg.jpeg);
  }
`

const Slide = styled.div`
  transform-style: preserve-3d;
  scroll-snap-coordinate: 0% 0%;
  position: relative;
  padding: 8% 0;
`

const SlideBg = styled.div`
  bottom: -50%;
`

const SlideContent = styled.div`
  transform-style: preserve-3d;
  height: 100%;
  display: flex;
  align-items: center;
  max-width: 90%;
  margin: auto;
`

const SlideText = styled.div`
  transform: translateZ(60px) scale(0.8);
  transform-origin: 100% 50%;
  padding: 3%;
  flex: 1;
`

const Splash = props => {
  return (
    <div style={bsize}>
      <Slides>
        <Slide>
          <SlideBg id="slide1">
            <SlideContent />
          </SlideBg>
        </Slide>
      </Slides>
    </div>
  )
}

export default Splash
