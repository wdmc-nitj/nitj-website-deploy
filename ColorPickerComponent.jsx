//./ColorPickerComponent.jsx
import React from 'react';
import { Box, Label, Input } from '@admin-bro/design-system';

const ColorPickerComponent = (props) => {
  const { property, onChange, record } = props;

  return (
    <Box>
      <Label>{property.label}</Label>
      <Input
        type="color"
        value={record?.params?.[property.name] || ''}
        onChange={(e) => onChange(property.name, e.target.value)}
      />
    </Box>
  );
};

export default ColorPickerComponent;
