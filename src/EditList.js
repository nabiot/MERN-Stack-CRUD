import React, { Component } from 'react';
import './EditList.css';
import axios from 'axios';

class EditList extends Component {
    constructor(props) {
        super(props);
    this.state = {
        Full_Name: '',
        Email: '',
        Address: '',
        Phone_Number: ''
    }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeName=this.onChangeName.bind(this);
        this.onChangeEmail=this.onChangeEmail.bind(this);
        this.onChangeAddress=this.onChangeAddress.bind(this);
        this.onChangePhone=this.onChangePhone.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:3001/members/'+ this.props.match.params.id)
        .then(res => {
            console.log('member', res)
            let member = res.data
            this.setState({
                Full_Name: member.Full_Name,
                Email: member.Email,
                Address: member.Address,
                Phone_Number: member.Phone_Number
            })
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const newMembership = {
            Full_Name: this.state.Full_Name,
            Email: this.state.Email,
            Address: this.state.Address,
            Phone_Number: this.state.Phone_Number
        };
        axios.post('http://localhost:3001/members/update/'+ this.props.match.params.id, newMembership)
                .then(res => console.log(res.data));
                
        this.setState({
            Full_Name: '',
            Email: '',
            Address: '',
            Phone_Number: ''
        })
    }

    onChangeName(e) {
        e.preventDefault();
        this.setState({
            Full_Name: e.target.value
        })
    }
    onChangeEmail(e) {
        e.preventDefault();
        this.setState({
            Email: e.target.value
        })
    }
    onChangeAddress(e) {
        e.preventDefault();
        this.setState({
            Address: e.target.value
        })
    }
    onChangePhone(e) {
        e.preventDefault();
        this.setState({
            Phone_Number: e.target.value
        })
    }
    
    render() {
        return (
            <div className="wrapper">
              <div>
                <h1> Update your information below </h1>
              </div>
                <form onSubmit={this.onSubmit}>
                    <div className="form">
                        <label for="name"> Full Name </label>
                        <input type="text" id="name" value={this.state.Full_Name} onChange={this.onChangeName}></input>
                    </div>
                    <div className="form">
                        <label for="email"> Email </label>
                        <input type="text" id="email" value={this.state.Email} onChange={this.onChangeEmail}></input>
                    </div>
                    <div className="form">
                        <label for="address"> Address </label>
                        <input type="text" id="address" value={this.state.Address} onChange={this.onChangeAddress}></input>
                    </div>
                    <div className="form">
                        <label for="phone"> Phone Number </label>
                        <input type="cel" id="phone" value={this.state.Phone_Number} onChange={this.onChangePhone}></input>
                    </div>
                    <div className="form">
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default EditList;