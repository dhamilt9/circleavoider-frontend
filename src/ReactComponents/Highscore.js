import React from 'react';

const Highscore = ({score, username, index}) => (
  <p>{index}: {score} - {username ? username : "Anonymous User"}</p>
);

export default Highscore;
