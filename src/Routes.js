import React, { Suspense, lazy } from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

/* loader component for Suspense*/
import PageLoader from './_framework/_helpers/PageLoader';
import Base from './_layout/Base';
import BasePage from './_layout/BasePage';
// import BaseHorizontal from './components/Layout/BaseHorizontal';

/* Used to render a lazy component with react-router */
const waitFor = Tag => props => <Tag {...props} />;




//PAGINAS
const Login = lazy(() => import('./pages/Login'));
const NotFound = lazy(() => import('./pages/NotFound'));
/* const Register = lazy(() => import('./components/Pages/Register'));
const Recover = lazy(() => import('./components/Pages/Recover'));
const Lock = lazy(() => import('./components/Pages/Lock'));
const NotFound = lazy(() => import('./components/Pages/NotFound'));
const Error500 = lazy(() => import('./components/Pages/Error500'));
const Maintenance = lazy(() => import('./components/Pages/Maintenance')); */

const HomePrincipal = lazy(() => import('./pages/HomePrincipal'));
const EnviarDocumento = lazy(() => import('./modulos/enviar-documento/index'));
const RecibirDocumento = lazy(() => import('./modulos/recibir-documento/index'));
const TerminarDocumento = lazy(() => import('./modulos/terminar-documento/index'));
const MisDocumentos = lazy(() => import('./modulos/mis-documentos/index'));




const PrivateRoute = ({ component: Component, auth, perfil, ...rest}) => {
    if(auth === null){
        return(
            <Redirect to={{
                pathname: '/login',
            }} />
        )
    }else{  
        let perfil_user = auth.usuario_tipo;
        if(perfil.includes(perfil_user)){
            return(
                <Route {...rest} render={(props) => (
                    <Component {...props} />
                )} />
            )
        }else{
            return (<Redirect to={{
                pathname: '/not-found',
            }} />
            )
        }

        
    }
}





// List of routes that uses the page layout
// listed here to Switch between layouts
// depending on the current pathname
const listofPages = [
    '/login',
    '/not-found'
];

const Routes = (props) => {

    let user = localStorage.getItem("user");
    user = (user === "undefined" || user === undefined)?null:JSON.parse(user);

    const currentKey = props.location.pathname.split('/')[1] || '/';
    const timeout = { enter: 500, exit: 500 };

    // Animations supported
    //      'rag-fadeIn'
    //      'rag-fadeInRight'
    //      'rag-fadeInLeft'

    const animationName = 'rag-fadeIn'

    if (props.location.pathname === "/") {
        props.location.pathname = "/login"
    }       
    if (listofPages.indexOf(props.location.pathname) > -1) {
        return (
            // Page Layout component wrapper
            <BasePage>
                <Suspense fallback={<PageLoader />}>
                    <Switch location={props.location}>
                        <Route path="/login" component={waitFor(Login)} /> 
                        <Route exact path="/not-found" component={waitFor(NotFound)} />    
                       {/*  <Route path="/logout" component={waitFor(Logout)} />  */}             
                    </Switch>
                </Suspense>
            </BasePage>
        )
    }
    else {
        return (
            // Layout component wrapper
            // Use <BaseHorizontal> to change layout
            <Base>
                <TransitionGroup>
                    <CSSTransition key={currentKey} timeout={timeout} classNames={animationName} exit={false}>
                        <div>
                            <Suspense fallback={<PageLoader />}>
                                <Switch location={props.location}>
                                    <Route path="/login" component={waitFor(Login)} />
                                    <PrivateRoute auth={user} perfil={["ADMINISTRADOR", "USUARIO"]} path="/home-principal" component={waitFor(HomePrincipal)} />
                                    <PrivateRoute auth={user} perfil={["ADMINISTRADOR"]} path="/enviar-documento" component={waitFor(EnviarDocumento)} />
                                    <PrivateRoute auth={user} perfil={["ADMINISTRADOR"]} path="/recibir-documento" component={waitFor(RecibirDocumento)} />
                                    <PrivateRoute auth={user} perfil={["ADMINISTRADOR"]} path="/terminar-documento" component={waitFor(TerminarDocumento)} />
                                    <PrivateRoute auth={user} perfil={["ADMINISTRADOR"]} path="/mis-documentos" component={waitFor(MisDocumentos)} />
                  
                                  {/*   <Route path="/administracion/centro-costo" component={waitFor(CentroCosto)} />
                                    <Route path="/administracion/cliente" component={waitFor(Cliente)} />     
                                    <Route path="/administracion/proveedor" component={waitFor(Proveedor)} />     
                                    <Route path="/administracion/estado" component={waitFor(Estado)} />     
                                    <Route path="/administracion/solicitud" component={waitFor(Solicitud)} />                
                                    <Route path="/administracion/cotizacion" component={waitFor(Cotizacion)} />      */}           


                                {/*     <Route exact path="/administracion/centro-costos/proyecto/:id" component={waitFor(Proyecto)} />                                   
                                    <Route exact path="/administracion/proyecto/crear-proyecto/:id" component={waitFor(CrearProyecto)} /> */}
                                
                                </Switch>
                            </Suspense>
                        </div>
                    </CSSTransition>
                </TransitionGroup>
            </Base>
        )
    }
}

export default withRouter(Routes);