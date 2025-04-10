import React from "react";
import { Card, Box, Skeleton, Divider } from "@mui/material";

const SeriesCardSkeleton = () => {
    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Skeleton variant="circular" width={70} height={70} />
                <Skeleton variant="text" width="80%" height={30} sx={{ mt: 1 }} />
                <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                    <Skeleton variant="rectangular" width={80} height={30} sx={{ borderRadius: 4 }} />
                    <Skeleton variant="rectangular" width={80} height={30} sx={{ borderRadius: 4 }} />
                </Box>
            </Box>
            <Divider />
            <Box sx={{ p: 2, flexGrow: 1 }}>
                {[...Array(4)].map((_, i) => (
                    <Box key={i} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Skeleton variant="circular" width={20} height={20} sx={{ mr: 1 }} />
                        <Skeleton variant="text" width="90%" height={20} />
                    </Box>
                ))}
            </Box>
            <Divider />
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                <Skeleton variant="rectangular" width={100} height={36} sx={{ borderRadius: 1 }} />
            </Box>
        </Card>
    );
};

export default SeriesCardSkeleton; 