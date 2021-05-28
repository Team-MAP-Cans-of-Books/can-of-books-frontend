import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BestBooks.css';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import { Carousel, Container, Form, Button} from 'react-bootstrap';
// import BookFormModal from './BookFormModal';

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bookData: [],
      searchTitle: '',
      searchAuthor: ''
    };
  }

  componentDidMount = () => {

    if(this.props.auth0.isAuthenticated) {
      this.props.auth0.getIdTokenClaims()
      .then(res => {
        const jwt = res.__raw;
        console.log(jwt);
        const config = {
          headers: {"Authorization" : `Bearer ${jwt}`},
          method: 'get',
          baseURL: process.env.REACT_APP_SERVER,
          url: '/books'
        }
        axios(config)
          .then(axiosResults => {
            console.log(axiosResults.data)
            this.setState({bookData: axiosResults.data})
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
    }
  }

  searchTitle = (e) => {
    this.setState({ searchTitle: e.target.value })
  }

  searchAuthor = (e) => {
    this.setState({ searchAuthor: e.target.value })
  }

  addBook = async () => {

    if(this.props.auth0.isAuthenticated) {
      this.props.auth0.getIdTokenClaims()
      .then(res => {
        const jwt = res.__raw;
        console.log(jwt);
        const config = {
          headers: {"Authorization" : `Bearer ${jwt}`},
          method: 'post',
          baseURL: process.env.REACT_APP_SERVER,
          url: '/books',
          params: { bookTitle: this.state.searchTitle, bookAuthor: this.state.searchAuthor}
        }
        axios(config)
          .then(response => {
            console.log(response.data)
            this.setState({bookData: response.data})
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
    }
  }

  // const bookDel = this.setState({bookData[0]});

  deleteBook = async (title) => {
    console.log(title);
    console.log(this.state.bookData);
    let bookDel = 0;
    for (let i = 0; i< this.state.bookData.length; i++) {
      if(this.state.bookData[i].name === title){
        bookDel = i;
      }
    };
    if(this.props.auth0.isAuthenticated) {
      this.props.auth0.getIdTokenClaims()
      .then(res => {
        const jwt = res.__raw;
        console.log(jwt);
        const config = {
          headers: {"Authorization" : `Bearer ${jwt}`},
          method: 'delete',
          baseURL: process.env.REACT_APP_SERVER,
          url: '/books',
          params: { bookName: this.state.bookData[bookDel].name }

        }
        axios(config)
          .then(response => {
            console.log(response.data)
            this.setState({bookData: response.data})
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
    }
  }

  render() {
    console.log(typeof(this.state.bookData))
    return (
      <div>
        {this.state.bookData !== [] ?
          <Container>
            <Carousel>
              {this.state.bookData.map((book, idx) => {
                return <Carousel.Item>
                <img className="d-block w-150"
                  src="https://via.placeholder.com/900x500/111111/111111?text=' '"
                  alt={`slide`} />
                <Carousel.Caption>
                  {book.name}
                  {book.author}
                  <Button onClick={() => this.deleteBook(book.name)}>
                    DELETE
                  </Button>
                </Carousel.Caption>
              </Carousel.Item>
              })
            }
            </Carousel>
          </Container> : null
        }
        
        <Form>
          <Form.Label>
            Add A Book
          </Form.Label>
          <Form.Control placeholder="book title here" onChange={this.searchTitle}>
          </Form.Control>
          <Form.Control placeholder="author name here" onChange={this.searchAuthor}>
          </Form.Control>
        </Form>
        <Button onClick={this.addBook}>
          Submit!
        </Button>

      </div>
    )
  }
}

export default withAuth0(MyFavoriteBooks);