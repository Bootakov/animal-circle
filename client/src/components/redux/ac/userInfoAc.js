import { ADD_USER_INFO, SET_USER_INFO } from "../types/userInfoTypes";
import axios from "axios";

export const addUserInfo =
  (email, mobile_phone, avatar, first_name, last_name, id) => async (dispatch) => {
    const userInfo = await axios.post("/user/new", {
      email,
      mobile_phone,
      avatar,
      first_name,
      last_name,
      id,
    });
    dispatch({ type: ADD_USER_INFO, payload: userInfo.data });
  };