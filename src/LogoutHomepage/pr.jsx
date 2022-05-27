import React, { useState } from 'react';


function Practice() {
    const [setEmail] = useState("");
    const [setPassword] = useState("");

    function handelChange(e) {
        setEmail(e.target.value)
    }

    function handelPassword(e) {
        setPassword(e.target.value)
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
