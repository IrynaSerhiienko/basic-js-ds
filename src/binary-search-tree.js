const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
		this._root = null;
	}
  root() {
		return this._root;
  }

  add(data) {
    const newNode = {
			data: data,
			left: null,
			right: null,
		}

    if(!this._root) {
			return this._root = newNode;
		} 

    let current = this._root;

		while(true) {
			if(current.data === data) return;

			if(data < current.data) {
				if(!current.left) {
					current.left = newNode;
					return;
				} 
				current = current.left;
			} else {
				if(!current.right) {
					current.right = newNode;
					return;
				}
				current = current.right;
			}
		}
   
  }

  has(data) {
    let current = this._root;
		while(current) {
			if(data === current.data) return true;
			if(data < current.data) {
				current = current.left;
			} else {
				current = current.right;
			}
		}
		return false
  }

  find(data) {
		let current = this._root;
		while(current) {
			if(data === current.data) return current;
			if(data < current.data) {
				current = current.left;
			} else {
				current = current.right;
			}
		}
		return null;
  }

  remove(data) {
    const nodeToRemove = this.find(data);
    if(!nodeToRemove) return null;

		let parent = null;
		let current = this._root;

		while(current && current !== nodeToRemove) {
      parent = current;
			if(data < current.data) {
				current = current.left;
			} else {
				current = current.right;
			}
		}
    
    parent = parent || {left: this._root, right: this._root};

		const removedNode = removeNode(nodeToRemove);

		if(parent.left === nodeToRemove) {
			parent.left = removedNode;
		} else {
			parent.right = removedNode;
		}
    
		// Return the deleted node
		return removedNode;

		function removeNode(node) {
			// A node without children (leaf)
			if(!node.left && !node.right) {
				return null;
			}

			// Node with one child
			if(!node.left || !node.right) {
				return node.left || node.right;
			}

			// Node with two children
      let minParent = node;
			let minNode = node.right;

			while(minNode.left) {
				minParent = minNode;
				minNode = minNode.left;
			}
      //Overwriting the data of the node we want to delete (node) with the data of the minimum node in the right subtree (minNode).
			node.data = minNode.data;

			// Delete the minimal node
			if(minParent.left === minNode) {
				minParent.left = minNode.right;
				// node.left = minNode.right;
			} else {
				minParent.right = minNode.right;
				// node.right = minNode.right;
			}

			return node;
		}
  }

  min() {
		if(!this._root) {
			return null;
		}

    let current = this._root;
    
    while(current.left) {
      current = current.left;
    }
    return current.data;
  }
  

  max() {
    if(!this._root) {
			return null;
		}

    let current = this._root;
    
    while(current.right) {
      current = current.right;
    }
    return current.data;
  }
}

module.exports = {
  BinarySearchTree
};