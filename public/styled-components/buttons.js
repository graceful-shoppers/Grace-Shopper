import styled from 'styled-components'
import {Link} from 'react-router-dom'

export const BurgerLinkButton = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 16px;
  text-align: center;
  margin-top: 2px;
  background-color: plum;
  padding-top: 5px;
  padding-bottom: 5px;
  border: 1px solid black;
  border-radius: 25px;
`
export const BasicButton = styled.button`
  border: 1px solid black;
  color: black;
  background-color: limegreen;
  font-size: 16px;
`

export const DeleteButton = styled.button`
  border: 1px solid black;
  color: black;
  background-color: tomato;
  font-size: 16px;
`
