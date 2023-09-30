async function editMemo(event) {
  const id = event.target.dataset.id;
  const editInput = prompt("수정할 값을 입력하세요!");
  const res = await fetch(`/memo/${id}`, {
    method: "PUT", //값 수정 시 PUT method 사용
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      content: editInput,
    }),
  });

  readMemo();
}

async function deleteMemo(event) {
  const id = event.target.dataset.id;
  const res = await fetch(`/memo/${id}`, {
    method: "DELETE", //값 삭제 시 DELETE method 사용
  });
  readMemo();
}

function displayMemo(memo) {
  const ul = document.querySelector("#memo-ul");

  const li = document.createElement("li");
  li.innerText = `[id:${memo.id}] ${memo.content}`;

  const editBtn = document.createElement("button");
  editBtn.innerText = "수정하기";
  editBtn.addEventListener("click", editMemo);
  editBtn.dataset.id = memo.id;

  const delBtn = document.createElement("button");
  delBtn.innerText = "삭제";
  delBtn.addEventListener("click", deleteMemo);
  delBtn.dataset.id = memo.id;

  ul.appendChild(li);
  li.appendChild(editBtn);
  li.appendChild(delBtn);
}

async function readMemo() {
  const res = await fetch("/memo");
  const jsonRes = await res.json();
  const ul = document.querySelector("#memo-ul");
  ul.innerHTML = "";
  // console.log(jsonRes);
  jsonRes.forEach(displayMemo);
}

async function createMemo(content) {
  const res = await fetch("/memo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: new Date().getTime(),
      content,
    }),
  });

  // const jsonRes = await res.json();
  // console.log(jsonRes);

  readMemo();
}

function handleSubmit(event) {
  event.preventDefault();

  const input = document.querySelector("#memo-input");
  createMemo(input.value);
  console.log(input.value);
  input.value = "";
}

readMemo();

const form = document.querySelector("#memo-form");
form.addEventListener("submit", handleSubmit);
