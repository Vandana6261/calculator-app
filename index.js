let allBtn = document.getElementsByClassName("btn");
let button = document.getElementsByTagName("button");
let inpBox = document.querySelector("#userInput");
let outputBox = document.querySelector("#userOutput");

let equalBtn = document.querySelector("#equal");

let clearBtn = document.querySelector("#clear");
let historyBtn = document.querySelector("#history");
let backBtn = document.querySelector("#back");
let historyDiv = document.querySelector(".historyDiv");
let closeBtn = document.getElementById("closeBtn")


let historyArr = [];

window.addEventListener("load", () => {
  const arr = JSON.parse(localStorage.getItem("hisArr"));
  arr.forEach((elem) => {
    historyArr.push(elem);
  });
});

for (let i = 0; i < button.length; i++) {
  //   if (button[i].textContent != "=" || button[i].textContent != "Clear" || button[i].textContent != "history") {
  button[i].addEventListener("click", (e) => {
    if (outputBox.classList.contains("zAdded")) {
      outputBox.classList.remove("zAdded");
      outputBox.style.zIndex = "9";
    }
    if (
      button[i].textContent != "=" &&
      button[i].textContent != "Clear" &&
      button[i].textContent != "History" &&
      button[i].textContent != "←"
    ) {
      console.log("outputBox", outputBox.val)
        // console.log(button[i])
      let inputText = e.target.textContent;
      let prevInputText = "";
      if(outputBox.value != "") {
        prevInputText += outputBox.value;
        inpBox.value += prevInputText
        outputBox.value = ""
      }
      inpBox.value += inputText;
    }
  });
}
// }

clearBtn.addEventListener("click", () => {
  inpBox.value = "";
  outputBox.value = "";
  outputBox.style.zIndex = "9";
  outputBox.classList.remove("zAdded");
});

equalBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  let val = inpBox.value;
  inpBox.value = "";
  let result;
  if (val) {
    result = eval(val);
    if(Number.isInteger(result)) {
        result = result
    } else {
        result = result.toFixed(3)
    }
    // inpBox.value = result;
    outputBox.style.zIndex = "11";
    outputBox.value = result;
    console.log(outputBox.value)
    outputBox.classList.add("zAdded");
  }
  let str = `${val} = ${result}`;

  if (historyArr.length < 10) {
    historyArr = [...historyArr, str];
  } else {
    historyArr.shift();
    historyArr = [...historyArr, str];
  }

  localStorage.setItem("hisArr", JSON.stringify(historyArr));
});

closeBtn.addEventListener("click", () => {
  historyBtn.click()
})

historyBtn.addEventListener(
  "click",
  () => {
    historyDiv.classList.toggle("showHistory");
    if (historyDiv.classList.contains("showHistory")) {
      historyDiv.replaceChildren();
      historyDiv.appendChild(closeBtn)
      historyArr.forEach((eachVal, i) => {
        let para = document.createElement("p");
        let text = `${i + 1}.   ${eachVal}`;
        para.textContent = text;
        historyDiv.appendChild(para);
      });
    }
  }
  //   { once: true }
);

backBtn.addEventListener("click", () => {
  let oldText = inpBox.value;
  let newText = "";
  let oldAns = outputBox.value;
  let newAns = "";
  for (let i = 0; i < oldText.length - 1; i++) {
    newText += oldText[i];
  }
  inpBox.value = newText;
  for (let i = 0; i < oldAns.length - 1; i++) {
    newAns += oldAns[i];
  }
  outputBox.value = newAns;
});


document.addEventListener("keydown", (event) => {
    console.log("Key pressed : ", event.key)
    console.log(typeof event.key)
    if(event.key === "Enter") {
        console.log("enter is clicked")
        equalBtn.click()
      }
      if(event.key === "Delete") clearBtn.click()
      if(event.key === "Backspace") backBtn.click()

    for(let i = 0; i < button.length; i++) {
      // console.log("key is clicked")
      
        if(button[i].textContent == event.key) {
          // console.log(button[i])
            button[i].click()
        }
    }
})


// console.log(eval("2+3"));
