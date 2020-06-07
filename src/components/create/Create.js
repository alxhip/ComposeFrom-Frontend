import React from 'react';
import axios from 'axios';
import './Create.css'
import { Grid } from 'semantic-ui-react'
import ModalComponent from '../modal/ModalComponent'
import CreateForm from './FormCreate';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

class Create extends React.Component {
    constructor(props) {
        super(props);
        this.state = { formStructure: { elements: [] }, showModal: false, selectedComponent: "" }
        this.handleStateChange = this.handleStateChange.bind(this);
    }

    handleStateChange(value) {
        if (this.state.selectedComponent !== "FormSubmit") {
            this.setState({ formStructure: { elements: [...this.state.formStructure.elements, value] } }, function () {
            });
        }
        else {
            this.setState({ formStructure: { title: value.title, description: value.description, elements: this.state.formStructure.elements } }, function () {
                this.submitForm();
            });
        }
    }

    manageSubmitbutton = () => {
        this.setState({ formStructure: { elements: [...this.state.formStructure.elements, { type: "submit" }] } })
    }

    submitForm = () => {

        axios.post(`http://localhost:8080/api/forms`, this.state.formStructure, { headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` } })
            .then(res => {
                NotificationManager.success('Your form is submitted successfully', 'Success', 3000);
                this.clearForm();
                this.handleCloseModal();
            }).catch(error => {
                NotificationManager.error(error.reponse.data, 'Error', 3000);
            });
    }

    handleOpenModal = () => {
        this.setState({ showModal: true });
    }

    handleCloseModal = () => {
        this.setState({ showModal: false });
    }

    manageComponent = (selectedComponent) => {
        this.handleOpenModal();
        this.setState({ selectedComponent: selectedComponent });
    }

    clearForm = () => {
        this.setState({ formStructure: { title: "", description: "", elements: [] }, showModal: false, selectedComponent: "" })
    }

    render() {
        return (
            <Grid relaxed>
                <Grid.Row>
                    <Grid.Column width={4}>
                        <div>
                            <table className="ui celled table" >
                                <tbody>
                                    <tr>
                                        <td>
                                            <div >Textfield</div>
                                            <div className="ui icon button" onClick={() => this.manageComponent('Textfield')}>
                                                <i className="add icon" ></i></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>Dropdown</div>
                                            <div className="ui icon button" onClick={() => this.manageComponent('Dropdown')}>
                                                <i className="add icon" ></i></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>Checkbox</div>
                                            <div className="ui icon button" onClick={() => this.manageComponent('Checkbox')}>
                                                <i className="add icon" ></i></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>Radio</div>
                                            <div className="ui icon button" onClick={() => this.manageComponent('Radio')}>
                                                <i className="add icon" ></i></div>
                                        </td>
                                    </tr>
                                    {/* <tr>
                                        <td>
                                            <div>
                                                <div>Submit button</div>
                                                <div className="ui icon button" >
                                                    <i className="add icon"  onClick={this.manageSubmitbutton}></i>
                                                </div>
                                            </div>
                                        </td>
                                    </tr> */}
                                </tbody>
                            </table>
                            {(this.state.formStructure.elements.length > 0 &&
                                <div className="field">
                                    <button className="ui  green button" style={{ width: "100%" }} onClick={() => this.manageComponent('FormSubmit')}>Submit form</button>
                                    <button className="ui  button" style={{ width: "100%" }} onClick={() => this.clearForm()}>Clear form</button>
                                </div>
                            )}
                            <NotificationContainer />
                        </div>
                        <ModalComponent state={this.state} handleStateChange={this.handleStateChange} handleOpenModal={this.handleOpenModal} handleCloseModal={this.handleCloseModal} clearForm={this.clearForm} />
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <CreateForm state={this.state.formStructure} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>


        )
    }
}

export default Create