import React from 'react';
import CarFromFormItemLayout from './CarFormItemLayout';
import Input from './inputs/input';

export default function PlateInput({value, onChange}) {
  return (
    <CarFromFormItemLayout title={'Plate Number'}>
      <Input
        placeholder={'Enter Your Car Plate Number'}
        value={value}
        onChange={onChange}
      />
    </CarFromFormItemLayout>
  );
}
