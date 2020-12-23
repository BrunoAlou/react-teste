import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Select from "react-select";
import apiAdonis from "../../services/apiAdonis";
import apiJson from "../../services/apiJson";

import { Form, Container } from "./styles";

let options1 = [];

async function copyOptionsForAsync() {
  let response = await apiJson.get("/users");
  response.data.forEach((element) => {
    console.log(element);
    let dropDownEle = {
      index: element.id,
      label: element.name,
      value: element.username,
    };
    options1.push(dropDownEle);
  });
}


class Debts extends Component {
  constructor() {
    super();
    copyOptionsForAsync();
  }

  state = {
    user_id: "",
    reason: "",
    date: "",
    value: "",
    error: "",
  };

  handleChange(name){
    console.log(name)
    let state = this.state;
    state.user_id = name.index;
    this.setState({ reason: state.user_id })
  }


  handleDebts = async (e) => {
    e.preventDefault();
    const { user_id, reason, date, value } = this.state;
    if (!user_id || !reason || !date || !value) {
      this.setState({ error: "Preencha todos os dados para se cadastrar" });
    } else {
      try {
        await apiAdonis.post("/debt", { user_id, reason, date, value });
        this.props.history.push("/");
      } catch (err) {
        console.log(err);
        this.setState({
          error: "Ocorreu um erro ao registrar sua dívida. T.T",
        });
      }
    }
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleDebts}>
          {this.state.error && <p>{this.state.error}</p>}
          <Select name="option" options={options1} value={this.state.user_id} onChange={this.handleChange.bind((this))} />
          <input
            type="text"
            placeholder="Motivo"
            onChange={(e) => this.setState({ reason: e.target.value })}
          />
          <input
            type="date"
            placeholder="Data"
            onChange={(e) => this.setState({ date: e.target.value })}
          />
          <input
            type="decimal"
            placeholder="Valor"
            onChange={(e) => this.setState({ value: e.target.value })}
          />
          <button type="submit">Cadastrar grátis</button>
          <hr />
          <Link to="/">Fazer login</Link>
        </Form>
      </Container>
    );
  }
}

export default withRouter(Debts);
