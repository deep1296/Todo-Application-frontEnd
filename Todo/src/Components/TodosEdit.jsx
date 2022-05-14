
//-----------------------------------------------------------------------------------------------------------------------------------.//


import { Action } from "history";
import React, { useEffect, useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { getTodosData } from "../Redux/Todos/action";
import styled from "styled-components"
import { useSelector } from "react-redux";
import { Sidebar } from "./Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import Button from '@mui/material/Button';



const Container = styled.div`
margin: 0;
padding: 30px;
display: grid;
grid-template-columns: repeat(11, 1fr);
// height: 100vh;
gap: 10px;
// background-color: yellow;
@media (max-width: 768px) {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  padding: 10px;

  }
`;
const GridItem1 = styled.div`
grid-column: 1/3;
box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
border-radius: 5px ;
// background-color: rgb(255,168,168);
@media (max-width: 768px) {
 width: 90%;
  }
`;
const GridItem2 = styled.div`
  grid-column: 3 / 14;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  // border: 1px solid black;
  @media (max-width: 768px) {
    width: 90%;
   }
`;

//----------added

const DivAll = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: space-evenly;
`

const Left_part = styled.div`
width: 400px;
height: 300px;
padding: 30px;
// border: 1px solid black;
box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
text-align: left;
margin: 10px;
@media (max-width: 768px) {
  width: 100%;
  padding: 10px;
}
`

const Mid_part = styled.div`
width: 400px;
height: 300px;
padding: 30px;
margin: 10px;
// border: 1px solid black;
box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
@media (max-width: 768px) {
  width: 100%;
  padding: 10px;
}

`

const Right_part = styled.div`
width: 400px;
height: 300px;
padding: 30px;
margin: 10px;
min-height: 300px;
// border: 1px solid black;
box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
@media (max-width: 768px) {
  width: 100%;
  padding: 10px;
   }
`
//---------------------------------


const initialState = {
  title: "",
  description: "",
  subtasks: [],
  status: "",
  tags: {
    official: false,
    personal: false,
    others: false,
  },
  date: "",
};

const todoReducer = (state, { type, payload }) => {
  switch (type) {
    case "UPDATE_TITLE":
      return { ...state, title: payload };
    case "UPDATE_DESCRIPTION":
      return { ...state, description: payload };
    case "UPDATE_STATUS":
      return { ...state, status: payload };
    case "UPDATE_TAGS":
      return { ...state, tags: { ...state.tags, ...payload } };
    case "UPDATE_DATE":
      return { ...state, date: payload };
    case "UPDATE_SUBTASKS":
      return { ...state, subtasks: [...state.subtasks, payload] };
    case "TOGGLE_SUBTASK":
        const subtasksAfterToggle = state.subtasks.map((e) => 
            e.id === payload.id ? {...e, status: payload.status} : e
        );
        return {...state, subtasks: subtasksAfterToggle}
    case "DELETE_SUBTASK":
        const subtasksAfterDelete = state.subtasks.filter((e) => e.id !== payload
        );
        return {...state, subtasks: subtasksAfterDelete}
    ///4. update initialState by data from server
    case "UPDATE_INITIAL_STATE_FORM_SERVER":
        return {...state, ...payload}
      case "RESET_TASK":
        return {...initialState}                               // create task with initialState empty
    default:
      throw new Error("plz give propper action object");
  }
};

/////1. change the name of the component to TodosEdit
export const TodosEdit = () => {
  const [subtaskvalue, setSubtaskValue] = useState("");

  
  const reduxDispatch = useDispatch()
  
  

    const [state, dispatch] = useReducer(todoReducer, initialState);
    const { title, description, subtasks, status, tags, date } = state;
    const { official, personal, others } = tags;
    
    const {token, name,userId} = useSelector(state=>state.login)
    const { todos } = useSelector((state) => state.todos);
    // console.log(userId)
  ///take id from url
    const {id} = useParams()

   

    //3. on component mount fetch data from server and edite it 
    useEffect(()=>{
        fetch(`https://updated-todo-application-0181.herokuapp.com/todos/${id}`)
        .then(res=>res.json())
        .then(res=>{
          let data = res[0]
            dispatch({
                type: "UPDATE_INITIAL_STATE_FORM_SERVER",
                payload: data
            })
            // console.log(data)
        })

    },[])

    // const createNewTask = ()=>{
    //     const payload = {...state};
        
    //     fetch(`http://localhost:1296/todos`, {
    //         method: "POST",
    //         body: JSON.stringify(payload),
    //           headers: {
    //               "Content-Type": "application/json" }
    //       }).then(()=>{
    //           reduxDispatch(getTodosData())
    //       }).then(()=>{
    //           dispatch({type: "RESET_TASK"})
    //       })
    //       .catch(err=>{
    //           console.log(err)
    //       })       
    //   } 

    const navigate = useNavigate();

    const updateTask = ()=>{
        const payload = {...state};
        fetch(`https://updated-todo-application-0181.herokuapp.com/todos/${id}`, {
            method: "PUT",
            body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json" }
        }).then(()=>{
            reduxDispatch(getTodosData({userId}))
        }).then(()=>navigate("/"))
    }

  return (
    <Container>
    <GridItem1>
    <Sidebar token={token} name={name} todos={todos} />
    </GridItem1>
    <GridItem2>

    <h2>EDIT TASK</h2>
    <DivAll>
      <Left_part>
    
    
      {/* ==========================TITLE======================================= */}
      <b>Task Title:</b> 
      <input
        type="text"
        placeholder="TITLE"
        value={title}
        onChange={(e) =>
          dispatch({ type: "UPDATE_TITLE", payload: e.target.value })
        }
      />
      <br />
      <br />
      {/* ==========================DESCRIPTION======================================= */}
      <b>Task Description:</b> 
      <input
        type="text"
        placeholder="DESCRIPTION"
        value={description}
        onChange={(e) =>
          dispatch({ type: "UPDATE_DESCRIPTION", payload: e.target.value })
        }
      />
      <br />
      <br />
      {/* ==========================STATUS======================================= */}
      <b>Task Status:</b> <br />
      <label>
        <input
          type="radio"
          name="status"
          checked={status === "Todo"}
          onChange={() => {
            dispatch({ type: "UPDATE_STATUS", payload: "Todo" });
          }}
        />
        Todo
      </label>
      <label>
        <input
          type="radio"
          name="status"
          checked={status === "Inprogress"}
          onChange={() => {
            dispatch({ type: "UPDATE_STATUS", payload: "Inprogress" });
          }}
        />
        In progress
      </label>
      <label>
        <input
          type="radio"
          name="status"
          checked={status === "Done"}
          onChange={() => {
            dispatch({ type: "UPDATE_STATUS", payload: "Done" });
          }}
        />
        Done
      </label>
      <br />
      <br />
     
        {/* ==========================TAGS======================================= */}
        <b>Task Tags:</b> <br />
        <label>
          <input
            type="checkbox"
            checked={official}
            onChange={(e) => {
              dispatch({
                type: "UPDATE_TAGS",
                payload: { official: e.target.checked },
              });
            }}
          />
          OFICIAL
        </label>
        <br />
        <br />
        <label>
          <input
            type="checkbox"
            checked={personal}
            onChange={(e) => {
              dispatch({
                type: "UPDATE_TAGS",
                payload: { personal: e.target.checked },
              });
            }}
          />
          PERSONAL
        </label>
        <br />
        <br />
        <label>
          <input
            type="checkbox"
            checked={others}
            onChange={(e) => {
              dispatch({
                type: "UPDATE_TAGS",
                payload: { others: e.target.checked },
              });
            }}
          />
          OTHERS
        </label>
        <br />
        <br />

        </Left_part>
        <Mid_part>
        
        {/* ==========================date======================================= */}
        <label>
          <input
            type="date"
            value={date}
            onChange={(e) => {
              dispatch({ type: "UPDATE_DATE", payload: e.target.value });
            }}
          />
        </label>
        <br />
        <br />
        {/* ==========================SUBTASKS======================================= */}
        <h2>EDIT SUBTASKS</h2>

        <input
          type="text"
          placeholder="SUBTASK"
          value={subtaskvalue}
          onChange={(e) => {
            setSubtaskValue(e.target.value);
          }}
        />
        <Button style={{backgroundColor:"rgb(253,93,93)",color:"white",margin:"5px"}}
          onClick={() => {
            const payload = {
              id: uuid(),
              subTitle: subtaskvalue,
              status: false,
            };
            dispatch({ type: "UPDATE_SUBTASKS", payload });
            setSubtaskValue("");                                    //clear input of subtask
          }}
        >
          CERATE SUBTASK
        </Button><br />

        <Button style={{backgroundColor:"rgb(253,93,93)",color:"white",margin:"5px"}} onClick={updateTask}
        >EDIT TASK </Button>

        </Mid_part>
          <Right_part>

        {/* ==========================SUBTAS map======================================= */}
        <h2>Subtasks </h2>


        {subtasks.map((subtask) => (
          <div key={subtask._id} style={{display:"flex",justifyContent:"space-between"}}>
            <div>

            <label>
              <input
                type="checkbox"
                checked={subtask.status}
                onChange={(e) => {
                  dispatch({
                    type: "TOGGLE_SUBTASK",
                    payload: {
                      id: subtask.id,
                      status: e.target.checked,
                    },
                  });
                }}
              />
                {subtask.subTitle}
            </label>
                  </div>
                  <div>
                <Button style={{backgroundColor:"rgb(253,93,93)",color:"white",margin:"5px"}}
                onClick={() => dispatch({ type: "DELETE_SUBTASK", payload: subtask.id })}
                >
                    DELETE
                </Button>

                  </div>
          </div>
          
        ))}
      
      </Right_part>
      </DivAll>
     
   
    </GridItem2>
    </Container>
  );
};




