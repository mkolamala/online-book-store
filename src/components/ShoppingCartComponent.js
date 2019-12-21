import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Checkout from './Checkout';

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  popover: {
    pointerEvents: "none"
  },
  paper: {
    padding: theme.spacing(1)
  }
}));

export default function ShoppingCart(props) {
  const cartItemsCount = props.cartItems ? props.cartItems.length : 0;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  function ListCartIems(cartItems) {
    return (
      <List
        component="nav"
        className={classes.root}
        aria-label="mailbox folders"
      >
        {props.cartItems.map(book => {
          return (
            <>
              <ListItem key={book._id} button>
                <ListItemText primary={book.name} />
              </ListItem>
              <Divider light />
            </>
          );
        })}
      </List>
    );
  }

  function checkout(){
   return <Checkout />;
  }
   

  return (
    <>
      <Typography
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        onClick = {checkout}
      >
        <IconButton 
          aria-label="show no of items added to Cart"
          color="inherit"
          
        >
          <Badge badgeContent={cartItemsCount} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Typography>
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography>
          <ListCartIems cartItems={props.cartItems} />
        </Typography> 
      </Popover>
    </>
  );
}
