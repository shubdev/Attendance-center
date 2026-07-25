import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation, useRegisterMutation, useLogoutMutation } from "../api/auth.api.js";
import { toast } from "react-hot-toast"
import { setUser } from "../auth.slice.js"


export default function useAuth() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();
    const [login, { isLoading: isLoginLoading }] = useLoginMutation();
    const [logout] = useLogoutMutation();


    const handleRegister = async (data) => {
        try {
            const result = await register(data).unwrap();
            toast.success(result?.message);
            if (result?.data?.accessToken) {
                localStorage.setItem("token", result.data.accessToken);
            }
            if (result?.data?.user) {
                dispatch(setUser(result.data.user));
            }
            navigate("/");
        } catch (error) {
            console.log(error);
            toast.error(error?.data?.message);
        }
    }


    const handleLogin = async (data) => {
        try {
            const result = await login(data).unwrap();
            toast.success(result?.message);
            if (result?.data?.accessToken) {
                localStorage.setItem("token", result.data.accessToken);
            }
            if (result?.data?.user) {
                dispatch(setUser(result.data.user));
            }
            navigate("/");
        } catch (error) {
            console.log(error);
            toast.error(error?.data?.message);
        }
    }

    const handleSetUser = async (data) => {
        dispatch(setUser(data))
    }


    const handleLogout = async () => {
        try {
            await logout().unwrap();
        } catch (error) {
            console.log(error);
        } finally {
            localStorage.removeItem("token");
            dispatch(setUser(null));
            toast.success("Logged out successfully");
            navigate("/login");
        }
    };


    return { handleRegister, handleLogin, handleSetUser, isRegisterLoading, isLoginLoading, handleLogout }
}