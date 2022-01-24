import React, { useState } from "react";
const menuItems = [
  {
    name: "Salad",
    choices: [{ name: "Santa Fe" }, { name: "Greek" }, { name: "Asian" }],
    related: [
      {
        name: "Dressing",
        choices: [
          { name: "Italian" },
          { name: "Blue Cheese" },
          { name: "Ranch" },
        ],
      },
      {
        name: "Bread",
        choices: [{ name: "Italian" }, { name: "Flat" }, { name: "Sourdough" }],
      },
    ],
  },
  {
    name: "Entree",
    choices: [{ name: "Steak" }, { name: "Salmon" }, { name: "Rice" }],
    related: [],
  },
  {
    name: "Soup",
    choices: [
      { name: "Minestrone" },
      { name: "Hot and sour" },
      { name: "Miso" },
    ],
    related: [
      {
        name: "Bread",
        choices: [{ name: "Breadsticks" }],
      },
    ],
  },
];

const Menu = () => {

  const [showMenuChoicesState, setshowMenuChoicesState] = useState(
    new Array(menuItems.length).fill(false)
  );

  const [showRelatedMenuState, setshowRelatedMenuState] = useState(
    new Array(menuItems.length).fill(false)
  );

  

  const [checkedMenuState, setCheckedMenuState] = useState(
    new Array(menuItems.length).fill(false)
  );
  const [checkedChoicesState, setcheckedChoicesState] = useState(
    new Array(menuItems.length).fill(new Array(10).fill(false))
  );

  const [checkedRelatedState, setCheckedRelatedState] = useState(
    new Array(menuItems.length).fill(new Array(6).fill(false))
  );
  const [showRelatedMenuStateChoices, setshowRelatedMenuStateChoices] = useState(
    new Array(menuItems.length).fill(new Array(6).fill(false))
  );

  const MenuOnChange = (position) => {
    //this line Updates checked menu
    const updatedcheckedMenuState = checkedMenuState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedMenuState(updatedcheckedMenuState);

    // this line below Collapses the related choices menu when top menu is collapsed
    if (!checkedMenuState[position]) {
      collapseRelatedChoices(position);
    }

    const updatedshowMenuChoicesState = showMenuChoicesState.map((item, index) =>
      index === position ? !item : item
    );
    setshowMenuChoicesState(updatedshowMenuChoicesState);
  };
  const collapseRelatedChoices = (position) => {
    const updatedcheckedChoicesStateCheckedState = checkedChoicesState.map(
      (item, index) => {
        return index === position
          ? item.map((item, index) => {
              return false;
            })
          : item;
      }
    );
    setcheckedChoicesState(updatedcheckedChoicesStateCheckedState);
    const updatedshowRelatedMenuState = showRelatedMenuState.map((item, index) => {
      return index === position ? false : item;
    });
    setshowRelatedMenuState(updatedshowRelatedMenuState);
    
    // close the  related options
    const updatedCheckedRelatedState = checkedRelatedState.map(
      (item, index) => {
        return index === position
          ? item.map((item, index) => {
              return false;
            })
          : item;
      }
    );
    setCheckedRelatedState(updatedCheckedRelatedState);
    const updatedshowRelatedMenuStateChoices = showRelatedMenuStateChoices.map((item, index) => {
      return index === position
        ? item.map((item, index) => {
            return false;
          })
        : item;
    });
    setshowRelatedMenuStateChoices(updatedshowRelatedMenuStateChoices);
  };
  
  const handleChoicesOnChange = (parentPosition, position) => {
    const updatedcheckedChoicesStateCheckedState = checkedChoicesState.map(
      (item, index) => {
        return index === parentPosition
          ? item.map((item, index) => {
              return index === position ? !item : item;
            })
          : item;
      }
    );
    setcheckedChoicesState(updatedcheckedChoicesStateCheckedState);

    const updatedshowRelatedMenuState = showRelatedMenuState.map((item, index) => {
      return index === parentPosition ? !item : item;
    });
    setshowRelatedMenuState(updatedshowRelatedMenuState);
  };

  //   Handle the individual showing of choices for related items
  const handleRelatedOnChange = (parentPosition, position) => {
    const updatedCheckedRelatedState = checkedRelatedState.map(
      (item, index) => {
        return index === parentPosition
          ? item.map((item, index) => {
              return index === position ? !item : item;
            })
          : item;
      }
    );
    setCheckedRelatedState(updatedCheckedRelatedState);

    const updatedshowRelatedMenuStateChoices = showRelatedMenuStateChoices.map((item, index) => {
      return index === parentPosition
        ? item.map((item, index) => {
            return index === position ? !item : item;
          })
        : item;
    });
    setshowRelatedMenuStateChoices(updatedshowRelatedMenuStateChoices);
  };

  const renderChoices = (choices, parentIndex) => {
    return choices.map((choice, index) => {
      return (
        <div key={index}>
          <input
            type="checkbox"
            name={choice.name}
            checked={checkedChoicesState[parentIndex][index]}
            onChange={() => handleChoicesOnChange(parentIndex, index)}
          />
          {choice.name}
          <br />
        </div>
      );
    });
  };
  const renderRelated = (relatedItems, parentIndex) => {
    return relatedItems.map((related, index) => {
      return (
        <div key={index}>
          <input
            type="checkbox"
            name={related.name}
            checked={checkedRelatedState[parentIndex][index]}
            onChange={() => handleRelatedOnChange(parentIndex, index)}
          />
          {related.name}
          <br />
          {showRelatedMenuStateChoices[parentIndex][index] ? (
            <ul>{renderRelatedChoices(related.choices)}</ul>
          ) : null}
        </div>
      );
    });
  };

  const renderRelatedChoices = (relatedItems) => {
    return relatedItems.map((related, index) => {
      return (
        <div key={index}>
          <input type="checkbox" name={related.name} />
          {related.name}
          <br />
        </div>
      );
    });
  };

  return (
    <div className="App">
      {menuItems.map((menuItem, index) => {
        return (
          <div key={index}>
            <input
              data-testid="chkMenu"
              type="checkbox"
              name={menuItem.name}
              checked={checkedMenuState[index]}
              onChange={() => MenuOnChange(index)}
            />
            {menuItem.name} <br />
            {showMenuChoicesState[index] ? (
              <ul>
                {renderChoices(menuItem.choices, index)}

                {showRelatedMenuState[index] ? <p>You might also want: </p> : null}
                {showRelatedMenuState[index]
                  ? renderRelated(menuItem.related, index)
                  : null}
              </ul>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default Menu;
