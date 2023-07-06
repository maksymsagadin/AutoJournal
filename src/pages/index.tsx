import Head from 'next/head'
import Image from 'next/image'
import NavBar from '@/components/NavBar'
import SectionHeader from '@/components/SectionHeader'
import heroImage from '../../public/Cluster.jpg'
import { Box, Container, Typography, Button } from '@mui/material'
import Link from 'next/link'

const sectionStyle = {
  p: 4, 
  backgroundColor: 'background.paper', 
  borderRadius: 2, 
  boxShadow: 1,
  my: 4,
}

export default function Home() {
  return (
    <>
      <Head>
        <title> 🚗 - AutoJournal</title>
        <meta name='description' content='AutoJournal' />
        <meta name='keywords' content='Auto Journal'/>
        <meta name='theme-color' content='#014785' />
      </Head>
      <NavBar />
      <Box height='100vh' maxWidth='100%' overflow='hidden'>
        <Box height='100%' display='flex' position='relative' alignItems='center' justifyContent='center'>
          <Image src={heroImage} alt='' priority fill style={{objectFit:'cover', zIndex:'-1'}}  quality={100} />
          <Typography color='whitesmoke' variant='h3' textAlign='center'>AutoJournal</Typography>
        </Box>
      </Box>
      <Container maxWidth='xl'>
        <Box sx={sectionStyle}>
          <SectionHeader>Our Services</SectionHeader>
          <Typography variant='body1' component='p'>
            AutoJournal is designed to help you store and reference information about your cars for repairs or sales, especially useful for those with multiple automobiles. 
            Our platform is mobile responsive for easy on-the-go accessibility.
          </Typography>
        </Box>
        <Box sx={sectionStyle}>
          <SectionHeader>Why Us?</SectionHeader>
          <Typography variant='body1' component='p' my={1}>
            AutoJournal is a free service that helps you keep track of all the projects, upgrades, and repairs that you have done to your car. 
            It's like CarFax but private. Preserve your car's story and stop having to open the overstuffed folder of paperwork. 
            Simply upload the information and search it up when you need it or bundle it up into a downloadable file to share with the next owner.
          </Typography>
        </Box>
        <Box sx={sectionStyle}>
          <SectionHeader>Contact Us</SectionHeader>
          <Typography variant='body1' component='p' my={1}>
            Have suggestions for updates or improvements? We'd love to hear from you. 
            Please <a href='https://maksymsagadin.com/' target='_blank' rel='noopener noreferrer'>contact me</a> to share your thoughts.
          </Typography>
        </Box>
        <Box sx={sectionStyle}>
          <SectionHeader>Get Started</SectionHeader>
          <Typography variant='body1' component='p' my={1}>
            Ready to start writing your own Auto Journal? Sign up today and join our community.
          </Typography>
          <Button variant='contained' color='primary' component={Link} href='/sign-up'>Sign Up</Button>
        </Box>
      </Container>
    </>
  )
}
