const app = require("express")();

const memos = [
  `메모1의 내용`,
  `메모2의 내용`,
  `메모3의 내용`,
  `메모4의 내용`,
  `메모5의 내용`,
];
app.get("/v1/memos", (req, res) => {
  res.send(memos);
});

app.listen(3000, () => console.log("listening on port" + 3000));
