import React from 'react';
import axios from 'axios';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

class FormComplete extends React.Component {

    constructor(props) {
        super(props);
        this.state = { formStructure: {}, isLoaded: false }
    }

    componentDidMount() {
        let formId = this.props.match.params.formId;
        axios.get(`http://localhost:8080/api/forms/${formId}`, { headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` } })
            .then(res => {
                this.setState({ formStructure: { title: res.data.title, description: res.data.description, elements: res.data.components }, isLoaded: true }, () => {
                })
            }).catch(error => {
                console.log(error);
            });
    }

    handleChange = (e, key) => {
        let inputValue = e.target.value;
        this.setState((prevState) => {
            return {
                formStructure: {
                    title: this.state.formStructure.title,
                    description: this.state.formStructure.description,
                    elements: prevState.formStructure.elements.map((task) => {
                        if (task.id === key) {
                            return { ...task, value: inputValue };
                        } else {
                            return task;
                        }
                    }),
                }, isLoaded: true
            }
        }
        )
    }

    submitForm = (e) => {
        e.preventDefault()
        //prepare the request object
        let componentList = [];
        this.state.formStructure.elements.map(component => {
            componentList.push({ componentId: component.id, value: component.value })
        })
        let response = {
            form_id: this.props.match.params.formId,
            user_id: localStorage.getItem("user_id"),
            elements: componentList.map(element => {
                return ({
                    component_id: element.componentId,
                    value: element.value
                })


            })
        }
        axios.post(`http://localhost:8080/api/forms/submit`, response, { headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` } })
            .then(res => {
                NotificationManager.success('Your form is submitted successfully', 'Success', 3000);
                // this.props.history.push("/");
            }).catch(error => {
                NotificationManager.error(error.response.data, 'Already submitted', 5000);
            });

    }
    render() {
        return (
            this.state.isLoaded &&
            <div>
                <form onSubmit={this.submitForm}>
                    {
                        this.state.formStructure.elements.map((val, idx) => {
                            let componentType = val.componentType.type;
                            if (componentType === "Textfield") {
                                return (
                                    <div className="formContainer" key={idx}>
                                        <div className="field">
                                            {val.title}
                                            <b></b>
                                        </div>
                                        <div className="ui input"><input type="text" required name={val.id} onChange={(e) => this.handleChange(e, val.id)} /></div>
                                    </div>
                                )
                            }
                            else if (componentType === "Dropdown") {
                                return (
                                    <div className="formContainer">
                                        <div className="field">
                                            {val.title}
                                            <b></b>
                                        </div>
                                        <div className="field" >
                                            <select  onChange={(e) => this.handleChange(e, val.id)}>
                                                <option disabled selected value> -- select an option -- </option>
                                                {val.componentContent.map((component) => {
                                                    return (<option value={component.option}>{component.option}</option>)
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                )
                            }
                            else if (componentType === "Checkbox") {
                                return (
                                    <div className="formContainer">
                                        <div className="field">
                                            {val.title}
                                            <b></b>
                                        </div>
                                        {val.componentContent.map((component, indx) => {
                                            return (
                                                <div className="field">
                                                    <div className="ui checkbox">
                                                        <input type="checkbox" value={component.option} onChange={(e) => this.handleChange(e, val.id)} tabIndex={indx} />
                                                        <label>{component.option}</label>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            }
                            else if (componentType === "Radio") {
                                return (
                                    <div className="formContainer">
                                        <div className="field">
                                            {val.title}
                                            <b></b>
                                        </div>
                                        {val.componentContent.map((component, indx) => {
                                            return (
                                                <div className="field">
                                                    <div className="ui radio checkbox">
                                                        <input type="radio" required value={component.option} name={val.componentType.id} onChange={(e) => this.handleChange(e, val.id)} tabIndex={indx} />
                                                        <label>{component.option}</label>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            }
                            // else if (componentType === "submit") {
                            //     return (
                            //         <div>
                            //             <button className="ui button" type="submit" >Submit</button>
                            //         </div>
                            //     )
                            // }
                        })
                    }
                    <div className="field" style={{ textAlign: "center" }}>
                        <button className="ui green button" >Submit form</button>
                    </div>
                </form>
                <NotificationContainer />
            </div >
        )
    }
};

export default FormComplete