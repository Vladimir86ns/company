import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:4000/"
});

// TODO this need to be deleted!