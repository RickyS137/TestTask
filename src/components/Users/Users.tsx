import { useEffect } from "react"
import { getUsers, usersSelect } from "../../redux/slices/UsersSlice/model/UsersSlice"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import Card from "../Card/Card"
import classes from './Users.module.scss'

export interface IUser {
  id:	number,
  name:	string,
  username: string,
  email: string,
  address: object,
  phone: string,
  website: string,
  company: object
}

const Users = () => {
  const { users, loading } = useAppSelector(usersSelect)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getUsers())
  }, [ dispatch ] )

  const handleUpdate = () => {
    dispatch(getUsers())
  }
  if(loading) return (
    <div className={classes.loading}>
      Загрузка пользователей...
    </div>
  )
  return(
    <div className={classes.main}>
        <div className={classes.head}>
          <button 
            className={classes.updateUsers}
            onClick={handleUpdate}
          >
            Обновить список
          </button>
        </div>
        <div className={classes.users}>
        {users?.map((u: IUser) => 
          <Card user={u}/>
        )}
        </div>
    </div>
  )
}

export default Users