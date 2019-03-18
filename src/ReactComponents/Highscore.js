//Simple element used by all highscore lists to render a single high score.

//Example:
//1: 250 - Dan

import React from 'react';

const Highscore = ({score, username, index}) => (
  <p>{index}: {score} - {username ? username : "Anonymous User"}</p>
);

export default Highscore;
