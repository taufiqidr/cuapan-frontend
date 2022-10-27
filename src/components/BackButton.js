import React from 'react'
import { ArrowLeft } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
    const navigate = useNavigate();
    return (
        <span className='me-2' onClick={() => navigate(-1)}>
            <ArrowLeft />
        </span>

    )
}

export default BackButton