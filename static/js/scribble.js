document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("scribble-canvas");
    const ctx = canvas.getContext("2d");
    let drawing = false;
  
    canvas.addEventListener("mousedown", () => {
      drawing = true;
      ctx.beginPath();
    });
  
    canvas.addEventListener("mouseup", () => {
      drawing = false;
    });
  
    canvas.addEventListener("mousemove", (event) => {
      if (!drawing) return;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      ctx.lineTo(x, y);
      ctx.stroke();
    });


  });