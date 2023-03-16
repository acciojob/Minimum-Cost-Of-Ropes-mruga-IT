const input = document.querySelector('input[type="text"]');
const resultDiv = document.getElementById('result');

input.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    const ropes = input.value.split(',').map(Number);
    const minCost = getMinCost(ropes);
    resultDiv.textContent = minCost;
  }
});

function getMinCost(ropes) {
  let cost = 0;
  let heap = new MinHeap(ropes);

  while (heap.getSize() > 1) {
    let first = heap.extractMin();
    let second = heap.extractMin();
    let sum = first + second;
    cost += sum;
    heap.insert(sum);
  }

  return cost;
}

class MinHeap {
  constructor(arr) {
    this.heap = arr;
    this.heapify();
  }

  heapify() {
    const len = this.heap.length;
    for (let i = Math.floor(len / 2); i >= 0; i--) {
      this.siftDown(i);
    }
  }

  siftDown(i) {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let smallest = i;

    if (left < this.heap.length && this.heap[left] < this.heap[smallest]) {
      smallest = left;
    }

    if (right < this.heap.length && this.heap[right] < this.heap[smallest]) {
      smallest = right;
    }

    if (smallest !== i) {
      [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
      this.siftDown(smallest);
    }
  }

  extractMin() {
    const min = this.heap[0];
    const last = this.heap.pop();

    if (this.heap.length) {
      this.heap[0] = last;
      this.siftDown(0);
    }

    return min;
  }

  insert(value) {
    this.heap.push(value);
    this.siftUp(this.heap.length - 1);
  }

  siftUp(i) {
    const parent = Math.floor((i - 1) / 2);

    if (i > 0 && this.heap[i] < this.heap[parent]) {
      [this.heap[i], this.heap[parent]] = [this.heap[parent], this.heap[i]];
      this.siftUp(parent);
    }
  }

  getSize() {
    return this.heap.length;
  }
}