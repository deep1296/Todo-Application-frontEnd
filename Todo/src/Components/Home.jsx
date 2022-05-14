import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getTodosData } from "../Redux/Todos/action";
import { Profile } from "./Profile";
import { Sidebar } from "./Sidebar";
import { TaskContainer } from "./TaskContainer";

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
  grid-column: 3/6;
  // border: 1px solid black;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  @media (max-width: 768px) {
    width: 90%;
   }
`;
const GridItem3 = styled.div`
  grid-column: 6/9;
  // border: 1px solid black;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  @media (max-width: 768px) {
    width: 90%;
   }
`;
const GridItem4 = styled.div`
  grid-column: 9/12;
  // border: 1px solid black;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  @media (max-width: 768px) {
    width: 90%;
   }
`;

export const Home = () => {
  const { token, userId, name } = useSelector((state) => state.login);
  const  todos  = useSelector((state) => state.todos.todos);
// console.log(todos)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodosData({userId}));
  }, []);

  return (
    <Container>
      <GridItem1>
        <Sidebar token={token} name={name} todos={todos} />
      </GridItem1>
      <GridItem2>
        <TaskContainer tasks={todos.filter((item)=>item.status==="Todo")}   color="rgb(159,192,136)" ocolor="" heading="TODOS"/>
      </GridItem2>
      <GridItem3>
        <TaskContainer tasks={todos.filter((item)=>item.status==="Inprogress")} color="rgb(232,192,125)" ocolor="" heading="IN PROGRESS"/>
      </GridItem3>
      <GridItem4>
        <TaskContainer tasks={todos.filter((item)=>item.status==="Done")} color="rgb(204,112,75)" ocolor="" heading="DONE"/>
      </GridItem4>
    </Container>
  );
};
