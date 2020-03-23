class Trie extends Map {
  constructor() {
    super();
    this.end = false;
  }
  
  // Inserts a word into the trie.
  insert(word) {
    let node = this;
    
    for (const c of word) {
      if (!node.has(c)) 
        node.set(c, new Trie());
      node = node.get(c);
    }
    
    node.setEnd();
  }
  
  // search a prefix or whole key in trie and
  // returns the node where search ends
  searchPrefix(prefix) {
    let node = this;
    
    for (const c of prefix) {
      if (node.has(c))
        node = node.get(c);
      else 
        return null;
    }
    
    return node;
  }
  
  // Returns if the word is in the trie.
  search(word) {
    const node = this.searchPrefix(word);
    return !!node && node.isEnd();
  }
  
  // Returns if there is any word in the trie
  // that starts with the given prefix.
  startsWith(prefix) {
    return !!this.searchPrefix(prefix);
  }
  
  isEnd() {
    return this.end;
  }
  
  setEnd() {
    this.end = true;
  }
}


export default Trie;

// let test = new Trie();
// test.insert('geeks');
// test.insert('gee');
// test.insert('quiz');
// test.insert('for');

// boards = [['g','i','z'], ['u','e','k'], ['q','s','e']];

// console.log(Boggle(boards,test));