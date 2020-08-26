import React, { Component, Fragment } from 'react'
import io from 'socket.io-client'

const socket = io.connect('http://localhost:5000');

export class Form extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            message: '',
            chat: []
        }
    }

    componentDidMount() {
        const context = this;

        socket.on('broadcast', function (data) {
            // io.sockets.emit('broadcast')
            // console.log(`${data.personName} ${data.personChat}`)

            context.handleLog(data)
        });
    }

    handleNameChange = event => {
        this.setState({
            name: event.target.value
        })
    }
    handleMessageChange = event => {
        this.setState({
            message: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault() // do not remove values from form after reefreshing pag on submit'
        const newChat = [{
            personName: this.state.name,
            personChat: this.state.message
        }];
        socket.emit('message', newChat[0])
    }

    handleLog = (message) => {
        const chat = [...this.state.chat, message];
        this.setState({
            chat
        });
        // console.log(JSON.stringify(chat));
    }

    render() {

        return (
            <div id='fragment'>
                <div id='main'>
                    <form onSubmit={this.handleSubmit}>
                        <h1>Chat App</h1>
                        <label>Name: </label><br></br>
                        <input type='text' value={this.state.name} onChange={this.handleNameChange}></input><br></br>
                        <label>Message</label><br></br>
                        <textarea type='text' value={this.state.message} onChange={this.handleMessageChange}></textarea><br></br>
                        <button value="submit" >Send Message</button>
                    </form>
                </div>

                <div id='main'>
                    <h1>Chat Log</h1>
                    {
                        this.state.chat.map((c, index) => (
                            <div key={index}>
                                <h5>
                                    {c.personName} : <br></br><span>{c.personChat}</span>
                                </h5>

                            </div>
                        ))
                    }

                </div>



            </div>
        )
    }
}

export default Form
