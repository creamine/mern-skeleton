// File to host methods for accessing each of the user CRUD API endpoints,
// which the React components can use to exchange user data with the server and database as required.

// create: This method will take user data from the view component, which is where we will invoke this method.
// Then, it will use fetch to make a POST call at the create API route, '/api/users', to create a new user in the backend with the provided data.
// Finally, in this method, we return the response from the server as a promise.
const create = async (user) => {
  try {
    let response = await fetch("/api/users/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

// list: This method will use fetch to make a GET call to retrieve all the users in the database,
// and then return the response from the server as a promise to the component.
// The returned promise, if it resolves successfully, will give the component an array containing the user objects that were retrieved from the database.
// In the case of a single user read, we will deal with a single user object instead, as demonstrated next.
const list = async (signal) => {
  try {
    let response = await fetch("/api/users/", {
      method: "GET",
      signal: signal,
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

// read: This method will use fetch to make a GET call to retrieve a specific user by ID.
// Since this is a protected route, besides passing the user ID as a parameter,
// the requesting component must also provide valid credentials, which, in this case, will be a valid JWT received after a successful sign-in.
// The JWT is attached to the GET fetch call in the Authorization header using the Bearer scheme,
// and then the response from the server is returned to the component in a promise.
const read = async (params, credentials, signal) => {
  try {
    let response = await fetch("/api/users/" + params.userId, {
      method: "GET",
      signal: signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

// update: This method will take changed user data from the view component for a specific user,
// then use fetch to make a PUT call to update the existing user in the backend.
// This is also a protected route that will require a valid JWT as the credential.
// This method will also return a promise containing the server's response to the user update request.
const update = async (params, credentials, user) => {
  try {
    let response = await fetch("/api/users/" + params.userId, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

// This method will allow the view component to delete a specific user from the database and use fetch to make a DELETE call.
// This, again, is a protected route that will require a valid JWT as a credential, similar to the read and update methods.
const remove = async (params, credentials) => {
  try {
    let response = await fetch("/api/users/" + params.userId, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

// Finally, we can export these methods from the api-user.js
export { create, list, read, update, remove };
