/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const getUsers = async () => {
    const response = await axios.get("http://localhost:8080/user");
    console.log('response: ', response);
    return response.data.data;
};
