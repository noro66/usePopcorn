import { useState, useEffect } from "react";

export  function useLoclaStorgae(key){
 const [value, setValue] = useState(function () {
    const storeValue = localStorage.getItem(key);
    return storeValue ? JSON.parse(storeValue) : [];
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue]


}