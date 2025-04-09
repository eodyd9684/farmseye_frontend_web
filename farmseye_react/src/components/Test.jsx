import React from 'react'

const Test = () => {

  const fruits = ['apple', 'banana', 'orange'];
  const testData = fruits.includes('grape');
  console.log(testData)

  return (
    <div>{testData ? 'true' : 'false'}</div>
  )
}

export default Test