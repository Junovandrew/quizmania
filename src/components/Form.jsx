import {useState,useRef,memo,useEffect,useContext} from 'react';
import styled from '@emotion/styled';
import { quizData } from '../util/store';
import LogoImg from '../assets/logo.jpeg'
import Logo2Img from '../assets/logo2.jpeg'
import AnimeImg from '../assets/anime.jpg'
import {useModal} from '../hooks/useModal'
import { Result } from '../modal';
import {ModalContext} from '../context/ModalContext';


const optionObj = {
    0:'a',
    1:'b',
    2:'c',
    3:'d'
}
const selected = [];

const Form = () => {
const [ind,set_ind] = useState(0);
const [active,set_active] = useState(null);
const btnREf = useRef(null);
const {handleShowModal,set_modal_content} = useModal();
const {allAnswer,set_allAnswer,score,set_score} = useContext(ModalContext);

const value = {
    score,
    allAnswer
}

const handleNext=()=>{   
    let last = quizData.length -1;
    let lastt = quizData.length -2;
    if( ind < last){
        set_ind(ind+1);
    }
}
const handleBack=()=>{

    let lastt = quizData.length -2;
    if( ind > 0){
        set_ind(ind-1);
    }
}
const getSelected=(index)=>{
    selected[ind] = optionObj[index];
}
const handleActive=(index)=>{
    set_active(index);
    getSelected(index);
}

useEffect(()=>{
    set_active(null);
},[ind])
const getResult=()=>{
    const tempAnswers = [];
    quizData.forEach((eq,index)=>{
        let select = selected[index];
        let ans = eq.answer;
        if(ans[select]){
            set_score(score => score+1);
            tempAnswers.push({id:index + 1,index: true})
        }else{
            tempAnswers.push({id:index + 1,index: false})
        }
    })
    set_allAnswer(tempAnswers);
    set_modal_content(<Result/>)
    handleShowModal(true);

};
  return (
        <Wrapper>
            <div>
                <div>
                    <span><img src={Logo2Img} alt="alt" /></span>
                    <span>22 Anime Trivia Questions</span>
                </div>
                <div>
                    <span><img src={LogoImg} alt="alt" /></span>
                    <span>Only True Otakus Can Answer</span>
                </div>
            </div>
            <div>
                <div key={quizData[ind].id}>
                    <div>{quizData[ind].question}</div>
                    <div>                 
                        {Object.values(quizData[ind].option).map((eOption,index) => <span key={index} onClick={()=>handleActive(index)} className={active == index?'active':''}>{eOption}</span>)}
                    </div>
                </div>
                <div>
                    <button type="button" onClick={handleBack}>Back</button>
                    {ind == quizData.length-1?
                    <button type="button" ref={btnREf} onClick={getResult}>Submit</button>
                    :<button type="button" ref={btnREf} onClick={handleNext}>Next</button>}    
                    
                </div>
            </div>
        </Wrapper>
  )
}

export default memo(Form)

const Wrapper = styled.div`
    background-image:url(${AnimeImg});
    background-repeat:no-repeat;
    background-size:cover;
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    & > div:first-of-type{
        display: flex;
        flex-direction: column;
        align-items: center;
        border-bottom:1px dashed #fff;
        width: 700px;
        align-self: center;
        & > div:first-of-type{
            font-size: 30px;
            font-weight: 700;
            display: flex;
            align-items: center;
            color: #687EFF;
            & > span{
                & > img{
                    height: 40px;
                    width: 40px;
                    object-fit: contain;
                    border-radius: 40%;
                }
            }
        }
        & > div:nth-of-type(2){
            font-size: 15px;
            font-weight: 500;
            display: flex;
            align-items: center;
            color:#FC2947;
            & > span{
                & > img{
                    height: 40px;
                    width: 40px;
                    object-fit: contain;
                    border-radius: 40%;
                }
            }
        }
    }    
    & > div:nth-of-type(2){
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        align-self: center;
        color: #fe0000;
        width: 650px;
        height: 250px;
        margin-top: 50px;
        padding: 50px;
        & > div:first-of-type{
            display: flex;
            justify-content: flex-start;
            flex-direction: column;
            & > div:first-of-type{
                font-size: 25px;
                font-weight: 700;
                margin-bottom: 50px;
                height: 66px;
            }
            & > div:nth-of-type(2){
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 15px;
                flex-direction: row;
                flex-wrap: wrap;
                width: 100%;
                & > span{
                    padding: 10px 25px;
                    width: 48%;
                    font-size: 18px;
                    font-weight: 500;
                    background-color:#687EFF;
                    border-radius: 10px;
                    display: flex;
                    color: #fff;
                    align-items: center;
                    justify-content: flex-start;
                    cursor: pointer;
                }
                & > span:hover{
                    background-color:turquoise;
                    color: #A6FF96;
                }
                & > span.active{
                    background-color:turquoise;
                    color: #A6FF96;
                }
            }
        }
         & > div:nth-of-type(2){
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            margin-top: 30px;
            & > button{
                padding: 10px 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: #b34646;
                border: none;
                border-radius: 10px;
                font-size: 18px;
                color: #fff;
                font-weight: 500;
                cursor: pointer;
            }
            & > button:hover{
                background-color: #fe0000;
            }
        }
    }
`