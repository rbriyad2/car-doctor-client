import React, { useContext } from 'react';
import loginanimation from '../../assets/images/login/login.svg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import SocialLogin from '../../components/shared/SocialLogin';


const Login = () => {
  const navigate = useNavigate()
    const {signIn}= useContext(AuthContext)
    const location = useLocation()
    let from = location.state?.from?.pathname || '/';

    const handleLogin =event =>{
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        signIn(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
           console.log(user)
           navigate(from, {replace: true})

          })
          .catch((error) => {
            console.log(error)
          });
        console.log(email, password)
    }

   
    return (
        <div className="hero min-h-screen bg-base-200">
  <div className="hero-content">
    <div className="text-center lg:text-left">
      <img src={loginanimation} alt="" />
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm gap-10 shadow-2xl bg-base-100">
      <form className="card-body" onSubmit={handleLogin}>
      <h1 className="text-3xl text-center font-bold">Login</h1>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" className="input input-bordered" name='email' required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" className="input input-bordered" name='password' required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
        <p>New to this Car Doctors? <Link to='/signup'>SignUp</Link></p>
      </form>
<SocialLogin></SocialLogin>
    </div>
  </div>
</div>
    );
};

export default Login;