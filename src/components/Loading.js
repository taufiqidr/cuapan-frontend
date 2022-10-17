import React from 'react'
import { PulseLoader } from 'react-spinners'

const Loading = () => {
    return (
        <div className="m-auto">
            <PulseLoader color={"#FFF"} />
        </div>
    )
}

export default Loading