import React from 'react'
import PropTypes from 'prop-types';

import Index from './index/index'
import Form from './form/form'
import Trans from './trans/trans'
import Invest from './invest/invest'
import Nav from './nav/nav'
import Pay from './pay/pay'
import Paysuccess from './pay/success'
import Account from './account/account'

import 'whatwg-fetch';



import {Switch, Route} from 'react-router-dom'

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default class App extends React.Component{
    constructor(){
    super();
    this.state = {
        loggedin:false,
        id: '',
        account_id: 0,
        user: {},
    }

}
    componentDidMount(){
    var reactThis = this
    fetch('/check_user',{
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
        console.log(reactThis.state.id)
        reactThis.setState({ loggedin: data.loggedin});
            if(reactThis.state.loggedin === "true"){
                reactThis.setState({id: data.user[0].id});
                console.log('whats this',reactThis.state.id)
            }
    })
}

  render(){

    return(<div>
            <Nav loggedin={this.state.loggedin}/>
            <div className="container">
             <Switch>
                <Route exact path="/" render={(props) => <Index {...props} loggedin={this.state.loggedin} user_id={this.state.id}/>}/>
                <Route path="/users/sign_in" component={Nav}/>
                <Route path="/users/sign_up" component={Nav}/>
                <Route path="/accounts/new" render={(props) => <Form {...props} user_id={this.state.id}/>}/>

                <Route path="/accounts" component={Account}/>
                <Route path="/transactions" component={Trans}/>
                <Route path="/pay" render={(props) => <Pay {...props} user_id={this.state.id}/>}/>
                <Route path="/success" component={Paysuccess}/>
                <Route path="/investments" render={(props) => <Invest {...props} user_id={this.state.id}/>}/>
            </Switch>
            </div>
          </div>);
  }
}


