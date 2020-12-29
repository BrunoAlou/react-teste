import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Form, Container } from "./styles";
import apiAdonis from "../../services/apiAdonis";

class Debts extends Component {
  state = {
    users: [],
    selectedUser: {name : "" , id : 0},
    validationError: "",
  };

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let usersArray = data;
        this.setState({
          users: [
            {
              name: "",
              id: -1,
              username: "Usuário",
            },
          ].concat(usersArray),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleDebts = async (e) => {
    e.preventDefault();
    let selectedIndex = this.state.selectedUser.id
    const { reason, date, value } = this.state;
    if (!selectedIndex || !reason || !date || !value) {
      this.setState({ error: "Preencha todos os dados para se cadastrar" });
    } else {
      try {
        await apiAdonis.post("/debt", { selectedIndex, reason, date, value });
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
          <select
            value={this.state.selectedUser.name}
            onChange={(e) =>
              this.setState({
                
                selectedUser: {name : e.target.value, id : e.target.selectedIndex},
                validationError:
                  e.target.value === "" ? "You must select an User" : "",
              })            }
          >
            {this.state.users.map((user) => (
              <option key={user.id} value={user.name}>
                {user.username}
              </option>
            ))}
          </select>

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
          <button type="submit">Cadastrar Dívida</button>
          <hr />
          <Link to="/">Fazer login</Link>
        </Form>
      </Container>
    );
  }
}

export default withRouter(Debts);
