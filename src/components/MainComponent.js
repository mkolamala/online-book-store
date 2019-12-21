import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import { Switch, Route, NavLink, Link } from "react-router-dom";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import MoreIcon from "@material-ui/icons/MoreVert";
import SignIn from "./SignInComponent";
import SignUp from "./SignUpComponent";
import Books from "./BooksComponent";
import Book from "./BookComponent";
import Strapi from "strapi-sdk-javascript";
import ShoppingCart from "./ShoppingCartComponent";
import WishList from "./WishListComponent";
import AutoCompleteSearch from "./AutoCompleteComponent";
import { Container } from "@material-ui/core";
import Checkout from './Checkout';

const apiUrl = "http://localhost:1337";
const strapi = new Strapi(apiUrl);

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
}));

function PrimarySearchAppBar(props) {
  const wishListCount = props.wishList;

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem>
        <NavLink to="/signin" style={{textDecoration:'none', color:'primary'}}>Sign In</NavLink>
      </MenuItem>
      <MenuItem onClick={handleMenuClose} >
      <NavLink to={{
        pathname:"/checkout",
        cartItems:props.cartItems
      }} style={{textDecoration:'none', color:'primary'}}>Check Out</NavLink>
      </MenuItem>
      <MenuItem onClick={handleMenuClose} disabled>
        Profile
      </MenuItem>
      <MenuItem onClick={handleMenuClose} disabled>
        My account
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <WishList wishList={props.wishList} />
        <p>Wish List</p>
      </MenuItem>
      <MenuItem>
        <ShoppingCart cartItems={props.cartItems} />
        <p>Cart</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <LockOutlinedIcon />
        </IconButton>

        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
           <Link style={{textDecoration:'none', color:'orange'}} to={'/'} >  <LocalLibraryIcon /> </Link>
          </IconButton>
          
          <Typography className={classes.title} variant="h6" noWrap>
          <Link to={'/'} style={{textDecoration:'none', color:'white'}}> Online Book Store </Link>
          </Typography>
          <Container>
            <AutoCompleteSearch booksInventory={props.books} />
          </Container>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <WishList wishList={props.wishList} />
            <ShoppingCart cartItems={props.cartItems} />
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <LockOutlinedIcon />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      cartItems: [],
      wishList: [],
      isIteminWishList: false,
      isIteminCart: false
    };
  }
  addToCart = book => {
    if (book) {
      let cartItems = this.state.cartItems;
      console.log(`current cart ${cartItems}`);
      // Check if an item exists in cart
      const existingBook = cartItems.find(x => x._id === book._id);
      console.log(`find result - ${existingBook}`);
      if (existingBook) {
        this.setState({ isIteminCart: true });
        cartItems = cartItems.filter(x => x._id !== book._id);
        console.log(`filtered cart ${cartItems}`);
      } else {
        this.setState({ isIteminCart: false });
        cartItems.push(book);
        console.log(`new cart ${cartItems}`);
      }
      this.setState({ cartItems: cartItems });
    }
  };

  addToWishList = book => {
    if (book) {
      let wishList = this.state.wishList;
      // Check if an item exists in cart
      const existingBook = wishList.find(x => x._id === book._id);
      if (existingBook) {
        this.setState({ isIteminWishList: true });
        wishList = wishList.filter(x => x._id !== book._id);
      } else {
        this.setState({ isIteminWishList: false });
        wishList.push(book);
      }

      this.setState({ wishList: wishList });
      console.log("wish list items count -" + wishList.length);
    }
  };

  async componentDidMount() {
    this.setState({ loading: true });
    try {
      const response = await strapi.request("POST", "/graphql", {
        data: {
          query: `query{
          books{
            _id
            name
            author
            image{
             name
             url
           }
            bookdetail{
              publishedyear
              pages
              Description
              price
             language
            }
          }
     }
     `
        }
      });
      this.loading = false;
      console.log(response);
      this.setState({ books: response.data.books });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <>
        <PrimarySearchAppBar
          cartItems={this.state.cartItems}
          wishList={this.state.wishList}
          books={this.state.books}
        />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Books
                books={this.state.books}
                addToCart={this.addToCart}
                addToWishList={this.addToWishList}
                isItemInCart={this.state.isIteminCart}
                isItemInWishList={this.state.isIteminWishList}
              />
            )}
          />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp}></Route>
          <Route exact component={Book} path="/book/:bookid" />
          <Route exact path="/checkout" 
          render={() => (
            <Checkout
              cartItems={ this.state.cartItems }
            />
          )}
          />
        </Switch>
      </>
    );
  }
}

export default Main;
