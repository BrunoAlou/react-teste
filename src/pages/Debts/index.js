import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Form, Container, ContainerForm, ContainerList } from "./styles";

import apiAdonis from "../../services/apiAdonis";
import apiJson from "../../services/apiJson";

const TOKEN = localStorage.getItem('$token-User');
class Debts extends Component {
  
  state = {
    users: [],
    selectedUser: { name: "", id: 0 },
    validationError: "",
    debts: [],
  };

  async componentDidMount() {
    await apiJson
      .get("/users")
      .then((data) => {
        let usersArray = data.data;
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

      const config = {
          headers: { Authorization: `Bearer ${TOKEN}` }
      };
      await apiAdonis.get("/debt",config)
      .then((data) => {
        let usersDebts = data.data;
        this.setState({
          debts: [
          ].concat(usersDebts),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }


  handleDebts = async (e) => {
    e.preventDefault();
    let user_id = this.state.selectedUser.id;
    let user_name = this.state.selectedUser.name;
    const { reason, date, value } = this.state;
    const config = {
      headers: { Authorization: `Bearer ${TOKEN}` }
  };
    if (!user_id || !user_name || !reason || !date || !value) {
      this.setState({ error: "Preencha todos os dados para se cadastrar" });
    } else {
      try {
        await apiAdonis.post("/debt", { user_id, user_name, reason, date, value }, config);
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
        <ContainerList>
          {this.state.debts.map((debt) => (
            <div key={debt.id} value={debt.id}>
              <p>{debt.user_name}</p>
              <p>{debt.reason}</p>
              <p>{debt.date}</p>
              <p>{debt.value}</p>  
            </div>
          ))}
        </ContainerList>
        <ContainerForm>
          <Form onSubmit={this.handleDebts}>
            {this.state.error && <p>{this.state.error}</p>}
            <select
              value={this.state.selectedUser.name}
              onChange={(e) =>
                this.setState({
                  selectedUser: {
                    name: e.target.value,
                    id: e.target.selectedIndex,
                  },
                  validationError:
                    e.target.value === "" ? "You must select an User" : "",
                })
              }
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
            <Link to="/">Login</Link>
            <Link to="/">Logout</Link>
          </Form>
        </ContainerForm>
      </Container>
    );
  }
}

export default withRouter(Debts);
