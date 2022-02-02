import { Button } from 'reactstrap';

const ControllMenu = ({ save, isLoading }) => {
    return (
        <div className='controll-menu'>
            <h1 className='title'>Write Your Story....</h1>
            <div className='status-box'>
                { isLoading ? 'Saving...' : 'Saved' }
            </div>
            <Button disabled={isLoading} onClick={save} color="success">Save</Button>
        </div>
    )
}

export default ControllMenu;