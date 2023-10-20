
const $ulList = document.getElementById("list");

const $columnDivNotLevel2 = Array.from(
  document.querySelectorAll(".column")
).filter((el) => el.id !== "Level2");


$ulList.addEventListener("pointerdown", (e) => {

  if (e.target.nodeName === "A") {
    $columnDivNotLevel2.forEach((el) => {
      const $iframe = el.querySelector("iframe");
      if ($iframe !== null) {
        $iframe.src = "";
      }
    });
  }
});



