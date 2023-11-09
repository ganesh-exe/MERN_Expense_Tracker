import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [datetime, setDatetime] = useState("");
  const [description, setDescription] = useState("");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions().then(setTransactions);
  }, []);

  async function getTransactions() {
    const url = process.env.REACT_APP_API_URL + "/transactions";
    const response = await fetch(url);
    const json = await response.json();
    return json;
  }
  function addTransaction(ev) {
    ev.preventDefault();
    const url = process.env.REACT_APP_API_URL + "/transaction";
    const price = name.split(" ")[0];
    console.log(url);
    fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        price,
        name: name.substring(price.length + 1),
        description,
        datetime,
      }),
    }).then((res) => {
      res.json().then((json) => {
        setName("");
        setDescription("");
        setDatetime("");
        console.log("result", json);
      });
    });
  }

  let balance = 0;
  for (const transaction of transactions) {
    balance = balance + transaction.price;
  }

  return (
    <div>
      <main>
        <h1>
          ₹ {balance}
          <span>.00</span>
        </h1>
        <form onSubmit={addTransaction}>
          <div className="basic">
            <input
              type="text"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              placeholder="+200 new samsung tv"
            ></input>
            <input
              type="datetime-local"
              value={datetime}
              onChange={(ev) => setDatetime(ev.target.value)}
            />
          </div>
          <div className="description">
            <input
              type="text"
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
              placeholder="description"
            />
          </div>
          <button type="submit"> Add transaction </button>
        </form>
        <div className="transactions">
          {transactions.length > 0 &&
            transactions.map((transaction) => {
              return (
                <div className="transaction">
                  <div className="left">
                    <div className="name">{transaction.name}</div>
                    <div className="description">{transaction.description}</div>
                  </div>
                  <div className="right">
                    <div
                      className={
                        "price " + (transaction.price < 0 ? "red" : "green")
                      }
                    >
                      {transaction.price}
                    </div>
                    <div className="datetime">{transaction.datetime}</div>
                  </div>
                </div>
              );
            })}
        </div>
      </main>
    </div>
  );
}

export default App;