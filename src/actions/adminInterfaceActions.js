//the default/initial state
export const setAdminState = (
  {
    adminModalIsVisible = false,
    visibleContent = '',
    searchFilter = '',
    editingChannelId = 0
  } = {}
) => ({
  type: 'SET_ADMIN_STATE',
  adminInterface: {
    adminModalIsVisible,
    visibleContent,
    searchFilter,
    editingChannelId
  }
});

export const setAdminEditingChannel = (channelId) => ({
  type: 'SET_ADMIN_EDITING_CHANNEL',
  channelId
});
export const setAdminChannelSearchFilter = (filter = '') => ({
  type: 'SET_ADMIN_CHANNEL_SEARCH_FILTER',
  filter
});
export const setAdminVisibleContent = (content) => ({
  type: 'SET_ADMIN_VISIBLE_CONTENT',
  content
});
export const setAdminModalIsVisible = () => ({
  type: 'SET_ADMIN_MODAL_IS_VISIBLE'
});
export const unsetAdminModalIsVisible = () => ({
  type: 'UNSET_ADMIN_MODAL_IS_VISIBLE'
});