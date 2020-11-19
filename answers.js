// 1. Understanding merge sort
// Given the following list of numbers 21, 1, 26, 45, 29, 28, 2, 9, 16, 49, 39, 27, 43, 34, 46, 40
// What is the resulting list that will be sorted after 3 recursive calls to mergesort?
// [21, 1, 26, 45, 29, 28, 2, 9] [16, 49, 39, 27, 43, 34, 46, 40]
// [21, 1, 26, 45] [29, 28, 2, 9] [16, 49, 39, 27] [43, 34, 46, 40]
// [21, 1] [26, 45] [29, 28] [2, 9] [16, 49] [39, 27] [43, 34] [46, 40]
// What is the resulting list that will be sorted after 16 recursive calls to mergesort?
//7 + 8 [21] [1] [26] [45] [29] [28] [2] [9] [16] [49] [39] [27] [43] [34] [46] [40]
//9 + 10 [1, 21] [26, 45] [28, 29] [2, 9] [16, 49] [27, 39] [34, 43] [40, 46]
//11 + 12 [1, 21, 26, 46] [2, 9, 28, 29] [16, 27, 39, 49] [34, 40, 43, 46]
//13 + 14 [1, 2, 9, 21, 26, 28, 29, 46] [16, 27, 34, 39, 40, 43, 46, 49]
//15 + 16 [1, 2, 9, 16, 21, 26, 27, 28, 29, 34, 39, 40, 43, 46, 46, 49]
// What are the first 2 lists to be merged?
// [21] & [1]
// Which two lists would be merged on the 7th merge?
// [1, 21, 26, 46] [2, 9, 28, 29]

// 1) Suppose you are debugging a quicksort implementation that is supposed to sort an array in ascending order. After the first partition step has been completed, the contents of the array is in the following order: 3 9 1 14 17 24 22 20. 
//Which of the following statements is correct about the partition step? Explain your answer.

// The pivot could have been either 14 or 17
// This is correct. They are the only two values for which all values on the left are less and 
// all values on the right are greater. 
// 2) Given the following list of numbers 14, 17, 13, 15, 19, 10, 3, 16, 9, 12 show the resulting list after the second partitioning according to the quicksort algorithm.

// When using the last item on the list as a pivot
// [9, 3, 10, 12, 14, 17, 13, 15, 19, 16]
// [15, 13, 14, 12, 10, 3, 9, 16, 17, 19]
// When using the first item on the list as a pivot
// [12, 9, 3, 10, 13, 14, 17, 15, 19, 16]
// [10, 3, 9, 12, 13, 14, 17, 15, 19, 16]


function qSort(array, start = 0, end = array.length) {
    if (start >= end) {
        return array;
    }
    const middle = partition(array, start, end);
    array = qSort(array, start, middle);
    array = qSort(array, middle + 1, end);
    return array;
};

function partition(array, start, end) {
    const pivot = Number(array[end - 1]);
    let j = start;
    for (let i = start; i < end - 1; i++) {
        if (Number(array[i]) <= pivot) {
            swap(array, i, j);
            j++;
        }
    }
    swap(array, end-1, j);
    return j;
};

function swap(array, i, j) {
    const tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
};

function mSort(array) {
    if (array.length <= 1) {
        return array;
    }

    const middle = Math.floor(array.length / 2);
    let left = array.slice(0, middle);
    let right = array.slice(middle, array.length);

    left = mSort(left);
    right = mSort(right);
    return merge(left, right, array);
};

function merge(left, right, array) {
    let leftIndex = 0;
    let rightIndex = 0;
    let outputIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
        if (Number(left[leftIndex]) < Number(right[rightIndex])) {
            array[outputIndex++] = left[leftIndex++];
        }
        else {
            array[outputIndex++] = right[rightIndex++];
        }
    }

    for (let i = leftIndex; i < left.length; i++) {
        array[outputIndex++] = left[i];
    }

    for (let i = rightIndex; i < right.length; i++) {
        array[outputIndex++] = right[i];
    }
    return array;
};

