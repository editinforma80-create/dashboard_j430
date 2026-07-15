const BASE_URL =
"https://script.google.com/macros/s/AKfycbyYoQ8K-Iz1_X_l35H8xsnfzI4AgEn4wuyUc_qvnad8mUR61KMAX7NwYXgnPC9b_wVE/exec";

loadAll();

async function loadAll(){

  try{

    await loadExecutive();
    await loadBrand();
    await loadCommodity();
    await loadWeekly();
    await loadTopSKU();

    document
    .getElementById("lastUpdate")
    .innerText =
    new Date().toLocaleString("id-ID");

  }catch(err){

    console.log(err);

  }

}

function formatNumber(num){

  return new Intl.NumberFormat(
    "id-ID"
  ).format(
    Number(num || 0)
  );

}

function formatPercent(num){

  return Number(num || 0)
    .toFixed(1) + "%";

}

function getStandardAchievement(){

  const today = new Date();

  const currentDay =
    today.getDate();

  const totalDays =
    new Date(
      today.getFullYear(),
      today.getMonth()+1,
      0
    ).getDate();

  return (
    currentDay /
    totalDays
  ) * 100;

}

/* ===================================
EXECUTIVE
=================================== */

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

      break;

      case "INVENTORY":

        document
        .getElementById("inventory")
        .innerText =
        formatNumber(item.value);

      break;

    }

  });

  const ach =
    data.find(
      x=>x.kpi==="ACHIEVEMENT"
    );

  if(ach){

    const color =
      ach.status === "GOOD"
      ? "#16a34a"
      : "#dc2626";

    document
    .getElementById("insight")
    .innerHTML =

    `
    <div class="alert-box">

      <div
      class="alert-status"
      style="background:${color}">

      ${ach.status}

      </div>

      <div class="alert-remark">

      ${ach.remark}

      </div>

    </div>
    `;

  }

}

/* ===================================
BRAND
=================================== */

async function loadBrand(){

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

  container.innerHTML = "";

  const standard =
    getStandardAchievement();

  data
  .sort(
    (a,b)=>
    b.sales-a.sales
  )
  .slice(0,10)
  .forEach(row=>{

    const ach =
      Number(row.ach || 0) * 100;

    const color =
      ach >= standard
      ? "#16a34a"
      : "#dc2626";

    container.innerHTML +=

    `
    <div class="brand-card">

      <div class="brand-header">

        <div class="brand-name">
        ${row.brand}
        </div>

        <div
        class="brand-ach"
        style="color:${color}">

        ${ach.toFixed(1)}%

        </div>

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

        Sales :
        Rp ${formatNumber(
          row.sales
        )}

      </div>

    </div>
    `;

  });

}

/* ===================================
COMMODITY
=================================== */

async function loadCommodity(){

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

  container.innerHTML = "";

  data.forEach(row=>{

    if(
      Number(row.sales) <= 0
    ) return;

    container.innerHTML +=

    `
    <div class="commodity-card">

      <div class="commodity-name">

      ${row.commodity}

      </div>

      <div class="commodity-sales">

      Rp ${formatNumber(
        row.sales
      )}

      </div>

    </div>
    `;

  });

}

/* ===================================
WEEKLY
=================================== */

async function loadWeekly(){

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

  container.innerHTML = "";

  data.forEach(row=>{

    container.innerHTML +=

    `
    <div class="week-card">

      <div class="week-day">

      ${row.name}

      </div>

      <div class="week-plan">

      Plan :
      ${formatNumber(
        row.plan
      )}

      </div>

      <div class="week-actual">

      ${formatNumber(
        row.actual
      )}

      </div>

    </div>
    `;

  });

}

/* ===================================
TOP SKU
=================================== */

async function loadTopSKU(){

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
  .sort(
    (a,b)=>
    Number(b.SALES_TM||0)
    -
    Number(a.SALES_TM||0)
  )
  .slice(0,20)
  .forEach((row,index)=>{

    container.innerHTML +=

    `
    <div class="item">

      <div class="item-rank">

      #${index+1}

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

}