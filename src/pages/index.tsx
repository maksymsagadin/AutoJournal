import Head from 'next/head'
import Image from 'next/image'
import NavBar from '../components/NavBar'
import heroImage from '../../public/Cluster.jpg'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'

export default function Home() {
  return (
    <>
      <Head>
        <title>AutoJournal</title>
        <meta name="description" content="AutoJournal" />
        <meta name='keywords' content='Auto Journal'/>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#014785" />
      </Head>
      <NavBar />
      <Box height={'100vh'} width={600*3} >
        <Image src={heroImage} alt='' priority fill style={{objectFit:"cover"}} quality={100} />
        <Typography color={'whitesmoke'}>AutoJournal</Typography>
      </Box>
    </>
  )
}