class _Node {
    constructor(value, next) {
        this.value = value
        this.next = next
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    insertFirst(item) {
        this.head = new _Node(item, this.head);
    }

    insertLast(item) {
        if (this.head === null) {
            this.insertFirst(item)
        }
        else {
            let tempNode = this.head;
            while (tempNode.next !== null) {
                tempNode = tempNode.next;
            }
            tempNode.next = new _Node(item, null);
        }
    }

    find(item) {
        let currNode = this.head;
        if (!this.head) {
            return null;
        }
        while (currNode.value !== item) {
            if (currNode.next === null) {
                return null;
            }
            else {
                currNode = currNode.next;
            }
        }
        return currNode;
    }

    remove(item) {
        if (!this.head) {
            return null;
        }

        if (this.head.value === item) {
            this.head = this.head.next;
            return;
        }

        let currNode = this.head;
        let previousNode = this.head;

        while ((currNode !== null) && (currNode.value !== item)) {
            previousNode = currNode;
            currNode = currNode.next;
        }
        if (currNode === null) {
            console.log('Item not found');
            return;
        }
        previousNode.next = currNode.next;
    }

    insertBefore(newItem, item) {
        if (!this.head) {
            return null;
        }

        if (this.head.value === item) {
            newNext = this.head
            this.head = new _Node(newItem, newNext)
            return;
        }

        let currNode = this.head;
        let previousNode = this.head;

        while ((currNode !== null) && (currNode.value !== item)) {
            previousNode = currNode;
            currNode = currNode.next;
        }
        if (currNode === null) {
            console.log('Item not found');
            return;
        }
        previousNode.next = new _Node(newItem, currNode)
    }

    insertAfter(newItem, item) {
        if (!this.head) {
            return null;
        }

        if (this.head.value === item) {
            const newNext = this.head.next
            this.head.next = new _Node(newItem, newNext)
            return;
        }

        let currNode = this.head;
        if (!this.head) {
            return null;
        }
        while (currNode.value !== item) {
            if (currNode.next === null) {
                return 'Item not found';
            }
            else {
                currNode = currNode.next;
            }
        }
        const newNext = currNode.next
        currNode.next = new _Node(newItem, newNext)
    }

    insertAt(newItem, position) {
        let currPosition = 1;
        let currNode = this.head;
        let previousNode = this.head;

        for (let i = 1; i <= position; i++) {
            previousNode = currNode;
            currNode = currNode.next;
            currPosition++
        }
        if (currNode === null) {
            console.log(`Position doesn't exist`);
            return;
        }
        previousNode.next = new _Node(newItem, currNode)
    }
}


const arrayText = '89 30 25 32 72 70 51 42 25 24 53 55 78 50 13 40 48 32 26 2 14 33 45 72 56 44 21 88 27 68 15 62 93 98 73 28 16 46 87 28 65 38 67 16 85 63 23 69 64 91 9 70 81 27 97 82 6 88 3 7 46 13 11 64 76 31 26 38 28 13 17 69 90 1 6 7 64 43 9 73 80 98 46 27 22 87 49 83 6 39 42 51 54 84 34 53 78 40 14 5'
const array = arrayText.split(' ');

console.log(qSort(array));
console.log(mSort(array));

function mSortList (list) {
    let currNode = list.head;
    if (currNode.next === null) {
      return list;
    }
    let length = 1;
    while (currNode.next !== null) {
      length++;
      currNode = currNode.next;
    }
    const middle = Math.floor(length/2);
    let leftList = splitList(list, 0, middle);

    let rightList = splitList(list, middle, length);

    leftList = mSortList(leftList);
    rightList = mSortList(rightList);
  
    return mergeLists (leftList, rightList);
    
  }
  
  function splitList (list, start, endI) {
    let currNode = list.head;
    if (currNode === null) return;
    const returnList = new LinkedList();
    let i = 0;
    while (currNode !== null) {
      if (i >= start && i < endI) {
        returnList.insertLast(currNode.value);
      }    
      i++;
      currNode = currNode.next;
    }
    return returnList;
  }
  
  function mergeLists (leftList, rightList) {
    const mergedList = new LinkedList();
    let currLeft = leftList.head;
    let currRight = rightList.head;
    
    while (currLeft && currRight) {

      if (currLeft.value <= currRight.value) {
        mergedList.insertLast(currLeft.value);
        currLeft = currLeft.next;
      }

      else {
        mergedList.insertLast(currRight.value);
        currRight = currRight.next;
      }
    }

    while (currLeft) {
      mergedList.insertLast(currLeft.value);
      currLeft = currLeft.next;
    }
    while (currRight) {
      mergedList.insertLast(currRight.value);
      currRight = currRight.next;
    }

    return mergedList;
  }

function linkedListSort() {
    const list = new LinkedList();
    list.insertFirst(1);
    list.insertLast(9);
    list.insertLast(3);
    list.insertLast(6);
    list.insertLast(10);
    list.insertLast(4);
    list.insertLast(2);
    list.insertLast(5);
    list.insertLast(7);
    list.insertLast(8);

    console.log(mSortList(list));
}

linkedListSort();

function randomShuffle(array) {
    const newArray = [];
    for (let i = 0; i < array.length; i++) {
        newArray.push(null)
    }

    for (let i = 0; i < array.length; i++) {
        let randomIndex = Math.floor(Math.random() * arr.length); 
        if (newArray[randomIndex] === null) {
            newArray[randomIndex] = array[i]
    }
    return array;
}

console.log(randomShuffle([2, 5, 8, 1, 3, 5, 2, 11, 2]));


function alphabetize (str1, str2, charIndex=0) {
    if (str1 === str2) {
      return true;
    }
    if (str1.toLowerCase().charCodeAt([charIndex]) < str2.toLowerCase().charCodeAt([charIndex])) {
      return true;
    }
    else if (str1.toLowerCase().charCodeAt([charIndex]) > str2.toLowerCase().charCodeAt([charIndex])) {
      return false;
    }
    else {
      return alphabetize (str1, str2, charIndex+1);
    }
  }
  
  
  function mSortStrings (arr) {
    if (arr.length <= 1) {
      return arr;
    }
    const middle = Math.floor(arr.length/2);
    let left = arr.slice(0, middle);
    let right = arr.slice(middle, arr.length);
  
    left = mSortStrings (left);
    right = mSortStrings (right);
    return mergeStringArr (left, right, arr);
  }
  
  function mergeStringArr (left, right, arr) {
    let leftI = 0;
    let rightI = 0;
    let outputI = 0;
    while (leftI < left.length && rightI < right.length) {
      if (alphabetize(left[leftI], right[rightI])) {
        arr[outputI++] = left[leftI++];
      }
      else {
        arr[outputI++] = right[rightI++];
      }
    }
    for (let i = leftI; i < left.length; i++) {
      arr[outputI++] = left[i];
    }
    for (let i = rightI; i < right.length; i++) {
      arr[outputI++] = right[i];
    }
    return arr;
  }