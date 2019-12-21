import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Link from "@material-ui/core/Link";
import Container from '@material-ui/core/Container';
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';

const apiUrl = "http://localhost:1337";

const useStyles = makeStyles(theme => ({
  card: {
    maxHeight: 700
  },
  root: {
    flexGrow: 1
  },
  media: {
    height: 475
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

export default function Books(props) {
  const classes = useStyles();
  // function ToggleFavouriteIcon(){
  //  return  (props.isItemInWishList ? <FavoriteIcon />   : <FavoriteBorderOutlinedIcon /> );
  // }

  return (
    <Box m={3}>
        <Container maxWidth="xl">
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid container item xs={12} spacing={3}>
            {props.books.map(book => {
              return (
                <Grid key={book._id} item xs={12} md={3}>
                  <Card className={classes.card}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={`${apiUrl}${book.image.url}`}
                        title={book.name}
                      />
                      <CardContent>
                        <div
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            width: "16rem"
                          }}
                        >
                          <Typography
                            variant="h5"
                            component="h2"
                            display="inline"
                            noWrap
                          >
                            {book.name}
                          </Typography>
                        </div>

                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          Author - {book.author}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Link href={`/book/${book._id}`} variant="body2">
                        <Button size="small" color="primary">
                          More Info
                        </Button>
                      </Link>
                      <IconButton aria-label="add to favorites" color="secondary" onClick= { () => props.addToWishList(book)}>
                         <FavoriteBorderOutlinedIcon />
                      </IconButton>
                      <IconButton aria-label="add to Cart" color="secondary" onClick= { () => props.addToCart(book)} >
                          <AddShoppingCartIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </div>
      </Container>
   
    </Box>
  );
}
