import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class ProfileGithub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: "6a28f6e734f484a2ab83",
      clientSecret: "ed57989e1536ee90320e9bc1d6d8d1015e47ee22",
      count: 5,
      sort: "created: asc",
      repos: []
    };
  }

  componentDidMount() {
    const { username } = this.props;
    const { count, sort, clientId, clientSecret } = this.state;

    fetch(
      `https://api.github.com/users/${username}/repos?per-page${count}&sort=${sort}&client_id=${clientId}&client_secret${clientSecret}`
    )
      .then(res => res.json())
      .then(data => {
        if (this.refs.myref) {
          this.setState({
            repos: data
          });
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    const { repos } = this.state;

    const repoItem = repos.map(repo => (
      <div key={repo.id} className="card card-body mb-2">
        <div className="row">
          <div className="col-md-6">
            <Link to={repo.html_url} className="text-info" target="_blank">
              <h4>{repo.name}</h4>{" "}
            </Link>
            <p>{repo.description}</p>
          </div>
          <div className="col-md-6">
            <span className="badge badge-info mr-1">
              Stars: {repo.stargazers_count}
            </span>
            <span className="badge badge-secondary mr-1">
              Watchers: {repo.watchers_count}
            </span>
            <span className="badge badge-success">
              Forks: {repo.forks_count}
            </span>
          </div>
        </div>
      </div>
    ));
    return (
      <div ref="myref">
        <hr />
        <h3 className="mb-4">Latest github repos</h3>
        {repoItem}
      </div>
    );
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
};

export default ProfileGithub;
