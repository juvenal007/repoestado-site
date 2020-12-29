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
const Logout = lazy(() => import('./pages/Logout'));
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
const Usuario = lazy(() => import('./modulos/usuario/index'));
const AgregarUsuario = lazy(() => import('./modulos/usuario/components/agregar-usuario'));
const Departamento = lazy(() => import('./modulos/departamento/index'));
const TipoDocumento = lazy(() => import('./modulos/tipo-documento/index'));
const Documentos = lazy(() => import('./modulos/documento/index'));

const VerEstados = lazy(() => import('./modulos/ver-estado/index'));
const BuscarDocumentoDepartamento = lazy(() => import('./modulos/buscar-departamento/index'));
const BuscarDocumentoUsuario = lazy(() => import('./modulos/buscar-usuario/index'));
const BuscarDocumentoCodigo = lazy(() => import('./modulos/buscar-codigo/index'));




const PrivateRoute = ({ component: Component, auth, perfil, ...rest }) => {
    if (auth === null) {
        return (
            <Redirect to={{
                pathname: '/login',
            }} />
        )
    } else {
        let perfil_user = auth.usuario_tipo;
        if (perfil.includes(perfil_user)) {
            return (
                <Route {...rest} render={(props) => (
                    <Component {...props} />
                )} />
            )
        } else {
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
    '/not-found',
    '/logout'
];

const Routes = (props) => {

    let user = localStorage.getItem("user");
    user = (user === "undefined" || user === undefined) ? null : JSON.parse(user);

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
                        <Route exact path="/logout" component={waitFor(Logout)} />

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
                                    <PrivateRoute auth={user} perfil={["ADMINISTRADOR", "USUARIO"]} path="/enviar-documento" component={waitFor(EnviarDocumento)} />
                                    <PrivateRoute auth={user} perfil={["ADMINISTRADOR", "USUARIO"]} path="/recibir-documento" component={waitFor(RecibirDocumento)} />
                                    <PrivateRoute auth={user} perfil={["ADMINISTRADOR", "USUARIO"]} path="/terminar-documento" component={waitFor(TerminarDocumento)} />
                                    <PrivateRoute exact auth={user} perfil={["ADMINISTRADOR", "USUARIO"]} path="/ver-estados/:id_documento" component={waitFor(VerEstados)} />
                                    <PrivateRoute auth={user} perfil={["ADMINISTRADOR", "USUARIO"]} path="/mis-documentos" component={waitFor(MisDocumentos)} />
                                    <PrivateRoute auth={user} perfil={["ADMINISTRADOR"]} path="/administracion/usuario" component={waitFor(Usuario)} />
                                    <PrivateRoute auth={user} perfil={["ADMINISTRADOR"]} path="/administracion/usuarios/agregar-usuario" component={waitFor(AgregarUsuario)} />
                                    <PrivateRoute auth={user} perfil={["ADMINISTRADOR"]} path="/administracion/departamento" component={waitFor(Departamento)} />
                                    <PrivateRoute auth={user} perfil={["ADMINISTRADOR"]} path="/administracion/tipo-documento" component={waitFor(TipoDocumento)} />
                                    <PrivateRoute auth={user} perfil={["ADMINISTRADOR"]} path="/administracion/documentos" component={waitFor(Documentos)} />
                                    <PrivateRoute auth={user} perfil={["ADMINISTRADOR"]} path="/administracion/buscar-departamento" component={waitFor(BuscarDocumentoDepartamento)} />
                                    <PrivateRoute auth={user} perfil={["ADMINISTRADOR"]} path="/administracion/buscar-usuario" component={waitFor(BuscarDocumentoUsuario)} />
                                    <PrivateRoute auth={user} perfil={["ADMINISTRADOR"]} path="/administracion/buscar-codigo" component={waitFor(BuscarDocumentoCodigo)} />
                                
                                    <Redirect to="/404" />
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