import React,{FC} from 'react';

//custom Hook
const UsePrevious:FC<any>=(data):any=>{
  const ref = React.useRef();
  React.useEffect(()=>{
    ref.current = data
  }, [data])
  return ref.current
}


export default UsePrevious;
