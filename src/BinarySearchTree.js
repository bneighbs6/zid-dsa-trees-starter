class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key; 
    this.value = value; 
    this.parent = parent;
    this.left = null;
    this.right = null;
  }
}

const bst = new BinarySearchTree(5);
console.log(bst); 
