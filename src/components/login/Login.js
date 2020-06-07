import React from 'react'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import AuthService from './AuthService'
class Login extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };

  }
  onChangeUsername = (e) => {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword = (e) => {
    this.setState({
      password: e.target.value
    });
  }
  handleLogin = (e) => {
    e.preventDefault();
    AuthService.login(this.state.username, this.state.password).then(
      () => {
        this.props.history.push("/");
      },
      error => {
        console.log(error);
      }
    );
  }

  render() {

    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            Log-in to your account
      </Header>
          <Form size='large' onSubmit={this.handleLogin}>
            <Segment stacked>
              <Form.Input fluid icon='user' required iconPosition='left' onChange={this.onChangeUsername} placeholder='Username' />
              <Form.Input
                fluid
                icon='lock'
                required
                iconPosition='left'
                placeholder='Password'
                type='password'
                onChange={this.onChangePassword}
              />

              <Button color='teal' fluid size='large' >
                Login
          </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }
}

export default Login