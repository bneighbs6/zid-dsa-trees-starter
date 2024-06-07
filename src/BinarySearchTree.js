const Queue = require("./Queue");

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
    if (this.key == null) {
        this.key = key;
        this.value = value;
    }

    /* If the tree already exists, then start at the root,
       and compare it to the key that you want to insert.
       If the new key is less than the node's key,
       then the new node needs to live in the left-hand branch. */
    else if (key < this.key) {
        /* If the existing node does not have a left child,
           meaning that the `left` pointer is empty,
           then you can just instantiate and insert the new node
           as the left child of that node, passing `this` as the parent. */
        if (this.left == null) {
            this.left = new BinarySearchTree(key, value, this);
        }
        /* If the node has an existing left child,
           then you recursively call the `insert()` method
           so that the node is added further down the tree. */
        else {
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

  find(key) {
    // If tthis.key = key return this.value; 
    // else if key < this.key && this.left exists => recursively call find on this.left
    // else if key > this.key && this.right exists => recursivley call find ont his.right
    // else throw new error
    if (key == this.key) {
      return this.value; 
    } else if (key < this.key && this.left) {
      return this.left.find(key);
    } else if (key > this.key && this.right) {
      return this.right.find(key);
    } else {
      throw new Error("Key not found")
    }
  }

  remove(key) {
    if (this.key == key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      } else if (this.left) {
        /* If the node only has a left child,
           then you replace the node with its left child. */
        this._replaceWith(this.left);
      } else if (this.right) {
        /* And similarly, if the node only has a right child,
           then you replace it with its right child. */
        this._replaceWith(this.right);
      } else {
        /* If the node has no children, then
           simply remove it and any references to it
           by calling `this._replaceWith(null)`. */
        this._replaceWith(null);
      }
    } else if (key < this.key && this.left) {
      this.left.remove(key);
    } else if (key > this.key && this.right) {
      this.right.remove(key);
    } else {
      throw new Error("Key Not Found");
    }
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this == this.parent.left) {
        this.parent.left = node;
      } else if (this == this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent;
      }
    } else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      } else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }

  dfsInOrder(values = []) {
    // First process left node recursively
    if (this.left) {
      values = this.left.dfsInOrder(values);
    }
    // Then handle current node
    values.push(this.value);
    // Finally process right node recursively
    if (this.right) {
      values = this.right.dfsInOrder(values);
    }
    return values;
  }

  dfsPreOrder(values = []) {
    // First handle current node
    values.push(this.value);

    // Handle left tree
    if (this.left) {
      values = this.left.dfsPreOrder(values);
    }

    // Handle right tree
    if (this.right) {
      values = this.right.dfsPreOrder(values);
    }
    return values;
  }

  dfsPostOrder(values = []) {
    // Handle left tree
    if (this.left) {
      values = this.left.dfsPostOrder(values);
    }
    // Handle right tree
    if (this.right) {
      values = this.right.dfsPostOrder(values);
    }
    // Handle current node
    values.push(this.value);
    return values;
  }

  bfs(tree, values = []) {
    const queue = new Queue(); 
    queue.enqueue(tree); // Add tree to the queue to kick off BFS
    let node = queue.dequeue(); // Remove first value from the queue; 
    while (node) { // While node exists
      values.push(node.value); // Add node value to array
      if (node.left) { // Handle left children of node
        queue.enqueue(node.left); // Add to values array if left children exist
      }
      if (node.right) { // Handle right children of node
        queue.enqueue(node.right); // Add to values array if right children exist
      }
      node = queue.dequeue(); // Set the value of node equal to the next value in the queue
    }
    return values; // Return values when node no longer exists or is null; 
  }

  getHeight(currentHeight = 0) {
    // BASE CASE: 
    // If current node doesn't have left or right child,
    // base case is reach, function can return the height
    if (!this.left && !this.right) {
      return currentHeight; 
    }
    // RECURSIVE CASE: 
    // Otherwise (else) compute the new height
    const newHeight = currentHeight + 1; 

    // If no left child, recurse down the right subtree only
    if (!this.left) {
     return this.right.getHeight(newHeight);
    }

    // If no right child, recurse down the left subtree only
    if (!this.right) {
      return this.left.getHeight(newHeight);
    }

    // If both children exist, recurse down both subtrees,
    // passing down the height of the current node
    const leftHeight = this.left.getHeight(newHeight);
    const rightHeight = this.right.getHeight(newHeight);
    
    // Return the greater of left/right subtrees
    return Math.max(leftHeight, rightHeight);
  }

  isBST() {
    // Use an dfsInOrder() method and assign to a variable
    const values = this.dfsInOrder();
    // Loop thru values array
    for (let i = 1; i < values.length; i++) {
    // Check if current value is less than the previous value; 
      if (values[i] < values[i - 1]) {
      // Return false if current value is less than previous value
        return false; 
      } else {
      // Otherwise return true
        return true; 
      }
    }
  }

  findKthLargestNode(k) {
    const values = this.dfsInOrder();
    let kthIndex = values.length - k; 

    if (kthIndex >= 0) {
      return values[kthIndex];
    } else {
      console.error("k value exceeds the size of the BST");
    }
  }


}

// Test cases

const bst = new BinarySearchTree(5, 5);

bst.insert(2, 2);
bst.insert(19, 19);
bst.insert(15, 15);
bst.insert(28, 28);
bst.insert(18, 18);

console.log(bst.bfs(bst))
