import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Api from "./../../helper/api";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const RoverDetail = () => {
    const api = new Api();
    const [roverDetail, setRoverDetail] = useState();
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState(moment().format('YYYY-MM-DD'))
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
                console.log(err)
            });
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
            <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                '& > :not(style)': {
                    m: 2,
                    p: 2,
                    width: 280,
                }
            }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker onChange={(e) => setDate(moment(e).format('YYYY-MM-DD'))} />
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
                    roverDetail?.length > 0 && roverDetail.map((item, i) => (<Paper
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
                }

            </Box>
        </Box>

    )
}
export default RoverDetail;