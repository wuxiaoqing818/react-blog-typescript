/*
 * @Author: 吴晓晴
 * @Date: 2021-05-22 22:17:54
 * @LastEditTime: 2021-05-22 22:33:17
 * @FilePath: \webDevelopment\blogDev\jspang-blog\react-blog\wxq-blog\src\store\reducer.js
 */
import {
  combineReducers
} from 'redux-immutable';


import {
  reducer as appReducer
} from './app';

const cReducer = combineReducers({
  app: appReducer,
});

export default cReducer;