import React from "react";
import { Box, Typography, Grid, Paper, Tabs, Tab, useMediaQuery } from "@mui/material";
import { useTheme, alpha } from '@mui/material/styles';
import SeriesCard from "./SeriesCard";

function CategoryWiseSection({ testSeries, categories }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [tab, setTab] = React.useState("All");

    return (
        <Box sx={{ mt: 4, mb: 4 }}>
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
                        backgroundColor: theme.palette.secondary.main,
                        borderRadius: 1,
                    }
                }}
            >
                Category-wise Test Series
            </Typography>
            
            <Grid container spacing={3} sx={{ mt: 2 }}>
                <Grid item size={{ xs: 12, md: 3 }}>
                    <Paper 
                        elevation={1} 
                        sx={{ 
                            background: theme.palette.background.paper,
                            borderRadius: theme.shape.borderRadius,
                            boxShadow: theme.shadows[1],
                            marginBottom: theme.spacing(2),
                            [theme.breakpoints.up('md')]: {
                                height: '100%',
                            },
                        }}
                    >
                        <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
                            <Typography variant="subtitle1" color="primary">
                                Categories
                            </Typography>
                        </Box>
                        <Tabs
                            orientation={isMobile ? "horizontal" : "vertical"}
                            variant="scrollable"
                            value={tab}
                            onChange={(e, v) => setTab(v)}
                            sx={{ 
                                minHeight: isMobile ? 'auto' : 400,
                                '& .MuiTab-root': {
                                    alignItems: isMobile ? 'center' : 'flex-start',
                                    textAlign: isMobile ? 'center' : 'left',
                                    minWidth: isMobile ? 'auto' : undefined,
                                    padding: isMobile ? theme.spacing(1, 2) : undefined,
                                    [theme.breakpoints.up('md')]: {
                                        minHeight: 60,
                                    },
                                    borderRadius: 1,
                                    my: 0.5,
                                    mx: 0.5,
                                },
                                '& .Mui-selected': {
                                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                                    fontWeight: 'bold',
                                },
                            }}
                            indicatorColor="primary"
                            textColor="primary"
                        >
                            <Tab 
                                label={
                                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                                        <span>All</span>
                                        <Box 
                                            sx={{ 
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: 36,
                                                height: 36,
                                                borderRadius: '50%',
                                                backgroundColor: theme.palette.primary.main,
                                                color: '#fff',
                                                fontWeight: 'bold',
                                                marginLeft: theme.spacing(1),
                                            }}
                                        >
                                            {testSeries.length}
                                        </Box>
                                    </Box>
                                } 
                                value="All" 
                            />
                            {categories.map((c, j) => (
                                <Tab 
                                    key={j} 
                                    label={
                                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                                            <span>{c}</span>
                                            <Box 
                                                sx={{ 
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    width: 36,
                                                    height: 36,
                                                    borderRadius: '50%',
                                                    backgroundColor: theme.palette.primary.main,
                                                    color: '#fff',
                                                    fontWeight: 'bold',
                                                    marginLeft: theme.spacing(1),
                                                }}
                                            >
                                                {testSeries.filter(t => t && t.category === c).length}
                                            </Box>
                                        </Box>
                                    } 
                                    value={c}
                                />
                            ))}
                        </Tabs>
                    </Paper>
                </Grid>
                <Grid item size={{ xs: 12, md: 9 }}>
                    <Box sx={{ minHeight: '60vh' }}>
                        <SeriesCard 
                            lg={4} 
                            data={tab === "All" ? 
                                testSeries : 
                                testSeries.filter((f) => f && f.category === tab) || []} 
                        />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default CategoryWiseSection;
