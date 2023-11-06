import {useState,useRef,memo,useContext} from 'react'
import styled from '@emotion/styled'
import { ModalContext } from '../context/ModalContext'

const Result = () => {
    const {score,allAnswer} = useContext(ModalContext);
    const spanRef = useRef(null);

    const handleColor=()=>{
      if(allAnswer.index){
        spanRef.current.color = 'green';
      }else{
        spanRef.current.color = 'red';
      }
    }
  return (
    <Wrapper>
        <div>
            {allAnswer && allAnswer.length > 0?
            allAnswer.map(eAns=>
              <div key={eAns.id}>
                <span>{eAns.id}</span>
                <span ref={spanRef} style={eAns.index?{color:'green'}:{color:'red'}}>{eAns.index?'correct':'wrong'}</span>
              </div>
            ):''}
            <div>Your score: {score}  {score < 8?' A SHAME':" A true Otaku!"}</div>
        </div>
    </Wrapper>
  )
}

export default memo(Result)

const Wrapper = styled.div`
    width: 300px;
    height: fit-content;
    background-color:#fff;
    padding: 10px 0 10px 20px;
    & > div{
      display: flex;
      gap: 5px;
      flex-direction: row;
      flex-wrap: wrap;
      width: 100%;
      & > div{
        display: flex;
        gap: 5px;
        width: calc(50% - 5px);
        align-items: flex-start;
        justify-content: flex-start;
      }
      & > div:nth-of-type(23){
        display: flex;
        width: 100%;
        align-items: center;
        font-size: 19px;
        font-weight: 400;
      }
    }
`