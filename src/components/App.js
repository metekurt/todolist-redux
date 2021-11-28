import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import { FcCheckmark } from "react-icons/fc";
import { AiFillSetting } from "react-icons/ai";
import {
  toggleOnWeb,
  removeItemFromWeb,
  addItemtoWeb,
  changeOnWeb,
  getList,
} from "../actions";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      editItemId: null,
    };
  }
  componentDidMount() {
    this.props.getList();
  }

  renderList() {
    return this.props.todos.map((item) => {
      return (
        <li
          key={item.id}
          className={"todo " + (item.completed ? "completed" : "")}
          onClick={() =>
            this.props.toggleOnWeb(item.id, item.title, item.completed)
          }
        >
          <div className="view">
            {this.state.isEdit && this.state.editItemId === item.id ? (
              <div
                onClick={(event) => {
                  event.stopPropagation();
                }}
              >
                <input
                  className="new-todo"
                  autoFocus
                  placeholder={item.title}
                  onKeyUp={(event) => {
                    this.changeItem(item.id, event, item.completed);
                  }}
                />
              </div>
            ) : (
              <label> {item.title} </label>
            )}

            {item.completed && <FcCheckmark />}
            {!item.completed && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  this.setState({
                    isEdit: !this.state.isEdit,
                    editItemId: item.id,
                  });
                }}
              >
                {<AiFillSetting />}
              </div>
            )}

            <button
              className="destroy"
              onClick={(e) => {
                e.stopPropagation();
                this.props.removeItemFromWeb(item.id);
              }}
            />
          </div>
        </li>
      );
    });
  }

  completedList() {
    return this.props.todos.filter((item) => item.completed === true);
  }

  addItemToList(event) {
    if (event.keyCode === 13 && event.target.value.trim()) {
      this.props.addItemtoWeb(event.target.value);
      event.target.value = "";
    }
  }

  changeItem(id, event, status) {
    if (event.keyCode === 13 && event.target.value.trim()) {
      this.props.changeOnWeb(id, event.target.value, status);
      this.setState({ isEdit: false, editItemId: null });
    }
  }

  render() {
    return (
      <section>
        <h1>TO DO LIST</h1>
        <div className="todoapp">
          <header className="header">
            <input
              className="new-todo"
              autoFocus
              autoComplete="off"
              placeholder="Add an item.."
              onKeyUp={(event) => this.addItemToList(event)}
            />
          </header>
          {this.props.todos.length ? (
            <div>
              <section className="main">
                <ul className="todo-list">{this.renderList()}</ul>
              </section>
              <footer className="footer">
                <div className="total">Items: {this.props.todos.length}</div>
                <div className="completed">
                  Completed: {this.completedList().length}
                </div>
              </footer>
            </div>
          ) : null}
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return { todos: state };
};

const mapDispatcherstoProps = (dispatch) => {
  return {
    toggleOnWeb: (id, title, status) =>
      dispatch(toggleOnWeb(id, title, status)),
    removeItemFromWeb: (id) => dispatch(removeItemFromWeb(id)),
    addItemtoWeb: (title) => dispatch(addItemtoWeb(title)),
    changeOnWeb: (id, title, status) =>
      dispatch(changeOnWeb(id, title, status)),
    getList: () => dispatch(getList()),
  };
};

export default connect(mapStateToProps, mapDispatcherstoProps)(App);
