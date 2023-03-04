import { FC, useRef, useState } from "react"
import FilterList from "../FilterList"

import styles from './Filter.module.sass'
import deleteImg from '../../assets/images/delete-img.png'
import React from "react"
import { useOutsideClick } from "../../hooks/useOutsideClick"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../store"


const Filter = React.forwardRef<HTMLDivElement, { currentValue: string | null, actionFunction: (e: any) => any, filterName: string, dataArr: string[] }>(({ currentValue, actionFunction, filterName, dataArr }, ref) => {
   const dispatch = useDispatch<AppDispatch>()
   const [isOpenFilterList, setOpenFilterList] = useState(false)

   const onCloseFilterList = () => {
      setOpenFilterList(false)
   }
   useOutsideClick(ref, onCloseFilterList, isOpenFilterList);

   const stylePosFilterList = { top: '40px', left: '0' }

   return (
      <div className={styles.filterWrapper}
      >
         <div
            className={styles.filterTitle}
            ref={ref}
            onClick={() => setOpenFilterList(true)}
         >
            <p>
               {filterName}
               {currentValue && ` equal `}
               <span className={styles.filterSelected}>{currentValue}</span>
            </p>
            {currentValue && (
               <img
                  src={deleteImg}
                  className={styles.filterDelete}
                  alt="delete"
                  onClick={() => dispatch(actionFunction(null))}
               />
            )}
         </div>
         {isOpenFilterList && (
            <FilterList
               stylePosFilterList={stylePosFilterList}
               dataArr={dataArr}
               actionFunction={actionFunction}
               currentValue={currentValue}
            />
         )}
      </div>
   )
})

export default Filter