import {createContext,useReducer} from "react";
import { AuthReducer } from "./authReducer";

const initial_state = {
    user:{"_id":"6375f61f276ecc9ecd672209","userName":"Virat Kohli","email":"virat@gmail.com","password":"$2a$10$F3IFN/UHCH4wRAvjiYGvJeNp5Mdqmg9DohBy4Ub9LBDuldiNp/INq","confirmPassword":"$2a$10$F3IFN/UHCH4wRAvjiYGvJeNp5Mdqmg9DohBy4Ub9LBDuldiNp/INq","coverImg":"https://ik.imagekit.io/ksaehdhru/login_form/196625091_341873790638388_3521525491325525978_n_5BX5IUYsx.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1668683193630","profileImg":"https://ik.imagekit.io/ksaehdhru/312918202_1731340347238208_6533109107618200402_n_Tq92XP0bZ.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1668187553526","followers":["637a24bf51a79b2fd4626997"],"followings":["6375f607276ecc9ecd672205","637a2ce39130d2ddeb6cb989","637ccae3ab95d1882a68fcf9"],"isAdmin":false,"createdAt":{"$date":{"$numberLong":"1668675103036"}},"updatedAt":{"$date":{"$numberLong":"1669179609223"}},"__v":{"$numberInt":"0"}},
    isFetching:false,
    error:false,
}

export const AuthContext = createContext(initial_state)

export const AuthContextProvider = ({children}) =>{
    const [state,dispatch] = useReducer(AuthReducer,initial_state)

return(
    <AuthContext.Provider value={{user : state.user, isFetching : state.isFetching,error : state.eror , dispatch}}>
       {children}
    </AuthContext.Provider>
)
}