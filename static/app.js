async function readMemo() {
  const res = await fetch("/memos");
  const jsonRes = await res.json();
  // console.log(jsonRes);
}

readMemo();

async function createMemo(content) {
  const res = await fetch("/memos", {
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

const form = document.querySelector("#memo-form");
form.addEventListener("submit", handleSubmit);
