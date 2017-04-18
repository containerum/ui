const initialState = {
    id: ''
};

export default function dataDeployment(state = initialState, action) {
    switch (action.type) {
    case 'SET_DATA_ID':
        return { ...state, id: action.payload };
    default:
        return state;
    }
}
