import React from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import "./cds.css";
function Managecd() {
  const navigate=useNavigate();
  const location = useLocation();
  const item = location.state; 

  return (
    <div >
      <div className='sub'>
      <div className='sub1'>
        Manage your Certificate of Deposit
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
      <div className='tiles'>
      <div className='card-tile'><div className='s1'>Fund your Growth cd</div>
      <div style={{paddingTop:"20px"}}>
      <button 
            onClick={()=>navigate('/fund_cd',{state:item})}>Deposit</button></div>
    </div>
    <div className='card-tile'><div className='s1'>Close and transfer</div>
    <div   style={{paddingTop:"20px"}}>
      <button onClick={()=>navigate('/close_cd',{state:item})}>close</button></div>
    </div>
    </div>
    </div>
    
    </div>
  );
}

export default Managecd;
