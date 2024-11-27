import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react';
import axios from 'axios';
function Closecd() {
    const [funding_accounts,setFunding_accounts]=useState([]);
    const  [personid,setPersonid]=useState(2);
    const [selectedaccount,setSelectedaccount]=useState();
    const [reasons,setReasons]=useState([]);
    const location = useLocation();
    const item = location.state;
    const from_account=item.cd_number;
    const amount=item.balance;
    useEffect(()=>{
        axios.get(`http://localhost:3003/get_funding_accounts?id=${personid}`)
        .then(res=>{setFunding_accounts(res.data.data)})
        .then(err=>{console.log(err)})
      },[personid])
      useEffect(()=>{
        axios.get(`http://localhost:3003/close_cd`)
        .then(res=>{setReasons(res.data.data)})
        .then(err=>{console.log(err)})
      },[])
      // console.log(funding_accounts);

      //handle close function  
      const handleClose= () =>{
        axios.post('http://localhost:3003/close_cd', {from_account,selectedaccount,amount})
        .then(response => {
          console.log("successful")
        })
        .catch(error => {
          console.log(error);
        });
        };
        // console.log(from_account);
        console.log(reasons);
        console.log(selectedaccount);
  return (
    <div>
      <div className='sub'>
      <div className='sub1'>
        Close and transfer your Certificate of deposit
      </div>
      <div className='sub3'>
      <div className='cards'>
      <div className='s1'>{item.cd_term} Certificate</div>
      <div className='s2'>Opened_by : {item.created_at.split("T")[0]}</div>
      <div className='s3'>Account Number: {item.cd_number}</div>
      <div className='s4'>Balance: {item.balance}</div>
      <div className='s5'>Rate: {item.rate}</div>
      </div>
      </div>
      <div className='sub4'>
<div><div style={{fontSize:"30px",paddingBottom:"10px"}}>Close and Transfer</div>
    <div >Select The Account To Transfer</div>
    <div>
        <select  className="dropdown" onChange={(e)=>setSelectedaccount(e.target.value)}>
        <option value="" hidden>Select The Account</option>
 
         {
        funding_accounts.map((item,index)=>(<option key={index} value={item.account_number}>{item.account_type}&nbsp;{"XXXXXX" +item.account_number.toString().slice(-4)}</option>))
          }
       </select>
    </div>
    <div>Reason for Closing</div>
    <div>
        <select  className="dropdown" >
        <option value="" hidden>Select The Reason</option>
 
         {
        reasons.map((item,index)=>(<option key={index} value={item.id}>{item.reason}</option>))
          }
       </select>
    </div>
    <div>
       <div>Understand Your Balance</div>
       <div ><input className='amount' type='text' placeholder={item.balance} readOnly /></div>
    </div>

    <div  style={{display:"flex",flexDirection:"row",paddingTop:"15px"}}>
      <div>
        <button >Cancel</button>
     </div>
     <div style={{paddingLeft:"30px"}}>
        <button onClick={handleClose}   >Submit</button>
      </div>
    </div>
</div>
</div>
    </div>
    </div>
  )
}

export default Closecd;
