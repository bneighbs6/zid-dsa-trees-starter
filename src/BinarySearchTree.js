class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    // If the tree is empty, then this key being inserted is the root node of the tree.
    if (this.key === null) {
      this.key = key;
      this.value = value;
    } else if (key < this.key) {
    /* If the tree already exists, then start at the root,
           and compare it to the key that you want to insert.
           If the new key is less than the node's key,
           then the new node needs to live in the left-hand branch. */
      /* If the existing node does not have a left child,
               meaning that the `left` pointer is empty,
               then you can just instantiate and insert the new node
               as the left child of that node, passing `this` as the parent. */
      if (this.left == null) {
        this.left = new BinarySearchTree(key, value, this);
      } else {
      /* If the node has an existing left child,
               then you recursively call the `insert()` method
               so that the node is added further down the tree. */
        this.left.insert(key, value);
      }
    }
        /* Similarly, if the new key is greater than the node's key,
          then you do the same thing, but on the right-hand side. */
    else {
      if (this.right == null) {
        this.right = new BinarySearchTree(key, value, this);
      }
      else {
        this.right.insert(key, value);
      }
    }
  }
}

const bst = new BinarySearchTree(5);
console.log(bst);
