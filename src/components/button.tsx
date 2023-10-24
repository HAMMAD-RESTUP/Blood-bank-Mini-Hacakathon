import React from 'react';
import MUIButton from '@mui/material/Button';

type PropsType = {
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function MyButton(props: PropsType) {
  const { label, onClick } = props;
  return (
    <MUIButton sx={{}} variant="contained" onClick={onClick}>
      {label}
    </MUIButton>
  );
}
