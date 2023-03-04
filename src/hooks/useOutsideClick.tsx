import useLatest from 'use-latest';
import { useEffect } from 'react';

export const useOutsideClick = (
   elementRef: any,
   handler: any,
   attached = true) => {
   const latestHandler = useLatest(handler);

   useEffect(() => {
      if (!attached) return;

      const handlePopupClick = (e: any) => {
         if (!elementRef.current) return;

         if (!elementRef.current.contains(e.target)) {
            latestHandler.current();
         }
      };

      document.addEventListener("click", handlePopupClick);

      return () => {
         document.removeEventListener("click", handlePopupClick);
      };
   }, [elementRef, latestHandler, attached]);
}