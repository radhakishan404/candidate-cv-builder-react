
import withNavigate from "../../routes/withNavigate";
import UsersContainer from "./UsersContainer";
import UsersStore from "./UsersStore.js";

export default UsersStore(withNavigate(UsersContainer));
