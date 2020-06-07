import React from 'react';

class CreateForm extends React.Component {

    render() {
        return (
            <div>
                {
                    this.props.state.elements.map((val) => {
                        let componentType = val.type;
                        if (componentType === "Textfield") {
                            return (
                                <div className="formContainer">
                                    <div className="field">
                                        {val.title}
                                        <b></b>
                                    </div>
                                    <div className="ui input"><input disabled type="text" placeholder="" /></div>
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
                                        <select onChange={this.handleChange} style={{ width: "45%", marginLeft: "2px" }}>
                                            <option disabled selected value> -- select an option -- </option>
                                            {val.options.map((option) => {
                                                return (
                                                    <option value={option}>{option}</option>
                                                )
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
                                    {val.options.map((option, indx) => {
                                        return (
                                            <div className="field">
                                                <div className="ui checkbox">
                                                    <input type="checkbox" disabled className="hidden" name={option} tabIndex={indx} />
                                                    <label>{option}</label>
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
                                    {val.options.map((option, indx) => {
                                        return (
                                            <div className="field">
                                                <div className="ui radio checkbox">
                                                    <input type="radio" disabled className="hidden" name={option} tabIndex={indx} value={option} />
                                                    <label>{option}</label>
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
                        //             <button className="ui button" type="submit" onClick={this.submitForm}>Submit</button>
                        //         </div>
                        //     )
                        // }
                    })
                }
            </div>
        )
    }
};

export default CreateForm