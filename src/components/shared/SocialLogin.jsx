import React, { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const SocialLogin = () => {

    const {googleLogin} = useContext(AuthContext)

    const handleGoogleLogin =()=>{
        googleLogin()
        .then((result) => {
            const user = result.user;
           console.log(user);
          }).catch((error) => {
           console.log(error);
          });
      }
  return (
    <div className="flex flex-col items-center mb-6 w-full border-opacity-50">
      <div className="divider">OR</div>
      <button onClick={handleGoogleLogin} className="btn btn-circle btn-outline">G</button>
    </div>
  );
};

export default SocialLogin;
