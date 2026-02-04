// STACKS
let mainStack = [];
let selectedStack = [];
let rejectedStack = [];

// Push profiles into main stack
mainStack.push(
  { id: 1, name: "Asha", age: 22 },
  { id: 2, name: "Meena", age: 23 },
  { id: 3, name: "Kavya", age: 21 }
);

// Show top profile
function showProfile() {
  if (mainStack.length === 0) {
    showResult();
    return;
  }

  let current = mainStack[mainStack.length - 1];
  document.getElementById("name").innerText = current.name;
  document.getElementById("age").innerText = "Age: " + current.age;
}

// Swipe Right → Selected Stack
function swipeRight() {
  let profile = mainStack.pop(); // POP
  selectedStack.push(profile);   // PUSH
  showProfile();
}

// Swipe Left → Rejected Stack
function swipeLeft() {
  let profile = mainStack.pop(); // POP
  rejectedStack.push(profile);   // PUSH
  showProfile();
}

// Final Result
function showResult() {
  document.getElementById("profileCard").style.display = "none";
  document.querySelector(".buttons").style.display = "none";

  document.getElementById("result").innerHTML = `
    <h2>Results</h2>
    <p>Selected Count: ${selectedStack.length}</p>
    <pre>${JSON.stringify(selectedStack, null, 2)}</pre>

    <p>Rejected Count: ${rejectedStack.length}</p>
    <pre>${JSON.stringify(rejectedStack, null, 2)}</pre>
  `;
}

// Initial call
showProfile();
