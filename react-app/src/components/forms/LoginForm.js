import React, {Component} from "react";
import PropTypes from "prop-types";
import {Form, Button, Message, Input, Icon} from "semantic-ui-react";
import { Link } from "react-router-dom";
import Validator from "validator" ;
import InlineError from "../messages/InlineError";

class LoginForm extends Component{
    state = {
        data: {
            email: "",
            password: ""
        },
        loading: false,
        errors : {}
    }

    onchange = (e) => {
        this.setState({
            data : { ...this.state.data , [e.target.name] : e.target.value}
        })
    };

    onSubmit = () => {
        const errors = this.validate(this.state.data);
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            this.setState({ loading: true });
            this.props
                .submit(this.state.data)
                .catch(err =>{
                    this.setState({ errors: err.response.data.errors, loading: false })}
            );
        }
    };

    validate = (data) => {
        const errors = {};
        if (!Validator.isEmail(data.email)) errors.email = "Email格式不符合";
        if (!data.password || !Validator.isLength(data.password, 4, 16)) errors.password = "請輸入8~16位元密碼";
        return errors
    };

    render(){
        const { errors, loading} = this.state ;
        return(
            <div>
                <Message 
                    attached
                    header='歡迎回來！'
                    content='請登入您的Email和密碼'
                />
                <Form 
                    className='attached fluid segment' 
                    onSubmit={this.onSubmit} 
                    loading={loading}
                >
                    {errors.global && (
                        <Message negative>
                            <Message.Header>{ errors.global }</Message.Header>
                        </Message> 
                    )}
                    <Form.Field error={!!errors.email}>
                        <label htmlFor="email">Email</label>
                        <Input 
                            type="email" 
                            id="email" 
                            name="email" 
                            placeholder="example@mail.com"
                            onChange={this.onchange}
                        />
                        {errors.email && <InlineError text={errors.email} />}
                    </Form.Field>
                    <Form.Field error={!!errors.password}>
                        <label htmlFor="password">密碼</label>
                        <Input 
                            type="password" 
                            id="password" 
                            name="password" 
                            placeholder=""
                            onChange={this.onchange}
                        />
                        {errors.password && <InlineError text={errors.password} />}
                    </Form.Field>
                    <Button primary >登入</Button>
                </Form>
                <Message attached='bottom' warning>
                    <Icon name="user plus"/>
                    還沒有成為會員嗎?&nbsp;&nbsp;<Link to="/signup">註冊</Link>
                </Message>
            </div>
        );
    }
}

LoginForm.propTypes = {
    submit: PropTypes.func.isRequired
};
  
export default LoginForm;