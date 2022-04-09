export const filterMiddleWare = ({dispatch}) => next => action => {
    console.log(action);
    return next(action);
};