import React from 'react';
import getApi from '../utils/api/index';

class Logout extends React.Component {

	componentDidMount(){
		let url = 'logout';
		getApi(url,"LOGOUT",null, (status, data, msg) => {
            if(status){
                this.props.history.push(`/login`)
            }else{
                console.log(msg)
            }
        });
	}
	render(){
		return (
			<div className="abs-center mt-5">
			<div className="text-center my-3">
				<h1 className="mb-3">
					<sup>
						<em className="fa fa-cog fa-2x text-muted fa-spin text-info"></em>
					</sup>
					<em className="fa fa-cog fa-5x text-muted fa-spin text-purple"></em>
					<em className="fa fa-cog fa-lg text-muted fa-spin text-success"></em>
				</h1>
				<div className="text-bold text-lg mb-3">Cerrando Sesión</div>
				<p className="lead m-0">RepoEstado V0.2</p>
			</div>
		</div>
		);
	}
}


export default Logout;
