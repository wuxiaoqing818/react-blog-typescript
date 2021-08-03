/*
 * @Author: 吴晓晴
 * @Date: 2021-05-22 22:29:23
 * @LastEditTime: 2021-05-22 22:34:30
 * @FilePath: \webDevelopment\blogDev\jspang-blog\react-blog\wxq-blog\src\store\app\reducer.js
 */
import {
  Map
} from 'immutable';

import * as actionTypes from './constants';

const defaultState = Map({
  topBanners: [],

});

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_TOP_BANNERS:
      return state.set("originRanking", action.originRanking);
    default:
      return state;
  }
}

export default reducer;