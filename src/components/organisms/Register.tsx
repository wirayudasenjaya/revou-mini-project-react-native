import React from 'react';

import {RegisterComponentProps, SelectTopicsProps} from '../../utils/types';
import RegisterStep1 from './RegisterStep1';
import RegisterStep2 from './RegisterStep2';
import RegisterStep3 from './RegisterStep3';

const CreateAccount: React.FC<RegisterComponentProps> = ({
  registerData,
  errorMessage,
  handleInputChange,
  handleInputBlur,
  inputStates,
}) => (
  <RegisterStep1
    registerData={registerData}
    errorMessage={errorMessage}
    handleInputChange={handleInputChange}
    handleInputBlur={handleInputBlur}
    inputStates={inputStates}
  />
);

const AddNameUsername: React.FC<RegisterComponentProps> = ({
  registerData,
  errorMessage,
  handleInputChange,
  handleInputBlur,
  inputStates,
}) => (
  <RegisterStep2
    registerData={registerData}
    errorMessage={errorMessage}
    handleInputChange={handleInputChange}
    handleInputBlur={handleInputBlur}
    inputStates={inputStates}
  />
);

const SelectTopics: React.FC<SelectTopicsProps> = ({
  topic,
  selectedTopic,
  handleSelectedTopic,
}) => (
  <RegisterStep3
    topic={topic}
    selectedTopic={selectedTopic}
    handleSelectedTopic={handleSelectedTopic}
  />
);

export const RegisterComponents = [
  {
    title: 'Buat Akun',
    component: CreateAccount,
  },
  {
    title: 'Tambahkan Nama & Username',
    component: AddNameUsername,
  },
  {
    title: 'Pilih 3 Topik Favorit',
    component: SelectTopics,
  },
];
