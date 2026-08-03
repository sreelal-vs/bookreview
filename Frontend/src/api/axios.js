import axios from "axios";

const instance = axios.create({
    baseURL:`${import.meta.env.VITE_BASEURL}/api/v1/`
});

export default instance;