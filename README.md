# ADA Handle resolver

> This is useful hook for react based apps to resolve [ADA handles](https://adahandle.com/) as Cardano addresses

> Debounced, with custom delay

> Works on mainnnet and the old testnet


## Install

```bash
npm install @summonlabs/use-ada-handle-resolver
```

## Example

Use it on input, and show the resolved address to an user. Address is returned as an empty string when no handle is resolved.

```js
const BLOCKFROST_PROJECT_ID = `<project_id>`
const App = () => {

  const { address, handleInputChangeDebounced } = useAdaHandleResolver({ blockfrostProjectId: BLOCKFROST_PROJECT_ID, delay: 500 })

  return (
    <form>
      <input type={'text'} onChange={handleInputChangeDebounced} />
      {address ? `Resolved as ${address}` : ``}
    </form>
  );
};
```

