// Tree.js
class Tree {
    constructor() {
        this.root = null;
    }

    addNode(node) {
        if (this.root == null) {
            this.root = node;
        }
        else {
            this.insertNode(this.root, node);
        }
    }

    insertNode(currentNode, node) {
        if (node.data < currentNode.data) {
            if (currentNode.left == null) {
                currentNode.left = node;
            }
            else {
                this.insertNode(currentNode.left, node);
            }
        } 
        else if (node.data > currentNode.data) {
            if (currentNode.right == null) {
                currentNode.right = node;
            }
            else {
                this.insertNode(currentNode.right, node);
            }
        }
    }

    hasNode(data) {
        return this.checkNode(this.root, data);
    }

    checkNode(currentNode, data) {
        if (currentNode == null) {
            return false;
        }
        if (data == currentNode.data) {
            return true;
        }
        else if (data > currentNode.data) {
            return this.checkNode(currentNode.right, data);
        }
        else if (data < currentNode.data) {
            return this.checkNode(currentNode.left, data);
        }
    }
}

module.exports = Tree;