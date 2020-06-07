import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [] }
    }

    componentDidMount() {
        let token = localStorage.getItem("token")
        axios.get(`http://localhost:8080/api/forms`, {
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then(res => {
                this.setState({ data: res.data })

            }).catch(error => {
                console.log(error);
            });
    }

    handleDeploy = (formId) => {
        axios.put(`http://localhost:8080/api/forms/deploy/${formId}`, {}, { headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` } })
            .then(() => {
                window.location.reload();
                // NotificationManager.success('Your form is submitted successfully', 'Success', 3000);
            }).catch(error => {
                NotificationManager.error(error.response.data, 'Already submited', 3000);
            });
    }

    render() {
        return (
            <div>
                <table className="ui celled table" >
                    <thead>
                        <tr><th>Title</th>
                            <th>Description</th>
                            {localStorage.getItem("role") === "Admin" && <th>Action</th>}
                        </tr></thead>
                    <tbody>
                        {
                            this.state.data.map((val, idx) => {
                                if ((localStorage.getItem("role") === "User" && !val.deployed))
                                    return null;
                                return (
                                    <tr key={idx}>
                                        <td><Link to={`/forms/${val.id}`} test="test" className="btn btn-primary">{val.title}</Link></td>
                                        <td>{val.description}</td>
                                        {localStorage.getItem("role") === "Admin" && <td><Button basic color='green' disabled={val.deployed} onClick={() => this.handleDeploy(val.id)} >Deploy</Button>
                                        </td>}
                                    </tr>
                                )
                            }
                            )
                        }
                    </tbody>
                </table>
                <NotificationContainer />
            </div>
        )
    }
}
export default Home