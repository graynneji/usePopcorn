import { useEffect } from "react";
//React team also called the useEffect hook an escape hatch
 
export function useKey (key, action){
      useEffect(
        function () {
          function callback(e) {
            if (e.code.toLowerCase() === key.toLowerCase()) {
              action();
            }
          }
          document.addEventListener("keydown", callback);
          return function () {
            document.removeEventListener("keydown", callback);
          };
        },
    
        [action, key]
      );
  }