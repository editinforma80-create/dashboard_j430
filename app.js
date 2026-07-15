const BASE_URL =
"https://script.google.com/macros/s/AKfycbyYoQ8K-Iz1_X_l35H8xsnfzI4AgEn4wuyUc_qvnad8mUR61KMAX7NwYXgnPC9b_wVE/exec";

loadAll();

async function loadAll(){

await loadExecutive();

await loadBrand();

await loadCommodity();

await loadWeekly();

await loadTopSKU();

document
.getElementById(
"lastUpdate"
)
.innerText =
new Date()
.toLocaleString("id-ID");

}

function formatNumber(num){

return new Intl.NumberFormat(
"id-ID"
).format(num);

}

async function loadExecutive(){

const res =
await fetch(
BASE_URL +
"?action=executive"
);

const data =
await res.json();

data.forEach(item=>{

switch(item.kpi){

case "SALES":

document
.getElementById("sales")
.innerText =
formatNumber(item.value);

break;

case "TARGET":

document
.getElementById("target")
.innerText =
formatNumber(item.value);

break;

case "ACHIEVEMENT":

document
.getElementById("achievement")
.innerText =
item.value;

document
.getElementById("insight")
.innerHTML =

`
<div>
<b>Status :</b>
${item.status}
</div>

<div>
${item.remark}
</div>
`;

break;

case "INVENTORY":

document
.getElementById("inventory")
.innerText =
formatNumber(item.value);

break;

}

});

}

async function loadBrand(){

try{

const res =
await fetch(
BASE_URL +
"?action=brand"
);

const data =
await res.json();

const container =
document.getElementById(
"brandContainer"
);

container.innerHTML="";

data
.sort(
(a,b)=>
b.sales-a.sales
)
.slice(0,10)
.forEach(row=>{

container.innerHTML +=

`
<div class="item">

<div class="item-title">

${row.brand}

</div>

<div>

Sales :
${formatNumber(
row.sales
)}

</div>

<div>

Achievement :
${(
Number(row.ach)*100
).toFixed(1)}%

</div>

</div>
`;

});

}catch(e){

console.log(e);

}

}

async function loadCommodity(){

try{

const res =
await fetch(
BASE_URL +
"?action=commodity"
);

const data =
await res.json();

const container =
document.getElementById(
"commodityContainer"
);

container.innerHTML="";

data.forEach(row=>{

container.innerHTML +=

`
<div class="item">

<div class="item-title">

${row.commodity}

</div>

<div>

Sales :
${formatNumber(
row.sales
)}

</div>

</div>
`;

});

}catch(e){

console.log(e);

}

}

async function loadWeekly(){

try{

const res =
await fetch(
BASE_URL +
"?action=weekly"
);

const data =
await res.json();

const container =
document.getElementById(
"weeklyContainer"
);

container.innerHTML="";

data.forEach(row=>{

container.innerHTML +=

`
<div class="item">

<div class="item-title">

${row.name}

</div>

<div>

Plan :
${formatNumber(
row.plan
)}

</div>

<div>

Actual :
${formatNumber(
row.actual
)}

</div>

</div>
`;

});

}catch(e){

console.log(e);

}

}

async function loadTopSKU(){

try{

const res =
await fetch(
BASE_URL +
"?action=topsku"
);

const data =
await res.json();

const container =
document.getElementById(
"topskuContainer"
);

container.innerHTML="";

data
.slice(0,20)
.forEach(row=>{

container.innerHTML +=

`
<div class="item">

<div class="item-title">

${row.product_name ||
row.name ||
row.sku ||
"SKU"}

</div>

<div>

Sales :
${formatNumber(
row.sales ||
0
)}

</div>

</div>
`;

});

}catch(e){

console.log(e);

}

}