import { useState , React} from "react";
import userRoleContext from "./userRole-context";
import { Link, useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "components/Utils";
import { API_URL, axiosApi} from "helpers/api_helper"

const UserRoleState = props => {

    const [isLoading,setIsLoading] = useState(false);
    const [adminRole, setAdminRole] = useState("");
    const [accessArray, setAccessArray] = useState([]);

    const navigate = useNavigate()

  const adminLogin = async (email, password) => {
    setIsLoading(true)
    await axiosApi
      .post(`${API_URL}admin/login`, {
        emailAddress: email,
        password: password,
      })
      .then(async response => {
        //console.log(response)
        console.log("data==>>>>",response.data.data);
        if (response.data.status) {
          localStorage.setItem(
            "authUser",
            JSON.stringify(response.data.data.auth_token)
          )
          const token = JSON.parse(localStorage.getItem("authUser"))
          toastSuccess(response.data.message)
          await UserRole(token)
          if(response.data.data.role === "subadmin"){
            navigate("/")
          }else if(response.data.data.role === "superadmin"){
            navigate("/dashboard")
          }else{
            navigate("/")
          }
          
          setIsLoading(false)
        } else {
          toastError(response.data.message)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const UserRole = async event => {
    const config = {
      headers: {
        authorization: `bearer ${event}`,
      },
    }
    try {
      await axiosApi
        .post(`${API_URL}admin/user-role`, {}, config)
        .then(async response => {
          console.log(response.data.data.role)
          console.log("this is acess arry in context",response.data.data.acessArray)
          setAdminRole(response.data.data.role)
          setAccessArray(response.data.data.acessArray)
          if (response.data.success) {
            /*  toastSuccess(response.data.message) */
            console.log(response.data)
          }
          /* setIsLoading(false) */
        })
        .catch(function (error) {
          /* toastError(error) */
        })
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <userRoleContext.Provider value={{adminLogin,adminRole,UserRole,accessArray}} >
      {props.children}
    </userRoleContext.Provider>
  )
}

export default UserRoleState;
