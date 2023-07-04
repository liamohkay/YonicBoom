import { type NextPage } from "next";
import { api } from '~/utils/api';
import React, { useState } from 'react';

const styles = {
  formInput: `
    appearance-none
    bg-transparent
    border-0
    border-b-2
    border-gray-700
    w-full
    text-gray-700
    mr-3
    py-1
    px-2
    leading-tight
    focus:outline-none
    focus:border-gray-400
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

interface FormSelectProps {
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void,
  options: Array<string>,
  fieldName: string,
  value: string,
  label?: string,
  placeholder?: string
}

const FormSelect: React.FC<FormSelectProps> = ({ ...props }): JSX.Element => {
  const { handleInput, options, fieldName, value, label, placeholder } = props;
  return (
    <>
      <div className="md:w-1/3">
        <label className={styles.formHeader} htmlFor={fieldName}>
          {label ?? fieldName}
        </label>
        </div>
        <div className="md:w-2/3">
        <select 
          className={styles.formSelect}
          value={value}
          id={fieldName} 
          name={fieldName}
          onChange={handleInput} 
        >
          {options?.map((val: string) => <option key={val} value={val}>{val}</option>)}
        </select>
      </div>
    </>
  )
}

const FormInput: React.FC<FormInputProps> = ({ ...props }): JSX.Element => {
  const { handleInput, fieldName, value, label } = props;
  return (
    <>
      <div className="inline-flex">
        <div className="md:w-1/4">
          <label className={styles.formHeader} htmlFor={fieldName}>
            {label ?? fieldName}
          </label>
        </div>
        <div className="md:w-3/4">
          <input 
            className={styles.formInput}
            type="text" 
            value={value}
            id={fieldName} 
            name={fieldName}
            onChange={handleInput} 
          />
        </div>
      </div>
    </>
  )
}

const Submit: NextPage = () => {
  const [input, setInput] = useState({
    artist: '',
    pronoun: '',
    artistUrl: '',
    songUrl: '',
  })

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  return (
    <>
      <form className="w-full max-w-full">
        <div className="md:flex-col md:items-center mb-6">
          <FormInput 
            handleInput={handleInput}
            fieldName="artist"
            value={input.artist}
            label="Artist Name"
          />
          <FormSelect 
            handleInput={handleInput}
            fieldName="pronoun"
            value={input.pronoun}
            label="Pronoun"
          />
          <FormInput 
            handleInput={handleInput}
            fieldName="artistUrl"
            value={input.artistUrl}
            label="Soundcloud Profile URL"
          />
          <FormInput 
            handleInput={handleInput}
            fieldName="songUrl"
            value={input.songUrl}
            label="Soundcloud Song URL"
          />
        </div>
      </form>
    </>
  )
}

export default Submit;