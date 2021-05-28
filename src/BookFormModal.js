import React from 'react';
import { Modal, Button, Container, Form } from 'react-bootstrap';

class BookFormModal extends React.Component {
  constructor(props) {
    super(props)
  }


  return() {
    render(
      <Container>
        <Modal>
          <Modal.Header closeButton>
            <Modal.Title>Add a Book</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Author</Form.Label>
                <Form.Control value={this.props.searchAuthor} name="author" onChange={this.props.} type="text" placeholder="Enter the Name of the Author" />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Book Title</Form.Label>
                <Form.Control value={this.props.searchTitle} name="book title" onChange={this.props.} type="text" placeholder="Enter Book Title" />
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary">Add Book</Button>
            <Button variant="primary">Delete Book</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    )
  }
}

export default BookFormModal;