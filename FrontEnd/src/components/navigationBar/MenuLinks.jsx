import React from 'react'
import { Link } from 'react-router'

function MenuLinks(props) {
  return (
    <Link className={props.menu_css} to={props.menu_link} >{props.menu_name}</Link>
  )
}

export default MenuLinks