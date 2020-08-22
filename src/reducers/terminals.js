const initState = [
    {
        id: 0,
        terminalName: 'Qiwi Terminal',
        description: 'New Terminal, Street: Krasniy Prospect 71',
    },
    {
        id: 1,
        terminalName: 'Qiwi Terminal',
        description: 'New Terminal, Street: Krasniy Prospect 71',
    }
]

export default (state = initState, action) => {
    switch (action.type) {
        case 'ADD_TERMINAL': 
        return [
          ...state,
          action.payload
        ]
  
      case 'REMOVE_TERMINAL': 
        return removeArrayItem(action.payload, state)

      default:
        return state
    }
}

const removeArrayItem = (id, arr) => {
    return arr.filter((item) => {
        return item.id !== id
    })
}