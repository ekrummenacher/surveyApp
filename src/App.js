import React, { Component } from 'react';
import './App.css';

var uuid = require('uuid');
var firebase = require('firebase');

var config = {
    apiKey: "AIzaSyDhkbrOP-xN9bIVGFJjl4Q3CIHQrqiKzr4",
    authDomain: "surveys-cd4de.firebaseapp.com",
    databaseURL: "https://surveys-cd4de.firebaseio.com",
    storageBucket: "surveys-cd4de.appspot.com",
    messagingSenderId: "819180854986"
  };

  firebase.initializeApp(config);

class App extends Component {

constructor(props){
      super(props);
      this.state = {
        id:uuid.v1(),
        name:'',
        answers: {
          q1:'',
          q2:'',
          q3:'',
          q4:'',
          q5:''
        },
        submitted: false
      }

      this.handleQuestionChange = this.handleQuestionChange.bind(this);
  }

  handleQuestionSubmit(event){
    firebase.database().ref('surveys/'+this.state.id).set({
      name: this.state.name,
      answers:this.state.answers
    });

    this.setState({submitted:true}, function(){
      console.log('Questions Submitted...');
    });
    event.preventDefault();
  }

  handleQuestionChange(event){
    var answers = this.state.answers;
    if(event.target.name === 'q1'){
      answers.q1 = event.target.value;
    } else if(event.target.name === 'q2'){
      answers.q2 = event.target.value;
    } else if(event.target.name === 'q3'){
      answers.q3 = event.target.value;
    } else if(event.target.name === 'q4'){
      answers.q4 = event.target.value;
    } else if(event.target.name === 'q5') {
      answers.q5 = event.target.value;
    }

    this.setState({answers:answers},function(){
      console.log(this.state);
    });
  }

  handleNameSubmit(event) {
    var name = this.refs.name.value;
    this.setState({name:name}), function () {
      console.log(this.state);
    };
    event.preventDefault(); //stops any javascript that may be running that we don't know about, so no more surprises
  }

  render() {
    var user;
    var questions;

    if(this.state.name && this.state.submitted === false){
      user = <h2>Welcome {this.state.name}</h2>
            questions = <span>
        <h3>Survey Questions</h3>
        <form onSubmit={this.handleQuestionSubmit.bind(this)}>
          <div>
            <label>What is your favorite type of music?</label><br />
            <input type="radio" name="q1" value="Country/Folk" onChange={this.handleQuestionChange} />Country/Folk<br />
            <input type="radio" name="q1" value="Rock" onChange={this.handleQuestionChange} />Rock<br />
            <input type="radio" name="q1" value="Jazz" onChange={this.handleQuestionChange} />Jazz<br />
            <input type="radio" name="q1" value="Pop" onChange={this.handleQuestionChange} />Pop<br />
            <input type="radio" name="q1" value="Classical, you peasants" on Change={this.handleQuestionChange} />Classical, you peasants<br/>
            <input type="radio" name="q1" value="Other" onChange={this.handleQuestionChange} />Other<br />
          </div>
          <div>
            <label>What is your favorite instrument?</label><br />
            <input type="radio" name="q2" value="Piano" onChange={this.handleQuestionChange} />Piano<br />
            <input type="radio" name="q2" value="Guitar" onChange={this.handleQuestionChange} />Guitar<br />
            <input type="radio" name="q2" value="Brass" onChange={this.handleQuestionChange} />Brass<br />
            <input type="radio" name="q2" value="Theramin" onChange={this.handleQuestionChange} />Theramin<br />
            <input type="radio" name="q2" value="Other" onChange={this.handleQuestionChange} />Other<br />
          </div>
          <div>
          <label>What is your favorite radio station?</label><br />
          <input type="radio" name="q3" value="Top 40" onChange={this.handleQuestionChange} />Top 40<br />
          <input type="radio" name="q3" value="Alternative Rock" onChange={this.handleQuestionChange} />Alternative Rock<br />
          <input type="radio" name="q3" value="Classic Rock" onChange={this.handleQuestionChange} />Classic Rock<br />
          <input type="radio" name="q3" value="NPR" onChange={this.handleQuestionChange} />NPR<br />
          <input type="radio" name="q3" value="Other" onChange={this.handleQuestionChange} />Other<br />
        </div>
        <div>
          <label>What is your favorite beer?</label><br />
          <input type="radio" name="q4" value="Lager" onChange={this.handleQuestionChange} />Lager<br />
          <input type="radio" name="q4" value="IPA" onChange={this.handleQuestionChange} />IPA<br />
          <input type="radio" name="q4" value="Porter" onChange={this.handleQuestionChange} />Porter<br />
          <input type="radio" name="q4" value="Hefeweizen (wheat)" onChange={this.handleQuestionChange} />Hefeweizen (wheat)<br />
          <input type="radio" name="q4" value="Wine, again you peasants!" onChange={this.handleQuestionChange} />Wine, again you peasants!<br />
          <input type="radio" name="q4" value="Other" onChange={this.handleQuestionChange} />Other<br />
        </div>
        <div>
          <label>Who is your favorite singer?</label><br/>
          <input type="radio" name="q5" value="Elvis Presley" onChange={this.handleQuestionChange} />Elvis Presley<br/>
          <input type="radio" name="q5" value="Dolly Parton" onChange={this.handleQuestionChange} />Dolly Parton<br/>
          <input type="radio" name="q5" value="Michael Jackson" onChange={this.handleQuestionChange} />Michael Jackson<br/>
          <input type="radio" name="q5" value="Frank Sinatra" onChange={this.handleQuestionChange} />Emmy-Lou Harris<br/>
          <input type="radio" name="q5" value="I live under a rock and do not know these singers" onChange={this.handleQuestionChange} />I live under a rock and do not know these singers<br/>
        </div>
        <input type="submit" value="Submit" /> 
        </form>
      </span>

    } else if(!this.state.name && this.state.submitted === false){
      user = <span>
        <h2>Please enter your name to begin the survey</h2>
        <form onSubmit={this.handleNameSubmit.bind(this)}>
          <input type="text" placeholder="Enter Name..." ref="name" />
        </form>
      </span>;
      questions = '';
    } else if(this.state.submitted === true){
      user = <h2>Thank You {this.state.name}</h2>
    }

    return (
      <div className="App">
        <div className="App-header text-center">
          <h2>SimpleSurvey</h2>
        </div>
        <div className="text-center">
          {user}
        </div>
        <div className="container">
          {questions}
        </div>
      </div>
    );
  }
}

export default App;
