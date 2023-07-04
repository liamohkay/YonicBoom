import { type NextPage } from "next";
import { api } from '~/utils/api';
import React, { useState } from 'react';

const styles = {
  formInput: `
    bg-gray-200 
    appearance-none 
    border-2 
    border-gray-200
    rounded
    w-full
    py-2
    px-4
    text-gray-700
    leading-tight
    focus:outline-none 
    focus:bg-white
  `,
  formHeader: `
    block
    text-gray-500
    font-bold
    md:text-right
    mb-1
    md:mb-0
    pr-4
  `,
  formSelect: `
    block
    py-2.5
    px-0
    w-full
    text-sm
    text-gray-700
    bg-transparent
    border-0
    border-b-2
    border-gray-700
    appearance-none
    focus:outline-none
    focus:ring-0
    focus:border-gray-400
    peer
  `
}

interface FormInputProps {
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void,
  fieldName: string,
  value: string,
  label?: string
}

interface SelectInputProps {
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void,
  fieldName: string,
  value: string,
  label?: string
}

const FormInput: React.FC<FormInputProps> = ({ ...props }): JSX.Element => {
  const { handleInput, fieldName, value, label } = props;
  return (
    <>
      <div className="md:w-1/3">
        <label className={styles.formHeader} htmlFor={fieldName}>
          {label ?? fieldName}
        </label>
        </div>
        <div className="md:w-2/3">
        <input 
          className={styles.formInput}
          type="text" 
          value={value}
          id={fieldName} 
          name={fieldName}
          onChange={handleInput} 
        />
      </div>
    </>
  )
}

// const SelectInput: React.FC<SelectInputProps> = ({ ...props }): JSX.Element => {
//   const { handleInput, fieldName, value, label } = props;
//   return (
//     <>
//       <div className="md:w-1/3">
//         <label className={styles.formHeader} htmlFor={fieldName}>
//           {label ?? fieldName}
//         </label>
//         </div>
//         <div className="md:w-2/3">
//         <select 
//           className={styles.formInput}
//           type="text" 
//           value={value}
//           id={fieldName} 
//           name={fieldName}
//           onChange={handleInput} 
//         />
//       </div>
//     </>
//   )
// }

const Submit: NextPage = () => {
  const [input, setInput] = useState({
    artist: '',
    artistUrl: ''
  })
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  return (
    <>
      <form className="w-full max-w-full">
        <div className="md:flex md:items-center mb-6">
          <FormInput 
            handleInput={handleInput}
            fieldName="artist"
            value={input.artist}
            label="Artist Name"
          />
          <FormInput 
            handleInput={handleInput}
            fieldName="artistUrl"
            value={input.artistUrl}
            label="Soundcloud Profile URL"
          />
          <FormInput 
            handleInput={handleInput}
            fieldName="artistUrl"
            value={input.artistUrl}
            label="Soundcloud Song URL"
          />
        </div>
      </form>
    </>
  )
}

export default Submit;