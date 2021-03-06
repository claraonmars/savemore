import React from 'react'
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Button } from 'mdbreact'

import 'whatwg-fetch';


import './style.scss';

var request = require('request');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Debit extends React.Component{
    render(){
    return(
        <div className={this.props.class}>
            <h1>Debit card</h1>
            Link your debit card:
            <div className='row justify-content-start debit'>

                <div className='col-6'>
                <div>
                Name on card
                </div>
                <div className='field'>
                <input onChange={this.props.debitName} name={this.props.debitValue} />
                </div>

            <br/>

                <div >
                Card Number
                </div>
                <div className='field'>
                <input onChange={this.props.debitNumber} number={this.props.debitValue} />
                </div>

            <br/>

                <div >
                Card expiry
                </div>
                <div className='field'>
                <input onChange={this.props.debitExpiry} expiry={this.props.debitValue} />
                </div>

            <br/>

                <div >
                CV
                </div>

                <div className='field'>
                <input onChange={this.props.debitCv} cv={this.props.debitValue} />
                </div>
            <br/>

                <Button size="sm" onClick={this.props.debitSubmit}>Add debit card</Button>
                </div>
                </div>
        </div>);
        }
  }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Otp extends React.Component{
  render(){
    return(<div className={this.props.class}>
        <h1>Debit card</h1>
        Your One Time Password has been sent to the mobile number registered to your debit card.
            <div className="row justify-content-start debit">
            <div className='col-6'>
            <div>
            One Time Password:
            </div>

            <div className="field">
            <input onChange={this.props.getOtp} value={this.props.otpvalue}/>
            </div>
            <br/>

        <Button size="sm" onClick={this.props.otpSubmit}>Submit OTP</Button>
            </div>

        </div>
          </div>);
        }
  }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class AddCurrent extends React.Component{
  render(){
    return(<div className={this.props.class}>
        <h1>Current Account</h1>
        Add your current account details:

        <div className="row justify-content-start debit">
            <div className ='col-6'>

            <div>Bank:</div>
            <div className="field">
                <select onChange={this.props.getCurrentBank} value={this.props.currentBank}>
                <option>Choose a bank</option>
                <option value='DBS/POSB'>DBS/POSB</option>
                <option value='UOB'>UOB</option>
                <option value='OCBC'>OCBC</option>
                <option value='CITIBANK'>Citibank</option>
                </select>
            </div>

            <br/>

                <div>Account number:</div>
                <div className="field">
                <input onChange={this.props.getCurrentNum} value={this.props.currentNum}/>
                </div>

            <br/>

            <Button size="sm" onClick={this.props.addCurrentAcc}>submit</Button>
            </div>
            </div>
          </div>);
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class AddSavings extends React.Component{
  render(){
    return(<div className={this.props.class}>
        <h1>Saving Account</h1>
        Add your saving account details:

            <div className="row justify-content-start debit">
                <div className ='col-6'>

                <div>Bank:</div>
                <div className="field">
                <select>
                <option value={this.props.savingBank}>{this.props.savingBank}</option>
                </select>
                </div>

            <br/>
                <div>
                Account number:
                </div>
                <div className="field">
                <input onChange={this.props.getSavingNum} value={this.props.savingNum}/>
                </div>
            <br/>
            <Button size="sm" onClick={this.props.addSavingAcc}>submit</Button>
            </div>
            </div>
          </div>);
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


class Form extends React.Component{
    constructor(){
    super();
    this.state={
        card:{
                name: 'default',
                card_number: 0,
                expiry: 'default',
                cv: 0,
                user_id: 0
        },
        otp: 0,
        card_class:'normal',
        otp_class: 'hidden',
        current_class: 'hidden',
        saving_class: 'hidden',
        account:{
                name: 'default',
                user_id: 0,
                bank: 'default',
                account_number: ''
        },
        redirect: false,
        existing: false,
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//DEBIT CARD//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    this.getDebitName = this.getDebitName.bind(this)
    this.getDebitExpiry = this.getDebitExpiry.bind(this)
    this.getDebitNumber = this.getDebitNumber.bind(this)
    this.getDebitCv = this.getDebitCv.bind(this)

    this.debitSubmit = this.debitSubmit.bind(this)

    this.debitReadCard = this.debitReadCard.bind(this)

    this.getOtp = this.getOtp.bind(this)
    this.otpSubmit = this.otpSubmit.bind(this)

////////////////////////////////////////////////////////////
//ADD CURRENT ACCOUNT//
////////////////////////////////////////////////////////////

    this.getCurrentBank = this.getCurrentBank.bind(this)
    this.getCurrentNum = this.getCurrentNum.bind(this)

    this.addCurrentAcc = this.addCurrentAcc.bind(this)

////////////////////////////////////////////////////////////
//ADD SAVING ACCOUNT//
////////////////////////////////////////////////////////////

    this.getSavingNum = this.getSavingNum.bind(this)

    this.addSavingAcc = this.addSavingAcc.bind(this)
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//CHECK FOR EXISTING ACCOUNTS//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    componentDidMount(){
        var reactThis = this

        fetch('/investments',{
            method: 'get',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
               }
        })
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            console.log('post req', data);
            for (var i = 0; i< data.accounts.length; i ++){
                if (data.accounts[i].name === 'current' || data.accounts[i].name === 'saving'){
                    reactThis.setState({existing: true})
                }
            }
        })
    }


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//DEBIT CARD//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////
    // UNRESOLVED            Read credit card image
    ////////////////////////////////////////////////////////////
    debitReadCard(){
        let body = {
          "requests": [
            {
              "image": {
                "source": {
                  "imageUri": "https://res.cloudinary.com/dsfjnc10g/image/upload/v1542595025/1529504445934.jpg" //image URL
                }
              },
              "features": [
                {
                  "type": "TEXT_DETECTION",
                  "maxResults": 10
                }
              ]
            }
          ]
    }
        fetch('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyC4OsmVzL71Exh7Tsp5aaSNS2rTSRN8Ijo',{
                method: 'post',
                body: JSON.stringify(body),
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                   }
            })
            .then(function(response){
                return response.json()
            })
            .then(function(data){
                console.log('post req', data);
    })

}

    ////////////////////////////////////////////////////////////
    // Debit card on change handlers:
    ////////////////////////////////////////////////////////////

    getDebitName(event){
        var card = this.state.card
        card.name = event.target.value
        card.user_id = this.props.user_id
        this.setState({card: card})
    }

    getDebitExpiry(event){
        var card = this.state.card
        card.expiry = event.target.value
        this.setState({card: card})
    }

    getDebitNumber(event){
        var card = this.state.card
        card.card_number = event.target.value
        this.setState({card: card})
    }

    getDebitCv(event){
        var card = this.state.card
        card.cv = event.target.value
        this.setState({card: card})
    }


    ////////////////////////////////////////////////////////////
    // RESOLVED            Submit debit card details
    ////////////////////////////////////////////////////////////

    debitSubmit(){
    var reactThis = this
    fetch('/cards',{
        method: 'post',
        body: JSON.stringify(reactThis.state.card),
        headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
    })
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log('post req', data);
    })

    reactThis.setState({otp_class: 'normal', card_class: 'hidden', })

    ////////////////////////////////////////////////////////////
    // UNRESOLVED: generate random otp            Call otp
    ////////////////////////////////////////////////////////////

    if (reactThis.state.otp === 0){
        request.post('https://textbelt.com/text', {
      form: {
        phone: '+',
        message: 'Hello world',
        key: 'textbelt',
      },
    }, function(err, httpResponse, body) {
      if (err) {
        console.error('Error:', err);
        return;
      }
      console.log(JSON.parse(body));
    })
    }

}

    ////////////////////////////////////////////////////////////
    // Otp on change handlers:
    ////////////////////////////////////////////////////////////

    getOtp(){
        this.setState({otp: event.target.value});
        console.log('otp:', event.target.value)
    }

    ////////////////////////////////////////////////////////////
    // Submit Otp
    ////////////////////////////////////////////////////////////

    otpSubmit(){

        this.setState({current_class: 'normal', otp_class: 'hidden'})
    }


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ADD CURRENT ACCOUNT//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////
    // Current account on change handlers:
    ////////////////////////////////////////////////////////////

    getCurrentBank(event) {
        var account = this.state.account
        account.bank = event.target.value
        account.user_id = this.props.user_id
        account.name = 'current'
        this.setState({account: account})
    }

    getCurrentNum(event) {
        var account = this.state.account
        account.account_number = event.target.value
        this.setState({account: account})
    }

    ////////////////////////////////////////////////////////////
    // Submit Current Account details
    ////////////////////////////////////////////////////////////

    addCurrentAcc(){
    var reactThis = this
    fetch('/accounts',{
        method: 'post',
        body: JSON.stringify(reactThis.state.account),
        headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
    })
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log('post req', data);
    })

    reactThis.setState({saving_class: 'normal', current_class: 'hidden', bank: 'default'})
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ADD SAVINGS ACCOUNT//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////
    // Saving account on change handlers:
    ////////////////////////////////////////////////////////////

    getSavingNum(event) {
        var account = this.state.account
        account.account_number = event.target.value
        account.user_id = this.props.user_id
        account.name = 'saving'
        this.setState({account: account})
    }

    ////////////////////////////////////////////////////////////
    // Submit Current Account details
    ////////////////////////////////////////////////////////////

    addSavingAcc(){
    var reactThis = this
    fetch('/accounts',{
        method: 'post',
        body: JSON.stringify(reactThis.state.account),
        headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
    })
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log('post req', data);
    })

    this.setState({redirect: true})
}

renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }
  }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//RENDER//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  render(){
    // if (this.state.existing === false){
    return(<div>
        {this.renderRedirect()}

        <Debit
        debitName={this.getDebitName}
        debitNumber={this.getDebitNumber}
        debitExpiry={this.getDebitExpiry}
        debitCv={this.getDebitCv}
        debitSubmit={this.debitSubmit}
        debitNameValue={this.state.card.name}
        debitNumberValue={this.state.card.number}
        debitExpiryValue={this.state.card.expiry}
        debitCvValue={this.state.card.cv}
        class={this.state.card_class} />

        <Otp
        otpvalue={this.state.otp}
        getOtp={this.getOtp}
        otpSubmit={this.otpSubmit}
        class={this.state.otp_class} />

        <AddCurrent
        class={this.state.current_class}
        addCurrentAcc={this.addCurrentAcc}
        getCurrentBank={this.getCurrentBank}
        getCurrentNum={this.getCurrentNum}
        currentBank={this.state.account.bank}
        currentNum={this.state.account_number} />

        <AddSavings
        class={this.state.saving_class}
        addSavingAcc={this.addSavingAcc}
        getSavingNum={this.getSavingNum}
        savingBank={this.state.account.bank}
        savingNum={this.state.account_number} />

        </div>);
    // }
    // else{
    //     return(<div>
    //         Your current account details are:


    //         </div>)
    //}
  }
}



export default Form;
