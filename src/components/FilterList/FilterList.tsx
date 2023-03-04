import React from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../store"
import styles from './FilterList.module.sass'


const FilterList = React.forwardRef<HTMLDivElement, { stylePosFilterList: {}, dataArr: number[] | string[], currentValue: string | null, actionFunction: (e: any) => any }>(({ dataArr, currentValue, actionFunction, stylePosFilterList }, ref) => {

   const dispatch = useDispatch<AppDispatch>()

   const onClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLDivElement
      dispatch(actionFunction(target.innerText))
   }

   return (
      <div
         style={stylePosFilterList}
         className={styles.filterList}
      >
         <div className={(dataArr.length > 6)
            ? `${styles.filterListWrap} overflowYScroll`
            : styles.filterListWrap}
         >
            {dataArr.map(item => {
               return (
                  <div
                     key={item}
                     className={item === currentValue
                        ? `${styles.filterListItem} ${styles.active}`
                        : styles.filterListItem}
                     onClick={(e) => onClickHandler(e)}
                  >
                     {item}
                  </div>
               )
            })}
         </div>
      </div>
   )
})

export default FilterList