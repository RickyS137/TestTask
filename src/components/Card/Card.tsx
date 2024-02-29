import { FC } from 'react'
import { IUser } from '../Users/Users'
import classes from './Card.module.scss'
import userPhoto from '../../assets/nophoto.webp'

interface ICard {
  user: IUser
}

const Card: FC<ICard> = ({ user }) => {

  return (
    <div className={classes.main}>
      <div className={classes.userImage}>
        <img alt='userimg' src={userPhoto}/>
      </div>
      <div className={classes.userInfo}>
        <p>{user?.name}</p>
        <p>{user?.email}</p>
        <p>{user?.phone}</p>
      </div>
    </div>
  )
}

export default Card