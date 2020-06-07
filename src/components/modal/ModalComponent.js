import React from 'react';
import { Modal, TextArea } from 'semantic-ui-react'

class ModalComponent extends React.Component {


    manageForm = (event) => {
        event.preventDefault();
        let options = []
        if (event.target.one !== undefined && event.target.one.value !== "") {
            options.push(event.target.one.value);
        };
        if (event.target.two !== undefined && event.target.two.value !== "") {
            options.push(event.target.two.value);
        };
        if (event.target.three !== undefined && event.target.three.value !== "") {
            options.push(event.target.three.value);
        };
        if (event.target.four !== undefined && event.target.four.value !== "") {
            options.push(event.target.four.value);
        };
        if (this.props.state.selectedComponent !== "FormSubmit") {
            this.props.handleStateChange({ type: this.props.state.selectedComponent, title: event.target.response.value, options: options }, function () {
                this.submitForm();
            });
        }
        else {
            this.props.handleStateChange({ title: event.target.response.value, description: event.target.description.value });
        }
        this.props.handleCloseModal();
    }

    render() {
        return (
            <div>
                <Modal open={this.props.state.showModal}>
                    <Modal.Content>
                        <form className="ui form" onSubmit={this.manageForm}>
                            <div className="field">
                                <label>Title</label>
                                <input required placeholder="Title" id="response" name="response" />
                            </div>
                            {(this.props.state.selectedComponent !== "Textfield") && (this.props.state.selectedComponent !== "FormSubmit") &&
                                <div className="grouped fields">
                                    <label>Options</label>
                                    <div className="field">
                                        <input type="text" required placeholder="Option one" id="one" />
                                    </div>
                                    <div className="field">
                                        <input type="text" required placeholder="Option two" id="two" />
                                    </div>
                                    <div className="field">
                                        <input type="text" placeholder="Option three" id="three" />
                                    </div>
                                    <div className="field">
                                        <input type="text" placeholder="Option four" id="four" />
                                    </div>
                                </div>
                            }
                            {(this.props.state.selectedComponent === "FormSubmit") &&
                                <div className="field">
                                    <label>Description</label>
                                    <TextArea required placeholder="Description" id="description" name="description" />
                                </div>}
                            <button className="ui basic button" onClick={this.props.handleCloseModal}>Close</button>
                            <button type="submit" className="ui green basic button">Submit</button>
                        </form>
                    </Modal.Content>
                </Modal>
            </div>
        )
    }
}
export default ModalComponent;