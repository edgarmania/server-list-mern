import React, { Component } from 'react'
import api from '../api'

import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const CheckBox = styled.input.attrs({
    className: 'checkbox',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`, 
})`
    margin: 15px 15px 15px 5px;
`
const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`


class ServerInsert extends Component {
    constructor(props) {
        super(props)

        this.state = {
            hostname: '',
            os: '',
            used: false,
            user: '',
        }
    }
    
    handleChangeInputHostname = async event => {
        const hostname = event.target.value
        this.setState({ hostname })
    }

    handleChangeOs = async event => {
        const os = event.target.value
        this.setState({ os })
    }

    handleChangeUsed = async event => {
        const used = event.target.checked
        this.setState({ used })
    }

    handleChangeUser = async event => {
        const user = event.target.value
        this.setState({ user })
    }

    handleIncludeServer = async () => {
        const { hostname, os, used, user } = this.state
        const payload = { hostname, os, used, user}

        await api.insertServer(payload).then(res => {
            window.alert('Server added successfully')
            this.setState({
                hostname: '',
                os: '',
                used: false,
                user: '',
            })
        })
    }

    render() {
        const { hostname, os, used, user } = this.state
        return(
            <Wrapper>
                <Title>Create Server</Title>
                <Label>Hostname:</Label>
                <InputText type="text" value={hostname} onChange={this.handleChangeInputHostname}/>

                <Label>OS:</Label>
                <InputText type="text" value={os} onChange={this.handleChangeOs}/>

                <Label>Reserve:</Label>
                <CheckBox type="checkbox" name="used" onChange={this.handleChangeUsed} checked={used} />

                <Label>Reserved for user:</Label>
                <InputText type="text" value={user} onChange={this.handleChangeUser}/>

                <Button onClick={this.handleIncludeServer}>Add Server</Button>
                <CancelButton href={'/servers/list'}>Cancel</CancelButton>              

            </Wrapper>
        )
    }
}

export default ServerInsert