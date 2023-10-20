/* eslint-disable react-hooks/exhaustive-deps */
import theme from '@/theme'
import CloseIcon from '@mui/icons-material/Close'
import { Box, IconButton, Modal, Typography } from '@mui/material'
import Image from 'next/image'
import Logo from '../../asset/images/logo.svg'
import DateTime from '../DateTime'

export default function ModalContent({ ...props }) {
  const { children, handleClose, open = false, renderButtons } = props

  return (
    <Modal open={open}>
      <Box
        sx={(theme) => ({
          [theme.breakpoints.up('xs')]: {
            width: '90%',
          },
          [theme.breakpoints.up('sm')]: {
            width: '85%',
          },
          [theme.breakpoints.up('md')]: {
            width: '90%',
          },
          [theme.breakpoints.up('lg')]: {
            width: '85%',
          },
          [theme.breakpoints.up('xl')]: {
            width: '80%',
          },
          bgcolor: 'background.paper',
          border: '3px solid #ccc',
          borderRadius: '10px',
          boxShadow: `0px 2px 4px -1px rgba(0,0,0,0.2),
                  0px 4px 5px 0px rgba(0,0,0,0.14),
                  0px 1px 10px 0px rgba(0, 0, 0, 0.12)`,
          left: '50%',
          maxHeight: '95%',
          minWidth: '300px',
          pl: 5,
          pr: 5,
          pt: 6,
          position: 'relative',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        })}
      >
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            position: 'absolute',
            right: '0',
            top: '0',
            width: '100%',
          }}
        >
          <Image width={200} src={Logo} alt="Logo da Mariah da Roça" />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <DateTime />
            <IconButton onClick={handleClose}>
              <CloseIcon fontSize="large" />
            </IconButton>
          </Box>
        </Box>
        <Box
          sx={{
            border: '1px solid #ccc',
            borderRadius: '10px',
            height: '85vh',
            overflow: 'auto',
            padding: '0 1rem',
          }}
        >
          {children}
        </Box>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'row',
            height: '2.5rem',
            justifyContent: 'flex-end',
            margin: '1rem 0',
            width: '100%',
          }}
        >
          {renderButtons}
        </Box>
      </Box>
    </Modal>
  )
}
