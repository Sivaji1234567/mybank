import React from 'react'
import {Link} from 'react-router-dom'
function Tiles() {
  return (
    <div  >
        <div>
      <div className='total_tile'>
       <Link style={{textDecoration:"none"}} to="/open_cd"> <div className='tile1'>
            <h1>Open a new cd</h1>
        </div></Link>
        <Link to="/display_cd" style={{textDecoration:"none"}} >
        <div className='tile1'>
             <h1>manage cd</h1>
        </div></Link>
      </div>
      </div>
    </div> 
  )
}

export default Tiles
