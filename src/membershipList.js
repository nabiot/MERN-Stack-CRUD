import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './membershipList.css';

class MembershipList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            members: []
        }
        this.getMembersList = this.getMembersList.bind(this);
    }

//Deleting member's information entry by _id
    deleteEntry(id){
        axios.post('http://localhost:3001/members/delete', {memberId: id})
        .then(res => {
            console.log(res);
            if(res.data.message === 'error') {
                alert('Can not be deleted!')
            }
            if(res.data.message === 'success') {
                this.getMembersList();
            }
        });
    };
    
    getMembersList() {
        axios.get('http://localhost:3001/members')
        .then(res => {
            this.setState({
                members: res.data
            });
        });
    }

    componentDidMount() {
      this.getMembersList();
    }

    render() {
        let memberRows = this.state.members.map(newMembership => {
            return(
                <tr> 
                    <td> {newMembership.Full_Name} </td>
                    <td> {newMembership.Email} </td>
                    <td> {newMembership.Address} </td>
                    <td> {newMembership.Phone_Number} </td>
                    <td> <Link to={"/edit/"+ newMembership._id}><button className='update'>Update</button></Link> </td>
                    <td><button onClick={() => this.deleteEntry(newMembership['_id'])} className='delete'> Delete </button></td>   
             </tr>  
            )
        })
        return(
        <div>
            <div>
                <h1>Membership Lists</h1>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th> Full Name </th>
                            <th> Email </th>
                            <th> Address </th>
                            <th> Phone Number </th>
                            <th> Update </th>
                            <th> Delete </th>
                        </tr>
                    </thead>
                    <tbody>
                        {memberRows}
                    </tbody>
                </table>
             </div>
        </div>
        )
    }
}

export default MembershipList;