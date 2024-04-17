

class Node {
    constructor(value, nextNode) {
        this.value = value,
        this.nextNode = nextNode;
    }
}

class LinkedList {
    constructor() {
        this.nextNode = null
    }
    addFirst(value) {
        let node = new Node(value, null)
        this.nextNode = node;
    }
    append(value) {
        if (this.nextNode == null) {
            this.addFirst(value)
        } else {
            // create a node; the pointer is null because we are the last node
            let node = new Node(value, null);
            // keep track of which node we are iterating over
            let currentNode = this;
            // traversing: as long as the node we are currently on points to something, it's not the last
            while (currentNode.nextNode !== null) {
                // keep moving down the line until we find a node that has a null pointer
                currentNode = currentNode.nextNode;
            }
            // make that pointer point to us
            currentNode.nextNode = node;
        }
    }
    prepend(value) {
        if (this.nextNode == null) {
            this.addFirst(value)
        } else {
            // store first node in the chain
            let formerFirstNode = this.nextNode;
            // create a node; the pointer is null because we are the last node
            let node = new Node(value, null);
            // make head point to us
            this.nextNode = node;
            // make us point to the former first node
            node.nextNode = formerFirstNode;
        }
    }
    size() {
        let number = 0;
        let currentNode = this;
        while (currentNode !== null) {
            // keep moving down the line until we find a node that has a null pointer
            number++;
            currentNode = currentNode.nextNode;
        }
        return number;
    }
    head() {
        return this.nextNode;
    }
    tail() {
        // keep track of which node we are iterating over
        let currentNode = this;
        // traversing: as long as the node we are currently on points to something, it's not the last
        while (currentNode.nextNode !== null) {
            // keep moving down the line until we find a node that has a null pointer
            currentNode = currentNode.nextNode;
        }
        return currentNode;
    }
    at(index) {
        let number = 0;
        let matchingNode = null;
        let currentNode = this;
        while (currentNode !== null) {
            // keep moving down the line until we find a node that has a null pointer
            if (number == index) {
                matchingNode = currentNode;
            }
            number++;
            currentNode = currentNode.nextNode;
        }
        return matchingNode;
    }
    pop() {
        // keep track of number of nodes
        let number = 0;
        // traversing: find the last node
        let lastNode = this;
        while (lastNode.nextNode !== null) {
            // keep moving down the line until we find a node that has a null pointer
            number++;
            lastNode = lastNode.nextNode;
        }
        // if there is only only one node
        if (number < 2) {
            this.nextNode = null;
        } else {
        // traversing: find the second to last node
        let secondToLastNode = this;
        while (secondToLastNode.nextNode.nextNode !== null) {
            secondToLastNode = secondToLastNode.nextNode;
        }
        secondToLastNode.nextNode = null;
        }
    }
    contains(value) {
        let matchingNode = null;
        let currentValue = null;
        let currentNode = this;
        while (currentNode !== null) {
            currentValue = currentNode.value;
            if (currentValue == value) {
                matchingNode = currentNode;
            }
            currentNode = currentNode.nextNode;
        }
        if (matchingNode !== null) {
            return true;
        } else {
            return false;
        }
    }
    find(value) {
        let matchingNode = null;
        let currentValue = null;
        let currentNode = this;
        while (currentNode !== null) {
            currentValue = currentNode.value;
            if (currentValue == value) {
                matchingNode = currentNode;
            }
            currentNode = currentNode.nextNode;
        }
        return matchingNode;
    }
    toString() {
        let totalString = '';
        let currentString = '';
        let currentNode = this;
        while (currentNode !== null) {
            if (currentNode.value == undefined) {
                currentNode = currentNode.nextNode;
            } else {
                currentString = currentNode.value.toString();
                if (totalString == '') {
                    totalString = '( ' + currentString + ' )';
                } else {
                    totalString = totalString + ' -> ( ' + currentString + ' )';
                }
                currentNode = currentNode.nextNode;    
            }
        }
        return totalString;
    }
}

