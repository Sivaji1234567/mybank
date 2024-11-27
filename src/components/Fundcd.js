import React, { useState } from 'react'
import { useLocation,useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import axios from 'axios';
function Fundcd() {
  const navigate =useNavigate();
    const [funding_accounts,setFunding_accounts]=useState([]);
    const  [personid,setPersonid]=useState(2);
    const [selectedaccount,setSelectedaccount]=useState();
    const location = useLocation();
    const item = location.state;
    const to_account=item.cd_number;
    const [amount,setAmount]=useState();
    useEffect(()=>{
        axios.get(`http://localhost:3003/get_funding_accounts?id=${personid}`)
        .then(res=>{setFunding_accounts(res.data.data)})
        .then(err=>{console.log(err)})
      },[personid])
     
      const handleFunding= () =>{
        axios.post('http://localhost:3003/fund_cd', {selectedaccount,to_account,amount})
        .then(response => {
          console.log("successful")
          navigate('/display_cd')
        })
        .catch(error => {
          console.log(error);
        });
        };
        // console.log(from_account);
        console.log(funding_accounts);
  return (
    <div>
      <div className='sub'>
      <div className='sub1'>
        Fund your Growth CD
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
<div><div style={{fontSize:"30px",paddingBottom:"10px"}}>Fund Your CD</div>
    <div >Select The Account </div>
    <div>
        <select  className="dropdown" onChange={(e)=>setSelectedaccount(e.target.value)}>
        <option value="" hidden>Select The Account</option>
 
         {
        funding_accounts.map((item,index)=>(<option key={index} value={item.account_number}>{item.account_type}&nbsp;{"XXXXXX" +item.account_number.toString().slice(-4)}</option>))
          }
       </select>
    </div>
    <div>
       <div>Enter The Amount You Transfer</div>
       <div ><input className='amount' type='text' placeholder="Enter the amount" onChange={(e)=>setAmount(e.target.value)}/></div>
    </div>

    <div  style={{display:"flex",flexDirection:"row",paddingTop:"15px"}}>
      <div>
        <button >Cancel</button>
     </div>
     <div style={{paddingLeft:"30px"}}>
        <button onClick={handleFunding} >Submit</button>
      </div>
    </div>
</div>
</div>
    </div>
    </div>
  )
}

export default Fundcd;
