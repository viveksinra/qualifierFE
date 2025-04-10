import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import SeriesCard from "./SeriesCard";

function PopularTestSeries({ testSeries }) {
    const theme = useTheme();
    
    return (
        <Box sx={{ my: 4 }}>
            <Typography 
                variant="h5" 
                component="h2" 
                gutterBottom 
                sx={{ 
                    pb: 1, 
                    position: 'relative',
                    '&:after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: 60,
                        height: 3,
                        backgroundColor: theme.palette.primary.main,
                        borderRadius: 1,
                    }
                }}
            >
                Popular Test Series
            </Typography>
            
            <Box sx={{ mt: 3 }}>
                <SeriesCard lg={4} data={testSeries.filter((f) => f && f.popular === true) || []} />
            </Box>
        </Box>
    );
}

export default PopularTestSeries;
