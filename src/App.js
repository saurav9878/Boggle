import React from "react";
import ReactDOM from "react-dom";
import Trie from "./boggle";
import BoggleSolver from "./BoggleSolver";

var my_trie = new Trie();

function dict(data) {
  console.log("Loading Dictionary...");
  let dictionary = Object.keys(data);
  console.log(dictionary.length);
  console.log("Dictionary Loaded");
  for (let i = 0; i < dictionary.length; i++) {
    my_trie.insert(dictionary[i]);
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      row: 3,
      col: 3,
      board: [],
      solved: 0
    };

    // This binding is necessary to make `this` work in the callback
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSolve = this.handleSolve.bind(this);
    this.handleCellChange = this.handleCellChange.bind(this);
  }
  generate_cell(i, j) {
    const cell = (
      <input
        type="text"
        maxLength="1"
        size="1"
        id={i * this.state.col + j + 1}
        key={i * this.state.col + j + 1}
        onChange={this.handleCellChange}
      ></input>
    );
    return cell;
  }
  componentDidMount() {
    fetch("/words_dictionary.json")
      .then(res => res.json())
      .then(result => {
        dict(result);
      });
  }
  handleCellChange(event) {
    let temp = this.state.board;
    let idx = event.target.id - 1;
    let r = Math.floor(idx / this.state.col);
    let c = idx % this.state.col;
    temp[r][c] = event.target.value;
    console.log("Changed cell is: ", r, c);
  }
  handleSubmit(event) {
    let table = <h2 key="sub-title">Enter data for Boggle Board</h2>;
    let temp = [];
    event.preventDefault();

    console.log("Rows: " + this.state.row);
    console.log("Columns: " + this.state.col);

    for (let i = 0; i < this.state.row; i++) {
      temp.push([]);
      for (let j = 0; j < this.state.col; j++) {
        table = [table, this.generate_cell(i, j)];
      }
      table = [table, <br key={i.toString()}></br>];
    }
    table = [
      table,
      <button key="solve" onClick={this.handleSolve}>
        Solve
      </button>
    ];
    this.setState(state => {
      return { board: temp };
    });
    ReactDOM.render(table, document.getElementById("board"));
  }

  handleSolve(event) {
    event.preventDefault();
    let result_with_dup = BoggleSolver(this.state.board, my_trie);
    let result = [...new Set(result_with_dup)];
    let solution;

    let temp;
    if (result.length !== 0) {
      solution = <h2>Words obtained after solving the above Boggle</h2>;
      temp = (
        <ol>
          {result.map((i,id) => (
            <li key={'result' + id}> {i} </li>
          ))}
        </ol>
      );
	  solution = [solution, temp];
    } else {
      solution = <h2>Oops!!! This Boggle cannot be solved</h2>;
    }

    ReactDOM.render(solution, document.getElementById("sol"));
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });
  render() {
    return (
      <div className="App">
        <h1> Boggle solver</h1>
        <form>
          <label>
            Board dimensions:
            <input
              type="number"
              min="1"
              step="1"
              name="row"
              defaultValue={3}
              onChange={this.handleChange}
            />
            <input
              type="number"
              min="1"
              step="1"
              name="col"
              defaultValue={3}
              onChange={this.handleChange}
            />
          </label>
          <button onClick={this.handleSubmit}>Generate Board</button>
          <div id="board"></div>
          <div id="sol"></div>
        </form>
      </div>
    );
  }
}

export default App;
