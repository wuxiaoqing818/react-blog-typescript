import React from "react";
import userStore from "./user";

// 这里我们注意需要使用createContext
const StoresContext = React.createContext({
    userStore,
});

export default StoresContext;