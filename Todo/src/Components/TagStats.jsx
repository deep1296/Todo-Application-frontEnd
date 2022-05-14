import React from 'react'
import styled from 'styled-components'

const TagCard = styled.div`
padding: 3px;
width: 100%;
text-align: left;
box-sizing: border-box;
`

const Separatediv = styled.div`
padding: 8px;
margin: 2px;
border: 1px solid #ccc;
background-color: ${props => props.bcolor};
`



export const TagStats = ({todos}) => {
    const personal_len = todos.filter(todo => todo.tags.personal).length
    const official_len = todos.filter(todo => todo.tags.official).length
    const other_len = todos.filter(todo => todo.tags.others).length    
    const all_len = todos.length
  return     <TagCard >
       <Separatediv bcolor='rgb(148,180,159)'>All- {all_len}</Separatediv>
       <Separatediv bcolor='rgb(148,180,159)'>Personal- {personal_len}</Separatediv>
       <Separatediv bcolor='rgb(148,180,159)'>Official- {official_len}</Separatediv>
       <Separatediv bcolor='rgb(148,180,159)'>Others- {other_len}</Separatediv>
    </TagCard>
  
}
