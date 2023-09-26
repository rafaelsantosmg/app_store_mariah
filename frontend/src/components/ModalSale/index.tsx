import CloseIcon from '@mui/icons-material/Close'
import { Box, IconButton, Modal } from '@mui/material'

export default function ModalSale({ ...props }) {
  const { children, handleClose, open, renderButtons } = props
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
            width: '75%',
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
          maxHeight: '85%',
          minWidth: '300px',
          p: 5,
          position: 'relative',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        })}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '0',
            right: '0',
          }}
        >
          <IconButton onClick={handleClose}>
            <CloseIcon fontSize="large" />
          </IconButton>
        </Box>
        <Box
          sx={{
            border: '1px solid #ccc',
            borderRadius: '10px',
            height: '70vh',
            overflow: 'auto',
            padding: '1rem',
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
