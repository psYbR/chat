
//sort comparitor - sort by nick
const compare = (a,b) => {
  if (a.nick < b.nick)
    return -1;
  if (a.nick > b.nick)
    return 1;
  return 0;
}

export const getVisibleUsers = (state) => {

  //filter by the users that are in the current channel
  let users = state.users;

  //sort alphabetically
  return users.sort(compare);

}