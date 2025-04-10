import React, { useState } from 'react';
import { 
  AppBar, 
  Box,
  Breadcrumbs,
  Button,
  Divider,
  Drawer,
  IconButton, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Toolbar, 
  Typography,
  useTheme
} from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FcHome, 
  FcList, 
  FcMenu,
  FcAddDatabase,
  FcReading,
  FcQuestions,
  FcDocument,
  FcAdvertising,
  FcRating,
  FcServices,
  FcTimeline,
  FcCollaboration,
  FcDataSheet,
  FcSupport,
  FcHighPriority,
  FcDataBackup,
  FcImport
} from 'react-icons/fc';

const routes = [
  {
    title: "Dashboard",
    link: "/admin/dashboard",
    icon: <FcHome size={24} />
  },
  {
    title: "Add Category",
    link: "/admin/addcategory",
    icon: <FcList size={24} />
  },
  {
    title: "Add Course",
    link: "/admin/addcourse",
    icon: <FcReading size={24} />
  },
  {
    title: "Add Subject",
    link: "/admin/addsubject",
    icon: <FcAddDatabase size={24} />
  },
  {
    title: "Add Chapter",
    link: "/admin/addchapter",
    icon: <FcDocument size={24} />
  },
  {
    title: "Add Question",
    link: "/admin/addquestion",
    icon: <FcQuestions size={24} />
  },
  {
    title: "Add Blog",
    link: "/admin/addblog",
    icon: <FcAdvertising size={24} />
  },
  {
    title: "Add Promo Code",
    link: "/admin/addpromo",
    icon: <FcRating size={24} />
  },
  {
    title: "Add A Test",
    link: "/admin/addtest",
    icon: <FcServices size={24} />
  },
  {
    title: "Add Section of Test",
    link: "/admin/addtestsection",
    icon: <FcTimeline size={24} />
  },
  {
    title: "Add Test Series",
    link: "/admin/addtestseries",
    icon: <FcCollaboration size={24} />
  },
  {
    title: "See Contact Request",
    link: "/admin/message",
    icon: <FcSupport size={24} />
  },
  {
    title: "Reported Question List",
    link: "/admin/reportedquestion",
    icon: <FcHighPriority size={24} />
  },
  {
    title: "Transfer Question",
    link: "/admin/transferquestion",
    icon: <FcDataBackup size={24} />
  },
  {
    title: "Reviews",
    link: "/admin/reviews",
    icon: <FcRating size={24} />
  },
  {
    title: "Website Images",
    link: "/admin/websiteimages",
    icon: <FcDataBackup size={24} />
  }
];

// Group routes into categories
const groupedRoutes = {
  "Content Management": routes.slice(1, 7),
  "Test Management": routes.slice(7, 11),
  "User Interactions": routes.slice(11, 14),
  "Other": routes.slice(14, 16)
};

export default function AdminLayout({ children, handleLogout }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  const currentPath = location.pathname;
  const currentRoute = routes.find(route => route.link === currentPath) || { title: 'Unknown Page' };
  
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  
  const getBreadcrumbs = () => {
    const parts = currentPath.split('/').filter(Boolean);
    const breadcrumbs = [];
    let path = '';
    
    parts.forEach((part, index) => {
      path += `/${part}`;
      const isLast = index === parts.length - 1;
      
      // Format the breadcrumb text
      let text = part.charAt(0).toUpperCase() + part.slice(1);
      
      // For the "add" prefix pages
      if (part.startsWith('add') && part.length > 3) {
        text = 'Add ' + part.slice(3).charAt(0).toUpperCase() + part.slice(4);
      }
      
      breadcrumbs.push(
        isLast ? (
          <Typography color="textPrimary" key={path}>
            {currentRoute.title}
          </Typography>
        ) : (
          <Link to={path} key={path} style={{ textDecoration: 'none', color: theme.palette.primary.main }}>
            {text}
          </Link>
        )
      );
    });
    
    return breadcrumbs;
  };
  
  const drawerContent = (
    <Box sx={{ width: 280, p: 2 }}>
      <Typography variant="h6" sx={{ my: 2, fontWeight: 'bold', textAlign: 'center' }}>
        Admin Dashboard
      </Typography>
      <Divider />
      <List>
        {routes.map((route) => (
          <ListItem 
            button 
            key={route.link} 
            component={Link} 
            to={route.link}
            onClick={() => setDrawerOpen(false)}
            selected={location.pathname === route.link}
            sx={{
              borderRadius: '8px',
              mb: 0.5,
              '&.Mui-selected': {
                backgroundColor: 'rgba(25, 118, 210, 0.08)',
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.12)',
                },
              },
            }}
          >
            <ListItemIcon>{route.icon}</ListItemIcon>
            <ListItemText primary={route.title} />
          </ListItem>
        ))}
        
        <Divider sx={{ my: 2 }} />
        
        <ListItem button onClick={handleLogout}>
          <ListItemIcon><FcImport size={24} /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            <FcMenu size={24} />
          </IconButton>
          <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
            {currentRoute.title}
          </Typography>
          <Button color="inherit" onClick={handleLogout} startIcon={<FcImport />}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
      >
        {drawerContent}
      </Drawer>
      
      <Box sx={{ p: 2, bgcolor: '#f5f5f5' }}>
        <Breadcrumbs aria-label="breadcrumb">
          {getBreadcrumbs()}
        </Breadcrumbs>
      </Box>
      
      <Box sx={{ flexGrow: 1, p: 3 }}>
        {currentRoute.link !== '/admin/dashboard' && (
          <Box sx={{ mb: 3 }}>
            <Button 
              variant="outlined" 
              startIcon={<FcHome />} 
              onClick={() => navigate('/admin/dashboard')}
            >
              Back to Dashboard
            </Button>
          </Box>
        )}
        
        {children}
      </Box>
    </Box>
  );
} 