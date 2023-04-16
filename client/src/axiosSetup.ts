import axios from "axios";
import {toast} from "react-toastify"

axios.interceptors.response.use((res) => res, err => {
    if(err.response.status === 401){
        localStorage.setItem("token", "");
        toast.error("You are unauthorised. Please login again.")
        setTimeout(() => {
            window.location.href = "/"
            window.location.reload();
        }, 2000);
    }
})