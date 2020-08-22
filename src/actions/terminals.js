export const addTerminal = data => ({
  type: 'ADD_TERMINAL',
  payload: data,
})

export const removeTerminal = id => ({
    type: 'REMOVE_TERMINAL',
    payload: id,
})


