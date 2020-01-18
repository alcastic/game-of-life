import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    obtainColor(value){
        return value===0 ? "square square-white" : "square square-black";
    }
    render() {
        return (
            <div className= {this.obtainColor(this.props.value)} onClick={this.props.onClick}></div>
        );
    }
}


class Board extends React.Component {
    constructor(props){
        super(props);
        let board_temp = [];
        let nro_rows = 10;
        let nro_colums = 10;
        for (let row=0 ; row<nro_rows ; row++){
            board_temp.push(Array(nro_colums).fill(0));
        }
        console.log(board_temp);
        this.state = {
            rows : nro_rows,
            colums : nro_colums,
            board : board_temp
        }
    }

    flipAction(row, colum) {
        console.log("("+row+","+colum+")")
        let board_temp = []; 
        for(let i=0 ; i<this.state.rows ; i++){
            board_temp.push(this.state.board[i].slice());
        }
        board_temp[row][colum] = board_temp[row][colum]===0? 1:0;
        this.setState({board:board_temp});
        return;
    }

    render() {
        let rows = [];
        for (let i=0 ; i<this.state.rows ; i++){
            let row_element = [];
            for(let j=0 ; j<this.state.colums ; j++) {
                row_element.push(<Square key={i+"-"+j} value={this.state.board[i][j]} onClick={() => this.flipAction(i, j) }/>);
            }
            rows.push(<div className='board-row' key={"row-"+i}>{row_element}</div>);
        }
        return (<div>{rows}</div>);
    }
}
class App extends React.Component{
    render() {
        return (
            <div>
                <h1>Conway's Game of Life</h1>
                <Board />
                <br/>
                <button>Next Generation >></button>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));