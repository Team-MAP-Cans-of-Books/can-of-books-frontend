import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BestBooks.css';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import { Carousel, Container } from 'react-bootstrap';

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bookData: [],
    };
  }

  componentDidMount = async () => {
    await axios.get(`${process.env.REACT_APP_SERVER}/books`)
      .then(res => {
        this.setState({
          bookData: res.data
        })
      })
  }

  //   if(this.state.bookData.length > 0) {
  //   render() {
  //     return (
  //       <div>
  //         <Container>
  //           <Carousel>

  //             <Carousel.Item>
  //               <img className="d-block w-150"
  //                 src="https://via.placeholder.com/900x500/111111/111111?text=' '"
  //                 alt={`slide`} />
  //               <Carousel.Caption>
  //               </Carousel.Caption>
  //             </Carousel.Item>
  //           </Carousel>
  //         </Container>
  //       </div>
  //     )
  //   }
  // } 
  // else {
  //   return;
  // }




  render() {
    console.log(this.state.bookData)
    return (
      <div>
        {this.state.bookData !== [] ?
          <Container>
            <Carousel>
              {this.state.bookData.forEach((book) => {
                <Carousel.Item>
                <img className="d-block w-150"
                  src="https://via.placeholder.com/900x500/111111/111111?text=' '"
                  alt={`slide`} />
                <Carousel.Caption>
                  ${book.title}
                  {console.log(book.title)}
                </Carousel.Caption>
              </Carousel.Item>
              })
            }
            </Carousel>
          </Container> : null
        }
        {/* <Container>
          <Carousel>

            <Carousel.Item>
              <img className="d-block w-150"
                src="https://via.placeholder.com/900x500/111111/111111?text=' '"
                alt={`slide`} />
              <Carousel.Caption>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Container> */}
      </div>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
