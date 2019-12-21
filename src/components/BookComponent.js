import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Strapi from "strapi-sdk-javascript";
import { Container, Box } from "@material-ui/core";
const apiUrl = "http://localhost:1337";
const strapi = new Strapi(apiUrl);

const useStyles = makeStyles({
  card: {
    maxHeight: 650
  },
  media: {
    height: 250,
    width:200
  }
});

function DisplayBookDetails(props) {
  const classes = useStyles();
  return (
    <Box mt={5} ml={5}>
      <Container maxWidth="sm">
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={`${apiUrl}${props.image.url}`}
              title={props.book.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Price - {props.bookdetail.price} <br />
                Pages - {props.bookdetail.pages} <br />
                year - {props.bookdetail.publishedyear} <br />
                Language - {props.bookdetail.language}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {props.bookdetail.Description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Container>
    </Box>
  );
}

class Book extends React.Component {
  state = {
    book: {},
    bookdetail: {},
    image: {}
  };
  async componentDidMount() {
    console.log(this.props.match.params.bookid);
    try {
      const resp = await strapi.request("POST", "/graphql", {
        data: {
          query: `query{
                    book(id:"${this.props.match.params.bookid}"){
                      _id
                      name
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
      this.setState({
        bookdetail: resp.data.book.bookdetail,
        book: resp.data.book,
        image: resp.data.book.image
      });
      console.log(resp);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <DisplayBookDetails
        book={this.state.book}
        bookdetail={this.state.bookdetail}
        image={this.state.image}
      />
    );
  }
}

export default Book;
