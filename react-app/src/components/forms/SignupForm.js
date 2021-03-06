import React, { Component } from 'react';
import PropTypes from "prop-types";
import {Form, Button, Message, Input, Icon, Grid} from "semantic-ui-react";
import Validator from "validator" ;
import { Link } from "react-router-dom";
import InlineError from "../messages/InlineError";


class SignupForm extends Component {
    state = {
        data :{
            email : "",
            password : "",
            confirmpassword: ""
        },
        loading :false ,
        errors : {}
    }

    onchange = (e) => {
        this.setState({
            data : { ...this.state.data , [e.target.name] : e.target.value}
        })
    };

    onSubmit = () => {
        const errors = this.validate(this.state.data);
        this.setState({errors});
        if (Object.keys(errors).length === 0 ){
            this.setState({loading:true});
            this.props
                .submit(this.state.data)
                .catch(err => 
                    this.setState({errors : err.response.data.errors ,loading: false})
                );
        }
    };
    
    validate = (data) => {
        const errors = {};
        if (!Validator.isEmail(data.email)) errors.email = "Email格式不符合";
        if (!data.password || !Validator.isLength(data.password, 4, 16)) errors.password = "請輸入4~16位元密碼";
        if (!data.confirmpassword || !Validator.isLength(data.confirmpassword, 4, 16)) errors.confirmpassword = "請輸入4~16位元密碼";
        if (data.password !== data.confirmpassword) errors.confirmpassword = "確認密碼錯誤"
        return errors
    };

    render() {
        const { errors, loading } = this.state ;
        return (
            <div>
                <Grid
                    textAlign='center'
                    style={{ height: '100%' }}
                    verticalAlign='middle'
                >
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Message 
                            attached
                            header='歡迎加入！'
                            content='請輸入您的Email和密碼'
                        />
                        <Form 
                            className='attached fluid segment' 
                            onSubmit={this.onSubmit} 
                            loading={loading}
                            size='large'
                        >
                            {errors.global && (
                                <Message negative>
                                    <Message.Header>{ errors.global }</Message.Header>
                                </Message> 
                            )}
                            <Form.Field error={!!errors.email}>
                                <Input 
                                    type="email" 
                                    name="email" 
                                    icon='user'
                                    iconPosition='left'
                                    placeholder="example@mail.com"
                                    onChange={this.onchange}
                                />
                                {errors.email && <InlineError text={errors.email} />}
                            </Form.Field>
                            <Form.Field error={!!errors.password}>
                                <Input 
                                    type="password" 
                                    name="password" 
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder="Password"
                                    onChange={this.onchange}
                                />
                                {errors.password && <InlineError text={errors.password} />}
                            </Form.Field>
                            <Form.Field error={!!errors.confirmpassword}>
                                <Input 
                                    type="password" 
                                    name="confirmpassword" 
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder="Password"
                                    onChange={this.onchange}
                                />
                                {errors.confirmpassword && <InlineError text={errors.confirmpassword} />}
                            </Form.Field>
                            <Button color='teal' fluid size='large'>登入</Button>
                        </Form>
                        <Message attached='bottom' warning>
                            <Icon name="vcard"/>
                            已經是會員了嗎?&nbsp;&nbsp;<Link to="/">登入</Link>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

SignupForm.propTypes = {
    submit: PropTypes.func.isRequired
  };
  
export default SignupForm;