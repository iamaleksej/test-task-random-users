import { FC, useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import Filter from "../Filter"
import FilterList from "../FilterList"
import Search from "../Search"
import { useTypedSelector } from '../../hooks/useTypedSelector'
import styles from './UserList.module.sass'
import { getUsers } from "../../services/api/apiUsersSlice"
import { AppDispatch } from "../../store"
import { IUser } from "../../types"

import arrow from '../../assets/images/arrow.png'
import { useOutsideClick } from "../../hooks/useOutsideClick"
import { actionChangeQuantityUsers } from "../../actions/actionChangeQuantityUsers"
import { actionChangeGender } from "../../actions/actionChangeGender"
import { actionChangeNationality } from "../../actions/actionChangeNationality"
import { useSortUsers } from "../../hooks/useSortUsers"
import Loader from "../Loader"

const UserList: FC = () => {
   const { data: usersData, loading, totalPage, quantityUsers, nationality, gender, searchValue } = useTypedSelector((state) => state.users);
   const dispatch = useDispatch<AppDispatch>()
   const [numberPage, setNumberPage] = useState(1)
   const [isOpenFilterList, setOpenFilterList] = useState(false)
   const quantityUsersArr: string[] = ['10', '50', '100']
   const NationsArr: string[] = ['AU', 'BR', 'CA', 'CH', 'DE', 'DK', 'ES', 'FI', 'FR', 'GB', 'IE', 'IN', 'IR', 'MX', 'NL', 'NO', 'NZ', 'RS', 'TR', 'UA', 'US']
   const GendersArr: string[] = ['male', 'female']

   const quantityUsersRef = useRef<HTMLDivElement>(null)
   const nationalityRef = useRef<HTMLDivElement>(null)
   const genderRef = useRef<HTMLDivElement>(null)

   const onCloseFilterList = () => {
      setOpenFilterList(false)
   }
   useOutsideClick(quantityUsersRef, onCloseFilterList, isOpenFilterList);

   const sortUsers = useSortUsers()
   const currentUsersArr = searchValue ? sortUsers : usersData
   useEffect(() => {
      const controller = new AbortController()
      const { signal } = controller

      dispatch(getUsers({ numberPage, quantityUsers, nationality, gender, options: { signal } }))

      return () => controller.abort()
   }, [numberPage, quantityUsers, nationality, gender])

   const stylePosFilterList = { top: '-170px', right: '0' }

   return (
      <div className='container'>
         <div className={styles.homeWrapper}>
            <div className={styles.home}>
               <Search />
               <div className={styles.filters}>
                  <Filter
                     ref={genderRef}
                     filterName="Gender"
                     actionFunction={actionChangeGender}
                     dataArr={GendersArr}
                     currentValue={gender}
                  />
                  <Filter
                     ref={nationalityRef}
                     filterName="Nationality"
                     actionFunction={actionChangeNationality}
                     dataArr={NationsArr}
                     currentValue={nationality}
                  />
               </div>
               <div className={styles.usersWrapper}>
                  <table className={styles.table}>
                     <thead>
                        <tr className={styles.tableHeader}>
                           <th className={styles.tableCol1}>Profile</th>
                           <th className={styles.tableCol2}>Location</th>
                           <th className={styles.tableCol3}>Email</th>
                           <th className={styles.tableCol4}>Birthday</th>
                           <th className={styles.tableCol5}>Gender</th>
                           <th className={styles.tableCol6}>Nationality</th>
                           <th className={styles.tableCol7}>Phone</th>
                        </tr>
                     </thead>
                     <tbody className={currentUsersArr?.length > 7 ? 'overflowYScroll' : ''}>
                        <tr>
                           <td className={styles.tableBody}>
                              {loading && (
                                 <tr>
                                    <td className='dFlex w100'>
                                       <Loader />
                                    </td>
                                 </tr>
                              )}
                              {!loading && (
                                 currentUsersArr?.map((user: IUser, index) => {
                                    return (
                                       <tr className={styles.tableRow}
                                          key={Math.random() * 999 * index}>
                                          <td className={styles.tableCol1}>
                                             <img
                                                src={user.picture.thumbnail}
                                                className={styles.image}
                                                alt="profile image" />
                                             <p>{`${user.name.first} ${user.name.last}`}</p>
                                          </td>
                                          <td className={styles.tableCol2}>{user.location.city}</td>
                                          <td className={styles.tableCol3}>{user.email}</td>
                                          <td className={styles.tableCol4}>
                                             {
                                                user.dob.date.split('T')[0].split('-')[2]
                                                + '.'
                                                + user.dob.date.split('T')[0].split('-')[1]
                                                + '.'
                                                + user.dob.date.split('T')[0].split('-')[0]
                                             }
                                          </td>
                                          <td className={styles.tableCol5}>{user.gender}</td>
                                          <td className={styles.tableCol6}>{user.nat}</td>
                                          <td className={styles.tableCol7}>{user.phone}</td>
                                       </tr>
                                    )
                                 })
                              )}
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </div>
               <div className={styles.bottom}>
                  <div className={styles.turnPages}>
                     <button
                        className={styles.turnPagesArrow}
                        disabled={numberPage === 1 ? true : false}
                        onClick={() => setNumberPage(prev => prev - 1)}
                     >
                        <img
                           src={arrow}
                           className={styles.turnPagesLeftArrow}
                           alt="arrow left"
                        />
                     </button>
                     <div className={styles.turnPagesText}>
                        {`${numberPage} of ${totalPage}`}
                     </div>
                     <button
                        className={styles.turnPagesArrow}
                        disabled={numberPage === totalPage ? true : false}
                        onClick={() => setNumberPage(prev => prev + 1)}
                     >
                        <img
                           src={arrow}
                           className={styles.turnPagesRightArrow}
                           alt="arrow right"
                        />
                     </button>
                  </div>
                  <div className={styles.quantityUsers}>
                     <div className={styles.quantityUsersText}>Rows per page:</div>
                     <div
                        className={styles.quantityUsersSelected}
                        onClick={() => setOpenFilterList(!isOpenFilterList)}
                        ref={quantityUsersRef}
                     >
                        <p className={styles.quantityUsersSelectedNumber}>
                           {quantityUsers}
                        </p>
                        <img
                           src={arrow}
                           className={isOpenFilterList ? styles.quantityUsersDownArrow : styles.quantityUsersUpArrow}
                           alt="arrow down"
                        />
                     </div>
                     {isOpenFilterList && (
                        <FilterList
                           stylePosFilterList={stylePosFilterList}
                           actionFunction={actionChangeQuantityUsers}
                           currentValue={quantityUsers}
                           dataArr={quantityUsersArr}
                        />
                     )}
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default UserList