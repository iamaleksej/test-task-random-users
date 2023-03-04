import { useMemo } from "react";
import { IUser } from "../types";
import { useTypedSelector } from "./useTypedSelector";

export const useSortUsers = () => {
   const { data: usersData, searchValue } = useTypedSelector((state) => state.users);
   const memoizedUsersArr = useMemo(() => {
      let arrUsers: IUser[] = []
      const searchValueLower = searchValue.toLowerCase()
      console.log(searchValue)
      if (usersData && searchValue) {
         for (let item of usersData) {
            const { name } = item
            let firstName: string = name.first.toLowerCase()
            let lastName: string = name.last.toLowerCase()

            if (firstName.indexOf(searchValueLower) === 0 || lastName.indexOf(searchValueLower) === 0) {
               arrUsers.push(item)
            }
         }

         return arrUsers
      }

      return arrUsers
   }, [usersData, searchValue])

   return memoizedUsersArr
}