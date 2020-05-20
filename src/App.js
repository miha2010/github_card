import React from 'react';
import axios from 'axios';

import { Profile, SearchProfile } from './components';

import './index.scss';

const API = 'https://api.github.com/users';

class App extends React.Component {
  state = {
    username: 'miha2010',
    name: '',
    avatar: '',
    location: '',
    repos: '',
    followers: '',
    following: '',
    homeUrl: '',
    notFound: false,
  }

  componentDidMount() {
    const { username } = this.state;

    this.fetchProfile(username);
  }

  fetchProfile = async (username) => {
    const url = `${API}/${username}`;

    try {
      const { data: { login, name, avatar_url, location, public_repos, followers, following, html_url } } = await axios.get(url);

      this.setState({ username: login, name, avatar: avatar_url, location, repos: public_repos, followers, following, homeUrl: html_url });
    } catch (error) {
      this.setState({ notFound: true })
    }
  }

  render() {
    return (
      <section id="card">
        <SearchProfile fetchProfile={this.fetchProfile} />
        <Profile profile={this.state} />
      </section>
    )
  }
}

export default App; 