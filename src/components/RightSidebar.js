import React from 'react'
import Toast from 'react-bootstrap/Toast'
import ToastHeader from 'react-bootstrap/ToastHeader'
import ToastBody from 'react-bootstrap/ToastBody'
import { useDispatch, useSelector } from 'react-redux'
import { closeup, closedown } from '../features/home/voteSlice'
import { ToastContainer } from 'react-bootstrap'

const RightSidebar = () => {
    const dispatch = useDispatch()
    const showUp = useSelector((state) => state.vote.like)
    const showDown = useSelector((state) => state.vote.dislike)
    return (
        <div className="flex-column flex-shrink-0 main-bar col-3 ">
            <div className="d-flex p-1 row">
                <h4 className="text-center text-light"> Right Sidebar</h4>
            </div>
            <ToastContainer className='row'>
                <Toast show={showUp} onClose={() => dispatch(closeup())} className="bg-black">
                    <ToastHeader className='bg-secondary '>
                        <strong className="me-auto text-light">Status liked</strong>
                    </ToastHeader>
                    <ToastBody className=''><small>11 mins ago</small></ToastBody>
                </Toast>
                <Toast show={showDown} onClose={() => dispatch(closedown())} className="bg-black">
                    <ToastHeader className='bg-secondary'>
                        <strong className="me-auto text-light">Status disliked</strong>
                    </ToastHeader>
                    <ToastBody><small>10 mins ago</small></ToastBody>
                </Toast>
            </ToastContainer>
        </div>
    )
}

export default RightSidebar