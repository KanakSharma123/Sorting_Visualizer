let delay = 80;

function sleep(ms){
return new Promise(resolve => setTimeout(resolve,ms));
}

document.getElementById("speed").addEventListener("input",function(){
delay = 210-this.value;
});

function toggleDark(){
document.body.classList.toggle("dark");
}

function generateArrays(){

let size=document.getElementById("size").value;

let values=[];

for(let i=0;i<size;i++){
values.push(Math.floor(Math.random()*150)+20);
}

createBars("bubble",values);
createBars("selection",values);
createBars("insertion",values);
createBars("quick",values);
createBars("merge",values);

resetCounters();
}

function createBars(containerId,values){

let container=document.getElementById(containerId);
container.innerHTML="";

values.forEach(v=>{
let bar=document.createElement("div");
bar.classList.add("bar");
bar.style.height=v+"px";
container.appendChild(bar);
});
}

function resetCounters(){

let algos=["bubble","selection","insertion","quick","merge"];

algos.forEach(a=>{
document.getElementById(a+"-comp").innerText=0;
document.getElementById(a+"-swap").innerText=0;
});
}

function inc(id){
document.getElementById(id).innerText++;
}

async function swap(bar1,bar2,algo){

bar1.classList.add("compare");
bar2.classList.add("compare");

let temp=bar1.style.height;
bar1.style.height=bar2.style.height;
bar2.style.height=temp;

inc(algo+"-swap");

await sleep(delay);

bar1.classList.remove("compare");
bar2.classList.remove("compare");
}

async function bubbleSort(container){

let bars=container.children;

for(let i=0;i<bars.length;i++){

for(let j=0;j<bars.length-i-1;j++){

bars[j].classList.add("compare");
bars[j+1].classList.add("compare");

inc("bubble-comp");

await sleep(delay);

if(parseInt(bars[j].style.height)>parseInt(bars[j+1].style.height)){
await swap(bars[j],bars[j+1],"bubble");
}

bars[j].classList.remove("compare");
bars[j+1].classList.remove("compare");

}

bars[bars.length-i-1].classList.add("sorted");

}
}

async function selectionSort(container){

let bars=container.children;

for(let i=0;i<bars.length;i++){

let min=i;

for(let j=i+1;j<bars.length;j++){

bars[j].classList.add("compare");

inc("selection-comp");

await sleep(delay);

if(parseInt(bars[j].style.height)<parseInt(bars[min].style.height)){
min=j;
}

bars[j].classList.remove("compare");

}

await swap(bars[i],bars[min],"selection");

bars[i].classList.add("sorted");

}
}

async function insertionSort(container){

let bars=container.children;

for(let i=1;i<bars.length;i++){

let j=i;

while(j>0){

bars[j].classList.add("compare");
bars[j-1].classList.add("compare");

inc("insertion-comp");

await sleep(delay);

if(parseInt(bars[j-1].style.height)>parseInt(bars[j].style.height)){
await swap(bars[j],bars[j-1],"insertion");
}
else{
bars[j].classList.remove("compare");
bars[j-1].classList.remove("compare");
break;
}

bars[j].classList.remove("compare");
bars[j-1].classList.remove("compare");

j--;
}

}

for(let b of bars){
b.classList.add("sorted");
}
}

async function quickSort(container){

let bars=container.children;

await quickHelper(bars,0,bars.length-1);

for(let b of bars){
b.classList.add("sorted");
}
}

async function quickHelper(bars,low,high){

if(low<high){

let pi=await partition(bars,low,high);

await quickHelper(bars,low,pi-1);
await quickHelper(bars,pi+1,high);

}
}

async function partition(bars,low,high){

let pivot=parseInt(bars[high].style.height);

let i=low-1;

for(let j=low;j<high;j++){

bars[j].classList.add("compare");

inc("quick-comp");

await sleep(delay);

if(parseInt(bars[j].style.height)<pivot){

i++;
await swap(bars[i],bars[j],"quick");

}

bars[j].classList.remove("compare");

}

await swap(bars[i+1],bars[high],"quick");

return i+1;
}

async function mergeSort(container){

let bars=container.children;

let arr=[];

for(let b of bars){
arr.push(parseInt(b.style.height));
}

await mergeHelper(arr,0,arr.length-1,bars);

for(let b of bars){
b.classList.add("sorted");
}
}

async function mergeHelper(arr,l,r,bars){

if(l>=r) return;

let mid=Math.floor((l+r)/2);

await mergeHelper(arr,l,mid,bars);
await mergeHelper(arr,mid+1,r,bars);

await merge(arr,l,mid,r,bars);
}

async function merge(arr,l,mid,r,bars){

let left=arr.slice(l,mid+1);
let right=arr.slice(mid+1,r+1);

let i=0,j=0,k=l;

while(i<left.length && j<right.length){

bars[k].classList.add("compare");

inc("merge-comp");

await sleep(delay);

if(left[i]<=right[j]){
arr[k]=left[i];
bars[k].style.height=left[i]+"px";
i++;
}
else{
arr[k]=right[j];
bars[k].style.height=right[j]+"px";
j++;
}

inc("merge-swap");

bars[k].classList.remove("compare");

k++;
}

while(i<left.length){

arr[k]=left[i];
bars[k].style.height=left[i]+"px";

await sleep(delay);

i++;
k++;
}

while(j<right.length){

arr[k]=right[j];
bars[k].style.height=right[j]+"px";

await sleep(delay);

j++;
k++;
}
}

async function compareSorts(){

bubbleSort(document.getElementById("bubble"));
selectionSort(document.getElementById("selection"));
insertionSort(document.getElementById("insertion"));
quickSort(document.getElementById("quick"));
mergeSort(document.getElementById("merge"));

}