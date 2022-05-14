import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getTodosData } from "../Redux/Todos/action";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import axios from "axios";

const TaskWrapper = styled.div`
  margin: 5px;
  padding: 10px;
  border: 2px solid gray;
  font-size: 1em;
`;

const HeadSection = styled.div`
  display: flex;
  // align-items: center;
  justify-content: space-between;
`;
const SubtaskSection = styled.div`
text-align: left;
  padding: 5px;
  
`;

export const TaskItem = (props) => {
  // console.log("controlled tasks", props)
  const { title, description, subtasks, status, tags, date, _id, user_id } = props;
  // console.log(props)
  const { personal, official, others } = tags;

  const userId = useSelector((store=>store.login.userId))
  //  console.log(userId)
  const dispatch = useDispatch();
 const navigate = useNavigate();

 const token = useSelector((store=>store.login.token))

//-------------------delete todo function
const delete_todo =()=>{
  // fetch(`http://localhost:1296/todos/${_id}`,{
  //   method:"DELETE",
  //   headers:{
  //     "Content-Type":"application/json",
  //     "Authorization":`Bearer ${token}`
  //   }
  // }).then(res=>res.json())
  // .then(data=>{
  //   console.log(data)
  //   dispatch(getTodosData({userId}))
  // })
  // .catch(err=>console.log(err))

  axios.delete(`https://updated-todo-application-0181.herokuapp.com/todos/${_id}`)
  .then(res=>{
    // console.log(res)
    dispatch(getTodosData({userId}))
  }
  )
  .catch(err=>console.log(err))


  
}


  return (
    <TaskWrapper>
      <HeadSection>
        <div style={{ textAlign: "left" }}>
          <div><b>Title: </b><span style={{fontSize:"22px",fontWeight:"bold"}}>{title}</span></div>
          <p><b>Tags: </b>
            {personal && "PERSONAL"} {official && "OFFICIAL"}{" "}
            {others && "OTHERS"}
          </p>
          <p><b>Description: </b>{description}</p>
        </div>
        <div>
          <p style={{ backgroundColor: "rgb(185,131,255)" }}>{date}</p>
        </div>
      </HeadSection>
      <SubtaskSection>
        <b>Subtasks: </b><br />
        {subtasks.map((subtask) => {
          return (
            <div key={subtask._id}>
              <label>
                <input
                  type="checkbox"
                  checked={subtask.status}
                  onChange={(e) => {
                    const subtasksAfterToggle = subtasks.map((item) =>
                      item._id === subtask._id
                        ? { ...subtask, status: e.target.checked }
                        : item
                    );
                    const payload = {
                      title,
                      description,
                      date,
                      tags,
                      subtasks: subtasksAfterToggle,
                      status,
                      user_id,
                      _id
                    };
                    fetch(`https://updated-todo-application-0181.herokuapp.com/todos/${_id}`, {
                      method: "PUT",
                      body: JSON.stringify(payload),
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }).then(() => dispatch(getTodosData({userId})));
                  }}
                />
              </label>
              {subtask.subTitle}
            </div>
          );
        })}
      </SubtaskSection>
      <Button style={{backgroundColor:"rgb(253,93,93)", color:"white", margin:"5px"}} onClick={()=>navigate(`/todos/${_id}/edit`)}>EDIT</Button>
      <Button style={{backgroundColor:"red",color:"white", margin:"5px"}} onClick={delete_todo}>DELETE</Button>
    </TaskWrapper>
  );
};

// title: "",
// description: "",
// subtasks: [],
// status: "",
// tags: {
//   official: false,
//   personal: false,
//   others: false,
// },
// date: "",
