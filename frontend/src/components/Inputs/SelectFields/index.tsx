/* eslint-disable react-hooks/exhaustive-deps */
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import {
  FormControl,
  IconButton,
  InputLabel,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import MenuItem from '@mui/material/MenuItem'

export default function SelectFields({
  ...props
}: {
  label: string
  name: string
  options: string[]
  value: string
  clearField: () => void
  onChange: ({ target }: SelectChangeEvent<string>) => void
  onClose?: () => void
}): JSX.Element {
  const { label, name, options, value, clearField, ...rest } = props

  return (
    <FormControl variant="outlined" sx={{ width: '100%' }}>
      <InputLabel id="select-label">{label}</InputLabel>
      <Select
        endAdornment={
          value !== '' && (
            <IconButton onClick={clearField}>
              <RestartAltIcon />
            </IconButton>
          )
        }
        id="select"
        name={name}
        labelId="select-label"
        renderValue={(value: string) => (value ? value : label)}
        value={value}
        sx={{
          '& .MuiSelect-iconOutlined': { display: value ? 'none' : '' },
          '&.Mui-focused .MuiIconButton-root': { color: 'primary.main' },
        }}
        {...rest}
      >
        {options.map((option: string) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
