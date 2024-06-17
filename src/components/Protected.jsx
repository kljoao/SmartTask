import React from 'react'

const Protected = () => {
    const token = localStorage.getItem('token');

    return(
        token ? <Outlet/> : <Navigate to="register"/>
    )
}

export default Protected