class HashMap {
    constructor() {
        this.buckets = [];
        this.buckets.length = 16;
    }
    hash(key) {
        let hashCode = 0;   
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
        return hashCode;
    } 
    set(key, value) {
        let hashCode = this.hash(key);
        // buckets limiter
        if (hashCode < 0 || hashCode >= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
        }
        if (this.buckets[hashCode] == null) {
            this.buckets[hashCode] = new LinkedList();
        }
        this.buckets[hashCode].append({ "key": key, "value": value});
    }
    get(key) {
        let hashCode = this.hash(key);
        if (this.buckets[hashCode]) {
            // if the bucket is not null, that means it's a linked list. so, we're traversing
            let currentNode = this.buckets[hashCode].nextNode;
            while (currentNode !== null) {
                if (currentNode.value.key == key) {
                    return currentNode.value.value;
                }
                // keep moving down the line until we find a node that has a null pointer
                currentNode = currentNode.nextNode;
            }
            return this.buckets[hashCode].value;
        } else {
            return null;
        }
    }
    has(key) {
        for (let i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i]) {
                let currentNode = this.buckets[i].nextNode;
                while (currentNode !== null) {
                    if (currentNode.value.key == key) {
                        return true;
                    }
                    currentNode = currentNode.nextNode;
                }
            }
        }
        return false;
    }
    remove(key) {
        for (let i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i]) {
                let currentNode = this.buckets[i].nextNode;
                let futureNode = this.buckets[i].nextNode.nextNode;
                while (futureNode !== null) {
                    if (currentNode.value.key == key) {
                        if (futureNode == null) {
                            currentNode.nextNode = null;
                        } else {
                            currentNode.nextNode = futureNode;
                        }
                        return true;
                    }
                    currentNode = currentNode.nextNode;
                    futureNode = futureNode.nextNode;
                }
            }
        }
        return false;
    }
    length() {        
        let numberOfBuckets = 0;
        for (let i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i]) {
                let currentNode = this.buckets[i].nextNode;
                while (currentNode !== null) {
                    numberOfBuckets++;
                    currentNode = currentNode.nextNode;
                }
            }
        }

        return numberOfBuckets;
    }
    clear() {
        for (let i = 0; i < this.buckets.length; i++) {
            this.buckets[i] = null;
        }
        this.buckets = [];
        this.buckets.length = 16;
    }
    keys() {
        let allKeys = [];
        for (let i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i]) {
                let currentNode = this.buckets[i].nextNode;
                while (currentNode !== null) {
                    allKeys.push(currentNode.value.key);           
                    currentNode = currentNode.nextNode;
                }
            }
        }
        return allKeys;
    }
    values() {
        let allValues = [];
        for (let i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i]) {
                let currentNode = this.buckets[i].nextNode;
                while (currentNode !== null) {
                    allValues.push(currentNode.value.value);
                    currentNode = currentNode.nextNode;
                }
            }
        }
        return allValues;
    }
    entries() {
        let allEntries = [];
        for (let i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i]) {
                let currentNode = this.buckets[i].nextNode;
                while (currentNode !== null) {
                    allEntries.push(`[${currentNode.value.key}, ${currentNode.value.value}]`);
                    currentNode = currentNode.nextNode;
                }
            }
        }
        return allEntries;
    }
    doWeGrow() {
        let capacity = 0;
        let loadFactor = 0.75;
        for (let i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i]) {
                let currentNode = this.buckets[i].nextNode;
                while (currentNode !== null) {
                    capacity++;           
                    currentNode = currentNode.nextNode;
                }
            }
        }        
        if ((capacity / loadFactor) > this.buckets.length) {
            this.buckets.length = this.buckets.length * 2;
        }
    }
}

// testing
let map1 = new HashMap();
map1.set(123, 'Value 1');
map1.set(123, 'Value 3');
map1.set(456, 'Value 2');
console.log(map1.entries());