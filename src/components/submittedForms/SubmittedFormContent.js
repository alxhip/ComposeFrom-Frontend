import React from 'react'
import axios from 'axios';

class SubmittedFormContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [] }
    }
    componentDidMount() {
        let formId = this.props.match.params.formId;
        let token = localStorage.getItem("token")
        axios.get(`http://localhost:8080/api/forms/submittedForms/${formId}`, {
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
                <thead>
                    <tr><th>Question</th>
                        <th>Answer</th>
                    </tr></thead>
                <tbody>
                    {
                        this.state.data.map((component, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{component.componentTitle}</td>
                                    <td>{component.value}</td>

                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>)
    }
}

export default SubmittedFormContent;