import * as React from 'react';

import { useState } from "react";
import { toLabel } from './utils';

/*
* Get your free blockfrost id by registering at https://blockfrost.io/
*/
export function useAdaHandleResolver({ blockfrostProjectId, delay, testnet }: { blockfrostProjectId: string, delay?: number, testnet?: boolean }) {
  const [resolvedAddress, setResolvedAddress] = useState('');
  const handleInputChangeDebounced = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();
    debounce(
      () => {
        resolveHandle(e.target.value);
      },
      delay ? delay : 300,
      false,
    )();
  };

  const fetchHandle = async (assetName: string) => {
    const data = await fetch(
      testnet ? `https://cardano-testnet.blockfrost.io/api/v0/assets/8d18d786e92776c824607fd8e193ec535c79dc61ea2405ddf3b09fe3${assetName}/addresses`
        : `https://cardano-mainnet.blockfrost.io/api/v0/assets/f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a${assetName}/addresses`,
      {
        headers: {
          project_id: blockfrostProjectId,
          "Content-Type": "application/json",
        },
      },
    ).then((res) => res.json());

    if (!data || data?.error) throw new Error('No data found')
    const [{ address }] = data
    return address
  }

  const resolveHandle = async (query: string) => {
    if (!query.startsWith("$")) return setResolvedAddress('')

    const handle = query.replace("$", "")

    if (!handle) return setResolvedAddress('')

    const assetName = Buffer.from(handle).toString("hex");
    const cip68Name = toLabel(222) + assetName
    let resolvedAddr = ''
    try {
      resolvedAddr = await fetchHandle(cip68Name)
    } catch (e) {
      try {
        resolvedAddr = await fetchHandle(assetName)
      }
      catch (e) {
        setResolvedAddress('')
      }
    }
    setResolvedAddress(resolvedAddr)
  };
  return {
    address: resolvedAddress,
    handleInputChangeDebounced: handleInputChangeDebounced,
  };
}


// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func: { apply: (arg0: any, arg1: IArguments) => void; }, wait: number | undefined, immediate: any) {
  var timeout: number | undefined;
  return function () {
    //@ts-ignore
    var context: any = this, args = arguments;
    var later = function () {
      timeout = undefined;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    window.clearTimeout(timeout);
    timeout = window.setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};