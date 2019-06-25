import React from 'react';
import styles from './styles.scss';
import Rooms from "components/shared/Rooms/container.js";
import {ReactComponent as ArrowRight} from "svg/arrowRight.svg";
import * as PropTypes from "prop-types";
import {Link} from "react-router-dom";

const Presenter = props => {
    return (
        <div className={styles.container}>
            <header className={styles.header}>{props.title}</header>
            <Rooms city={props.city}
                   limit={8}
                   dispatchLoading={props.dispatchLoading}
                   updateApi={props.updateApi}/>
            <Link to={`${props.city}/rooms`} style={{textDecoration: 'none'}}>
                <footer className={styles.footer}>
                    {`모두 보기(${props.count}개 이상)`}
                    <span style={{marginLeft: `10px`}}>
                    <ArrowRight/>
                </span>
                </footer>
            </Link>
        </div>
    );
};

Presenter.propTypes = {
    title: PropTypes.string,
    city: PropTypes.string,
    dispatchLoading: PropTypes.func,
    count: PropTypes.number,
    updateApi: PropTypes.func,
};

export default Presenter;



