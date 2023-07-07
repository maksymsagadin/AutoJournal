import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Box, Container, Typography, Button, Grid } from '@mui/material'
import NavBar from '@/components/NavBar'
import SectionHeader from '@/components/SectionHeader'
import heroImg from '../../public/Cluster.jpg'
import serviceImg from '../../public/serviceImage.jpeg'
import enthusiastImg from '../../public/enthusiastImage.jpeg'


const sectionStyle = {
  p: 1, 
  backgroundColor: 'background.paper', 
  borderRadius: 2, 
  boxShadow: 1,
  my: 4,
}
const heroText = {
  mb: 2,
  fontWeight: 'fontWeightBold',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
}

export default function Home() {
  return (
    <>
      <Head>
        <title>AutoJournal - Your Personal Car Maintenance and Upgrade Tracker</title>
        <meta name='description' content='AutoJournal is a free service that helps you keep track of all the projects, upgrades, and repairs that you have done to your car.' />
        <meta name='keywords' content='Auto Journal, Car Maintenance, Car Upgrade, Car Tracker'/>
        <meta name='theme-color' content='#014785' />
      </Head>
      <NavBar />
      <Box height='100vh' maxWidth='100%' overflow='hidden'>
        <Box height='100%' display='flex' flexDirection='column' position='relative' alignItems='center' justifyContent='center'>
          <Image src={heroImg} alt='AutoJournal Hero Image' priority fill style={{objectFit:'cover', zIndex:'-1'}}  quality={100} />
          <Typography color='common.white' variant='h3' textAlign='center' sx={heroText}>
            Welcome to AutoJournal
          </Typography>
          <Typography color='common.white' variant='h4' textAlign='center' sx={heroText}>
            Your personal car maintenance and upgrade tracker.
          </Typography>
          <Button variant='contained' color='primary' size='large' component={Link} href='/sign-up'>Get Started</Button>
        </Box>
      </Box>
      <Container maxWidth='xl'>
        <Box sx={sectionStyle}>
          <SectionHeader>Our Services</SectionHeader>
          <Grid container>
            <Grid item xs={12} md={5}>
              <Box m={2}>
                <Typography variant='h5' component='p'>
                  AutoJournal is designed to help you store and reference information about your cars for repairs or sales, especially useful for those with multiple automobiles. 
                  Our platform is mobile responsive for easy on-the-go accessibility.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={7}>
              <Box position={'relative'} m={2} height={444}>
                <Image src={serviceImg} alt='Service Image' fill style={{objectFit:'cover', borderRadius:'5px'}} />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box sx={sectionStyle}>
          <SectionHeader>Why Us?</SectionHeader>
          <Grid container >
            <Grid item xs={12} md={6} >
                <Box position={'relative'} m={2} height={444} >
                  <Image src={enthusiastImg} alt='Enthusiast Image' fill style={{objectFit:'cover', borderRadius:'5px'}} />
                </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box m={2}>
                <Typography variant='h5' component='p'>
                AutoJournal is a free service that helps you keep track of all the projects, upgrades, and repairs that you have done to your car. 
                It&apos;s like CarFax but private. Preserve your car&apos;s story and stop having to open the overstuffed folder of paperwork. 
                Simply upload the information and search it up when you need it or bundle it up into a downloadable file to share with the next owner.
                </Typography>
              </Box>
            </Grid>
            
          </Grid>
        </Box>
        <Box sx={sectionStyle}>
          <SectionHeader>Contact Us</SectionHeader>
          <Typography variant='h6' component='p' m={1}>
            Have suggestions for updates or improvements? We&apos;d love to hear from you. 
            Please <a href='https://maksymsagadin.com/' target='_blank' rel='noopener noreferrer'>contact me</a> to share your thoughts.
          </Typography>
        </Box>
        <Box sx={sectionStyle}>
          <SectionHeader>Get Started</SectionHeader>
          <Typography variant='h6' component='p' m={1}>
            Ready to start writing your own Auto Journal? Sign up today and join our community.
          </Typography>
          <Button variant='contained' color='primary' component={Link} href='/sign-up'>Sign Up</Button>
        </Box>
        {/* Footer */}
        <Box sx={{ p: 4, backgroundColor: 'background.paper', mt: 4 }}>
          <Typography variant='body2' color='text.secondary' align='center'>
            © 2023 AutoJournal. All rights reserved. | <a href='https://maksymsagadin.com/'>MS</a>
          </Typography>
        </Box>
      </Container>
    </>
  )
}
