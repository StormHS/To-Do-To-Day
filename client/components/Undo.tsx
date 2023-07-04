import { faUndo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  useState } from 'react'

export default function Undo() {

const [over, setOver] = useState(false)

  return (
    <div 
      onMouseOver={() => setOver(true)}
      onMouseLeave={() => setOver(false)}
      onFocus={() => setOver(true)}>
      <FontAwesomeIcon icon={faUndo} style={over ? { color: "red" } : {}} />
    </div>
  )
}