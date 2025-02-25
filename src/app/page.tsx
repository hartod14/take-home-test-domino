"use client"

import { log } from "console";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const initialDomino: Array<Array<number>> = [
    [6, 1],
    [4, 3],
    [5, 1],
    [3, 4],
    [1, 1],
    [3, 4],
    [1, 2],
  ]
  const [domino, setDomino] = useState<Array<Array<number>>>(initialDomino);
  const [dobleNumber, setDoubleNumber] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null)

  const countDoubleNumber = () => {
    setDoubleNumber(domino.reduce((acc, numbers) => {
      return numbers[0] == numbers[1] ? acc + 1 : acc
    }, 0))
  }

  useEffect(() => {
    countDoubleNumber()
  }, [])

  const sortAsc = () => {
    console.log('sort asc');
    setDomino([...domino].sort((a, b) => {
      if (a[0] + a[1] == b[0] + b[1]) {
        return a[0] - b[0];
      }
      return (a[0] + a[1]) - (b[0] + b[1])
    }))
  }

  const sortDesc = () => {
    console.log('sort desc');
    setDomino([...domino].sort((a, b) => {
      if (a[0] + a[1] == b[0] + b[1]) {
        return b[0] - a[0];
      }
      return (b[0] + b[1]) - (a[0] + a[1])
    }))
  }

  const flip = () => {
    console.log('flip');

    setDomino([...domino].map((numbers) => {
      return numbers.toReversed()
    }))
  }


  const reset = () => {
    console.log('reset');

    setDomino(initialDomino)
  }

  const removeTotalNumber = () => {
    console.log('removetotalNumber');

    const inputValue = inputRef.current?.value;
    setDomino([...domino].filter(([a, b]) => {
      return a + b != Number(inputValue)
    }));

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="p-10">
      <h1 className="font-bold text-4xl mb-3">Dominoes</h1>
      <div className="w-1/3 mb-2">
        <div className="p-4 rounded bg-gray-100 border border-gray-300">
          <h2 className="font-bold text-lg mb-3">Source</h2>
          <p>{JSON.stringify(initialDomino, null, 2)}</p>
        </div>
      </div>
      <div className="w-1/3 mb-4">
        <div className="p-4 rounded bg-gray-100 border border-gray-300">
          <h2 className="font-bold text-lg mb-3">Double Number</h2>
          {dobleNumber}
        </div>
      </div>
      <div className="flex gap-2 mb-4">
        {domino.map((numbers, index) => (
          <div key={index} className="flex flex-col gap-2 p-2 border border-gray-500 rounded">
            <p>{numbers[0]}</p>
            <p>-</p>
            <p>{numbers[1]}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-2 mb-3">
        <button onClick={sortAsc} className="bg-blue-500 px-3 py-2 rounded text-white">
          Sort (ASC)
        </button>
        <button onClick={sortDesc} className="bg-blue-500 px-3 py-2 rounded text-white">
          Sort (DESC)
        </button>
        <button onClick={flip} className="bg-blue-500 px-3 py-2 rounded text-white">
          Flip
        </button>
        <button onClick={removeDuplicate} className="bg-blue-500 px-3 py-2 rounded text-white">
          Remove Dup
        </button>
        <button onClick={reset} className="bg-blue-500 px-3 py-2 rounded text-white">
          Reset
        </button>
      </div>
      <div>
        <input
          ref={inputRef}
          type="text"
          className="px-3 py-2 border border-gray-100 mb-2 w-1/4"
          placeholder="Input Number"
        />
        <div>
          <div>
            <button onClick={removeTotalNumber} className="bg-blue-500 px-3 py-2 rounded text-white w-fit">
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
