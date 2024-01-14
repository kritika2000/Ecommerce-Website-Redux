import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Main from '../components/Main';

// APP LAYOUT IS THE CONTAINER COMPONENT FOR THE ENTIRE APPLICATION
function AppLayout() {
  return (
    <div className="app">
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </div>
  );
}

export default AppLayout;
