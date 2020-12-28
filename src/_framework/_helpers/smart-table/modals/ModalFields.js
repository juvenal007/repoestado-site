/* Detecta SpA - CMMS Seguridad Electrónica
 *
 * archivo de entrada, con definicion de parametros generales
 *  
 * Version: 1.0.0
 * Author: @fullconectados
 */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Button } from 'reactstrap';

// Imports tools custom
import InputColor from '../inputs-form/InputColor';
import InputField from '../inputs-form/InputField';
import SelectReact from '../inputs-form/SelectReact';
import InputDate from '../inputs-form/InputDate';
import InputSwitch from '../inputs-form/InputSwitch';
import swal from 'sweetalert';
import moment from 'moment';

import GetApiData from '../../../../utils/api/index';
import 'parsleyjs/dist/parsley.min.js';
import 'parsleyjs/dist/i18n/es';

import Swal from 'sweetalert2/dist/sweetalert2.js'



import 'sweetalert2/src/sweetalert2.scss'

class ModalFields extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.form = React.createRef();
    }

    /**
     * Declaracion de las propiedades del componente
     */
    static propTypes = {
        // Columnas de la tabla
        fieldsList: PropTypes.array.isRequired,

        // Registro activo
        dataModel: PropTypes.object.isRequired,

        // Indica la clave primaria de la tabla
        pk_key: PropTypes.string.isRequired,

        // Indica el nombre del modelo en singular
        model_s: PropTypes.string.isRequired,

        // Url para crear un registro
        urlCreate: PropTypes.string.isRequired,

        // Url para actualizar un registro
        urlUpdate: PropTypes.string.isRequired,

        // triggers when form is submited with success
        onSucceess: PropTypes.func,

        // triggers when form is submited with fails
        onErrors: PropTypes.func,

        // triggers when modal is closed
        onClose: PropTypes.func,

        // Indica el tipo de modal (Create or Update)
        typeModal: PropTypes.string.isRequired,

        // Indica el tema de colores a pintar
        setTheme: PropTypes.string,
    }

    /**
     * Valores por defecto de algunas propiedades
     */
    static defaultProps = {
        dataModel: [],
        fieldsList: [],
        pk_key: null,
        pk_key2: null,
        model_s: '',
        setTheme: '',
    }

    /**
     * Declaracion de variables a usar en el componente
     */
    state = {
        data: null,
        idForm: 'form-id-' + (new Date()).getTime(),
        modal: true,
        id_current: null,
        row_send: {},
        config_vars: '',
        type_modal: this.props.typeModal,
        hasErrors: false,
        msgErrors: {},
        typeError: 1, // 1=Error data, 2= Error SQLException
        isPrepared: false,
        classSizeModal: '',
        classSizeFieldset: '12',
        errors: {},
        
    }

    componentDidMount() {
        let num_fields = 0;
        let classSizeModal = '';
        let classSizeFieldset = '12';

        this.props.fieldsList.map((item, i) => {
            let modal_add = (item.hasOwnProperty('showAdd')) ? item.showAdd : true;
            let is_showable = (!modal_add && this.state.type_modal === 'create') ? true : false;
            if ((item.is_pk || item.no_edit || is_showable)) {

            } else {
                num_fields++;
            }
            return null;
        });
        if (num_fields > 5) {
            classSizeModal = 'modal-lg';
            classSizeFieldset = '6';
        }
        if (num_fields > 10) {
            classSizeModal = 'modal-lg';
            classSizeFieldset = '4';
        }
        this.setState({
            data: _.clone(this.props.dataModel),
            isPrepared: true,
            classSizeModal: classSizeModal,
            classSizeFieldset: classSizeFieldset
        });


    }

    /**
     * Escuchador de cambios en los input
     */
    handleChange = (e, props, value) => {
        let prop = props;
        let type = prop.type;
        let valor = '';
        switch (type) {
            case 'foreignAjax':
                if (value === 'undefined' || value === null) {
                    valor = (e === null) ? '' : e.value;
                } else {
                    valor = value;
                }
                break;
            case 'foreign':
                if (value === 'undefined' || value === null) {
                    valor = (e === null) ? '' : e.value;
                } else {
                    valor = value;
                }
                break;
            case 'foreignMulti':
                if (value === 'undefined' || value === null) {
                    valor = (e === null) ? '' : e.value;
                } else {
                    valor = value;
                }
                break;
            case 'color':
                if (value === 'undefined' || value === null) {
                    valor = e.hex;
                } else {
                    valor = value;
                }
                break;
            case 'date':
                let format_d = (prop.hasOwnProperty('format_d')) ? prop.format_d : 'YYYY-MM-DD';
                let format_t = (prop.hasOwnProperty('format_t')) ? prop.format_t : 'HH:mm';
                let format = (!format_d) ? '' : format_d;

                format += (!format_t) ? '' : ' ' + format_t;

                if (value === 'undefined' || value === null) {
                    valor = moment(new Date(e._d)).format(format);
                } else {
                    valor = e.format(format);
                }
                break;
            case 'time':
                format = (prop.hasOwnProperty('format_t')) ? prop.format_t : 'HH:mm:ss';

                if (value === 'undefined' || value === null) {
                    valor = moment(new Date(e._d)).format(format);
                } else {
                    valor = e.format(format);
                }
                break;
            case 'switch':
                if (value === 'undefined' || value === null) {
                    valor = (value) ? 1 : 0;
                } else {
                    valor = (e.target.checked) ? 1 : 0;
                }
                break;
            default:
                valor = e.target.value;
                break;
        }
        let datos = this.state.data;
        datos[prop.field] = valor;
        this.setState({
            data: datos
        });
    }

    hasError = (inputName) => {
        return this.state.errors && this.state.errors[inputName];
    }

    /**
     * Activa/Desactiva el modal
     */
    toggleModal = () => {
        this.setState({
            modal: !this.state.modal,
            hasErrors: false,
            msgErrors: []
        });
    }


    /**
     * Ejecuta el envio del formulario
     */
    submitForm(e) {
        e.preventDefault();
        const instance = $('#' + this.state.idForm).parsley({
            errorsContainer: function (el) {
                return el.$element.closest('.form-group');
            },
            errorClass: 'is-invalid',
            locale: 'es'
        });
        // instance.setLocale('es');

        instance.validate();
        // Validamos los select
        let valido = true;
        this.props.fieldsList.map((item) => {
            if (item.type === 'foreign' || item.type === 'foreignAjax' || item.type === 'foreignMulti') {
                if (item.hasOwnProperty('isRequired') && item.isRequired) {
                    valido = this.state.data[item.field] !== '';
                    this.setState({
                        errors: {
                            ...this.state.errors,
                            [item.field]: this.state.data[item.field] !== ''
                        }
                    });
                }
            }
            return null;
        });
        if (!instance.isValid())
            return null;

        if (!valido)
            return null;

        if (this.state.type_modal === 'create') {
            this.createModel();
        } else {

            let id_key = this.state.data[this.props.pk_key];
            this.updateModel(id_key);
        }
    }

    /**
     * Prepara los datos a enviar
     */
    setPrepareData(id) {
        let condition = "!item.is_pk  && !item.no_edit";
        if (id !== null) {
            condition = "!item.is_pk"
        }
        let copia = {};
        this.props.fieldsList.forEach(item => {
            if (condition) {
                switch (item.type) {
                    case 'date':
                        // let format_d = (item.hasOwnProperty('format_d'))?item.format_d:'YYYY-MM-DD';
                        let new_value = "";
                        if (this.state.data[item.field] !== "") {
                            new_value = moment(this.state.data[item.field]);
                            new_value = new_value.format("YYYY-MM-DD");
                        }
                        copia[item.field] = new_value
                        break;
                    case 'time':
                        let format_t = (item.hasOwnProperty('format_t')) ? item.format_t : 'HH:mm';
                        let new_value_t = "";
                        if (this.state.data[item.field] !== "") {
                            new_value_t = moment(this.state.data[item.field], format_t);
                            new_value_t = new_value_t.format(format_t);
                        }
                        copia[item.field] = new_value_t
                        break;

                    default:
                        copia[item.field] = this.state.data[item.field]
                        break;
                }
            }
        });
        return copia;

    }

    /**
     * Crear un nuevo registro
     */
    createModel() {        
        let data = this.setPrepareData();
        let url = this.props.urlCreate;

        this.handleRefresh(true);

        GetApiData(url, 'POST', data, (status, data, message, re) => {
            console.log(status, data, message, re);
            if (status) {
                // Emitimos el mensaje de que todo esta ok

                const msgSuccess = () => {
                    swal({
                        title: "Correcto",
                        text: message,
                        icon: "success"
                     })
                }

                this.props.onSucceess(msgSuccess);
                this.toggleModal();
            } else {

                if (re.hasOwnProperty("type_error") && re.type_error === 'validation_error') {
                    this.setState({
                        hasErrors: true,
                        msgErrors: data,//Mensaje de Error " Dato Incorrecto"
                        typeError: 1
                    });
                } else {
                    this.setState({
                        hasErrors: true,
                        msgErrors: message,
                        typeError: 2
                    });
                }
            }
            this.handleRefresh(false);
        });
    }

    /**
     * Actualizar el registro
     */
    updateModel(id) {

        let data = this.setPrepareData(id);
        let url = `${this.props.urlUpdate}/${id}`;

        this.handleRefresh(true);

        GetApiData(url, 'PUT', data, (status, data, message, re) => {
            if (status) {             
                // Emitimos el mensaje de que todo esta ok
                const msgSuccess = () => {
                    swal({
                        title: "Correcto.",        
                        text: message,
                        icon: "success",
                     });
                }
                console.log('ACTUALIZANDO');
                this.props.onSucceess(msgSuccess);
                this.toggleModal();
            } else {
                if (re.hasOwnProperty("type_error") && re.type_error === 'validation_error') {
                    this.setState({
                        hasErrors: true,
                        msgErrors: data,//Mensaje de Error " Dato Incorrecto"
                        typeError: 1
                    });
                } else {
                    this.setState({
                        hasErrors: true,
                        msgErrors: message,
                        typeError: 2
                    });
                }
            }
            this.handleRefresh(false);
        });
    }

    closeModal = () => {
        this.props.onClose(false);
    }

    handleRefresh = done => {
        const whirlClass = "whirl";
        if (!done) {
            this.setState({
                classCard: "double-up"
            });
        } else {
            this.setState({
                classCard: whirlClass + " double-up"
            });
        }
    };

    render() {
        const ErrorMsg = () => {
            if (this.state.typeError === 2) {
                return (
                    <div className="messages">
                        <div className="alert alert-danger">
                            <strong>Error interno</strong>
                            <pre>{JSON.stringify(this.state.msgErrors, null, 2)}</pre>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="messages">
                        <div className="alert alert-danger">
                            <strong>Información faltante</strong>
                            <ul>
                                {
                                    Object.keys(this.state.msgErrors).map((i) => {
                                        return (<li key={i}>{this.state.msgErrors[i]} </li>)
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                )
            }
        }

        return (
            <Fragment>
                {this.state.isPrepared &&

                    <Modal
                        isOpen={this.state.modal}
                        toggle={this.toggleModal}
                        onClosed={this.closeModal}
                        backdrop={'static'}
                        className={this.state.classSizeModal + ' ' + this.state.classCard}
                    >
                        <ModalHeader toggle={this.toggleModal} className={this.props.setTheme}>
                            {(this.state.type_modal === 'create') ? 'Crear ' : 'Editar '}{this.props.model_s}
                        </ModalHeader>
                        <ModalBody>
                            {this.state.hasErrors && <ErrorMsg />}
                            {this.state.data !== null &&
                                <form
                                    className="form-horizontal"
                                    id={this.state.idForm}
                                    noValidate
                                    method="get"
                                    data-parsley-validate=""
                                    action="#" onSubmit={(e) => this.submitForm(e)}
                                    autoComplete={'off'}
                                    ref={this.form}
                                >
                                    <div className={'row'}>
                                        {
                                            this.props.fieldsList.map((item, i) => {
                                                let type = item.type;
                                                let title = (item.title);
                                                let field = item.field;
                                                let required = (item.hasOwnProperty('isRequired') && item.isRequired) ? true : false;
                                                let propsCustom = (item.hasOwnProperty('propsC')) ? item.propsC : {};
                                                let modal_add = (item.hasOwnProperty('showAdd')) ? item.showAdd : true;
                                                let is_showable = (!modal_add && this.state.type_modal === 'create') ? true : false;
                                                let filter = (item.hasOwnProperty('filter')) ? item.filter : '';
                                                let css_required = required ? ' field-required' : ''
                                                if (item.hasOwnProperty('only_add') && item.only_add && this.state.type_modal === 'update') {
                                                    type = 'display';
                                                }
                                                if (item.hasOwnProperty('no_show_edit') && item.no_show_edit && this.state.type_modal === 'update') {
                                                    return '';
                                                }
                                                if ((item.is_pk || item.no_edit || is_showable)) {
                                                    return '';
                                                } else {
                                                    switch (type) {
                                                        case 'foreignAjax':
                                                            return (
                                                                <FormGroup key={i} className={`col-md-${this.state.classSizeFieldset}`}>
                                                                    <label className={css_required}>{title}</label>

                                                                    <SelectReact
                                                                        defaultValue={this.state.data[field]}
                                                                        options={this.state.data[item.list_list]}
                                                                        fields={item.list}
                                                                        item={item}
                                                                        event={this.handleChange}
                                                                        isValid={this.hasError(field)}
                                                                        isRequired={required}
                                                                        name={field}
                                                                        isSearchable={false}
                                                                    />
                                                                </FormGroup>
                                                            )
                                                        case 'foreign':
                                                            return (
                                                                <FormGroup key={i} className={`col-md-${this.state.classSizeFieldset}`}>
                                                                    <label className={css_required}>{title}</label>
                                                                    <SelectReact
                                                                        defaultValue={this.state.data[field]}
                                                                        options={item.list}
                                                                        item={item}
                                                                        event={this.handleChange}
                                                                        isRequired={required}
                                                                        isValid={this.hasError(field)}
                                                                        name={field}
                                                                        isSearchable={false}
                                                                    />
                                                                </FormGroup>
                                                            )
                                                        case 'foreignMulti':
                                                            return (
                                                                <FormGroup key={i} className={`col-md-${this.state.classSizeFieldset}`}>
                                                                    <label className={css_required}>{title}</label>
                                                                    <SelectReact
                                                                        defaultValue={this.state.data[field]}
                                                                        options={item.list}
                                                                        item={item}
                                                                        event={this.handleChange}
                                                                        isRequired={required}
                                                                        isValid={this.hasError(field)}
                                                                        name={field}
                                                                        isSearchable={false}
                                                                        isMulti={true}
                                                                    />
                                                                </FormGroup>
                                                            )
                                                        case 'color':
                                                            let val = (this.state.data[field] === null || this.state.data[field] === '') ? '#fff' : this.state.data[field];
                                                            return (
                                                                <FormGroup key={i} className={`col-md-${this.state.classSizeFieldset}`}>
                                                                    <label className={css_required}>{title}</label>
                                                                    <InputColor
                                                                        color={val}
                                                                        key={i}
                                                                        item={item}
                                                                        event={this.handleChange}
                                                                        iconSize={"fa-1x"}
                                                                        name={field}
                                                                        isRequired={required}
                                                                    />
                                                                </FormGroup>
                                                            )
                                                        case 'switch':
                                                            return (
                                                                <FormGroup key={i} className={`col-md-${this.state.classSizeFieldset}`}>
                                                                    <label className={css_required}>{title}</label>
                                                                    <InputSwitch
                                                                        item={item}
                                                                        event={this.handleChange}
                                                                        isChecked={(this.state.data[field] === 1 || this.state.data[field] === true)}
                                                                        name={field}
                                                                        {...propsCustom}
                                                                    />
                                                                </FormGroup>
                                                            )
                                                        case 'display':
                                                            return (
                                                                <FormGroup key={i} className={`col-md-${this.state.classSizeFieldset}`}>
                                                                    <label className={css_required}>{title}</label>
                                                                    <InputField
                                                                        value={this.state.data[field]}
                                                                        onChange={(e) => this.handleChange(e, item)}
                                                                        disabled={true}
                                                                        name={field}
                                                                        {...propsCustom}
                                                                    />
                                                                </FormGroup>
                                                            )
                                                        case 'date':
                                                            let format_d = (item.hasOwnProperty('format_d')) ? item.format_d : 'YYYY-MM-DD';
                                                            let format_t = (item.hasOwnProperty('format_t')) ? item.format_t : 'hh:mm';
                                                            let new_value = "";
                                                            if (this.state.data[field] !== "") {
                                                                console.log(format_d)
                                                                new_value = moment(this.state.data[field]);
                                                                new_value = new_value.format(format_d);
                                                            }

                                                            return (
                                                                <FormGroup key={i} className={`col-md-${this.state.classSizeFieldset}`}>
                                                                    <label className={css_required}>{title}</label>
                                                                    <InputDate
                                                                        dateFormat={format_d}
                                                                        timeFormat={format_t}
                                                                        defaultValue={new_value}
                                                                        event={this.handleChange}
                                                                        item={item}
                                                                        isRequired={required}
                                                                        showIcon={true}
                                                                        name={field}
                                                                        allowEdit={true}
                                                                        // type={2}
                                                                        {...propsCustom}
                                                                    />
                                                                </FormGroup>
                                                            )
                                                        case 'time':
                                                            format_t = (item.hasOwnProperty('format_t')) ? item.format_t : 'hh:mm:ss';
                                                            let new_value_t = "";
                                                            if (this.state.data[field] !== "") {
                                                                new_value_t = moment(this.state.data[field], format_t);
                                                                new_value_t = new_value_t.format(format_t);
                                                            }
                                                            return (
                                                                <FormGroup key={i} className={`col-md-${this.state.classSizeFieldset}`}>
                                                                    <label className={css_required}>{title}</label>
                                                                    <InputDate
                                                                        dateFormat={false}
                                                                        timeFormat={format_t}
                                                                        defaultValue={new_value_t}
                                                                        event={this.handleChange}
                                                                        item={item}
                                                                        isRequired={required}
                                                                        showIcon={true}
                                                                        name={field}
                                                                        iconClass={'fa fa-clock'}
                                                                        {...propsCustom}
                                                                    />
                                                                </FormGroup>
                                                            )
                                                        case 'textarea':
                                                            return (
                                                                <FormGroup key={i} className={`col-md-${this.state.classSizeFieldset}`}>
                                                                    <label className={css_required}>{title}</label>
                                                                    <InputField
                                                                        type='textarea'
                                                                        onChange={(e) => this.handleChange(e, item)}
                                                                        isRequired={required}
                                                                        defaultValue={this.state.data[field]}
                                                                        name={field}
                                                                        filter={filter}
                                                                        {...propsCustom}
                                                                    >
                                                                    </InputField>
                                                                </FormGroup>
                                                            )
                                                        case 'number':
                                                            return (
                                                                <FormGroup key={i} className={`col-md-${this.state.classSizeFieldset}`}>
                                                                    <label className={css_required}>{title}</label>
                                                                    <InputField
                                                                        type='number'
                                                                        onChange={(e) => this.handleChange(e, item)}
                                                                        isRequired={required}
                                                                        defaultValue={this.state.data[field]}
                                                                        name={field}
                                                                        filter={filter}
                                                                        {...propsCustom}
                                                                    >
                                                                    </InputField>
                                                                </FormGroup>
                                                            )

                                                        default:
                                                            return (
                                                                <FormGroup key={i} className={`col-md-${this.state.classSizeFieldset}`}>
                                                                    <label className={css_required}>{title}</label>
                                                                    <InputField
                                                                        filter={filter}
                                                                        type={filter === 'password' ? filter : type}
                                                                        value={this.state.data[field]}
                                                                        onChange={(e) => this.handleChange(e, item)}
                                                                        isRequired={required}
                                                                        name={field}
                                                                        {...propsCustom}
                                                                    />
                                                                </FormGroup>
                                                            )
                                                    }
                                                }
                                            })
                                        }
                                    </div>
                                </form>
                            }
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                className="btn-labeled"
                                color="primary"
                                type="button"
                                onClick={(e) => this.submitForm(e)}
                            >
                                <span className="btn-label">
                                    <em className="fas fa-save" />
                                </span>
                        Grabar
                    </Button>
                            <Button color="secondary" onClick={this.toggleModal}>Cancelar</Button>
                        </ModalFooter>

                    </Modal>
                }
            </Fragment>
        )
    }
}

export default ModalFields;
