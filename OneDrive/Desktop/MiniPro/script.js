// Define the TreeNode class
class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
    
// Define the BinaryTree class
class BinaryTree {
    constructor() {
        this.root = null;
    }
    
    // Insert a node into the binary tree
    insert(value) {
        const newNode = new TreeNode(value);
    
        if (!this.root) {
            this.root = newNode;
            return;
        }
    
        let current = this.root;
        while (true) {
            if (value < current.value) { // Lexicographical or numerical comparison
                if (!current.left) {
                    current.left = newNode;
                    return;
                }
                current = current.left;
            } else {
                if (!current.right) {
                    current.right = newNode;
                    return;
                }
                current = current.right;
            }
        }
    }
    
    deleteNode(root, value) {
        if (!root) {
            return null;
        }
    
        if (value < root.value) {
            root.left = this.deleteNode(root.left, value);
            return root;
        } else if (value > root.value) {
            root.right = this.deleteNode(root.right, value);
            return root;
        } else {
            // Node with only one child or no child
            if (!root.left) {
                return root.right;
            } else if (!root.right) {
                return root.left;
            }
    
            // Node with two children: Get the inorder successor
            root.value = this.minValue(root.right);
    
            // Delete the inorder successor
            root.right = this.deleteNode(root.right, root.value);
            return root;
        }
    }
        
    // Delete a node from the binary tree
    delete(value) {
        const nodeToDelete = this.search(value);
        if (!nodeToDelete) {
            alert(`Value "${value}" not found in the tree. Cannot delete.`);
            return;
        }
        this.root = this.deleteNode(this.root, value);
    }
    
    minValue(root) {
        let minv = root.value;
        while (root.left != null) {
            minv = root.left.value;
            root = root.left;
        }
        return minv;
    }
    
    // Search a node in the binary tree
    search(value) {
        return this.searchNode(this.root, value);
    }
    
    searchNode(node, value) {
        if (!node) {
            return null; // Return null if not found
        }
    
        if (value === node.value) { // Check for exact match
            return node; // Return the node if found
        }
    
        if (value < node.value) { // Lexicographical or numerical comparison
            return this.searchNode(node.left, value);
        } else {
            return this.searchNode(node.right, value);
        }
    }
}
    
// Function to draw the binary tree on canvas
let animationProgress = 0;
    
function drawTree(searchedNode = null) {
    const canvas = document.getElementById('treeCanvas');
    const ctx = canvas.getContext('2d');
    const tree = window.tree; // Access the global tree object
    
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    
    if (!tree.root) return;
    
    const levelGap = 80; // Vertical gap between levels
    const horizontalGap = canvas.width / Math.pow(2, getHeight(tree.root));
    
    function drawNode(node, x, y, levelWidth, searchedNode) {
        if (!node) return;
    
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2); // Draw circle for node
    
        // Check if this is the searched node
        if (searchedNode && node === searchedNode) {
            ctx.fillStyle = 'orange'; // Highlight color for searched node
        } else {
            ctx.fillStyle = 'lightblue'; // Default color for nodes
        }
    
        ctx.fill();
        ctx.stroke();
    
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.font = '14px Arial';
        ctx.fillText(node.value, x, y + 5); // Write value inside circle
    
        const childY = y + levelGap;
    
        if (node.left) {
            const childXLeft = x - levelWidth / 2;
            ctx.beginPath();
            ctx.moveTo(x, y + 20); // Draw line to left child
            ctx.lineTo(childXLeft, childY - 20);
            ctx.stroke();
    
            drawNode(node.left, childXLeft, childY, levelWidth / 2, searchedNode);
        }
    
        if (node.right) {
            const childXRight = x + levelWidth / 2;
            ctx.beginPath();
            ctx.moveTo(x, y + 20); // Draw line to right child
            ctx.lineTo(childXRight, childY - 20);
            ctx.stroke();
    
            drawNode(node.right, childXRight, childY, levelWidth / 2, searchedNode);
        }
    }
        
    drawNode(tree.root, canvas.width / 2, levelGap / 2, horizontalGap, searchedNode);
}
    
function getHeight(node) {
    if (!node) return -1;
    
    return Math.max(getHeight(node.left), getHeight(node.right)) + 1;
}
    
// Reset animation progress before drawing
function drawTreeAsync(searchedNode = null) {
    animationProgress = 0;
    drawTree(searchedNode);
}
    
// Initialize the binary tree
window.tree = new BinaryTree();
    
// Event handlers for insert and delete buttons
function insertNode() {
    const valueInput = document.getElementById('nodeValue');
    const value = valueInput.value.trim(); // Accept strings directly
    
    if (value !== '') {
        window.tree.insert(value);
        valueInput.value = ''; // Clear input field
        drawTreeAsync(); // Redraw tree after insertion
    } else {
        alert('Please enter a valid input!');
    }
}
    
function deleteNode() {
    const valueInput = document.getElementById('nodeValue');
    const value = valueInput.value.trim(); // Accept strings directly
    
    if (value !== '') {
        window.tree.delete(value);
        valueInput.value = ''; // Clear input field
        drawTreeAsync(); // Redraw tree after deletion
    } else {
        alert('Please enter a valid input!');
    }
}
    
function searchNode() {
    const valueInput = document.getElementById('nodeValue');
    const value = valueInput.value.trim(); // Accept strings directly
    
    if (value !== '') {
        const foundNode = window.tree.search(value);
    
        if (foundNode) {
            drawTreeAsync(foundNode); // Highlight found node in orange
            alert(`Value "${value}" found in the tree.`);
        } else {
            drawTreeAsync();
            alert(`Value "${value}" not found in the tree.`);
        }
        
        valueInput.value = ''; // Clear input field
    } else {
        alert('Please enter a valid input!');
    }
}
