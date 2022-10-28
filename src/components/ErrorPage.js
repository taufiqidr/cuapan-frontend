import Bar from './Bar'

const ErrorPage = ({ message }) => {
    return (
        <div className="container-fluid border-start border-end border-secondary" >
            <Bar title={'Go Back'} />
            <div className="container-fluid">
                <h1 className='text-center alert alert-danger'>{message}</h1>
            </div>
        </div>
    )
}

export default ErrorPage