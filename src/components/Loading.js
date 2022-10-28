import React from 'react'
import { PulseLoader } from 'react-spinners'

const Loading = () => {
    return (
        <div className="container-fluid border-start border-end border-secondary">
            <div className="container-fluid">
                <h1 className='text-center alert alert-primary'>
                    <PulseLoader color={"#fff"} />
                </h1>
            </div>
        </div>
    )
}

export default Loading