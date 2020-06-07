import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
    login(username, password) {
        return axios
            .post(API_URL + "signin", {
                username,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    const token = response.data.accessToken;
                    const jwtDecode = require('jwt-decode');
                    var decoded = jwtDecode(token);
                    localStorage.setItem("username", decoded.sub);
                    localStorage.setItem("user_id", decoded.jti);
                    localStorage.setItem("role", decoded.scopes[0]);
                    localStorage.setItem("token", token);
                }
                return response.data;
            });
    }

    logout() {
        localStorage.clear();
    }
}

export default new AuthService();