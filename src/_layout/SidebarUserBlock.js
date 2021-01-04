import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'reactstrap';

import { connect } from 'react-redux';

class SidebarUserBlock extends Component {

    state = {
        showUserBlock: true,
        user : ''
    }

    componentDidMount()
    {
        this.setState({
            user : JSON.parse(localStorage.getItem("user"))
        })
    }

    componentWillReceiveProps(newProps) {
        if (newProps.showUserBlock !== this.props.showUserBlock) {
            this.setState({ showUserBlock: newProps.showUserBlock })
        }
    }

    

    render() {
        return (
            <Collapse id="user-block" isOpen={ this.state.showUserBlock }>
                <div>
                    <div className="item user-block">
                       {/* User picture */}
                       <div className="user-block-picture">
                          <div className="user-block-status">
                             <img className="img-thumbnail rounded-circle" src="img/user/02.jpg" alt="Avatar" width="60" height="60" />
                             <div className="circle bg-success circle-lg"></div>
                          </div>
                       </div>
                       {/* Name and Job */}
                       <div className="user-block-info">
                          <span className="user-block-name">{`${this.state.user.usuario_nombre} ${this.state.user.usuario_ape_paterno}`}</span>
                          <span className="user-block-role">{`${this.state.user.usuario_tipo}`}</span>
                       </div>
                    </div>
                </div>
            </Collapse>
        )
    }
}

SidebarUserBlock.propTypes = {
    showUserBlock: PropTypes.bool
};

const mapStateToProps = state => ({ showUserBlock: state.settings.showUserBlock })

export default connect(
    mapStateToProps
)(SidebarUserBlock);