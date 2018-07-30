const reducerDefaultState = [];

export default (state = reducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_ADMIN_STATE':
      return action.adminInterface;
    case 'SET_ADMIN_RESPONSE':
      return {
        ...state,
        adminResponse: action.adminResponse
      }
    case 'SET_ADMIN_EDITING_CHANNEL':
      return {
        ...state,
        editingChannelId: action.channelId
      }
    case 'SET_ADMIN_CHANNEL_SEARCH_FILTER':
      return {
        ...state,
        searchFilter: action.filter
      }
    case 'SET_ADMIN_VISIBLE_CONTENT':
      return {
        ...state,
        visibleContent: action.content
      }
    case 'SET_ADMIN_MODAL_IS_VISIBLE':
      return {
        ...state,
        adminModalIsVisible: true
      }
    case 'UNSET_ADMIN_MODAL_IS_VISIBLE':
      return {
        ...state,
        adminModalIsVisible: false
      }
    default:
      return state;
  }
};