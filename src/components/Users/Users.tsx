import { useEffect, useState } from "react"
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

  const [ filters, setFilters ] = useState<(string | null)[]>([])
  const [ activeFilter, setActiveFilter ] = useState<IUser[]>([])

  const [sortType, setSortType] = useState<"asc" | "desc" | null>(null);

  useEffect(() => {
    dispatch(getUsers())
  }, [ dispatch ] )

  useEffect(() => {
    if(JSON.parse(localStorage.getItem('filters') || '')){      
      const regExp = /\.([a-zA-Z]+)$/;
      const arr = users.map((u: IUser) => {
        const match = u.email.match(regExp);
        return match ? match[1] : null;
      })
      const set = new Set(arr)
      const result = [...set]
      localStorage.setItem('filters', 'true')
      setFilters(result)
    }
  },[ users ])

  const handleUpdate = () => {
    dispatch(getUsers())
    setActiveFilter([])
  }

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {    
    const res = users.filter((u: IUser) => u.email.endsWith(e.target.value))    
    setActiveFilter(res)
  }

  const handleSort = () => {
    setSortType((prevSortType) => (prevSortType === "asc" ? "desc" : "asc"));
  };

  const sortedUsers = () => {  
    if (sortType === "asc") {
      return [...users].sort((a: IUser, b: IUser) => a.name.localeCompare(b.name));
    } else if (sortType === "desc") {
      return [...users].sort((a: IUser, b: IUser) => b.name.localeCompare(a.name));
    } else {
      return users;
    }
  };
  

  if(loading) return (
    <div className={classes.loading}>
      Загрузка пользователей...
    </div>
  )
  return(
    <div className={classes.main}>
        <div className={classes.head}>
          <div>
            <button className={classes.updateUsers} onClick={handleSort}>
              Сортировать по имени {sortType === "asc" ? "Z-A" : "A-Z"}
            </button>
          </div>
          <div>
            <select name="filter" id="filter" value={'asdasda'} onChange={handleFilter}>
              <option value="">Выберите фильтр</option>
              {filters.map(f => (
                <option value={f ? f : ''}>{`@.${f}`}</option>
              ))}
            </select>
          </div>
          <button 
            className={classes.updateUsers}
            onClick={handleUpdate}
          >
            Обновить список
          </button>
        </div>
        <div className={classes.users}>
          {
            activeFilter.length
            ?
            activeFilter?.map((u: IUser) =>
            <Card user={u}/>
            )
            :
            sortedUsers()?.map((u: IUser) =>
              <Card user={u}/>
            )
          }
        </div>
    </div>
  )
}

export default Users