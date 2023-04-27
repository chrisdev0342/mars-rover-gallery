import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Api from "./../../helper/api";
import { useEffect, useState, forwardRef } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const RoverDetail = () => {
    const api = new Api();
    const [roverDetail, setRoverDetail] = useState();
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);
    const param = useParams();

    const fetchUser = (date) => {
        setLoading(true);
        api
            .getRoverDetail(param.name, date)
            .then((response) => {
                setLoading(false);
                setRoverDetail(response.data.photos);
            })
            .catch((err) => {
                setLoading(false);
                setMessage(err?.response?.data?.error?.message || 'something went wrong')
                setOpen(true);
            });
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    useEffect(() => {
        // fetchUser();
        setRoverDetail(require('./../../rover-detail.json').photos)
    }, []);

    useEffect(() => {
        fetchUser(date)
    }, [date])

    return (
        <Box>
            <div className='backToHome'>
                <a href='/'><ArrowBackIcon /> back</a>
            </div>
            <div className='TitleStyle'>
                <h3>Mars Rover Detail View</h3>
            </div>
            <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                marginTop: '30px',
                width: '100%',
                '& > :not(style)': {
                    m: 2,
                    p: 2,
                    width: '40%'
                }
            }}>
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                >
                    <Alert severity="error">{message}</Alert>
                </Snackbar>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker onChange={(e) => setDate(moment(e).format('YYYY-MM-DD'))} defaultValue={new Date()} />
                </LocalizationProvider>
            </Box>
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
                {loading ?
                    <CircularProgress />
                    :
                    roverDetail?.length > 0 ? roverDetail.map((item, i) => (<Paper
                        key={i}
                        sx={{
                            cursor: 'pointer'
                        }}
                        elevation={3}>
                        <div className='CardContent'>
                            <Box
                                component="img"
                                sx={{
                                    height: '100%',
                                    width: '100%',
                                }}
                                alt="The house from the offer."
                                src={item.img_src}
                            />
                        </div>
                    </Paper>))
                        :
                        <div className='ErrorMsg'>
                            <span>
                                No data for selected date
                            </span>
                        </div>
                }
            </Box>
        </Box>
    )
}

export default RoverDetail;