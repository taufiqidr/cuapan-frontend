import React from 'react'
import BackButton from './BackButton'

const ErrorPage = ({ message }) => {
    return (
        <div className="container-fluid flex-column feed border-start border-end border-secondary col-6" >
            <div className="p-1 sticky-top bg-black">
                <h4 className="text-start text-light">
                    <BackButton />
                    Go Back
                </h4>
            </div>
            <div className="container-fluid">
                <h1 className='text-center alert alert-danger'>{message}</h1>
            </div>
        </div>
    )
}

export default ErrorPage