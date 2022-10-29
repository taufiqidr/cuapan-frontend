import React from 'react'
import { PulseLoader } from 'react-spinners'

const PublicLoading = () => {
    return (
        <div>
            <p className='alert alert-success text-center'>
                <PulseLoader color={"#fff"} />
            </p>
        </div>
    )
}

export default PublicLoading