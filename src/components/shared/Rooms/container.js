import React from 'react';
import Presenter from './presenter.js';
import api from 'api.js';
import * as PropTypes from "prop-types";


class Room extends React.Component {

    static propTypes = {
        query: PropTypes.string,
        guestCount: PropTypes.number,
        startPrice: PropTypes.number,
        endPrice: PropTypes.number,
        limit: PropTypes.number.isRequired,
        offset: PropTypes.number.isRequired,
        dispatchLoading: PropTypes.func.isRequired,
        updateApi: PropTypes.func,
        width: PropTypes.number,
    };
    static defaultProps = {
        offset: 0,
        width: 4,
        guestCount: 0,
        startPrice: 0,
        endPrice: 200000,
    };

    _isMounted = false;

    state = {
        loading: true,
        rooms: [],
    };

    _setState = state => {
        if (this._isMounted) {
            this.setState(state);
        }
    };

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount() {

        this._isMounted = true;

        const params = new URLSearchParams();
        if (this.props.query) {
            params.append('query', this.props.query);
        }
        if (this.props.guestCount) {
            params.append('capacity', this.props.guestCount.toString());
        }

        params.append('startPrice', this.props.startPrice.toString());
        params.append('endPrice', this.props.endPrice.toString());
        params.append('limit', this.props.limit.toString());
        params.append('offset', this.props.offset.toString());

        api.get(`rooms/`, {params})
           .then(response => {
               if (response.status === 200) {
                   // console.log(response);
                   this._setState({
                       rooms: this.state.rooms.concat(response.data.results),
                   });

                   if (this.props.updateApi) {
                       this.props.updateApi(response.data);
                   }

                   this.props.dispatchLoading(false);
                   this._setState({
                       loading: false,
                   });

               } else {
                   console.log(`${response.status}: ${response.statusText}`);
               }
           })
           .catch(err => console.log(err));
    }

    render() {
        return (
            <Presenter {...this.state}
                       {...this.props}/>
        );

    }
}

export default Room;