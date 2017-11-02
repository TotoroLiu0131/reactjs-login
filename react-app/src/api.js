import axios from "axios";

export default {
    user: {
        login: credentials => 
            axios.post("/api/auth/login", { credentials }).then(res => res.data.user),
        signup: data => 
            axios.post("/api/auth/signup", { data }).then(res => res.data.user)
    }
};