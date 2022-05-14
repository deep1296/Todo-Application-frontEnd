import { Action } from "history";
import React, { useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { getTodosData } from "../Redux/Todos/action";
import styled from "styled-components"
import { useSelector } from "react-redux";
import { Sidebar } from "./Sidebar";
import Button from '@mui/material/Button';
/*
{
    title: '',
    description: '',
    status: 'todo'|"doing"|"done",
    tags: {official: true|false, important: true|false, urgent: true|false}},
    date: Date,
    subtasks: [
        {
            id: number,
            subtititle: string,
            status: 'todo'|"doing"|"done",
        }
    ]
}
*/

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
border-radius: 5px ;
box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
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
// border: 1px solid black;
box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
padding: 30px;
@media (max-width: 768px) {
  width: 100%;
  padding: 10px;
}

`

const Right_part = styled.div`
width: 400px;
height: 300px;
// height: 400px;
min-height: 300px;
// border: 1px solid black;
box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
padding: 30px;
@media (max-width: 768px) {
  width: 100%;
  padding: 10px;
   }
`


const initialState = {
  title: "",
  description: "",
  subtasks: [],
  status: "Todo",
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
      case "RESET_TASK":
        return {...initialState}                               // create task with initialState empty
    default:
      throw new Error("plz give propper action object");
  }
};

export const TodosCreact = () => {
  const [subtaskvalue, setSubtaskValue] = useState("");
   
  //-----taking logedin userId from redux store and make post request
  const {token, name,userId} = useSelector(state=>state.login)
    const { todos } = useSelector((state) => state.todos);
  // console.log(userId)


  const reduxDispatch = useDispatch()
  
  const createNewTask = ()=>{
      const payload = {...state,user_id:userId};
      
      fetch(`https://todo-application-deep1296.herokuapp.com/todos`, {
          method: "POST",
          body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json" }
        }).then(()=>{
            reduxDispatch(getTodosData({userId}))
        }).then(()=>{
            dispatch({type: "RESET_TASK"})
        })
        .catch(err=>{
            console.log(err)
        })

       
        
       
    } 
    const [state, dispatch] = useReducer(todoReducer, initialState);
    const { title, description, subtasks, status, tags, date } = state;
    const { official, personal, others } = tags;
    
    

  return (
    <Container>
    <GridItem1>
    <Sidebar token={token} name={name} todos={todos} />
    </GridItem1>
    <GridItem2>
    <h2>CREATE TASK</h2>
    <DivAll>
      <Left_part>
      {/* ==========================TITLE======================================= */}
      <b>Task Title:</b> 
      <input
        type="text"
        required
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
        <h2>CREATE SUBTASKS</h2>

        <input
          type="text"
          placeholder="SUBTASK"
          value={subtaskvalue}
          onChange={(e) => {
            setSubtaskValue(e.target.value);
          }}
          />
         <Button style={{backgroundColor:"rgb(253,93,93)", color:"white", margin:"5px"}}
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
          ADD SUBTASK
        </Button><br />
        <Button style={{backgroundColor:"rgb(253,93,93)", color:"white", margin:"5px"}} onClick={createNewTask}
        >CREATE TASK </Button>
      
          </Mid_part>
          <Right_part>

         {/* ==========================SUBTASKS map======================================= */}
       <h2>Subtasks </h2>

{subtasks.map((subtask) => (
  <div key={subtask.id} style={{display:"flex", justifyContent:"space-between"}}>
    
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
        />   {subtask.subTitle}
       

         
    </label>
        </div>
       <div>

        <Button style={{backgroundColor:"rgb(253,93,93)", color:"white", margin:"5px"}}
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


//-----------------todo database formate------------//

// "todos": [
//   {
//     "title": "task 1",
//     "description": "nothing to say",
//     "subtasks": [
//       {
//         "id": "c47d00de-021f-43be-8105-193b3ef1bfb5",
//         "subTitle": "subtask 2",
//         "status": true
//       },
//       {
//         "id": "79c5c9ac-3144-4b07-b175-2477657d2abc",
//         "subTitle": "ddgddss",
//         "status": false
//       }
//     ],
//     "status": "Todo",
//     "tags": {
//       "official": true,
//       "personal": false,
//       "others": false
//     },
//     "date": "2022-04-22",
//     "id": 1
//   }]