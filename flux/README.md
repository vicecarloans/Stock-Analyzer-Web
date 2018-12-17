# Flux Folder

Place all new ducks in the the `ducks/` folder. Add any saga watchers to the `sagaWatchers` array in `./createStore.js` and add your reducer to `./rootReducer.js`.

Every duck should have an `index.js` file which exports the reducer by default and the actions, selectors, sagas like so:

```js
import reducer from "./reducer";
export default reducer;
export * from "./actions";
export * from "./sagas";
export * from "./selectors";
```
