import { Link } from "react-router-dom";
import Header from "../../features/header";
import PropTypes from "prop-types";

Login.propTypes = {
    user: PropTypes.object,
    handleUserChange: PropTypes.func,
};

export default function Login({ user, handleUserChange }) {

    const existingUsersIds = [
        "a93adc57-4d59-4a9d-85c6-b5d48d99101d",
        "a872d86a-c7cb-48b7-b5d9-f218d6845405",
        "dcb6a039-b0fc-49dd-b5de-58856f66727d",
        "bbbb080d-cffa-46d0-aa22-786c35d1a35b",
        "f22dff3f-06cf-49fe-97ec-bf7afe9a7fdb",
        "72dddc34-f058-4d31-b370-e88f772ea8e8",
        "a90f6dd7-b74b-4be6-9065-daa1a92ba7ab",
        "a227c2bd-358a-4587-95f0-61fb63678952",
        "8145b0d6-feb2-4ff6-8546-c0a5eece6f82"
    ];

    return (
        <>
            <Header />
            <label>
                Mock login (choose from existing users):
                <select value={user.id} onChange={handleUserChange}>
                    <option value="">none</option>
                    {existingUsersIds.map((id, i) => (
                        <option value={id} key={i}>{id}</option>
                    ))}
                </select>
            </label>

            <div className="user">
                <div>user name: {user.fullName} </div>
                <div>email: {user.emailAddress}</div>
            </div>

            <Link to={'/complaint'}>submit complaint</Link>
        </>
    )
}