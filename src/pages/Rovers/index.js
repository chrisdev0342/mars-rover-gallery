import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Api from "./../../helper/api";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const Rovers = () => {
    const api = new Api();
    const [rovers, setRovers] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchUser = () => {
        setLoading(true);
        api
            .getRoverList()
            .then((response) => {
                setLoading(false);
                setRovers(response.data.rovers);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err)
            });
    };

    useEffect(() => {
        // fetchUser();
        setRovers(require('./../../rovers.json').rovers)
    }, []);

    return (
        <>
            <div className='TitleStyle'>
                <h1>Mars Rover NASA’s List</h1>
            </div>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    marginTop: '30px',
                    '& > :not(style)': {
                        m: 2,
                        p: 2,
                        width: 310,
                        height: 'auto',
                        minHeight: 250
                    }
                }}
            >
                {loading ?
                    <CircularProgress />
                    :
                    rovers?.length > 0 && rovers.map((item, i) => (<Paper
                        key={i}
                        sx={{
                            cursor: 'pointer'
                        }}
                        elevation={3}
                    >
                        <div className='CardContent'>
                            <div><b>Name:</b> {item?.name || ''}</div>
                            <div><b>Landing date:</b> {item?.landing_date || ''}</div>
                            <div><b>Launch date:</b> {item?.launch_date || ''}</div>
                            <div><b>Total photos:</b> {item?.total_photos || ''}</div>
                            <div><b>List of the cameras available:</b> {item.cameras?.length || ''}</div>
                            {/* {item.cameras?.length > 0 && item.cameras.map((item, i) => (
                            <div>
                            {item.full_name || ''}
                            </div>
                        ))} */}
                            <div>
                                {/* <Button variant="outlined" size="small" color='secondary' sx={{ m: 1 }}>See Here Cameras</Button> */}
                                <Button onClick={() => navigate(`/rovers/${item.name}`)} variant="outlined" size="small" sx={{ m: 1 }}>See Detail View</Button>
                            </div>
                        </div>
                    </Paper>))
                }
            </Box>
        </>
    )
}
export default Rovers;