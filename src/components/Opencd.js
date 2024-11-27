import React from 'react'
import { useEffect,useState } from 'react'
import './cds.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Opencd() {
  const navigate=useNavigate();
    const [personid,setPersonid]=useState(2);
    const [terms,setTerms]=useState([]);
    const [selectedterm,setSelectedterm]=useState('');
    const [accounts,setAccounts]=useState([]);
    const [selectedaccount,setSelectedaccount]=useState('');
    const[amount,setAmount]=useState('');
    
    const handleSubmit= () =>{
      axios.post('http://localhost:3003/create_account', {personid,selectedterm,amount})
      .then(response => {
        console.log("successful")
      })
      .catch(error => {
        console.log(error);
      });
      };
    
    useEffect(()=>{
        axios.get("http://localhost:3003/get_cd_rates")
        .then(res=>{setTerms(res.data.data)})
        .then(err=>{console.log(err)})
    },[]);
    useEffect(()=>{
      axios.get(`http://localhost:3003/get_funding_accounts?id=${personid}`)
      .then(res=>{setAccounts(res.data.data)})
      .then(err=>{console.log(err)})
    },[personid])
    // console.log(terms);
    // console.log(accounts);
    console.log(selectedterm);
    console.log(selectedaccount);
  return (
    <div>
      <div className='new_cd'>
        <h1>Open a new Certificate of Deposit</h1>
        <div className='certificate'>
        <h3>Select a type of cd</h3>
      <select  className="dropdown" onChange={(e)=>setSelectedterm(e.target.value)}>
  <option  className="dropdown-content" value="" hidden>Select the CD term</option>
  <option >
    <div className='drop-a'>plan</div>
    <div  className='drop-b'>rate</div>
   
    </option>
  {
    terms.map((item, index) => (
      <option  className="dropdown-content" key={index} value={item.plan}>{item.plan} --- {item.rates}</option>
    ))
  }
</select><br/>
<h3>Select the account </h3>
 <select  className="dropdown" onChange={(e)=>setSelectedaccount(e.target.value)}>
 <option value="" hidden>Select the account</option>
 
  {
    accounts.map((item,index)=>(<option key={index} value={item.account_number}>{item.account_type}{item.account_number}</option>))
  }
 </select><br/> 
 <h3>Enter the amount</h3>
 <input className='amount' type='text' placeholder='Enter the amount' onChange={(e)=>setAmount(e.target.value)}/><br/>
 {/* {amount} */}
 <div className='button_div'>
 <div className='cancel_div>'><button onClick={()=> navigate('/')}>Cancel</button></div>
 <div className='submit_div'><button onClick={handleSubmit}>Submit</button></div>
 </div>
 </div>
 </div>
    </div>
  )
}

export default Opencd;
