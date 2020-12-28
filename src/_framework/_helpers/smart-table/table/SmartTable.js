
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import _ from 'lodash';
import moment from 'moment';
import { toast } from 'react-toastify';
import swal from 'sweetalert';
import {Button, Card, CardHeader, CardBody, CardTitle } from 'reactstrap';
import config from "../../../../utils/config";
import 'parsleyjs/dist/parsley.min.js';

import ModalFields from "../modals/ModalFields";
import ToolTip from "../../tooltip/ToolTip";
import GetApiData from '../../../../utils/api/index';
import { conditionsValidator } from './SmartTable.fn';


import { v4 } from "uuid";


// Datatables
require('datatables.net-bs')
require('datatables.net-bs4/js/dataTables.bootstrap4.js')
require('datatables.net-bs4/css/dataTables.bootstrap4.css')
require('datatables.net-buttons')
require('datatables.net-buttons-bs')
require('datatables.net-buttons/js/buttons.html5.js') // HTML 5 file export
require('datatables.net-buttons/js/buttons.flash.js') // Flash file export
require('datatables.net-buttons/js/buttons.print.js') // Print view button
require('datatables.net-keytable');
require('datatables.net-keytable-bs/css/keyTable.bootstrap.css')
require('jszip/dist/jszip.js');
require('pdfmake/build/pdfmake.js');
require('pdfmake/build/vfs_fonts.js');

// Se deja de ultimo para que los estilos se apliquen sobre las que vienen por defento
require('../../../../styles/custom.css');


const ItemHead = ({column,classTxt, is_pk}) => (
    <th className={classTxt} >
        {column}
    </th>
)

const FieldText = ({ value, classTxt, txtTrunc, linkTo }) => {
    if(linkTo === undefined){
        return(
        <td className={classTxt}>
            {value}
        </td>
        )
    }else{
        return(
        <td className={classTxt}>
            <Link to={linkTo}>
                {value}
            </Link>
        </td>
        )
    }
};

const FieldSwitch = ({value, classTxt}) => (
    <td className={classTxt}>
        <div className={"badge badge-" + (value === 1 || value === true ? "success" : "danger")}>
            {value === 1 || value === true ? "Sí" : "No"}
        </div>
    </td>
)

const FieldStatus = ({value, classTxt, color}) => {
    // Expresion regular para validar si el color es
    // una representacion de color hexadecimal valida
    let RegExp = /^#[0-9A-F]{6}$/i;

    if(RegExp.test(color)){
        return (
            <td className={classTxt}>
                <div className={"inline badge text-white"} style={{ backgroundColor: color }}>
                    {value}
                </div>
            </td>
        )
    }else{
        return (
            <td className={classTxt}>
                <div className={"inline badge badge-" + color}>
                    {value}
                </div>
            </td>
        )
    }
}

const FieldColor = ({value, classTxt}) => (
    <td className={classTxt}>
        <ToolTip id={'color'} placement={'top'} content={value}>
            <div className={"field-color"} style={{backgroundColor: value}}></div>
        </ToolTip>
    </td>
)

const FieldTags = ({value, classTxt, color}) => (

    <td className={classTxt}>
        {
            value.map((ele, index) =>{                

                return(<div className={`badge badge-${color} mr-1`} key={index}>{ele}</div> )
            })
        }
    </td>
    
)

class SmartTable extends Component {

    constructor(props){
        super(props);

        this.deleteClick = this.deleteClick.bind(this);

        this.tableRef = React.createRef();
    }

