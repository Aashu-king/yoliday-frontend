/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const getUsers = async () => {
    const response = await axios.get("https://yoliday-backend-hm1v.onrender.com/user");
    console.log('response: ', response);
    return response.data.data;
};
