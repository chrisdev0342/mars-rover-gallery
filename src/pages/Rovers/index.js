import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Api from "./../../helper/api";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CameraDetailModal from './../../components/cameraDetailModal';

const Rovers = () => {
    const api = new Api();
    const [rovers, setRovers] = useState();
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [cameraDetail, setCameraDetail] = useState(false);

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
        fetchUser();
    }, []);

    return (
        <>
            <CameraDetailModal openModal={openModal} setOpenModal={setOpenModal} cameraDetail={cameraDetail} />
            <div className='TitleStyle'>
                <h1>Mars Rover NASA’s List</h1>
            </div>
            {loading ?
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        marginTop: '30px',
                    }}
                >
                    <CircularProgress />
                </Box>
                :
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

                    {rovers?.length > 0 && rovers.map((item, i) => (<Paper
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
                            <div>
                                <Button onClick={() => navigate(`/rovers/${item.name}`)} variant="outlined" size="small" sx={{ m: 1 }}>See Detail View</Button>
                                <Button onClick={() => { setOpenModal(true); setCameraDetail(item.cameras) }} variant="outlined" color='secondary' size="small" sx={{ m: 1 }}>See Camera List</Button>
                            </div>
                        </div>
                    </Paper>))}
                </Box>
            }
        </>
    )
}
export default Rovers;