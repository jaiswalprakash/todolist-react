import React, { useEffect, useState } from "react";
import "./style.css";

const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");
  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);
  const addItem = () => {
    if (!inputData) {
      alert("plz fill the data");
    } else if (inputData && toggleButton) {
      setItems(
        items.map((ele) => {
          if (ele.id === isEditItem) {
            return { ...ele, name: inputData };
          }
          return ele;
        })
      );
      setIsEditItem(null);
      setInputData("");
      setToggleButton(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };

  const deleteItem = (id) => {
    const updatedItem = items.filter((ele) => {
      return ele.id != id;
    });
    setItems(updatedItem);
  };

  const editItem = (id) => {
    const editElement = items.find((ele) => {
      return ele.id === id;
    });
    setIsEditItem(id);
    setInputData(editElement.name);
    setToggleButton(true);
  };
  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="todologo" />
            <figcaption>
              <div className="addItems">
                <input
                  type="text"
                  placeholder="✍️ Add Item"
                  className="form-control"
                  value={inputData}
                  onChange={(event) => {
                    setInputData(event.target.value);
                  }}
                />
                {!toggleButton ? (
                  <i className="fa fa-plus add-btn" onClick={addItem}></i>
                ) : (
                  <i className="fa fa-edit add-btn" onClick={addItem}></i>
                )}
              </div>
              <div className="showItems">
                {items.map((ele) => {
                  return (
                    <>
                      <div className="eachItem" key={ele.id}>
                        <h3>{ele.name}</h3>
                        <div className="todo-btn">
                          <i
                            className="far fa-edit add-btn"
                            onClick={() => {
                              editItem(ele.id);
                            }}
                          ></i>
                          <i
                            className="far fa-trash-alt add-btn"
                            onClick={() => {
                              deleteItem(ele.id);
                            }}
                          ></i>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
              <div className="showItems">
                <button
                  className="btn effect04"
                  data-sm-link-text="Remove"
                  onClick={() => {
                    setItems([]);
                  }}
                >
                  <span>CHECK LIST</span>
                </button>
              </div>
            </figcaption>
          </figure>
        </div>
      </div>
    </>
  );
};

export default Todo;
