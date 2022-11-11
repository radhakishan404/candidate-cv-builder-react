import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setSnackBar, setUsersMeta, usersGetList, usersAdd, usersUpdate, getUniqueUsers } from "../../store/common/commonSlice";

const mapStateToProps = (state) => {
    return {
        users_data_loading: state.common.users_data_loading,
        add_loading: state.common.add_loading,
        users_data: state.common.users_data,
        users_meta: state.common.users_meta,
        users_data_count: state.common.users_data_count,
        unique_users_data: state.common.unique_users_data,
    };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        setSnackBar,
        setUsersMeta,
        usersGetList,
        usersAdd: usersAdd,
        usersUpdate: usersUpdate,
        getUniqueUsers: getUniqueUsers,
    }, dispatch);

const Store = (Container) =>
    connect(mapStateToProps, mapDispatchToProps)(Container);

export default Store;
