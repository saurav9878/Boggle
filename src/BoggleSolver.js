function isValid(i, j, visited) {
    if (i >=0 && i<visited.length && j>=0 && j<visited[0].length && !visited[i][j]) {
      return true;
    }
    return false;
  }
  
  function searchWord(root, board, i, j, visited, str, result)
  {
    // console.log("called");
    // console.log(str);
    if (root.isEnd()) {
      result.push(str);
    }
    // console.log("Visited size")
    // console.log(visited.length, visited[0].length);
  
    if(isValid(i, j, visited))
    {
      visited[i][j] = true;
    //   console.log(root);
      for(let [key, value] of root.entries()){
    //   console.log(key);
        if(root && key)
        {
          // console.log(isValid(i+1,j+1,visited), board[i+1][j+1], key);
            if (isValid(i+1,j+1,visited) && board[i+1][j+1] === key) 
            {
                // console.log("moved right down");
                searchWord(root.get(key),board,i+1,j+1,visited,str+key, result); 
            }
            if (isValid(i, j+1,visited)  && board[i][j+1] === key) 
            {
            //   console.log("moved right");
                searchWord(root.get(key),board,i, j+1,visited,str+key, result); 
            }
            if (isValid(i-1,j+1,visited) && board[i-1][j+1] === key) 
            {
            //   console.log("moved up right ");
  
                searchWord(root.get(key),board,i-1, j+1,visited,str+key,result); 
            }
            if (isValid(i+1,j, visited)  && board[i+1][j] === key) 
            {
            //   console.log("moved down");
  
                searchWord(root.get(key),board,i+1, j,visited,str+key,result); 
            }
            if (isValid(i+1,j-1,visited) && board[i+1][j-1] === key) 
            {
            //   console.log("moved down left");
  
                searchWord(root.get(key),board,i+1, j-1,visited,str+key,result); 
            }
            if (isValid(i, j-1,visited)&& board[i][j-1] === key) 
            {
            //   console.log("moved left");
  
                searchWord(root.get(key),board,i,j-1,visited,str+key, result); 
            }
            if (isValid(i-1,j-1,visited) && board[i-1][j-1] === key) 
            {
            //   console.log("moved up left", i-1, j-1);
  
                searchWord(root.get(key),board,i-1, j-1,visited,str+key, result); 
            }
            if (isValid(i-1, j,visited) && board[i-1][j] === key) 
            {
            //   console.log("moved up");
  
                searchWord(root.get(key),board,i-1, j, visited,str+key,result); 
            }
        }
      } 
        visited[i][j] = false; 
      }
    
  }
  
  
function BoggleSolver(board, root) {
    let rows = board.length;
    let columns = board[0].length;
    let visited = Array(rows).fill().map(() => Array(columns).fill(false));
    let str = "";
    let result = [];
    // console.log("Boggle" + rows +" "+ columns);
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          // console.log(root.get(board[i][j]));
          if (root.get(board[i][j])) {
            str += board[i][j];
            // console.log(str);
            searchWord(root.get(board[i][j]), board, i, j, visited, str,result);
            str = "";
          }
        }
    }
  return result;
  }

  export default BoggleSolver