import React, { useEffect, useState } from "react";
import PersonIcon from '@mui/icons-material/Person';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import NotesIcon from '@mui/icons-material/Notes';
import axios from "axios";
export const Profile = ({ name, token }) => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    // fetch(`http://localhost:1296/users/${name}`, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((res) => setProfile(res))
    //   .catch((err) => console.log(err));
    
    axios.get(`https://updated-todo-application-0181.herokuapp.com/users/${name}`)
    .then((res)=>{setProfile(...res.data)
    // console.log(res.data)
    })
    .catch((err)=>console.log(err))
  
  }, []);
// console.log(profile)
  return (
    <div style={{ padding:"3px",textAlign:"left", lineHeight:"15px"}} className="user_details">
      <h3>Profile Details</h3>
     
      <p>{<PersonIcon/>} {profile.name}</p>
      <p>{<MailOutlineIcon/>} {profile.email}</p>
     
    </div>
  );
};
