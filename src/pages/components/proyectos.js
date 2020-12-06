import React from 'react';
import { Progress, Card, CardHeader, CardBody, CardFooter, Table } from 'reactstrap';
import Sparkline from '../../components/Common/Sparklines';
import '../../styles/home.css';

const Proyectos = () => {


    return (
        <React.Fragment>         
                    <Card className="b">
                        <CardHeader>
                            <div className="float-right">
                                <div className="badge badge-info">started</div>
                            </div>
                            <h4 className="m-0">Project #1</h4>
                            <small className="text-muted">Sed amet lectus id.</small>
                        </CardHeader>
                        <CardBody>
                            <div className="d-flex align-items-center">
                                <div className="w-100" data-title="Health">
                                    <Progress className="progress-xs m-0" value="22" color="warning" />
                                </div>
                                <div className="wd-xxs text-right">
                                    <div className="text-bold text-muted">22%</div>
                                </div>
                            </div>
                        </CardBody>
                        <Table>
                            <tbody>
                                <tr>
                                    <td>
                                        <strong>Start date</strong>
                                    </td>
                                    <td>01/01/2016</td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Members</strong>
                                    </td>
                                    <td>
                                        <a className="inline" href="">
                                            <img className="rounded-circle thumb24 mr-1" src="img/user/02.jpg" alt="project member" />
                                        </a>
                                        <a className="inline" href="">
                                            <img className="rounded-circle thumb24 mr-1" src="img/user/04.jpg" alt="project member" />
                                        </a>
                                        <a className="inline" href="">
                                            <img className="rounded-circle thumb24 mr-1" src="img/user/05.jpg" alt="project member" />
                                        </a>
                                        <a className="inline" href="">
                                            <img className="rounded-circle thumb24 mr-1" src="img/user/06.jpg" alt="project member" />
                                        </a>
                                        <a className="inline" href="">
                                            <strong>+5</strong>
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Leader</strong>
                                    </td>
                                    <td>
                                        <a href="" title="Team leader">
                                            <img className="rounded-circle thumb24 mr-1" src="img/user/03.jpg" alt="project member" />
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Metrics</strong>
                                    </td>
                                    <td>
                                        <Sparkline values="20,80"
                                            options={{
                                                type: "pie",
                                                height: "24",
                                                sliceColors: ["#edf1f2", "#23b7e5"]
                                            }}
                                            className="sparkline inline mr-2" />
                                        <Sparkline values="60,40"
                                            options={{
                                                type: "pie",
                                                height: "24",
                                                sliceColors: ["#edf1f2", "#27c24c"]
                                            }}
                                            className="sparkline inline mr-2" />
                                        <Sparkline values="90,10"
                                            options={{
                                                type: "pie",
                                                height: "24",
                                                sliceColors: ["#edf1f2", "#ff902b"]
                                            }}
                                            className="sparkline inline" />
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                        <CardFooter className="text-center">
                            <button className="btn btn-secondary" type="button">Manage project</button>
                        </CardFooter>
                    </Card>              
        </React.Fragment>
    );
}

export default Proyectos;

