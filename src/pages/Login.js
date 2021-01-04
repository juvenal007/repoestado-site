import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, CustomInput } from 'reactstrap';
import { toast } from 'react-toastify';

import 'parsleyjs/dist/parsley.min.js';

import getApi from '../utils/api/index';
import swal from 'sweetalert';
import 'sweetalert2/src/sweetalert2.scss'



class Login extends Component {

    state = {
        formLogin: {
            usuario: 'admin',
            password: 'admin'
        },
        show: true

    }

    

     /**
      * Validate input using onChange event
      * @param  {String} formName The name of the form in the state object
      * @return {Function} a function used for the event
      */

     cargaEstadosCodigo = () => {
        if (!this.state.show) {
          return `card card-flat whirl double-up`;
    
        }
        else {
          return 'card card-flat';
        }
      }
     componentDidMount() {
   
     }


    validateOnChange = event => {
        const input = event.target;
        const form = input.form
        const value = input.type === 'checkbox' ? input.checked : input.value;

        // const result = FormValidator.validate(input);

        this.setState({
            [form.name]: {
                ...this.state[form.name],
                [input.name]: value,
                // errors: {
                //     ...this.state[form.name].errors,
                //     [input.name]: result
                // }
            }
        });      

    }

    onSubmit = e => {

        e.preventDefault();    
        this.setState({show: false});
        let usuario = this.state.formLogin.usuario.toLowerCase().trim();
        let password = this.state.formLogin.password;

        let url = 'login';
        // this.detailsLoading(true);
        
        getApi(url, "LOGIN", { usuario, password }, (status, data, msg) => {
            console.log(status, data, msg);
            if (status) {       
                    this.setState({show: true});
                    this.props.history.push(`home-principal`);               
            } else {
                console.log(msg)
                this.setState({show: true});
                this.setState( {formLogin: {
                    usuario: '',
                    password: ''
                }});
                swal({
                    title: 'Datos Incorrectos',
                    text: 'Verifique sus credenciales',
                    icon: "error",
                  });


            }
            // this.detailsLoading(false);
            console.log(status, data, msg);
        }, true);
    }

    /* Simplify error check */
    hasError = (formName, inputName, method) => {
        return  this.state[formName] &&
                this.state[formName].errors &&
                this.state[formName].errors[inputName] &&
                this.state[formName].errors[inputName][method]
    }
    
    render() {
        return (
            <div className="block-center mt-5 wd-xl">
                <div className={this.cargaEstadosCodigo()}>
                    <div className="card-header text-center bg-dark">
                        <a href="">
                            <img className="block-center rounded" src="img/logo.png" alt="Logo"/>
                        </a>
                    </div>
                    <div className="card-body">
                        <p className="text-center py-2">INICIAR SESIÓN.</p>
                        <form className="mb-3" name="formLogin" onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <div className="input-group with-focus">
                                    <Input type="text"
                                        name="usuario"
                                        className="border-right-0"
                                        placeholder="Ingrese Usuario"
                                        // invalid={this.hasError('formLogin','email','required')||this.hasError('formLogin','email','email')}
                                        onChange={this.validateOnChange}                                        
                                        value={this.state.formLogin.usuario}/>
                                    <div className="input-group-append">
                                        <span className="input-group-text text-muted bg-transparent border-left-0">
                                            <em className="fa fa-envelope"></em>
                                        </span>
                                    </div>
                                    { this.hasError('formLogin','usuario','required') && <span className="invalid-feedback">Campo requerido</span> }
                                    { this.hasError('formLogin','usuario') && <span className="invalid-feedback">Username debe ser válido</span> }
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group with-focus">
                                    <Input type="password"
                                        id="id-password"
                                        name="password"
                                        className="border-right-0"
                                        placeholder="Contraseña"
                                        invalid={this.hasError('formLogin','password','required')}
                                        onChange={this.validateOnChange}
                                        data-validate='["required"]'
                                        value={this.state.formLogin.password}
                                    />
                                    <div className="input-group-append">
                                        <span className="input-group-text text-muted bg-transparent border-left-0">
                                            <em className="fa fa-lock"></em>
                                        </span>
                                    </div>
                                    <span className="invalid-feedback">Campo requerido</span>
                                </div>
                            </div>
                            <div className="clearfix">
                                <CustomInput type="checkbox" id="rememberme"
                                    className="float-left mt-0"
                                    name="remember"
                                    label="Recordar">
                                </CustomInput>
                                <div className="float-right">
                                    <Link to="recover" className="text-muted"></Link>
                                </div>
                            </div>
                            <button className="btn btn-block btn-primary mt-3" type="submit">Iniciar</button>
                        </form>
                       {/*  <p className="pt-3 text-center"></p>
                        <Link to="register" className="btn btn-block btn-secondary"></Link> */}
                    </div>
                </div>
                <div className="p-3 text-center">
                    <span className="mr-2">&copy;</span>
                    <span>2020</span>
                    <span className="mx-2">-</span>
                    <span>RepoEstado v0.2</span>
                    <br/>
                    <span>Sistema documental.</span>
                </div>
            </div>
        );
    }
}

export default Login;
