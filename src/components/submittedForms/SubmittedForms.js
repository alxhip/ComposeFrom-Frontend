import React from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

class SubmittedForms extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [] }
    }
    componentDidMount() {
        let token = localStorage.getItem("token")
        axios.get(`http://localhost:8080/api/forms/submittedForms`, {
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then(res => {
                this.setState({ data: res.data })

            }).catch(error => {
                console.log(error);
            });
    }
    render() {
        return (<div>
            <table className="ui celled table" >
                <thead >
                    <tr ><th>Title</th>
                        <th  >User</th>
                    </tr></thead>
                <tbody>
                    {
                        this.state.data.map((val, idx) => {
                            return (
                                <tr key={idx}>
                                    <td ><Link to={`/submittedForms/${val.formId}`} className="btn btn-primary">{val.formTitle}</Link></td>
                                    <td >{val.username}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>)
    }
}

export default SubmittedForms;