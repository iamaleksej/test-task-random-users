import { FC, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { actionChangeSearchValue } from "../../actions/actionChangeSearchValue"
import { useDebounce } from "../../hooks/useDebounce"
import { AppDispatch } from "../../store"
import styles from './Search.module.sass'


const Search: FC = () => {
   const dispatch = useDispatch<AppDispatch>()
   const [searchValue, setSearchValue] = useState('');

   const onChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value)
   }
   const debounceValue = useDebounce(searchValue, 1000);

   useEffect(() => {
      dispatch(actionChangeSearchValue(debounceValue))
   }, [debounceValue])

   return (
      <input
         className={styles.search}
         type='text'
         placeholder='Search'
         onChange={onChangeInputHandler}
      />
   )
}

export default Search
