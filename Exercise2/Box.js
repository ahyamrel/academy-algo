function swap(items, leftIndex, rightIndex){
    let temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
}

function partition(items, left, right) {
    const pivot = items[Math.floor((right + left) / 2)].area;
    let i = left;
    let j = right;

    while (i <= j) {
        while (items[i].area < pivot) {
            i++;
        }
        while (items[j].area > pivot) {
            j--;
        }
        if (i <= j) {
            swap(items, i, j);
            i++;
            j--;
        }
    }

    return i;
}

function quickSort(items, left, right) {
    let index;
    if (items.length > 1) {
        index = partition(items, left, right);
        if (left < index - 1) {
            quickSort(items, left, index - 1);
        }
        if (index < right) { 
            quickSort(items, index, right);
        }
    }
    return items;
}



function buildTower(length, width, height) 
{
  const boxes = [];
  const n = length.length
  for (let i = 0; i < n; i++) 
  {
    boxes[i] = {};
    boxes[i].height = height[i]; 
    boxes[i].length = length[i]; 
    boxes[i].width = width[i];
    boxes[i].area = length[i] * width[i];
  }

  quickSort(boxes, 0, n - 1);
  boxes.reverse() 

  const maxHeight = [];
  const towers = [];

  for (let i = 0; i < n; i++) { 
    maxHeight[i] = boxes[i].height;
    towers[i] = [];
  }
    console.log(boxes)
    for (let i = 1; i < n; i++) {
      for (let j = 0; j < i; j++) {
        if (boxes[i].width < boxes[j].width && 
            boxes[i].length < boxes[j].length && 
            maxHeight[i] < maxHeight[j] + boxes[i].height) {
          maxHeight[i] = maxHeight[j] + boxes[i].height;
          towers[i].unshift(boxes[j])
        }
      }

    }
  
   let max = -1; 
   let tower;
   for (let i = 0; i < n; i++) 
      if (max < maxHeight[i]) {
        max = maxHeight[i];
        tower = towers[i];
      } 
  
   return { max, tower };
} 

const length = [1, 2, 5, 18, 40, 50, 70, 12, 16, 15, 26, 150, 178, 99, 102, 134, 22, 29, 46, 68]
const width = [1, 2, 5, 18, 182, 50, 70, 12, 16, 15, 26, 189, 163, 99, 64, 159, 22, 29, 191, 68]
const height = [6, 155, 5, 18, 63, 142, 70, 12, 16, 2, 45, 87, 189, 99, 102, 184, 44, 29, 32, 11]

const maxTower = buildTower(length, width, height);

console.log(`Max height: ${maxTower.max}`);
console.log(maxTower.tower)