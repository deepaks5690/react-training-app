import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import {  getFrontProject } from "../services/apiService";
import { Container,  Button} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaymentIcon from '@mui/icons-material/Payment';
import Slider from 'react-slick';
import { useParams } from 'react-router-dom';





export default function ProjectDetailContent() {

  const { project_slug } = useParams(); 


  const [projectData, setProjectData] = useState([]);
  const [projectImages, setProjectImages] = useState([]);
   

  useEffect(() => {
    getProjectData(project_slug);
  }, [project_slug]);

  

  const getProjectData = async (project_slug) => {
   
    try {
      const response = await getFrontProject(project_slug);
      if (response) {
        if (response.success === true) {
            setProjectData(response.data);
            setProjectImages(response.data.images);
        } 
      }
    } catch (err) {
     console.log(err)
    } 
  };



    // Slider settings
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
      };


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
         <Container maxWidth="lg" sx={{ marginTop: '30px' }}>
      <Card sx={{ padding: '20px' }}>
        <Grid container spacing={4} alignItems="center">
          {/* Product Image Slider */}
          <Grid item xs={12} md={6}>
            <Box sx={{ maxWidth: '100%', overflow: 'hidden', borderRadius: '10px' }}>
              <Slider {...settings}>
                {projectImages.map((image_item) => (
                  <Box key={image_item.id} sx={{ textAlign: 'center' }}>
                    <img
                      src={process.env.REACT_APP_API_URL+'uploads/'+image_item.image_name}
                      alt={`Product Image ${image_item.id}`}
                      style={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: '10px',
                      }}
                    />
                  </Box>
                ))}
              </Slider>
            </Box>
          </Grid>

          {/* Product Details */}
          <Grid item xs={12} md={6}>
            <CardContent>
              {/* Product Title */}
              <Typography variant="h4" gutterBottom>
                {projectData.project_name}
              </Typography>
              <Typography variant="h4" gutterBottom>
                Duration: {projectData.completed_duration}
              </Typography>

              <Typography variant="body1" color="text.secondary" paragraph>
                
                <div dangerouslySetInnerHTML={{ __html: projectData.project_short_description }} />
              </Typography>
              {/* Product Description */}
              <Typography variant="body1" color="text.secondary" paragraph>
               
                <div dangerouslySetInnerHTML={{ __html: projectData.project_description }} />

              </Typography>

              {/* Product Price */}
              <Typography variant="h5" color="primary" sx={{ marginBottom: '20px' }}>
              Project technology: {projectData.project_technology}
              </Typography>

              {/* Action Buttons */}
              <Grid container spacing={2}>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ShoppingCartIcon />}
                    size="large"
                  >
                    Ask for Price
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<PaymentIcon />}
                    size="large"
                  >
                    Save for later
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Container>
    </Box>
  );
}
