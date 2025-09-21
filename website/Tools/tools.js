document.addEventListener("DOMContentLoaded", () => {
  const $ = id => document.getElementById(id);

  const form = $("calcform");
  if (form) form.addEventListener("submit", e => {
    e.preventDefault();

    const age = +($("age")?.value || 0);
    const gender = $("gender")?.value || "male";
    const h = +($("height")?.value || 0);
    const w = +($("weight")?.value || 0);
    const act = +($("activity")?.value || 1.2);

    const bmr = gender === "male"
      ? 10 * w + 6.25 * h - 5 * age + 5
      : 10 * w + 6.25 * h - 5 * age - 161;
    const tdee = bmr * act;

    const carbs = (tdee * 0.5) / 4;
    const protein = (tdee * 0.2) / 4;
    const fat = (tdee * 0.3) / 9;

    const set = (id, v) => { if ($(id)) $(id).textContent = v; };
    set("bmr", Math.round(bmr));
    set("tdee", Math.round(tdee));
    set("carbs", Math.round(carbs) + " g");
    set("protein", Math.round(protein) + " g");
    set("fat", Math.round(fat) + " g");

    const bmi = h > 0 ? w / ((h / 100) ** 2) : 0;
    if ($("metertext")) {
      $("metertext").textContent =
        bmi < 18.5 ? "UNDERWEIGHT" :
        bmi < 25   ? "NORMAL" :
        bmi < 30   ? "OVERWEIGHT" : "OBESE";
    }
    drawGauge(bmi);
  });

  function drawGauge(val = 0) {
    const c = $("gauge");
    if (!c) return;
    const ctx = c.getContext("2d");
    const w = c.width, h = c.height, cx = w/2, cy = h-10, r = Math.min(w/2-12,h-22);
    ctx.clearRect(0,0,w,h);

    ctx.lineWidth = 18;
    ctx.strokeStyle = "#e6e6e6";
    ctx.beginPath();
    ctx.arc(cx,cy,r,Math.PI,2*Math.PI);
    ctx.stroke();

    const zones = [
      {to:18.5,color:"#3b82f6"},
      {to:24.9,color:"#10b981"},
      {to:29.9,color:"#f59e0b"},
      {to:40,color:"#ef4444"}
    ];
    let prev=0;
    const toAng=v=>Math.PI+(Math.min(v,40)/40)*Math.PI;
    zones.forEach(z=>{
      ctx.strokeStyle=z.color;
      ctx.beginPath();
      ctx.arc(cx,cy,r,toAng(prev),toAng(z.to));
      ctx.stroke();
      prev=z.to;
    });

    const a=toAng(val);
    ctx.strokeStyle="#111";
    ctx.lineWidth=4;
    ctx.beginPath();
    ctx.moveTo(cx,cy);
    ctx.lineTo(cx+Math.cos(a)*(r-22),cy+Math.sin(a)*(r-22));
    ctx.stroke();

    ctx.fillStyle="#111";
    ctx.beginPath();
    ctx.arc(cx,cy,6,0,2*Math.PI);
    ctx.fill();

    if ($("gaugevalue")) $("gaugevalue").textContent="BMI: "+val.toFixed(1);
  }

  drawGauge(20); 
});
