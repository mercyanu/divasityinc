import React from 'react';
import './signin.styles.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

class SignIn extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const { email, password} = this.state;

        try{
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({
                email: '',
                password: ''
            })
        }
        catch(error){
            console.log(error);
            if(error.code === "auth/user-not-found"){
                alert("Invalid username or password");
            }
        }
        
        this.setState({email: '', password: ''});
    }

    handleChange = event => {
        const {name, value} = event.target; //destructure name and value from any passed html elememt

        this.setState({[name]: value}); //dynamically set the state key with [name] placeholder and assigns new value
    }

    render(){
        return(
            <div className='sign-in'>
                <h2>Sign in  to continue shopping!</h2>

                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                    name='email' 
                    type='email' 
                    value={this.state.email} 
                    label="Email Address"
                    handleChange={this.handleChange}
                    required/>
                    <FormInput 
                    name='password' 
                    type='password' 
                    value={this.state.password} 
                    label="Password"
                    handleChange={this.handleChange}
                    required/>

                    <div className='buttons'>
                    <CustomButton type='submit'>
                        Sign in
                    </CustomButton>
                    <div className='or'> OR</div>
                    <CustomButton onClick={signInWithGoogle} isGoogleSignIn >
                        Sign in with Google
                    </CustomButton>

                    </div>
                </form>

            </div>
        );
    }
}

export default SignIn;