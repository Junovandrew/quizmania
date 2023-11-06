import {Children, createContext, useEffect, useRef, useState} from 'react'
import styled from '@emotion/styled'
import {FaTimes as CancelIcon} from 'react-icons/fa'

export const ModalContext = createContext({});
const ModalContextProvider = (props)=>{
    // const [show_modal,set_show_modal] = useState(false);
    const [modal_content,set_modal_content] = useState('');
    const modal_ref = useRef();
    const children = props.children;
    let [allAnswer,set_allAnswer] = useState([])
    let[ score,set_score] = useState(0);
    const handleShowModal = (show)=>{
        if(show)modal_ref.current.showModal();
        else modal_ref.current.close();
    }
    const value = {
        set_modal_content,
        handleShowModal,
        allAnswer,set_allAnswer,
        score,set_score,
    }

    return(
        <ModalContext.Provider value={value}>
            <dialog ref ={modal_ref} style={{backgroundColor:"transparent",border:'none'}}>
                <Wrapper>
                    <div>
                        <span onClick={
                            ()=>handleShowModal(false)
                        }>
                            <CancelIcon/>
                        </span>
                        <div>
                            {
                                modal_content
                            }
                        </div>
                    </div>
                </Wrapper>
            </dialog>
            {children}
        </ModalContext.Provider>
    );
}

export default ModalContextProvider;
const Wrapper = styled.section`
    position:fixed;
    top:0;
    right:0;
    width:100%;
    height:100%;
    display:flex;
    justify-content: center;
    &>div{
        position:relative;
        padding:20px;
        width:fit-content;
        background-color: var(--white-color);
        top:60px;
        border-radius: 10px;
        box-shadow: 0 0 10px 2px rgba(0,0,0,0.1);
        height:fit-content;
        &>span{
            position: absolute;
            width:40px;
            height:40px;
            display: flex;
            align-items: center;
            justify-content: center;
            font: 25px;
            background-color: var(--white-color);
            color:var(--red-color);
            border-radius: 50%;
            top:-50px;
            right:0;
        }
        
    }
`
