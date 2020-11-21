import React, {useState, useEffect} from 'react';

const GameBoard = () => {
    const [size, setSize] = useState(0)
    const [matrix, setMatrix] = useState()
    const [winner, setWinner] = useState()
    const [turn, setTurn ] = useState('O')
    function handleChange(e){
        setSize(parseInt(e.target.value))
    }
    function handleSubmit(){
        const tempMatrix = Array(size).fill(1).map(a => Array(size).fill(""))
        setMatrix(tempMatrix)
    }
    function createGameBord(){
       return matrix.map( (val, i) => 
           <div key={"sqc"+i} className="squareContainer">{
            val.map( (cont, j) =>
                <div key={"sq"+i+j} data-row={i} data-col={j} className="square">{cont}</div>
            )
            }
            </div>
        )
    }

    // function checkResult(){
    //     let winner
    //     // matrix.forEach((arr, i) => {
    //     //     if(arr.every(val => val == 'O'))
    //     //         winner='O' //row match value
    //     //     else if(arr.every(val => val == 'X'))
    //     //         winner='X' //row match value
    //     //     // arr.forEach( (val, j) => {
    //     //     //     if(arr[i][j].every(val => val === 'O'))
    //     //     //     winner='O'
    //     //     //     else if(arr[i][j].every(val => val === 'X'))
    //     //     //     winner='X'
    //     //     // })
    //     // });

    //     // Diagonal check
    //     for(let i = 0, j=matrix.length -1; i < matrix.length, j >= 0 ; i++, j--){
    //         if(matrix[i].every(val => val == 'O')){
    //             winner='O' //row match value
    //             break
    //         }
    //         else if(matrix[i].every(val => val == 'X')){
    //             winner='X' //row match value
    //             break
    //         }
    //         else if(i < (matrix.length -1) && j > 0 && (matrix[i][i] === 'X' || matrix[i][i] === 'O') && matrix[i][i] === matrix[i +1][i +1]){
    //             winner= matrix[i][j]                
    //         }else if(i < (matrix.length -1) && j > 0 && (matrix[i][j] === 'X' || matrix[i][j] === 'O') && matrix[i][j] === matrix[i +1][j -1]){
    //             winner= matrix[i][j]
    //         }else{
    //             winner = undefined
    //             break
    //         }
    //     }
        
    //     if(winner)
    //      alert(winner)
    // }

    function checkWinner(row, col){
        // check for horizontal match
        if(matrix[row].every(val => val === 'X') || matrix[row].every(val => val === 'O')){
            return matrix[row][col]
        }
        // check for diagonal match
        if((row - col) === 0 || (row + col) === (matrix.length-1)){
            let winnerCountRT = 1
            let winnerCountLT = 1
            for(let i = 0, j=matrix.length -1; i < matrix.length -1, j > 0 ; i++, j--){
                if( (matrix[i][i] === 'X' || matrix[i][i] === 'O') && matrix[i][i] === matrix[i +1][i +1]){
                    winnerCountLT++           
                }else if( (matrix[i][j] === 'X' || matrix[i][j] === 'O') && matrix[i][j] === matrix[i +1][j -1]){
                    winnerCountRT++
                }else{
                    break
                }
            }
            if(winnerCountRT === size || winnerCountLT === size) return matrix[row][col]
        }

        // check for vertical match
        let winnerCountTB = 1
        for(let i = 0; i < matrix.length -1 ; i++){
            if((matrix[i][col] === 'X' || matrix[i][col] === 'O') && matrix[i][col] === matrix[i+1][col]){
                winnerCountTB++
            }
        }
        if(winnerCountTB === size)
            return matrix[row][col]
        else
            return undefined

    }

    function handleSelected(e){
        if(matrix !== undefined && e.target.dataset.row){
            const {row, col} = e.target.dataset
            if(matrix[row][col] === ""){
                const tempMatrix = [...matrix]
                tempMatrix[row][col] = turn
                if(turn === 'O')
                    setTurn('X')
                else
                    setTurn('O')                
                setWinner(checkWinner(parseInt(row), parseInt(col)))
            }
        }
    }
    return ( <div>
        <input type="number" onChange={handleChange} placeholder="Please insert size of matrix" ></input>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleSubmit}>Reset</button>
        <h1>size of game board {size}</h1>
        <div onClick={handleSelected} id="playBoardID" className="playBoard">
        {matrix ? createGameBord() : null}
        <div>winner is :  {winner} </div>
       
        </div>
    </div> );
}
 
export default GameBoard;