import Box from '@mui/material/Box';

const Rovers = () => {


    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                '& > :not(style)': {
                    m: 2,
                    p: 2,
                    width: 280,
                    height: 220,
                }
            }}
        >


        </Box>
    )
}
export default Rovers;