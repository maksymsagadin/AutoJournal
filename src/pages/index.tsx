import Head from 'next/head'
import Image from 'next/image'
import NavBar from '../components/NavBar'
import heroImage from '../../public/Cluster.jpg'

import { Box, Typography } from '@mui/material'

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
    </>
  )
}
