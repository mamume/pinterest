import React, { useState } from 'react';


function Practice() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handelChange(e) {
        setEmail(e.target.value)
        console.log(email);
    }

    function handelPassword(e) {
        setPassword(e.target.value)
        console.log(password);
    }

    return (
        <div>
            <label>enter your email</label>
            <input type="text" name="email" size="30" />
            <input type="password" onChange={handelPassword} />
            <input type="button" onClick={(event) => handelChange(event)} value="submit" />
        </div>
    );
}

export default Practice;