    /**
     * Declaracion de las propiedades del componente
     */
    static propTypes = {
        // Estilo del panel
        panelStyle: PropTypes.string,

        // Columnas de la tabla
        dtColumns:  PropTypes.array.isRequired,

        // Ruta donde esta el listado
        list_data:  PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.array
        ]).isRequired,

        // Boton para agregar nuevos registros
        add_btn:    PropTypes.object,

        // Boton para editar los registros
        edit_btn:   PropTypes.object,

        // Boton para eliminar un registro
        delete_btn: PropTypes.object,

        // Indica la clave primaria de la tabla
        pk_key:     PropTypes.string.isRequired,

        // Indica el nombre del modelo en plural
        model_p:    PropTypes.string.isRequired,

        // Indica el nombre del modelo en singular
        model_s:    PropTypes.string.isRequired,

        // Indica si se activara el datatable o sera tabla basica
        isSmart:   PropTypes.bool,

        // Acciones adicionales
        actions_custom: PropTypes.array,

        // Indica si se muestra el titulo del panel card
        titleShow: PropTypes.bool,

        // Indica si se muestra el panel card
        headerShow: PropTypes.bool,

        // spinner para el loading
        spinner: PropTypes.string,

        // Indica si se muestra el loading al consultar los datos
        showLoading: PropTypes.bool,
    }

    /**
     * Valores por defecto de algunas propiedades
     */
    static defaultProps = {
        panelStyle: 'card-default',
        dtColumns: [],
        actions_custom: [],
        isSmart: true,
        titleShow: true,
        headerShow: true,
        spinner: 'double-up',
        showLoading: true,
        edit_btn: 
            {
                title:  'Editar el registro',
                path:   '#',
                field:  'id',
                icon:   'icon-pencil',
                modal : true,
                show:   false
            },
        delete_btn: 
            {
                title:  'Eliminar registro',
                path:   '#',
                field:  'id',
                icon:   'icon-trash',
                show:   false
            },
        add_btn: 
            {
                title:  'Agregar registro',
                path:   '#',
                icon:   'icon-trash',
                modal : true,
                show:   false
            },
    }

    componentWillUpdate(nextProps){
        if(this.props.forceRefresh !== nextProps.forceRefresh){
            this.reloadDataTable();
        }
    }

    /**
     * Declaracion de variables a usar en el componente
     */
    state = {
        data: [],
        idCard: 'card-id-' + (new Date()).getTime(),
        idTable: 'table-id-' + (new Date()).getTime(),
        table: null,
        idForm: 'form-id-' + (new Date()).getTime(),
        modal: false,
        id_current : null,
        row_current: [],
        row_send: {},
        config_vars : '',
        type_modal : null,
        hasErrors : false,
        msgErrors : [],
        classWidth: '',
        classCard: '',
        classRowActive: null,
        numberButtons: 0,
        forceRefresh:this.props.forceRefresh,
        spinnerCarga: true
    }

    /**
     * Escuchador del evento click del boton editar de la tabla
     */
    handleClick = (e,key) =>
    {
        e.preventDefault();
        this.openUpdate(key);
    }

    /**
     * Activa/Desactiva el modal
     */
    toggleModal = () => {
        this.setState({
            modal: !this.state.modal,
            hasErrors : false,
            msgErrors : []
        });
    }

    /**
     * Abre el modal en modo 'edit'
     */
    openUpdate(id){
        this.setState({
            type_modal : 'update',
            id_current : id
        });
        let name_pk = this.props.pk_key;
        let detail = _.clone(_.find(this.state.data,{[name_pk]: id}));
        Object.keys(detail).forEach(function(item){
            detail[item] = (detail[item]===null)?'':detail[item];
        });
        this.setState({
            row_current : detail
        });
        this.toggleModal();
    }

    /**
     * Abre el modal en modo 'create'
     */
    openCreate(){
        this.setState({
            type_modal : 'create',
        });
        let objeto = {};
        this.props.dtColumns.forEach(function(item){
            if(!item.is_pk){
                let val = '';
                if(item.type === 'switch'){
                    val = 0;
                }
                objeto[item.field] = val;
            }
        });
        this.setState({
            row_current: objeto
        });
        this.toggleModal();
    }

    /**
     * Callback para la accion delete pidiendo confirmacion antes de ejecutarla
     */
    deleteClick(e, key) {
        e.preventDefault();
        swal({
            title: "¿Confirmar acción?",
            text: this.props.delete_btn.title,
            icon: "warning",
            dangerMode: true,
            buttons: ["Cancelar", "Eliminar"],
        })
        .then(willDelete => {
            if (willDelete) {
                let url = `${this.props.delete_btn.path}/${key}`;
                this.handleRefresh(false);
               
                GetApiData(url, 'DELETE', null, (status, data, message) => { 
                    if (status) {
                        // let msg = 'El Registro se Elimino Correctamente';
                        swal({
                            title: "Correcto.",        
                            text: message,
                            icon: "success",
                         });
                        this.reloadDataTable();
                    } else {
                        swal({
                            title: "Error.",        
                            text: message,
                            icon: "error",
                         });
                    }
                    this.handleRefresh(true);
                });
            
            }
        });
    }
    
    /**
     * Consulta del listado indicado en la propiedad 'list_data'
     */
    findAll(){
        // Mostramos el loading si esta habilitado
        if(this.props.showLoading)
            this.handleRefresh(false);

        let url = this.props.list_data;

        if(typeof url === 'string'){
            GetApiData(url, 'GET', null, (status, data, tipoMsg, msg) => { 
                if (status) {
                    this.setState({ data: data, isReady:true });
                    setTimeout(() => {
                        this.setState({
                         spinnerCarga: false
                        })
                     }, 100);
                }  else {
                    toast(msg, {
                        type: "error",
                        position: "bottom-center"
                    });
                    console.log(msg)
                }

                if(this.props.isSmart){
                    setTimeout(() => {
                        let options = _.clone(config.__DATATABLES_OPTIONS__);
                        let table = $(this.tableRef.current).DataTable(options);
                        
                        this.setState({
                            table: table
                        });
                    }, 50);
                }
                // Quitamos el loading si esta habilitado
                if (this.props.showLoading) this.handleRefresh(true);

            });
        }else{

            // Seteamos el data que viene en duro
            this.setState({ data: this.props.list_data, isReady:true });

            setTimeout(() => {
                let options = _.clone(config.__DATATABLES_OPTIONS__);
                let table = $(this.tableRef.current).DataTable(options);
                
                this.setState({
                    table: table
                });
            
                // Quitamos el loading si esta habilitado
                if (this.props.showLoading) this.handleRefresh(true);
            }, 50);
        }
    }

    handleRefresh = (done) => {
        const whirlClass = 'whirl';
        if(done){
            this.setState({
                classCard: this.props.panelStyle+' '+ this.props.spinner
            });
        }else{
            this.setState({
                classCard: this.props.panelStyle+' '+whirlClass + ' ' + this.props.spinner
            });
        }
    }

    componentDidMount(){
        let numActions = 0;
        numActions += (this.props.edit_btn.hasOwnProperty('show') && !this.props.edit_btn.show)?0:1;
        numActions += (this.props.delete_btn.hasOwnProperty('show') && !this.props.delete_btn.show)?0:1;
        numActions += this.props.actions_custom.length;
        numActions = (numActions<6)?numActions:6;
        this.setState({
            classWidth: 'headerAction-'+numActions,
            classCard: this.props.panelStyle+' '+this.state.classCard,
            numberButtons: numActions,
        });
        this.findAll();
    }

    /**
     *  Destruye la tabla y la vuelve a cargar
     **/
    reloadDataTable() {
        if(this.props.isSmart)
            this.setState({
                table : this.state.table.destroy()
            });
            
        this.findAll();
    }

    /**
     * Destruimos el datatable cuando el componente sea desmontado
     */
    componentWillUnmount() {
        if(this.props.isSmart)
            $('#'+this.state.idTable).DataTable({destroy: true});
    }
    
    onFormSuccess = (msg) => {
        this.reloadDataTable();
        msg();
    }
    
    onFormError = (msg,log) => {
        msg();
    }

    onFormClose = (state) => {
        this.toggleModal();
    }

    /**
     * Evento Customizable
     */
    eventCustom = (e, button, item, index) => {
        if(button.set_row_active){
            this.setState({
                classRowActive: index
            });
        }
        button.event(e, item);
    }
    
    render() {
        const CSS = '.btn-table { margin: 0 5px 0 0 }'; // space for buttons demo
       
        return (
            <div>
                <style>{CSS}</style>
                {
                    this.state.modal && 
                    <ModalFields 
                        fieldsList={this.props.dtColumns}
                        dataModel={this.state.row_current}
                        pk_key={'id'}
                        model_p={this.props.model_p}
                        model_s={this.props.model_s}
                        urlCreate={(this.props.add_btn.hasOwnProperty('path'))?this.props.add_btn.path:''}
                        urlUpdate={(this.props.edit_btn.hasOwnProperty('path'))?this.props.edit_btn.path:''}
                        onSucceess={this.onFormSuccess}
                        onErrors={this.onFormError}
                        onClose={this.onFormClose}
                        typeModal={this.state.type_modal}/>
                }

                <Card className={this.state.classCard} id={this.state.idCard}>
                    {(!this.props.headerShow)?
                        <div className="d-flex justify-content-end">
                        {
                            // Si esta habilitado lo mostramos
                            (this.props.add_btn.hasOwnProperty('show') && !this.props.add_btn.show) ?
                            '':
                                (this.props.add_btn.hasOwnProperty('modal') && !this.props.add_btn.modal) ?
                                <ToolTip idelement={'add'} placement={'top'} content={this.props.add_btn.title}>
                                    <Link 
                                        to={this.props.add_btn.path} 
                                        className={'btn btn-primary btn-oval'}>
                                        {this.props.add_btn.icon && <em className={this.props.add_btn.icon}></em>}
                                    </Link>
                                </ToolTip>
                                :
                                <ToolTip idelement={'add'} placement={'top'} content={this.props.add_btn.title}>
                                    <Button 
                                        outline 
                                        className="btn-oval" 
                                        color="primary" 
                                        type="button"
                                        onClick={() => this.openCreate()}>
                                        {this.props.add_btn.icon && <em className={this.props.add_btn.icon}></em>}
                                        </Button>
                                </ToolTip>
                        }
                        </div>
                    :
                    <CardHeader className={'d-flex align-items-center'}>
                        <div className="d-flex justify-content-left col">
                            {(!this.props.titleShow)?null:<CardTitle className={'h4'}>Listado de {this.props.model_p}</CardTitle>}
                        </div>
                        <div className="d-flex justify-content-end">
                            {
                                // Si esta habilitado lo mostramos
                                (this.props.add_btn.hasOwnProperty('show') && !this.props.add_btn.show) ?
                                '':
                                    (this.props.add_btn.hasOwnProperty('modal') && !this.props.add_btn.modal) ?
                                    <ToolTip idelement={'add'} placement={'top'} content={this.props.add_btn.title}>
                                        <Link 
                                            to={this.props.add_btn.path} 
                                            className={'btn btn-primary btn-oval'}>
                                            {this.props.add_btn.icon && <em className={this.props.add_btn.icon}></em>}
                                        </Link>
                                    </ToolTip>
                                    :
                                    <ToolTip idelement={'add'} placement={'top'} content={this.props.add_btn.title}>
                                        <Button 
                                            outline 
                                            className="btn-oval" 
                                            color="primary" 
                                            type="button"
                                            onClick={() => this.openCreate()}>
                                            {this.props.add_btn.icon && <em className={this.props.add_btn.icon}></em>}
                                            </Button>
                                    </ToolTip>
                            }
                            
                        </div>
                    </CardHeader>
                    }
                    <CardBody>
                        {/* <ToastContainer /> */}
                        <table
                            ref = {this.tableRef} 
                            className="table table-striped table-bordered table-hover" 
                            id={this.state.idTable}>
                            <thead>
                                <tr>
                                {
                                    this.props.dtColumns.map((item, i) => {
                                        let show = (item.hasOwnProperty('show'))?item.show:true;
                                        if(show){
                                            let class_txt = item.align;
                                            if (!class_txt) {
                                                class_txt = 'text-left';
                                            }
                                            if(item.hasOwnProperty("noSort") && item.noSort){
                                                class_txt += ' no-sort';
                                            }
                                            if(item.type==='switch'){
                                                class_txt += ' headerSwitch';
                                            }
                                            if(item.is_pk){
                                                class_txt += ' headerPK';
                                            }
                                            if(item.hasOwnProperty("filter") && item.filter === "rut"){
                                                class_txt += ' column-rut';
                                            }
                                            return (
                                                <ItemHead column={item.title} classTxt={class_txt} key={i}/>
                                            )
                                        }
                                        return null;
                                    })
                                }
                                {
                                    this.state.numberButtons > 0 && <th className={("text-center no-sort ")+this.state.classWidth}></th> 
                                }
                                </tr>
                            </thead>

                            <tbody>
                            {
                                this.state.data.map((item, i) => {
                                    let key_edit = item[this.props.edit_btn.field];
                                    let key_del = item[this.props.edit_btn.field];
                                    return (
                                    <tr key={i} className={(this.state.classRowActive === i)?'table-success':''}>
                                        {
                                            this.props.dtColumns.map((col, e) => {
                                                let show = (col.hasOwnProperty('show'))?col.show:true;
                                                let txtTrunc =(col.hasOwnProperty('truncate'))?col.truncate:{lines:0}; 
                                                if(show){
                                                    let type = col.type;
                                                    let val = item[col.field];
                                                    
                                                    if(col.hasOwnProperty('deep') && col.deep !== ''){
                                                        const empty = (col.hasOwnProperty('empty') && col.empty !== '')?col.empty:"N/D";
                                                        val = _.get(item,`${col.deep}.${col.field}`, empty);
                                                    }
                                                    let class_txt = 'dt-nowrap ';
                                                    class_txt += col.align;
                                                    let linkTo = undefined;
                                                    let new_date = "";
                                                    if(col.hasOwnProperty('isLinkable') && col.isLinkable && col.hasOwnProperty('linkPath') && col.linkPath && col.hasOwnProperty('linkField') && col.linkField){
                                                        linkTo = col.linkPath + '/' + item[col.linkField]
                                                    }
                                                    switch (type) {
                                                        case 'foreignAjax':
                                                            val = item[col.field_description];
                                                            return (<FieldText value={val} key={e} classTxt={class_txt} txtTrunc={txtTrunc} linkTo={linkTo}/>)
                                                        case 'foreign':
                                                            val = item[col.field_description];
                                                            return (<FieldText value={val} key={e} classTxt={class_txt} txtTrunc={txtTrunc} linkTo={linkTo}/>)
                                                        case 'color':
                                                            val = (val==='')?'#fff':val;
                                                            class_txt += ' text-center';
                                                            return (<FieldColor value={val} key={e} classTxt={class_txt}/>);
                                                        case 'switch':
                                                            return (<FieldSwitch value={val} key={e} classTxt={class_txt}/>)
                                                        case 'status':
                                                            let color = item[col.field_color];
                                                            return (<FieldStatus value={val} key={e} classTxt={class_txt} color={color}/>)
                                                        case 'tags':
                                                            let color2 = col.color;
                                                            val = !isNaN(val)?val.toString():val;
                                                            return(<FieldTags value={val.split(',')} key={e} classTxt={class_txt} color={color2}/>);
                                                        case 'foreignMulti':
                                                            val = item[col.field_description];
                                                            return(<FieldTags value={val.split(',')} key={e} classTxt={class_txt}/>);
                                                        case "date":
                                                            new_date = "";
                                                            if(val !== null){
                                                                new_date = moment(val);
                                                                new_date = new_date.format('DD/MM/YYYY');
                                                            }  
                                                            return (
                                                                <FieldText
                                                                    value={new_date}
                                                                    key={e}
                                                                    classTxt={class_txt}
                                                                    txtTrunc={txtTrunc}
                                                                    linkTo={linkTo}
                                                                    />
                                                            );
                                                        case "datetime":
                                                            new_date = "";
                                                            if(val !== null){
                                                                new_date = moment(val);
                                                                new_date = new_date.format('DD/MM/YYYY HH:mm:ss');
                                                            }  
                                                            return (
                                                                <FieldText
                                                                    value={new_date}
                                                                    key={e}
                                                                    classTxt={class_txt}
                                                                    txtTrunc={txtTrunc}
                                                                    linkTo={linkTo}
                                                                    />
                                                            );
                                                        default:
                                                            return (<FieldText value={val} key={e} classTxt={class_txt} txtTrunc={txtTrunc} linkTo={linkTo}/>)
                                                    }
                                                }
                                                return null;
                                            })
                                        }
                                        {this.state.numberButtons > 0 && 
                                        <td className={("text-right ")+this.state.classWidth}>
                                            {
                                                this.props.actions_custom.map((it_act,ind) => {
                                                    let idFk = item[it_act.field_fk];
                                                    let type_act = (it_act.hasOwnProperty('type'))?it_act.type:'link';

                                                    if(it_act.hasOwnProperty("condition") && !conditionsValidator(it_act.condition, item)){
                                                        return null;
                                                    }

                                                    switch (type_act) {
                                                        case 'event':
                                                            return (
                                                                <span key={ind}>
                                                                <ToolTip id={v4()} idelement={'event'} placement={'top'} content={it_act.title}>
                                                                    <button
                                                                        onClick={(e) => this.eventCustom(e,it_act,item,i)}
                                                                        className={'text-white btn-table btn btn-xs btn-'+it_act.color}>
                                                                        {it_act.icon && <em className={it_act.icon}></em>}
                                                                    </button>
                                                                </ToolTip>
                                                                </span>
                                                            )
                                                        case 'external':
                                                            return (
                                                                <span key={ind}>
                                                                <ToolTip id={v4()} idelement={'event'} placement={'top'} content={it_act.title}>
                                                                    <a 
                                                                        href={`${it_act.path}/${idFk}`}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className={'btn-table btn btn-xs btn-'+it_act.color}>
                                                                        {it_act.icon && <em className={it_act.icon}></em>}
                                                                    </a>
                                                                </ToolTip>
                                                                </span>
                                                            )
                                                        default:
                                                            return (
                                                                <span key={ind}>
                                                                <ToolTip id={v4()} idelement={'event'} placement={'top'} content={it_act.title}>
                                                                    <Link
                                                                        to={it_act.path+`/${idFk}`} 
                                                                        className={'btn-table btn btn-xs btn-'+it_act.color}>
                                                                        {it_act.icon && <em className={it_act.icon}></em>}
                                                                    </Link>
                                                                </ToolTip>
                                                                </span>
                                                            )
                                                    }
                                                    
                                                })
                                            }

                                            {/* Boton Edit */}
                                            {this.props.edit_btn.hasOwnProperty('condition') && !conditionsValidator(this.props.edit_btn.condition, item)?(""):
                                            this.props.edit_btn.hasOwnProperty('show') && !this.props.edit_btn.show ?
                                            (''):this.props.edit_btn.hasOwnProperty('modal') && !this.props.edit_btn.modal ? (
                                                <ToolTip  id={v4()} idelement={'edit'} placement={'top'} content={this.props.edit_btn.title}>
                                                    <Link to={this.props.edit_btn.path+'/'+key_edit} className={'btn-table btn btn-xs btn-info'}>
                                                        {this.props.edit_btn.icon && <em className={this.props.edit_btn.icon}></em>}
                                                    </Link>
                                                </ToolTip>
                                                ): (
                                                <ToolTip id={v4()} idelement={'edit'} placement={'top'} content={this.props.edit_btn.title}>
                                                    <button className='btn-table btn btn-xs btn-info text-white' 
                                                        onClick={(e) => this.handleClick(e, key_edit)}>
                                                        {this.props.edit_btn.icon && <em className={this.props.edit_btn.icon}></em>}
                                                    </button>
                                                </ToolTip>
                                                )
                                            }

                                            {/* Boton Delete */}
                                            {this.props.delete_btn.hasOwnProperty('condition') && !conditionsValidator(this.props.delete_btn.condition, item)?(""):
                                            this.props.delete_btn.hasOwnProperty('show') && !this.props.delete_btn.show ? 
                                            (""):(
                                                <ToolTip id={v4()} idelement={'delete'} placement={'top'} content={this.props.delete_btn.title}>
                                                    <button 
                                                        onClick={(e) =>this.deleteClick(e, key_del)} 
                                                        className="btn-table btn btn-xs btn-warning text-white">
                                                            <em className={this.props.delete_btn.icon}></em>
                                                    </button>
                                                </ToolTip>
                                                )
                                            }
                                        </td>
                                        }
                                    </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

export default SmartTable;