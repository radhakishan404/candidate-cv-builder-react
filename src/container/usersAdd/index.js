import withNavigate from "../../routes/withNavigate";
import UsersAddContainer from "./UsersAddContainer";
import UsersAddStore from "./UsersAddStore.js";

export default UsersAddStore(withNavigate(UsersAddContainer));