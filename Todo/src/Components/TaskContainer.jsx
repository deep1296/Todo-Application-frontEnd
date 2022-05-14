import React from "react";
import styled from "styled-components";
import { TaskItem } from "./TaskItem";
const Wraper = styled.div`
::-webkit-scrollbar {
  background-color: red;
}

`
const HeadingWraper = styled.div`
text-align: center;
background: ${(props) => props.color};
border:2px solid ${(props) => props.ocolor};
padding: 10px;
font-weight: bold;
`

export const TaskContainer = ({tasks,color,heading,ocolor}) => {
  return <Wraper>
      <HeadingWraper color={color} ocolor={ocolor}>{heading}</HeadingWraper>
      {tasks.map(task => <TaskItem key={task._id} {...task} />)}

  </Wraper>;
};
