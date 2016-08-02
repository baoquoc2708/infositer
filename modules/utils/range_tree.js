/*

   Only here to store time boxed segments as range keyed nodes in a
   small tree. Hence the recursion, which JS doesn't really handle
   well. You probably don't want to put thousands of items in one, but
   other than that it should be fine to use without beating up the
   stack.

   Structurally, this is an AVL balanced binary tree with a guaranteed
   access time of O(log n)

   See: https://en.wikipedia.org/wiki/AVL_tree for reference.

   Would have just kept this a standard binary tree, but since slides
   and such tend to be added in ascending timecode order, a naive
   binary tree degenerates rather quickly into a linked list.

 */

const RangeTree = function() {
  this.root   = null;
  this.length = 0;
};

function rangeError(existingNode, newNode) {
  throw new Error('Overlapping ranges: ' + existingNode.rangeStart +  '..' +
                  existingNode.rangeEnd + ', ' + newNode.rangeStart + '..' +
                  newNode.rangeEnd);
}


function isLeft(node) {
  return node.parent.left === node;
}

function isRight(node) {
  return node.parent.right === node;
}

function search(key, node) {
  if(node === null) {
    return null;
  } else if(node.rangeStart <= key && node.rangeEnd > key) {
    return node.value;
  } else if (key < node.rangeStart) {
    return search(key, node.left);
  } else { // key > node.rangeEnd
    return search(key, node.right);
  }
}

// returns node, not value
function nearest(key, node, state={ leftMin: Number.MAX_VALUE, rightMin: Number.MAX_VALUE }) {
  const { closest, leftMin, rightMin } = state;
  let nextMin;
  if(node === null) {
    return closest;
  } else if(node.rangeStart <= key && node.rangeEnd > key) {
    return node;
  } else if(key < node.rangeStart) {
    nextMin = Math.abs(key - node.rangeStart);
    return nearest(key, node.left, {
      closest: nextMin < leftMin ? node : closest,
      leftMin: Math.min(nextMin, leftMin),
      rightMin
    });
  } else {
    nextMin = Math.abs(key - node.rangeEnd);
    return nearest(key, node.right, {
      closest: nextMin < rightMin ? node : closest,
      rightMin: Math.min(nextMin, rightMin),
      leftMin
    });
  }
}

function min(node) {
  if(node.left) {
    return min(node.left);
  } else {
    return node;
  }
}

function max(node) {
  if(node.right) {
    return max(node.right);
  } else {
    return node;
  }
}

RangeTree.prototype = {
  /**
   * Ranges may not intersect but upper and lower bounds may be equal e.g.
   *
   *  * Legal: .add(1,3, val1); .add(3,5, val2)
   *  * Error: .add(1,3, val1); .add(2,5, val2)
   *
   * @param {sortable} rangeStart - The lower bound of the range key
   * @param {sortable} rangeEnd   - The upper bound of the range key
   * @param {*} value             - The stored value
   */
  add(rangeStart, rangeEnd, value) {
    let node = {
      rangeStart: rangeStart,
      rangeEnd: rangeEnd,
      value: value,
      balance: 0,
      left: null,
      right: null,
      parent: null
    };
    if(this.root === null) {
      this.root = node;
    } else {
      this.traverse(this.root, node);
    }
    this.length++;
    return this;
  },

  /**
   * See the tests
   *
   * @param {sortable} key
   * @returns {*} value
   */
  inRange(key) {
    return search(key, this.root);
  },

  pred(key) {
    const node = nearest(key, this.root);
    if(!node) return null;
    if(node.left) {
      return max(node.left).value;
    } else {
      let p = node.parent,
          n = node;
      while(p && n === p.left) {
        n = p;
        p = p.parent;
      }
      return p? p.value : null;
    }
  },

  succ(key) {
    const node = nearest(key, this.root);
    if(!node) return null;
    if(node.right) {
      return min(node.right).value;
    } else {
      let p = node.parent,
          n = node;
      while(p && n === p.right) {
        n = p;
        p = p.parent;
      }
      return p? p.value : null;
    }
  },

  traverse(parent, newNode) {
    if(newNode.rangeStart < parent.rangeStart) {
      if(newNode.rangeEnd > parent.rangeStart) { rangeError(parent, newNode); }

      if(parent.left === null) {
        parent.left    = newNode;
        newNode.parent = parent;
        this.setBalance(newNode);
      } else {
        this.traverse(parent.left, newNode);
      }
    } else if (newNode.rangeStart >= parent.rangeEnd) {
      if(parent.right === null) {
        parent.right    = newNode;
        newNode.parent  = parent;
        this.setBalance(newNode);
      } else {
        this.traverse(parent.right, newNode);
      }
    } else {
      rangeError(parent, newNode);
    }
  },

  setBalance(node) {
    if(node.balance > 1 || node.balance < -1) {
      this.rebalance(node);
    } else if(node.parent) {
      if(isLeft(node)) {
        node.parent.balance++;
      } else {
        node.parent.balance--;
      }
      if(node.parent.balance !== 0) {
        this.setBalance(node.parent);
      }
    }
  },

  rebalance(node) {
    if(node.balance < 0) {
      if(node.right.balance > 0) {
        this.rotateRight(node.right);
        this.rotateLeft(node);
      } else {
        this.rotateLeft(node);
      }
    } else if(node.balance > 0) {
      if(node.left.balance < 0) {
        this.rotateLeft(node.left);
        this.rotateRight(node);
      } else {
        this.rotateRight(node);
      }
    }
  },

  rotateLeft(node) {
    let root = node.right;
    node.right = root.left;
    if(root.left) {
      root.left.parent = node;
    }

    root.parent = node.parent;
    if(!root.parent) {
      this.root = root;
    } else if(isLeft(node)) {
      node.parent.left = root;
    } else {
      node.parent.right = root;
    }

    root.left     = node;
    node.parent   = root;
    node.balance += 1 - Math.min(root.balance, 0);
    root.balance += 1 + Math.max(node.balance, 0);
  },

  rotateRight(node) {
    let root = node.left;
    node.left = root.right;
    if(root.right) {
      root.right.parent = node;
    }

    root.parent = node.parent;
    if(!root.parent) {
      this.root = root;
    } else if(isRight(node)) {
      node.parent.right = root;
    } else {
      node.parent.left = root;
    }

    root.right     = node;
    node.parent   = root;
    node.balance += 1 - Math.min(root.balance, 0);
    root.balance += 1 + Math.max(node.balance, 0);
  }
};

export default RangeTree;
