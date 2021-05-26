import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  // Kristian helped us test the frontend/backend connection
  console.log(user);
  const handleClick = async (e) => {

    const Profile = await axios.get(`${process.env.REACT_APP_SERVER}/book`)
    console.log(Profile);
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <button onClick={handleClick}>Test</button>
      </div>
    )
  );
};

export default Profile;
