import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { add, deleteWish, selectAll } from "./wishlistSlice";
import { Button, TextField, FormControl } from "@material-ui/core";
import "./Wishlist.css";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
    },
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: "25ch",
    },
  })
);

function ListItemLink(props) {
  return React.createElement(
    ListItem,
    Object.assign({ button: true, component: "a" }, props)
  );
}
export function Wishlist() {
  const classes = useStyles();

  const wishlist = useSelector(selectAll);
  const dispatch = useDispatch();

  const [wishName, setWishName] = useState("");
  const [wishPrice, setWishPrice] = useState("");
  const [wishURL, setWishURL] = useState("");
  const [wishDescription, setWishDescription] = useState("");
  const [wishNameHasError, setWishNameHasError] = useState(true);
  const [wishPriceHasError, setWishPriceHasError] = useState(true);
  const [wishURLHasError, setWishURLHasError] = useState(true);
  const [wishDescriptionHasError, setWishDescriptionHasError] = useState(true);

  const onSubmit = () => {

    if (!wishNameHasError && !wishPriceHasError && !wishURLHasError && !wishDescriptionHasError) {
      let payload = {
        id: wishlist.length + 1,
        name: wishName,
        price: wishPrice,
        url: wishURL,
        description: wishDescription,
      };

      dispatch(add(payload));
      setWishName("");
      setWishPrice("");
      setWishURL("");
      setWishDescription("");
      setWishNameHasError(false);
      setWishPriceHasError(false);
      setWishURLHasError(false);
      setWishDescriptionHasError(false);
    }
  };

  const handleDelete = (id) => {
    const payload = {
      id: id,
    };
    dispatch(deleteWish(payload));
  };

  const editWish = () => {};

  const handleOnChangeName = (e) => {
    setWishName(e.target.value);

    setWishNameHasError(!e.target.value || 0 === e.target.value.length);
  };

  const handleOnChangePrice = (e) => {
    setWishPrice(e.target.value);

    setWishPriceHasError(!e.target.value || 0 === e.target.value.length);
  };

  const handleOnChangeURL = (e) => {
    setWishURL(e.target.value);

    setWishURLHasError(!e.target.value || 0 === e.target.value.length);
  };

  const handleOnChangeDescription = (e) => {
    setWishDescription(e.target.value);

    setWishDescriptionHasError(!e.target.value || 0 === e.target.value.length);
  };

  return (
    <div>
      <div className="input-container">
        <form className={classes.root} noValidate autoComplete="off">
          <FormControl>
            <TextField
              required
              id="filled-basic"
              type="text"
              value={wishName}
              onChange={handleOnChangeName}
              label="Wish..."
              variant="filled"
              error={wishNameHasError}
              className={clsx(classes.margin, classes.textField)}
            />
            <TextField
              required
              id="filled-basic"
              value={wishPrice}
              onChange={handleOnChangePrice}
              variant="filled"
              error={wishPriceHasError}
              type="number"
              label="0.00 €"
              className={clsx(classes.margin, classes.textField)}
            ></TextField>
            <TextField
              required
              id="filled-basic"
              type="text"
              value={wishURL}
              onChange={handleOnChangeURL}
              error={wishURLHasError}
              label="URL..."
              variant="filled"
              className={clsx(classes.margin, classes.textField)}
            />
            <TextField
              required
              id="filled-basic"
              value={wishDescription}
              onChange={handleOnChangeDescription}
              type="text"
              label="Description..."
              variant="filled"
              error={wishDescriptionHasError}
              className={clsx(classes.margin, classes.textField)}
            ></TextField>

            <Button onClick={onSubmit} color="primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
              </svg>
            </Button>
          </FormControl>
        </form>
      </div>
      <div>
        {wishlist &&
          wishlist.map((wish, index) => {
            return (
              <div>
                <List component="nav" aria-label="secondary mailbox folders">
                  <ListItemLink href="#simple-list">
                    <ListItemText>
                      {wish.name} - {wish.price}€ - <a href={wish.url}>Buy Here </a> - {wish.description}

                      <Link to={`/Wish/${wish.id}`}>
                        <button className="btn-form" onClick={editWish}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="black"
                            width="18px"
                            height="18px"
                            >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                          </svg>
                        </button>
                      </Link>
                      <button onClick={() => handleDelete(wish.id)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="black"
                          width="18px"
                          height="18px"
                        >
                          <path d="M0 0h24v24H0z" fill="none" />
                          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                        </svg>
                      </button>
                    </ListItemText>
                  </ListItemLink>
                </List>
              </div>
            );
          })}
      </div>
    </div>
  );
}
