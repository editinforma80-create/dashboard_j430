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

const badgeColor =
item.status === "GOOD"
? "#16a34a"
: "#dc2626";

document
.getElementById("insight")
.innerHTML =

`
<div class="alert-box">

<div
class="alert-status"
style="
background:${badgeColor};
">

${item.status}

</div>

<div class="alert-remark">

${item.remark}

</div>

</div>
`;

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
BASE_URL + "?action=brand"
);

const data =
await res.json();

const container =
document.getElementById(
"brandContainer"
);

container.innerHTML="";

data
.sort((a,b)=>b.sales-a.sales)
.slice(0,10)
.forEach(row=>{

const ach =
Number(row.ach) * 100;

const color =
row.status === "GOOD"
? "#16a34a"
: "#dc2626";

container.innerHTML +=

`
<div class="brand-card">

<div class="brand-header">

<span class="brand-name">
${row.brand}
</span>

<span
class="brand-ach"
style="color:${color}">
${ach.toFixed(1)}%
</span>

</div>

<div class="progress">

<div
class="progress-fill"
style="
width:${Math.min(ach,100)}%;
background:${color};
">
</div>

</div>

<div class="brand-sales">

Rp ${formatNumber(row.sales)}

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
BASE_URL + "?action=commodity"
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
<div class="commodity-card">

<div class="commodity-name">
${row.commodity}
</div>

<div class="commodity-sales">
Rp ${formatNumber(row.sales)}
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
BASE_URL + "?action=weekly"
);

const data =
await res.json();

const container =
document.getElementById(
"weeklyContainer"
);

container.innerHTML="";

data.forEach(row=>{

let color = "#94a3b8";

if(
Number(row.actual) >
Number(row.plan)
){
color = "#16a34a";
}

if(
Number(row.actual) === 0
){
color = "#cbd5e1";
}

container.innerHTML +=

`
<div class="week-card">

<div class="week-day">
${row.name}
</div>

<div class="week-plan">
Plan
<br>
${formatNumber(row.plan)}
</div>

<div class="week-actual"
style="color:${color}">
${formatNumber(row.actual)}
</div>

</div>
`;

});

}catch(e){

console.log(e);

}

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

container.innerHTML = "";

data
.slice(0,20)
.forEach((row,index)=>{

container.innerHTML +=

`
<div class="item">

<div class="item-rank">
#${index + 1}
</div>

<div class="item-content">

<div class="item-title">
${row.PRODUCT_NAME}
</div>

<div class="item-brand">
${row.BRAND}
</div>

</div>

<div class="item-sales">
Rp ${formatNumber(
row.SALES_TM
)}
</div>

</div>
`;

});

}catch(e){

console.log(e);

}

}