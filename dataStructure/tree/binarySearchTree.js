class Node {
  constructor(element, parent ) {
    this.element = element;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
    this.size = 0;
  }
  add(element) {
    if (this.root === null) {
      this.root = new Node(element, null);
      this.size++;
      return;
    } else {
      let currentNode = this.root;
      let parent = null;
      let compare;
      while (currentNode) {
        compare = element - currentNode.element;
        parent = currentNode;
        if (compare > 0) {
          currentNode = currentNode.right;
        } else if (compare < 0) {
          currentNode = currentNode.left;
        }
      }
      let newNode = new Node(element, parent);
      if (compare > 0) {
        parent.right = newNode;
      } else if (compare < 0) {
        parent.left = newNode;
      }
      this.size++;
    }
  }
}
const bst = new BST();
const arr = [19, 4, 5, 9, 10, 13, 20, 50, 39];
arr.forEach(item => {
  bst.add(item)
});
console.dir(bst.root);
