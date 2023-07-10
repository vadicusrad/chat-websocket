/* eslint-disable react/prop-types */
import { Container, Grid } from '@mui/material';
import Header from './Header';

const Layout = ({ children, socket }) => {
  return (
    <Grid
      container
      display='flex'
      direction='column'
      height='100vh'
      flexWrap='nowrap'
    >
      <Header socket={socket} />
      <Container
        maxWidth='md'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          justifyContent: 'start',
          alignItems: 'center',
        }}
      >
        {children}
      </Container>
    </Grid>
  );
};

export default Layout;
