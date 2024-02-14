import { Link } from 'react-router-dom'
import { Button } from '../ui/button'

const UserCard = (user:any) => {
  return (
    <div className='user-card '>
        <div className='flex flex-col gap-3 justify-center items-center'>
           <Link to={`/profile/${user.user.accountId}`} >
            <img src={user.user.imageUrl || "/assets/icons/profile-placeholder.svg"}  alt="creator"
                className="w-20 h-20 rounded-full "/>
           </Link>
           <span className='small-medium block min-h-[20px]'>{user.user.name}</span> 
           <p className='subtle-semibold text-light-3 block min-h-[18px]'>@{user.user.username}</p>
           <Button type="button" size="sm" className="shad-button_primary px-5">
        Follow
      </Button>
           </div>
    </div>
  )
}

export default UserCard