import React,{useState} from 'react';


function Practice() {
   const [email,setemail] = useState("");
   const [password,setpassword] = useState("");

   function handelchange(e) {
       setemail(e.target.value)
       console.log(email);
   }

   function handelpassword(e) {
    setpassword(e.target.value)
    console.log(password);
}


   
    return ( 
        <div>
            <label>enter your email</label>
            <input type="text" name="email" size="30"/>
            <input type="password" onChange={handelpassword} />
            <input type="button" onClick={(event) =>handelchange(event)} value="submit" />
           
        </div>
        
     );
}

export default Practice;
