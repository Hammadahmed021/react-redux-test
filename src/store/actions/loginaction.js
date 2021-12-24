import logintypes from "../types/logintypes";
import { baseUrl } from "../../services/BaseUrl";
import API from "../../services/API";
// import React , {useState } from 'react';
// import UseLoader from '../../component/UseLoader';

// export function _login(obj) {
//     console.log('obj',obj)
//     return dispatch => {
//         fetch(baseUrl+'user/login',
//             {
//                 method: 'POST',
//                 body: obj,
//             },
//         )
//         .then((response) => response.json())
//         .then((responseJson) => {
//             console.log('responseJson',responseJson)
//             dispatch({ type: logintypes.lOGINSUCESS, payload: responseJson })
//         })
//         .catch((err) => {
//             console.log(err)
//             dispatch({ type: logintypes.lOGINERROR, payload: null })
//         })
//     }
// }

export const _login = (obj) => async (dispatch) => {
  try {
    const res = await API.post(baseUrl + "user/login", obj);
    console.log("res", res);
    localStorage.setItem("token", JSON.stringify(res.data.token));

    dispatch({
      type: logintypes.lOGINSUCESS,
      payload: res,
    });
  } catch (e) {
    dispatch({
      type: logintypes.lOGINERROR,
      payload: console.log(e),
    });
  }
};
