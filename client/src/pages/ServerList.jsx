import React, { Component } from 'react'
import ReactTable from 'react-table-6'
import Moment from 'moment'
import api from '../api'

import styled from 'styled-components'

import 'react-table-6/react-table.css'

const Wrapper = styled.div`
    padding: 40px 40px 40px 40px;
`

//const Update = styled.div`
//    color: #ef9b0f;
//    cursor: pointer;
//`

const Update = styled.button.attrs({
    className: `btn btn-primary`
})``

//const Delete = styled.div`
const Delete = styled.a.attrs({
    className: `btn btn-danger`,
})``
//    color: #ff0000;
//    cursor: pointer;
//`

class UpdateServer extends Component {
    updateServer = event => {
        event.preventDefault()

        window.location.href = `/server-update/${this.props.id}`
    }

    render () {
        return <Update onClick={this.updateServer}>Update</Update>
    }
}

class DeleteServer extends Component {
    deleteServer = event => {
        event.preventDefault()

        if ( window.confirm( `Do you want to delete the server ${this.props.id} permanently?`,)) {
            api.deleteServerById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <Delete onClick={this.deleteServer}>Delete</Delete>
    }
}

class ServerList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            servers: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllServers().then(servers => {
            this.setState({
                servers: servers.data.data,
                isLoading: false,
            })
        })
    }



    render() {
        const { servers, isLoading } = this.state
        console.log ('TCL: ServerList -> render -> servers', servers)

        const columns = [
            {
                Header: 'Hostname',
                accessor: 'hostname',
                filterable: true,
            },
            {
                Header: 'OS',
                accessor: 'os',
                filterable: true,
            },
            {
                id: 'used',
                Header: 'Used',
                accessor: 'used',
                Cell: ({ value }) => ( (value) ? 'reserved' : '' ),
                filterable: true,
                Filter: ({ filter, onChange}) =>
                    <select 
                        onChange={event => onChange(event.target.value)}
                        style={{ width: "100%" }}
                        value={ filter ? filter.value : "" } 
                    >
                        <option value="">Show All</option>
                        <option value="true">Reserved</option>
                        <option value="false">Free</option>
                    </select>
            },
            {
                Header: 'User',
                accessor: 'user',
                filterable: true,
            },
            {
                id: 'updatedAt',
                Header: 'Updated At',
                accessor: d => { return Moment(d.updatedAt).local().format("YYYY-MM-DD")},
                filterable: true,

            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return(
                        <span><UpdateServer id={props.original._id}/></span>
                    )
                },
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span><DeleteServer id={props.original._id}/></span>
                    )
                },
            },
        ]

        let showTable = true
        if (!servers.length) {
            showTable = false
        }

        return(
           <Wrapper>
               { showTable && (
                   <ReactTable
                        data={servers}
                        columns={columns}
                        isLoading={isLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
               )}
           </Wrapper>
        )
    }
}

export default ServerList

