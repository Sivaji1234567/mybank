import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './cds.css'
function DisplayCD() {
  const navigate=useNavigate();
    const [cds,setCds]=useState([]);
    const  [personid,setPersonid]=useState(2);
    useEffect(()=>{
        axios.get(`http://localhost:3003/get_cd_accounts?id=${personid}`)
        .then(res=>{setCds(res.data.payload)})
        .then(err=>{console.log(err)})
    },[personid]);
    console.log(cds);
  return (
    <div>
      <div className='sub'>
        <div className='sub1'>
      Your Certificate of Deposits
      </div>
      <div className='sub2'>
      {
      cds.map((item) => (<div className='cards' onClick={()=> navigate(`/manage_cd`, { state: item })}>
          <div className='s1'>{item.cd_term} Certificate</div>
          <div className='s2'>Opened_by : {item.created_at.split("T")[0]}</div>
          <div className='s3'>Account Number:{item.cd_number}</div>
            <div className='s4'>Balance:{item.balance}</div>
            <div className='s5'>Rate:{item.rate}</div>
        </div>))
         }
         </div>
    </div>
    </div>
  )
}

export default DisplayCD;
