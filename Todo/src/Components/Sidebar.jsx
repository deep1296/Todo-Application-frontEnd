import React from 'react'
import { Profile } from './Profile'
import { TagStats } from './TagStats'
import { useDispatch } from 'react-redux'
import { logout } from '../Redux/Login/action'
import Button from '@mui/material/Button';
import { logout2 } from '../Redux/Signup/action'

export const Sidebar = ({token, name,todos}) => {
    const dispatch = useDispatch()
  return (
    <div>
        <Profile token={token} name={name}/>
        <hr />
        <TagStats todos={todos}/>
          <hr />
          <Button style={{backgroundColor:"red",color:"white"}}
          onClick={()=>{
            dispatch(logout())
            dispatch(logout2())
          }} 
          >logout</Button>
    </div>
  )
}
