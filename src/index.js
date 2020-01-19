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
        let nro_rows = 55;
        let nro_colums = 55;
        for (let i=0 ; i<nro_rows ; i++){
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
        let board_temp = []; 
        for(let i=0 ; i<this.state.rows ; i++){
            board_temp.push(this.state.board[i].slice());
        }
        board_temp[row][colum] = board_temp[row][colum]===0? 1:0;
        this.setState({board:board_temp});
        return;
    }

    isValidCoord(i,j){
        return (i>=0 && j>=0 && i<this.state.rows && j<this.state.colums);
    }

    count_neighbors(row,colum){
        let neighbors = 0;
        for(let i=row-1; i<=row+1 ; i++){
            for(let j=colum-1; j<=colum+1 ; j++){
                if( i===row && j===colum){
                    continue;
                }
                if(this.isValidCoord(i,j) && this.state.board[i][j]===1) {
                    neighbors++;
                }
            }
        }
        return neighbors;
    }
    
    nextGeneration() {
        let next_generation = [];
        for(let i=0 ; i< this.state.rows ; i++){
            let temp_row = [];
            for(let j=0 ; j<this.state.colums ; j++){
                let neighbors = this.count_neighbors(i,j);
                console.log("("+i+","+j+")="+neighbors);
                let live=0;
                if (this.state.board[i][j]===1 && (neighbors ===2 || neighbors===3)){
                    live=1;
                }
                if (this.state.board[i][j]===0 && neighbors===3){
                    live=1;
                }
                temp_row.push(live);
            }
            next_generation.push(temp_row);
        }
        return next_generation;
    }

    processNextGeneration() {
        let next_geneneration = this.nextGeneration();
        this.setState({board:next_geneneration});
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
        return (
            <div id="container">
                <div class="first">{rows}</div>
                <div class="second">
                    <NextGenButton onClick={() => this.processNextGeneration()}/>
                </div>
            </div>
        );
    }
}

class NextGenButton extends React.Component{
    render(){
        return (<button class="button button1" onClick={this.props.onClick}> Next Generation ></button>);
    }
}

class App extends React.Component{
    render() {
        return (
            <div>
                <h1>Conway's Game of Life</h1>
                <Board />
                <br/>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));