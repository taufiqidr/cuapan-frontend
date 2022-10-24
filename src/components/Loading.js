import React from 'react'
import { PulseLoader } from 'react-spinners'

const Loading = () => {
    return (
        <div className="d-flex flex-column feed border-start border-end border-secondary col-6 ">
            <div className="m-auto">
                <PulseLoader color={"#FFF"} />
            </div>
        </div>
    )
}

export default Loading