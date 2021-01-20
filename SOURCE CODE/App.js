import './App.css';
import React, { Component } from 'react';
import {Container, Col, Row, Button, Badge, Navbar} from 'react-bootstrap';

let number = 0;
let data = ['none'];
let proceed = true;

class Input extends Component {
  handleUp = (e) => {
    let id = parseInt((e.target.id).slice(3), 10);
    if(id !== 1 && proceed === true){
      proceed = false;
      document.getElementById("input-" + id).style.animation = 'animateUp 1s';
      document.getElementById("input-" + (id-1)).style.animation = 'animateDown 1s';
      document.getElementById("del-" + id).style.animation = 'animateUp 1s';
      document.getElementById("del-" + (id-1)).style.animation = 'animateDown 1s';
      setTimeout(() => {
        [data[id], data[id-1]] = [data[id-1], data[id]];
        document.getElementById("input-" + (id - 1)).value = data[id-1];
        document.getElementById("input-" + id).value = data[id];
        document.getElementById("input-" + id).style.animation = '';
        document.getElementById("input-" + (id-1)).style.animation = '';
        document.getElementById("del-" + id).style.animation = '';
        document.getElementById("del-" + (id-1)).style.animation = '';
        proceed = true;
      }, 900);
    }
  }

  handleDown = (e) => {
    let id = parseInt((e.target.id).slice(5), 10);
    if(id < number && proceed === true){
      proceed = false;
      document.getElementById("input-" + id).style.animation = 'animateDown 1s';
      document.getElementById("input-" + (id+1)).style.animation = 'animateUp 1s';
      document.getElementById("del-" + id).style.animation = 'animateDown 1s';
      document.getElementById("del-" + (id+1)).style.animation = 'animateUp 1s';
      setTimeout(() => {
        [data[id], data[id+1]] = [data[id+1], data[id]];
        document.getElementById("input-" + id).value = data[id];
        document.getElementById("input-" + (id + 1)).value = data[id+1];
        document.getElementById("input-" + id).style.animation = '';
        document.getElementById("input-" + (id+1)).style.animation = '';
        document.getElementById("del-" + id).style.animation = '';
        document.getElementById("del-" + (id+1)).style.animation = '';
        proceed = true;
      }, 900);
    }
  }

  handleDelete = (e) => {
    let id = parseInt((e.target.id).slice(4), 10);
    for(let i = id; i < number; i++){
      [data[i], data[i+1]] = [data[i+1], data[i]];
      if(data[i] === undefined) data[i] = '';
      document.getElementById("input-" + i).value = data[i];
      document.getElementById("input-" + (i + 1)).value = data[i+1];
    }
    let div = document.getElementById('div-' + number);
    div.parentNode.removeChild(div);
    data.splice(number,number);
    number--;
  }

  getData = (e) => {
    let id = (e.target.id).slice(6);
    data[id] = e.target.value;
  }

  componentDidMount(){
    let objDiv = document.getElementById("app");
    window.scrollTo({
      top: objDiv.scrollHeight
    })
  }

	render() {
  	return (
      <div id={"div-" + number}>
        <Row style={{marginBottom: 20}}>
          <Col className="col-1">
            <Badge id={"badge-" + number} style={{marginTop: 25}} className="badge-lg" pill variant="warning">{number}</Badge>
          </Col>
          <Col className="col-9">
            <div className="input-group mb-3" style={{marginTop: 20}}>
              <input id={"input-" + number} onChange={this.getData} type="text" className="form-control" />
              <div className="input-group-append">
                <button id={"del-" + number} onClick={(e) => this.handleDelete(e)} className="btn btn-danger" type="button">🗑</button>
              </div>
            </div>
          </Col>
          <Col>
            <Row>
              <Button id={"up-" + number} onClick={(e) => this.handleUp(e)} style={{marginBottom: 1}}>⇑</Button>
            </Row>
            <Row>
              <Button id={"down-" + number} onClick={(e) => this.handleDown(e)} style={{marginTop: 1}}>⇓</Button>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {inputList: []};
    this.addForm = this.addForm.bind(this);
  }

  addForm() {
    number++;
    data.push('');
    const inputList = this.state.inputList;
    this.setState({
        inputList: inputList.concat(<Input key={inputList.length} />)
    });
  }

  handleCopy = () => {
    let toCopy = '';
    for(let i = 1; i < number + 1; i++){
      toCopy += i.toString();
      toCopy += '. ';
      if(data[i] === undefined) data[i] = '.';
      data[i] = data[i].charAt(0).toUpperCase() + data[i].slice(1);
      toCopy += data[i];
      toCopy += '.\n';
    }
    navigator.clipboard.writeText(toCopy);
  }

  componentDidMount = () => {
    this.addForm();
  }

  render() { 
    return ( 
      <div className="App" id="app">
        <header className="App-header">
          <Container className="h-100 d-flex flex-column">
            <Col style={{marginTop: 100, marginBottom: 100}}>
              {this.state.inputList}
              <Row>
                <Col className="col-1">
                </Col>
                <Col className="col-9">
                  <Button id="add-btn" block onClick={this.addForm} className="btn-lg" variant="secondary">ADD</Button>
                </Col>
              </Row>
            </Col>
          </Container>
          <Navbar className="fixed-bottom bg-dark justify-content-center">
            <Button onClick={this.handleCopy} variant="info" className="">COPY</Button>
          </Navbar>
        </header>
      </div>
     );
  }
}

export default App;
