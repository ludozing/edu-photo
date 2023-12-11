import axios from "axios";
import { API_URL } from "../config/constants";

const JWT_EXPIRY_TIME = 3600 * 1000;
const initialState = {
    refTok: false,
    login: false,
};

export const setLogin = (cookies) => ({type: "LOGIN", cookies: cookies});
export const setLogout = () => ({type: "LOGOUT"});
export const setRefresh = () => ({type: "TOKENREFRESH"});

export default function authentication(state = initialState, action) {
    switch (action.type) {
        case "LOGIN":
            onLoginSuccess(action.cookies.accessToken);
            return {
                ...state,
                refTok: true,
                login: true,
            }
        case "LOGOUT":
            return {
                ...state,
                refTok: false,
                login: false,
            }
        case "TOKENREFRESH":
            if(state.refTok) {
                onSilentRefresh();
            return state;
            } else {
                return state;
            }
        default:
            return state;
    }
};

const onSilentRefresh = () => {
    axios.post(`${API_URL}/silent-refresh`)
    .then((res) => {
        onLoginSuccess(res.data);
        console.log('토큰 갱신 성공')
    })
    .catch(error => {
        // 로그인 실패 처리 안내. 재로그인 유도.
        console.log('토큰 갱신 실패:', error.response.data.error);
    })
}
const onLoginSuccess = (accessToken) => {
    // accessToken 설정
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    // accessToken 만료되기 1분 전에 로그인 연장 시도
    // setTimeout(onSilentRefresh, JWT_EXPIRY_TIME - 60000);
    setTimeout(onSilentRefresh, 1000);
}