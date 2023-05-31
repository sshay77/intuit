import { Link } from "react-router-dom";
import "./header.css"
export default function Header() {
    return (<header>
        <Link to={'/login'}>Identification</Link>
        <Link to={'/complaint'}>Submit Complaint</Link>
        <Link to={'/all-complaints'}>Customer Success</Link>
    </header>)
}